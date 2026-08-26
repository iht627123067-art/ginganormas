#!/usr/bin/env python3
"""Reimporta o .docx editado pela equipe para os CSVs canônicos do baralho GINGA.

Uso: python3 scripts/importar_baralho_docx.py <baralho_editado.docx>

Lê as tabelas do .docx no formato gerado por scripts/exportar_baralho_docx.py:
- uma tabela "ID | Dimensão | Carta | Explicação" com as 5 cartas de abertura
  (uma por dimensão) -> regrava data/baralho_ginga_dimensoes_intro.csv
- uma tabela "ID | Carta | Definição | Pergunta" por dimensão, cada uma sob um
  título de nível 2 com o nome da dimensão -> regrava data/baralho_ginga_online.csv

Depois disso, rode:

    node scripts/gerar_seed_baralho.mjs
    python3 scripts/exportar_baralho_docx.py   # se quiser gerar a próxima versão pra equipe

para propagar a mudança ao seed do banco (as cópias impressa e online já
enxergam os CSVs canônicos via symlink, então nada mais precisa ser feito nelas).
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
CSV_INTRO_PATH = ROOT / "data" / "baralho_ginga_dimensoes_intro.csv"
FIELDNAMES = ["id", "dimensao", "cor_hex", "carta", "definicao", "pergunta"]
ORDEM_DIMENSOES = ["Governança", "Incentivos", "Normas", "Gestão de capacidades", "Ambiência"]

HEADER_INTRO = ["id", "dimensão", "carta", "explicação"]
HEADER_PRINCIPAL = ["id", "carta", "definição", "pergunta"]


def carregar_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def escrever_csv(path, linhas):
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES, lineterminator="\n")
        writer.writeheader()
        writer.writerows(linhas)


def mapa_dimensoes(cartas_principais, cartas_intro):
    cor_por_dimensao = {}
    prefixo_por_dimensao = {}
    maior_numero_por_prefixo = {}
    for c in cartas_principais + cartas_intro:
        cor_por_dimensao.setdefault(c["dimensao"], c["cor_hex"])
        prefixo = "".join(ch for ch in c["id"] if not ch.isdigit())
        numero = int("".join(ch for ch in c["id"] if ch.isdigit()) or 0)
        prefixo_por_dimensao.setdefault(c["dimensao"], prefixo)
        maior_numero_por_prefixo[prefixo] = max(maior_numero_por_prefixo.get(prefixo, 0), numero)
    return cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo


def iter_blocos(document):
    """Itera parágrafos e tabelas do corpo do documento, na ordem em que aparecem."""
    body = document.element.body
    for child in body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, document)
        elif child.tag == qn("w:tbl"):
            yield Table(child, document)


def cabecalho(table):
    return [c.text.strip().lower() for c in table.rows[0].cells]


def extrair_do_docx(docx_path):
    document = Document(docx_path)
    dimensao_atual = None
    linhas_intro = []
    cartas_por_tabela = []  # lista de (dimensao, [linhas]) — tabelas principais

    for bloco in iter_blocos(document):
        if isinstance(bloco, Paragraph):
            if bloco.style is not None and bloco.style.name.startswith("Heading 2"):
                texto = bloco.text.strip()
                if texto:
                    dimensao_atual = texto
        elif isinstance(bloco, Table):
            hdr = cabecalho(bloco)
            if hdr[:4] == HEADER_INTRO:
                for row in bloco.rows[1:]:
                    celulas = [c.text.strip() for c in row.cells]
                    if len(celulas) < 4 or not any(celulas):
                        continue
                    linhas_intro.append(
                        {"id": celulas[0], "dimensao": celulas[1], "carta": celulas[2], "definicao": celulas[3]}
                    )
            elif hdr[:4] == HEADER_PRINCIPAL:
                linhas = []
                for row in bloco.rows[1:]:
                    celulas = [c.text.strip() for c in row.cells]
                    if len(celulas) < 4 or not any(celulas):
                        continue
                    linhas.append(
                        {"id": celulas[0], "carta": celulas[1], "definicao": celulas[2], "pergunta": celulas[3]}
                    )
                cartas_por_tabela.append((dimensao_atual, linhas))
            # tabelas com outro formato são ignoradas

    return linhas_intro, cartas_por_tabela


def proximo_id(prefixo, maior_numero_por_prefixo):
    maior_numero_por_prefixo[prefixo] = maior_numero_por_prefixo.get(prefixo, 0) + 1
    return f"{prefixo}{maior_numero_por_prefixo[prefixo]:02d}"


def montar_intro_final(linhas_intro, cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo, avisos):
    resultado = []
    for linha in linhas_intro:
        dimensao = linha["dimensao"]
        cor = cor_por_dimensao.get(dimensao, "#666666")
        prefixo = prefixo_por_dimensao.get(dimensao, "X")
        id_ = linha["id"] or f"{prefixo}00"
        if not linha["id"]:
            avisos.append(f"Carta de abertura nova '{linha['carta']}' recebeu o ID {id_}.")
        resultado.append(
            {
                "id": id_,
                "dimensao": dimensao,
                "cor_hex": cor,
                "carta": linha["carta"],
                "definicao": linha["definicao"],
                "pergunta": "",
            }
        )
    resultado.sort(key=lambda r: ORDEM_DIMENSOES.index(r["dimensao"]) if r["dimensao"] in ORDEM_DIMENSOES else 99)
    return resultado


def montar_principal_final(cartas_por_tabela, cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo, avisos):
    resultado = []
    ids_vistos = set()

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
                id_ = proximo_id(prefixo, maior_numero_por_prefixo)
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

    return resultado


def diff_resumo(nome, cartas_antigas, cartas_novas):
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

    print(f"\n{nome}: {len(novas)} cartas no total.")
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
    cartas_antigas = carregar_csv(CSV_PATH)
    intro_antigas = carregar_csv(CSV_INTRO_PATH)
    cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo = mapa_dimensoes(cartas_antigas, intro_antigas)

    linhas_intro, cartas_por_tabela = extrair_do_docx(docx_path)

    avisos = []
    intro_novas = montar_intro_final(linhas_intro, cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo, avisos)
    cartas_novas = montar_principal_final(
        cartas_por_tabela, cor_por_dimensao, prefixo_por_dimensao, maior_numero_por_prefixo, avisos
    )

    escrever_csv(CSV_INTRO_PATH, intro_novas)
    escrever_csv(CSV_PATH, cartas_novas)

    diff_resumo("Cartas de abertura", intro_antigas, intro_novas)
    diff_resumo("Cartas do baralho", cartas_antigas, cartas_novas)
    if avisos:
        print("\nAvisos:")
        for a in avisos:
            print(f"  - {a}")

    print(f"\nOK — {CSV_INTRO_PATH.name} e {CSV_PATH.name} atualizados. Próximos passos:")
    print("  node scripts/gerar_seed_baralho.mjs   # atualiza sql/002_seed_baralho.sql")
    print("  git diff data/ sql/                   # revisar antes de commitar")


if __name__ == "__main__":
    main()
