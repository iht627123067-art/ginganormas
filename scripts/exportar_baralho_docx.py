#!/usr/bin/env python3
"""Gera um .docx do baralho GINGA a partir do CSV canônico, para revisão/edição da equipe.

Uso: python3 scripts/exportar_baralho_docx.py [saida.docx]
Sem argumento, grava em entregas/baralho_ginga_online.docx

O documento agrupa as cartas por dimensão (uma tabela por dimensão) e traz
instruções no topo sobre como editar sem quebrar a reimportação
(scripts/importar_baralho_docx.py).
"""
import csv
import sys
from pathlib import Path

from docx import Document
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "data" / "baralho_ginga_online.csv"
DEFAULT_OUT = ROOT / "entregas" / "baralho_ginga_online.docx"


def hex_to_rgb(hex_color):
    h = hex_color.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def carregar_cartas():
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def agrupar_por_dimensao(cartas):
    grupos = {}
    ordem = []
    for c in cartas:
        d = c["dimensao"]
        if d not in grupos:
            grupos[d] = []
            ordem.append(d)
        grupos[d].append(c)
    return ordem, grupos


def montar_documento(cartas, out_path):
    ordem, grupos = agrupar_por_dimensao(cartas)

    doc = Document()
    doc.styles["Normal"].font.name = "Calibri"
    doc.styles["Normal"].font.size = Pt(10.5)

    titulo = doc.add_heading("Baralho GINGA — versão para revisão da equipe", level=0)
    titulo.alignment = WD_ALIGN_PARAGRAPH.LEFT

    doc.add_paragraph(
        "Este documento é a versão do baralho GINGA (jogo presencial) para revisão e "
        "ajuste da equipe. Pode editar livremente o texto das colunas Carta, Definição "
        "e Pergunta."
    )
    instrucoes = doc.add_paragraph()
    instrucoes.add_run("Regras para devolver o arquivo sem perder nada na reimportação:\n").bold = True
    for linha in [
        "• Não apague nem edite a coluna ID das cartas existentes (ex.: N01, I03).",
        "• Para remover uma carta, apague a linha inteira da tabela.",
        "• Para sugerir uma carta nova, adicione uma linha na tabela da dimensão "
        "correspondente e deixe a coluna ID em branco — um ID novo é gerado na "
        "reimportação.",
        "• Não é preciso editar mais nenhum outro arquivo: ao devolver este .docx, o "
        "script de importação atualiza sozinho a versão impressa, a versão online e "
        "o banco de dados do jogo.",
    ]:
        doc.add_paragraph(linha, style="List Bullet")

    for dimensao in ordem:
        cartas_dim = grupos[dimensao]
        cor = cartas_dim[0]["cor_hex"]

        h = doc.add_heading(dimensao, level=2)
        for run in h.runs:
            run.font.color.rgb = hex_to_rgb(cor)

        table = doc.add_table(rows=1, cols=4)
        table.style = "Light Grid Accent 1"
        hdr = table.rows[0].cells
        hdr[0].text = "ID"
        hdr[1].text = "Carta"
        hdr[2].text = "Definição"
        hdr[3].text = "Pergunta"

        for c in cartas_dim:
            row = table.add_row().cells
            row[0].text = c["id"]
            row[1].text = c["carta"]
            row[2].text = c["definicao"]
            row[3].text = c["pergunta"]

        doc.add_paragraph()

    out_path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(out_path)


def main():
    out_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_OUT
    cartas = carregar_cartas()
    montar_documento(cartas, out_path)
    print(f"OK — {len(cartas)} cartas exportadas para {out_path}")


if __name__ == "__main__":
    main()
