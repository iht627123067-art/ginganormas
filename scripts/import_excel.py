import pandas as pd
import json
import numpy as np

excel_path = '/Users/thiagobvilar/Developer/sandbox/ginga/legislacao_brasil/repositorio_inovacao_brasil_v7.xlsx'
json_path = 'data/legislacao.json'

def clean_val(x):
    if pd.isna(x): return ""
    # if it's a date object, format it to DD/MM/YYYY
    if hasattr(x, 'strftime'): return x.strftime('%d/%m/%Y')
    return str(x).strip()

print("Lendo a aba 'Repositório'...")
df_repo = pd.read_excel(excel_path, sheet_name='Repositório', skiprows=3)
df_repo = df_repo.dropna(how='all').dropna(axis=1, how='all')

# Rename to standard keys
cols = ['id', 'camada', 'uf', 'ente', 'tipo', 'numero', 'data', 'tematica', 'ementa', 'trecho', 'url', 'status', 'tags']
# Sometimes pandas might read extra unnamed columns, let's map by position
df_repo = df_repo.iloc[:, :len(cols)]
df_repo.columns = cols

instrumentos = []
for _, row in df_repo.iterrows():
    # Only append if we have an ID
    if not clean_val(row['id']): continue
    
    instrumentos.append({
        "id": clean_val(row['id']),
        "camada": clean_val(row['camada']),
        "uf": clean_val(row['uf']),
        "ente": clean_val(row['ente']),
        "tipo": clean_val(row['tipo']),
        "numero": clean_val(row['numero']),
        "data": clean_val(row['data']),
        "tematica": clean_val(row['tematica']),
        "ementa": clean_val(row['ementa']),
        "trecho": clean_val(row['trecho']),
        "url": clean_val(row['url']),
        "status": clean_val(row['status']),
        "tags": clean_val(row['tags'])
    })

print("Lendo a aba 'Glossário'...")
df_gloss = pd.read_excel(excel_path, sheet_name='Glossário', skiprows=1)
df_gloss = df_gloss.dropna(how='all').dropna(axis=1, how='all')

glossario = []
for _, row in df_gloss.iterrows():
    sigla = clean_val(row.iloc[0])
    if not sigla: continue
    
    glossario.append({
        "sigla": sigla,
        "definicao": clean_val(row.iloc[1]) if len(row) > 1 else "",
        "instrumento": clean_val(row.iloc[2]) if len(row) > 2 else "",
        "camada": clean_val(row.iloc[3]) if len(row) > 3 else ""
    })

output = {
    "instrumentos": instrumentos,
    "glossario": glossario
}

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Salvo com sucesso em {json_path}. Instrumentos: {len(instrumentos)}, Glossário: {len(glossario)}")
