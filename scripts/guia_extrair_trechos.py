"""Extrai, do texto compilado do Planalto, os dispositivos usados no
Guia sobre Normativos para Servidores que Querem Inovar.

Uso:
    python3 -I scripts/guia_extrair_trechos.py <pasta_com_htm_baixados>

A pasta deve conter os arquivos <chave>.htm listados em FONTES (baixados com
curl a partir de cada URL). Texto revogado (<strike>) é descartado e as
anotações de alteração ("Incluído pela...", "Redação dada pela...") viram
um campo separado, para o leitor ver o histórico sem poluir o texto vigente.

Saída: src/data/guia/trechos.json
"""
import html
import json
import os
import re
import sys
from datetime import date

FONTES = {
    "cf": ("https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
           {"218": None, "219": None, "219-A": None, "219-B": None}),
    "l10973": ("https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l10.973.htm",
               {"2": None, "3": None, "4": None, "9": None, "19": None, "20": None, "20-A": None}),
    "d9283": ("https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/decreto/d9283.htm",
              {"2": None, "27": None, "28": None, "29": None, "30": None, "31": None,
               "32": None, "33": None, "35": None}),
    "lindb": ("https://www.planalto.gov.br/ccivil_03/decreto-lei/del4657.htm",
              {"20": None, "21": None, "22": None, "23": None, "24": None, "26": None,
               "27": None, "28": None, "29": None, "30": None}),
    "d9830": ("https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d9830.htm",
              {"2": None, "3": None, "8": None, "10": None, "12": None, "13": None, "19": None, "20": None, "21": None, "22": None, "23": None, "24": None}),
    "d9739": ("https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d9739.htm",
              {"20": None, "21": None, "22": None, "23": None, "24": None}),
    "d10534": ("https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10534.htm",
               {"1": None, "2": None, "3": None}),
    "l14129": ("https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm",
               {"44": None, "45": None}),
    # Artigos muito longos: só os incisos úteis (prefixos do parágrafo); o
    # caput é sempre mantido.
    "l14133": ("https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm",
               {"6": ["XLII -"], "11": None, "32": None, "75": ["V -"], "81": None, "169": None}),
    "d12002": ("https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/decreto/d12002.htm",
               {"3": None, "11": None, "27": None, "29": None, "30": None, "32": None, "34": None, "58": None}),
    "lcp182": ("https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp182.htm",
               {"11": None, "12": None, "13": None, "14": None, "15": None}),
}

NOTA = re.compile(
    r"\((?:\s*)(Inclu[íi]d[oa]|Reda[çc][ãa]o dada|Reda[çc][ãa]o pela|Vide|Vig[êe]ncia|Regulamento|Promulga[çc][ãa]o"
    r"|Produ[çc][ãa]o de efeito|Revogad[oa]|Renumerad[oa]|Acrescid[oa])[^()]*(?:\([^()]*\)[^()]*)*\)",
    re.I,
)
DISPOSITIVO = re.compile(r"^(Art\.|§|Par[áa]grafo [úu]nico|[IVXLC]+\s*[-–]|[a-z]\))")
ART = re.compile(r"^Art\.\s*(\d+)\s*[º°o]?\s*(-\s*[A-Z])?\s*[.\-–]?")


def paragrafos(caminho):
    bruto = open(caminho, "rb").read().decode("cp1252", errors="replace")
    bruto = re.sub(r"<strike\b.*?</strike>", " ", bruto, flags=re.S | re.I)
    bruto = re.sub(r"<(script|style)\b.*?</\1>", " ", bruto, flags=re.S | re.I)
    for bloco in re.split(r"<p\b[^>]*>", bruto, flags=re.I):
        texto = re.sub(r"<[^>]+>", " ", bloco)
        texto = html.unescape(texto).replace("\xa0", " ")
        texto = re.sub(r"\s+", " ", texto).strip()
        if texto:
            yield texto


CABECALHO = re.compile(r"\s+(CAP[ÍI]TULO|T[ÍI]TULO|Se[çc][ãa]o|SE[ÇC][ÃA]O)\s+[IVXLC]+\b.*$")


def limpar(texto):
    texto = CABECALHO.sub("", texto)
    notas = [m.group(0).strip("() ").strip() for m in NOTA.finditer(texto)]
    texto = NOTA.sub("", texto)
    texto = re.sub(r"\s+([,.;:])", r"\1", re.sub(r"\s+", " ", texto)).strip()
    return texto, notas


def chave_art(texto):
    m = ART.match(texto)
    if not m:
        return None
    return m.group(1) + (("-" + m.group(2).replace("-", "").strip()) if m.group(2) else "")


