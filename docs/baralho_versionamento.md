# Versionamento do baralho GINGA

Fonte canônica: `data/baralho_ginga_online.csv` (neste repo, versionada em git).

## Onde o baralho aparece

- **Impresso** — `diagramador/casos/jogoginga/dados/baralho_ginga_online.csv`
  é um *symlink* para o CSV canônico. Editar o canônico já reflete aqui,
  nenhum passo extra.
- **Online (Power Apps)** — `sandbox/ginga/jogoginga/online/baralho_ginga_online.csv`
  também é symlink para o mesmo CSV canônico.
  - `baralho_ginga_para_grade.xlsx` / `.tsv` e `BaralhoGinga_import.xlsx` nessa
    mesma pasta **não** são regenerados automaticamente: os dois primeiros
    carregam colunas de estado de sessão (`status`, `mesa`) que não devem ser
    sobrescritas. Se o conteúdo do baralho mudar, reexporte-os manualmente
    preservando essas colunas.
- **Banco de dados (MVP Next.js)** — `sql/002_seed_baralho.sql`, gerado a partir
  do CSV canônico por `node scripts/gerar_seed_baralho.mjs`.

## Fluxo: gerar uma versão para a equipe revisar

```
python3 scripts/exportar_baralho_docx.py
```

Gera `entregas/baralho_ginga_online.docx`: uma tabela por dimensão, com
instruções de edição no topo. Envie esse arquivo para a equipe (Word/Teams).

## Fluxo: reimportar os ajustes da equipe

Quando o `.docx` editado voltar:

```
python3 scripts/importar_baralho_docx.py caminho/do/baralho_editado.docx
node scripts/gerar_seed_baralho.mjs
git diff data/ sql/
```

O script de importação casa as cartas pelo ID (não apagar/editar a coluna ID
de cartas existentes; deixar em branco para cartas novas; apagar a linha para
remover uma carta) e reescreve `data/baralho_ginga_online.csv`. As cópias
impressa e online já enxergam a mudança via symlink — só o seed SQL precisa
ser regenerado.

Revise o `git diff`, comite, e marque a versão:

```
git add data/ sql/
git commit -m "baralho: ajustes da equipe (rodada X)"
git tag -a baralho-vX -m "descrição da versão"
```
