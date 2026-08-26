# Versionamento do baralho GINGA

Fontes canônicas (neste repo, versionadas em git):

- `data/baralho_ginga_online.csv` — as 50 cartas de jogo (10 por dimensão),
  usadas no sorteio da roda online.
- `data/baralho_ginga_dimensoes_intro.csv` — as 5 cartas de abertura (uma por
  dimensão, IDs `G00`/`I00`/`N00`/`C00`/`A00`), que só apresentam a dimensão.
  **Não** entram no banco/sorteio online — servem para o baralho impresso e
  para a leitura da equipe.

Ordem oficial das dimensões, sempre a mesma em qualquer lugar que o baralho
aparece: **Governança, Incentivos, Normas, Gestão de capacidades, Ambiência.**

## Onde o baralho aparece

- **Impresso** — `diagramador/casos/jogoginga/dados/baralho_ginga_online.csv`
  e `.../dados/baralho_ginga_dimensoes_intro.csv` são *symlinks* para os CSVs
  canônicos. Editar o canônico já reflete aqui, nenhum passo extra.
- **Online (Power Apps)** — `sandbox/ginga/jogoginga/online/baralho_ginga_online.csv`
  também é symlink para o CSV principal (não recebe as cartas de abertura,
  que não fazem sentido no sorteio da mesa).
  - `baralho_ginga_para_grade.xlsx` / `.tsv` e `BaralhoGinga_import.xlsx` nessa
    mesma pasta **não** são regenerados automaticamente: os dois primeiros
    carregam colunas de estado de sessão (`status`, `mesa`) que não devem ser
    sobrescritas. Se o conteúdo do baralho mudar, reexporte-os manualmente
    preservando essas colunas.
- **Banco de dados (MVP Next.js)** — `sql/002_seed_baralho.sql`, gerado a partir
  do CSV principal (não das cartas de abertura) por
  `node scripts/gerar_seed_baralho.mjs`. `src/lib/jogo/tipos.ts` também define
  `DIMENSOES` na mesma ordem oficial — se a ordem das dimensões mudar de novo,
  atualizar os dois lugares.

## Fluxo: gerar uma versão para a equipe revisar

```
python3 scripts/exportar_baralho_docx.py
```

Gera `entregas/baralho_ginga_online.docx`: a tabela das 5 cartas de abertura,
seguida de uma tabela por dimensão com as 10 cartas de jogo, com instruções de
edição no topo. Envie esse arquivo para a equipe (Word/Teams).

## Fluxo: reimportar os ajustes da equipe

Quando o `.docx` editado voltar:

```
python3 scripts/importar_baralho_docx.py caminho/do/baralho_editado.docx
node scripts/gerar_seed_baralho.mjs
git diff data/ sql/
```

O script de importação casa as cartas pelo ID (não apagar/editar a coluna ID
de cartas existentes; deixar em branco para cartas novas; apagar a linha para
remover uma carta) e reescreve `data/baralho_ginga_online.csv` e
`data/baralho_ginga_dimensoes_intro.csv`. As cópias impressa e online já
enxergam a mudança via symlink — só o seed SQL precisa ser regenerado.

Revise o `git diff`, comite, e marque a versão:

```
git add data/ sql/
git commit -m "baralho: ajustes da equipe (rodada X)"
git tag -a baralho-vX -m "descrição da versão"
```
