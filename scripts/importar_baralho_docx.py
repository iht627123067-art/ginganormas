#!/usr/bin/env python3
"""Reimporta o .docx editado pela equipe para o CSV canônico do baralho GINGA.

Uso: python3 scripts/importar_baralho_docx.py <baralho_editado.docx>

Lê as tabelas do .docx (uma por dimensão, cada uma sob um título de nível 2 com
o nome da dimensão — o formato gerado por scripts/exportar_baralho_docx.py) e
regrava data/baralho_ginga_online.csv. Depois disso, rode:

    node scripts/gerar_seed_baralho.mjs
    python3 scripts/exportar_baralho_docx.py   # se quiser gerar a próxima versão pra equipe

para propagar a mudança ao seed do banco (as cópias impressa e online já
enxergam o CSV canônico via symlink, então nada mais precisa ser feito nelas).
"""
import csv
import sys
from pathlib import Path

from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "data" / "baralho_ginga_online.csv"
FIELDNAMES = ["id", "dimensao", "cor_hex", "carta", "definicao", "pergunta"]


def carregar_estado_atual():
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        cartas = list(csv.DictReader(f))
    cor_por_dimensao = {}
    prefixo_por_dimensao = {}
    maior_numero_por_prefixo = {}
    for c in cartas:
        cor_por_dimensao.setdefault(c["dimensao"], c["cor_hex"])
        prefixo = "".join(ch for ch in c["id"] if not ch.isdigit())
        numero = int("".join(ch for ch in c["id"] if ch.isdigit()) or 0)
        prefixo_por_dimensao.setdefault(c["dimensao"], prefixo)
        maior_numero_por_prefixo[prefixo] = max(maior_numero_por_prefixo.get(prefixo, 0), numero)
    return cartas, cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo


def iter_blocos(document):
    """Itera parágrafos e tabelas do corpo do documento, na ordem em que aparecem."""
    body = document.element.body
    for child in body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, document)
        elif child.tag == qn("w:tbl"):
            yield Table(child, document)


def extrair_cartas_do_docx(docx_path):
    document = Document(docx_path)
    dimensao_atual = None
    cartas_por_tabela = []  # lista de (dimensao, [linhas])

    for bloco in iter_blocos(document):
        if isinstance(bloco, Paragraph):
            if bloco.style is not None and bloco.style.name.startswith("Heading 2"):
                texto = bloco.text.strip()
                if texto:
                    dimensao_atual = texto
        elif isinstance(bloco, Table):
            linhas = []
            for row in bloco.rows[1:]:  # pula cabeçalho
                celulas = [c.text.strip() for c in row.cells]
                if len(celulas) < 4:
                    continue
                id_, carta, definicao, pergunta = celulas[0], celulas[1], celulas[2], celulas[3]
                if not (id_ or carta or definicao or pergunta):
                    continue  # linha em branco
                linhas.append({"id": id_, "carta": carta, "definicao": definicao, "pergunta": pergunta})
            cartas_por_tabela.append((dimensao_atual, linhas))

    return cartas_por_tabela


def montar_csv_final(cartas_por_tabela, cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo):
    resultado = []
    ids_vistos = set()
    avisos = []

    for dimensao, linhas in cartas_por_tabela:
        if dimensao is None:
            avisos.append("Uma tabela não tem um título de dimensão (Heading 2) acima dela — ignorada.")
            continue

        cor = cor_por_dimensao.get(dimensao)
        prefixo = prefixo_por_dimensao.get(dimensao)
        if cor is None or prefixo is None:
            avisos.append(
                f"Dimensão nova '{dimensao}' sem cor/prefixo conhecidos — usando cor #666666 e "
                f"prefixo 'X'. Ajuste manualmente no CSV depois."
            )
            cor = cor or "#666666"
            prefixo = prefixo or "X"

        for linha in linhas:
            id_ = linha["id"]
            if not id_:
                maior_numero_por_prefixo[prefixo] = maior_numero_por_prefixo.get(prefixo, 0) + 1
                id_ = f"{prefixo}{maior_numero_por_prefixo[prefixo]:02d}"
                avisos.append(f"Carta nova '{linha['carta']}' recebeu o ID {id_}.")
            if id_ in ids_vistos:
                avisos.append(f"ID repetido '{id_}' — verifique manualmente.")
            ids_vistos.add(id_)

            resultado.append(
                {
                    "id": id_,
                    "dimensao": dimensao,
                    "cor_hex": cor,
                    "carta": linha["carta"],
                    "definicao": linha["definicao"],
                    "pergunta": linha["pergunta"],
                }
            )

    return resultado, avisos


def diff_resumo(cartas_antigas, cartas_novas):
    antigas = {c["id"]: c for c in cartas_antigas}
    novas = {c["id"]: c for c in cartas_novas}

    removidas = [i for i in antigas if i not in novas]
    adicionadas = [i for i in novas if i not in antigas]
    alteradas = [
        i
        for i in antigas
        if i in novas
        and any(antigas[i][campo] != novas[i][campo] for campo in ("dimensao", "carta", "definicao", "pergunta"))
    ]

    print(f"\nResumo: {len(novas)} cartas no total.")
    if removidas:
        print(f"  Removidas ({len(removidas)}): {', '.join(sorted(removidas))}")
    if adicionadas:
        print(f"  Adicionadas ({len(adicionadas)}): {', '.join(sorted(adicionadas))}")
    if alteradas:
        print(f"  Alteradas ({len(alteradas)}): {', '.join(sorted(alteradas))}")
    if not (removidas or adicionadas or alteradas):
        print("  Nenhuma mudança de conteúdo detectada.")


def main():
    if len(sys.argv) < 2:
        print("Uso: python3 scripts/importar_baralho_docx.py <baralho_editado.docx>")
        sys.exit(1)

    docx_path = Path(sys.argv[1])
    cartas_antigas, cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo = carregar_estado_atual()

    cartas_por_tabela = extrair_cartas_do_docx(docx_path)
    cartas_novas, avisos = montar_csv_final(
        cartas_por_tabela, cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo
    )

    with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES, lineterminator="\n")
        writer.writeheader()
        writer.writerows(cartas_novas)

    diff_resumo(cartas_antigas, cartas_novas)
    if avisos:
        print("\nAvisos:")
        for a in avisos:
            print(f"  - {a}")

    print(f"\nOK — {CSV_PATH} atualizado. Próximos passos:")
    print("  node scripts/gerar_seed_baralho.mjs   # atualiza sql/002_seed_baralho.sql")
    print("  git diff data/ sql/                   # revisar antes de commitar")


if __name__ == "__main__":
    main()