def identificar(texto, ctx):
    """Id hierárquico estável do dispositivo: caput, p1, pu, p1.I, I, I.a"""
    if texto.startswith("Art."):
        ctx.update(par="", inc="")
        return "caput"
    m = re.match(r"^§\s*(\d+)\s*[º°o]?\s*(?:-\s*([A-Z]))?", texto)
    if m:
        ctx.update(par="p" + m.group(1) + ("-" + m.group(2) if m.group(2) else ""), inc="")
        return ctx["par"]
    if re.match(r"^Par[áa]grafo [úu]nico", texto):
        ctx.update(par="pu", inc="")
        return "pu"
    m = re.match(r"^([IVXLC]+(?:-[A-Z])?)\s*[-–]", texto)
    if m:
        ctx["inc"] = (ctx["par"] + "." if ctx["par"] else "") + m.group(1)
        return ctx["inc"]
    m = re.match(r"^([a-z])\)", texto)
    if m:
        return (ctx["inc"] or ctx["par"] or "caput") + "." + m.group(1)
    return ""


def extrair(caminho, seletor):
    artigos, atual, ctx = {}, None, {}
    for p in paragrafos(caminho):
        k = chave_art(p)
        if k is not None:
            # A primeira ocorrência vigente vence (exceto texto de alteração
            # entre aspas, que nunca começa com "Art.")
            atual = k if k in seletor and k not in artigos else None
            if atual:
                artigos[atual] = []
        if atual is None:
            continue
        texto, notas = limpar(p)
        # Só dispositivos: descarta títulos de seção, assinaturas e rodapés
        if not texto or not DISPOSITIVO.match(texto):
            continue
        filtro = seletor[atual]
        if filtro and artigos[atual] and not any(texto.startswith(f) for f in filtro):
            continue
        artigos[atual].append({"id": identificar(texto, ctx), "texto": texto, "notas": notas})
    return artigos


# O Anexo do Decreto nº 12.002/2024 é um questionário numerado (1., 1.1.,
# 2.3.1.), e não artigos. Extraímos os blocos úteis para quem propõe norma
# para inovar, com ids "q1", "q1.1", "q2.3.1".
ANEXO_D12002 = {"1", "2", "6"}
TITULOS_ANEXO = ["Diagnóstico", "Alternativas", "Competência legislativa", "Necessidade de edição de lei",
                 "Reserva legal", "Norma temporária", "Medida provisória", "Oportunidade de edição do ato normativo"]


def extrair_anexo_d12002(caminho):
    bruto = open(caminho, "rb").read().decode("cp1252", errors="replace")
    bruto = re.sub(r"<strike\b.*?</strike>", " ", bruto, flags=re.S | re.I)
    texto = html.unescape(re.sub(r"<[^>]+>", " ", bruto)).replace("\xa0", " ")
    texto = re.sub(r"\s+", " ", texto)
    texto = texto[texto.rfind("ANEXO QUESTÕES"):]
    itens = []
    for m in re.finditer(r"(?:(?<=\s)|^)(\d+(?:\.\d+)*)\. (.+?)(?=\s\d+(?:\.\d+)*\. |$)", texto):
        num, corpo = m.group(1), m.group(2).strip()
        for t in TITULOS_ANEXO:
            if corpo.endswith(" " + t):
                corpo = corpo[: -len(t)].strip()
        if num.split(".")[0] in ANEXO_D12002:
            itens.append({"id": "q" + num, "texto": f"{num}. {corpo}", "notas": []})
    return itens


def main():
    pasta = sys.argv[1]
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    saida = {"obtidoEm": date.today().isoformat(), "normas": {}}
    for chave, (url, seletor) in FONTES.items():
        artigos = extrair(os.path.join(pasta, chave + ".htm"), seletor)
        faltando = [a for a in seletor if a not in artigos]
        if faltando:
            print(f"! {chave}: artigos não encontrados: {faltando}", file=sys.stderr)
        if chave == "d12002":
            artigos["anexo"] = extrair_anexo_d12002(os.path.join(pasta, chave + ".htm"))
        saida["normas"][chave] = {"url": url, "artigos": artigos}
        print(f"{chave}: {len(artigos)} artigos, {sum(len(v) for v in artigos.values())} dispositivos")
    destino = os.path.join(raiz, "src", "data", "guia", "trechos.json")
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    with open(destino, "w", encoding="utf-8") as f:
        json.dump(saida, f, ensure_ascii=False, indent=1)
    print("→", destino)


if __name__ == "__main__":
    main()
