Segue um backlog técnico organizado em épicos, user stories e tasks, já pensando em **Supabase + Next.js (App Router) + n8n + APIs de IA + pgvector**. [supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

***

## Épico 1 – Infraestrutura básica (Supabase + Next.js)

### User Story 1.1 – Como pesquisador, quero autenticar e acessar o sistema com segurança

- Tasks:
  - Criar projeto no Supabase (região próxima ao Brasil/Europa, conforme público-alvo). [iflair](https://www.iflair.com/the-ultimate-integration-scaling-next-js-with-a-supabase-backend/)
  - Ativar autenticação por e‑mail/senha e, futuramente, provedores (Google/ORCID, etc.). [supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
  - Configurar Next.js com template `with-supabase` (ou setup manual com `@supabase/supabase-js` e `@supabase/ssr`). [iflair](https://www.iflair.com/the-ultimate-integration-scaling-next-js-with-a-supabase-backend/)
  - Implementar páginas `/login`, `/register` e lógica de sessão server-side (App Router + cookies). [supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
  - Definir roles básicos: admin, pesquisador, leitor (pode ser em tabela `profiles`).

### User Story 1.2 – Como pesquisador, quero que os dados sejam armazenados em um backend robusto

- Tasks:
  - Criar schema no Supabase com tabelas: `documento`, `autor`, `documento_autor`, `trecho`, `termo`, `conceito`, `termo_conceito`, `indexacao_trecho_conceito`, `execucao_agente`, `nota_rodape`, `versao_html` (conforme ER lógico). [developers.openai](https://developers.openai.com/cookbook/examples/vector_databases/supabase/semantic-search)
  - Definir chaves primárias/estrangeiras e índices (por documento, conceito, termo, datas). [supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
  - Configurar RLS (Row Level Security) permitindo leitura/escrita apenas para usuários autorizados e leitura restrita para “leitor”. [iflair](https://www.iflair.com/the-ultimate-integration-scaling-next-js-with-a-supabase-backend/)
  - Criar buckets de Storage no Supabase para arquivos originais (PDF, DOCX) e possíveis anexos. [supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

***

## Épico 2 – Ingestão de documentos e parsing

### User Story 2.1 – Como pesquisador, quero subir documentos (PDF, DOCX, etc.) para o sistema

- Tasks:
  - Implementar UI em Next.js para upload de arquivos (página `/importar`).
  - Integrar upload com Supabase Storage (bucket `documentos`), salvando metadados iniciais em `documento`. [supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
  - Criar endpoint (route handler em `/api/documentos/upload`) que:
    - registra `documento` com status `pendente`,
    - dispara um webhook para n8n com ID do documento. [colonelserver](https://colonelserver.com/blog/what-is-n8n-workflow-automation-for-developers-ai/)

### User Story 2.2 – Como pesquisador, quero que os documentos sejam convertidos em texto e trechos estruturados

- Tasks (n8n):
  - Criar workflow n8n com:
    - Trigger Webhook (recebe `id_documento`). [reddit](https://www.reddit.com/r/n8n/comments/1i9kixq/advice_on_using_n8n_as_an_api_endpoint_for_ai/)
    - Node HTTP → baixar arquivo do Supabase Storage.
    - Node de parsing (se necessário, chamar serviço externo/container com Python + pdfplumber/docx + extração de seções).
    - Normalizar texto (remover cabeçalhos, rodapés, quebras excessivas). [tigerdata](https://www.tigerdata.com/blog/document-loading-parsing-and-cleaning-in-ai-applications)
  - Dividir o documento em `trecho`:
    - regra por parágrafos, seções ou artigos (no parser Python),
    - enviar trechos para Supabase via REST ou `supabase-js` no n8n. [colonelserver](https://colonelserver.com/blog/what-is-n8n-workflow-automation-for-developers-ai/)
  - Atualizar `status_processamento` do `documento` para `processado` ou `erro`. [supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

***

## Épico 3 – Modelagem de termos, conceitos e indexação

### User Story 3.1 – Como pesquisador, quero cadastrar e gerir termos e conceitos

- Tasks:
  - Criar CRUD de `conceito` e `termo` em Next.js (páginas `/conceitos` e `/termos`).
  - Implementar pesquisas com filtro por `area_tematica`, idioma, texto parcial (Supabase full-text search). [supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
  - Criar UI para vincular `termo` ↔ `conceito` (tabela `termo_conceito`), exibindo `tipo_relacao` e `peso_confianca`.

### User Story 3.2 – Como pesquisador, quero que trechos sejam indexados por conceitos

- Tasks:
  - Implementar visual de trechos (tabela e leitor lateral) com campo de seleção de conceito para associação manual.
  - Criar endpoint `/api/indexacao/manual` que recebe `id_trecho` + `id_conceito` e grava em `indexacao_trecho_conceito`.
  - Planejar indexação semântica:
    - habilitar extensão `pgvector` no Supabase. [swizec](https://swizec.com/blog/similarity-search-with-pgvector-and-supabase/)
    - criar tabela para embeddings de trechos (`trecho_embedding` ou coluna `embedding` em `trecho`). [developers.openai](https://developers.openai.com/cookbook/examples/vector_databases/supabase/semantic-search)
    - criar função `match_trechos_por_conceito` para pesquisa por similaridade (para futuras automações de indexação). [developers.openai](https://developers.openai.com/cookbook/examples/vector_databases/supabase/semantic-search)

***

## Épico 4 – Visualizações tipo “Tableau textual”

### User Story 4.1 – Como pesquisador, quero dashboards para explorar conceitos, termos e documentos

- Tasks:
  - Definir endpoints em Next.js (server components ou APIs) para fornecer dados agregados:
    - contagem de documentos por `tipo_documento` e `area_tematica`,
    - top termos por frequência,
    - número de trechos por conceito e por ano. [tableau](https://www.tableau.com)
  - Implementar dashboard em `/dashboard` com:
    - gráfico de barras (conceitos × número de trechos),
    - treemap (tema → conceito → quantidade),
    - timeline (ano × conceito × intensidade). [displayr](https://www.displayr.com/text-analytics-visualization/)
  - Usar biblioteca de gráficos (por ex.: Recharts, ECharts ou Vega-Lite) integrada ao Next.js. [tableau](https://www.tableau.com)

### User Story 4.2 – Como pesquisador, quero visualizar relações entre termos e conceitos (grafos)

- Tasks:
  - Criar endpoint que retorna grafo: nós (termos, conceitos), arestas (coocorrência, termo_conceito). [infranodus](https://infranodus.com/docs/data-visualization-tools)
  - Implementar componente de grafo (Cytoscape.js, D3, ou outra lib) para:
    - clicar em um nó e aplicar filtro global (trechos, documentos, dashboard). [displayr](https://www.displayr.com/text-analytics-visualization/)
  - Sincronizar filtros entre grafo, tabela de trechos e outros gráficos (estado global via Zustand/Redux).

### User Story 4.3 – Como usuário, quero ter um leitor moderno de textos

- Tasks:
  - Implementar view de leitura `/leitor/:id_documento` com:
    - painel de trechos à esquerda,
    - texto à direita, com highlight de termos e conceitos (cores diferentes e popover com definição). [tableau](https://www.tableau.com/blog/beyond-visuals-elevating-text-first-class-citizen-dashboard-design)
  - Criar filtros laterais (tipo facet) por tema, conceito, termo, ano, idioma. [infranodus](https://infranodus.com/docs/data-visualization-tools)
  - Implementar tema claro/escuro e configurações básicas de legibilidade (tamanho de fonte, largura de coluna). [tableau](https://www.tableau.com/blog/beyond-visuals-elevating-text-first-class-citizen-dashboard-design)

***

## Épico 5 – Pipeline de IA (revisão, correção, tradução, notas)

### User Story 5.1 – Como pesquisador, quero enviar trechos ou documentos para revisão automática

- Tasks (Next.js):
  - Na interface de leitor/trechos, permitir seleção de:
    - documento completo ou
    - conjunto de trechos filtrados.
  - Criar endpoint `/api/ia/revisao` que:
    - recebe lista de `id_trecho`,
    - cria um “documento de trabalho” (pode ser uma tabela própria ou reuso de `versao_html` em estado “rascunho”),
    - chama webhook do n8n com payload (ids + tipo de pipeline desejado). [reddit](https://www.reddit.com/r/n8n/comments/1i9kixq/advice_on_using_n8n_as_an_api_endpoint_for_ai/)

- Tasks (n8n):
  - Criar workflow `pipeline-revisao`:
    - Trigger Webhook (recebe lista de `id_trecho` e opções). [colonelserver](https://colonelserver.com/blog/what-is-n8n-workflow-automation-for-developers-ai/)
    - Node Supabase para buscar textos dos trechos.
    - Chamar API de IA (OpenAI, Gemini, etc.) para:
      - revisão textual (prompt específico),
      - correção de português,
      - retorno do texto revisado. [kestra](https://kestra.io/blueprints/agent-text-summarizer)
    - Gravar resultados em `execucao_agente` e, se for o caso, atualizar campos de texto (ou criar nova versão em tabela auxiliar). [tigerdata](https://www.tigerdata.com/blog/document-loading-parsing-and-cleaning-in-ai-applications)
    - Retornar para o endpoint um identificador de `execucao_agente`.

### User Story 5.2 – Como pesquisador, quero traduzir trechos entre idiomas

- Tasks:
  - Extender workflow `pipeline-revisao` ou criar `pipeline-traducao`:
    - incluir nó de tradução com API de IA, respeitando termos técnicos. [kestra](https://kestra.io/blueprints/agent-text-summarizer)
    - atualizar `idioma_atual` do trecho (ou manter histórico em outra tabela).
  - Na UI, expor opções de idioma de destino e mostrar preview lado a lado (original vs traduzido).

### User Story 5.3 – Como pesquisador, quero gerar notas de rodapé e comentários automáticos

- Tasks:
  - No n8n, criar workflow `pipeline-notas-rodape`:
    - entrada: `id_trecho` + instruções (tipo de nota desejada),
    - chamada de API de IA com prompt para produzir notas em formato JSON (posição aproximada, texto, tipo_nota). [tigerdata](https://www.tigerdata.com/blog/document-loading-parsing-and-cleaning-in-ai-applications)
    - gravar em `nota_rodape` vinculando a `execucao_agente` e `trecho`.
  - Na UI de leitura, exibir ícones ou marcadores no texto que abrem as notas em popover ou painel lateral.

***

## Épico 6 – Geração, edição e exportação de HTML/PDF

### User Story 6.1 – Como pesquisador, quero montar um documento HTML com base em trechos selecionados

- Tasks:
  - Criar endpoint `/api/documentos-trabalho/criar`:
    - recebe lista de `id_trecho` em determinada ordem,
    - monta HTML inicial (seções, parágrafos, marcação para notas). [tigerdata](https://www.tigerdata.com/blog/document-loading-parsing-and-cleaning-in-ai-applications)
    - grava em `versao_html` com `pode_editar = true`.
  - Implementar editor WYSIWYG em Next.js (por ex.: TipTap, Lexical ou outro):
    - carregar `html_conteudo`,
    - permitir edição, inserção de citações, inclusão/remoção de notas. [tigerdata](https://www.tigerdata.com/blog/document-loading-parsing-and-cleaning-in-ai-applications)

### User Story 6.2 – Como pesquisador, quero exportar o resultado final em HTML e PDF

- Tasks:
  - Criar botão “Exportar HTML” que faz download do `html_conteudo`.
  - Criar endpoint `/api/export/pdf` que:
    - recebe `id_versao_html`,
    - usa serviço (por ex.: Playwright/Puppeteer em um microserviço, ou API externa) para converter em PDF com o CSS do tema. [tigerdata](https://www.tigerdata.com/blog/document-loading-parsing-and-cleaning-in-ai-applications)
    - retorna o PDF para o navegador ou grava em Storage e disponibiliza link.
  - Registrar em `versao_html` quando uma versão é “congelada” (final) e bloquear edição, criando nova versão em caso de alterações.

***

## Épico 7 – Governança, logs e auditoria

### User Story 7.1 – Como pesquisador, quero saber qual IA e pipeline foram usados em cada transformação

- Tasks:
  - Garantir que todos os workflows n8n gravem:
    - `tipo_agente`, `modelo_utilizado`, parâmetros relevantes, hash de entrada, texto de saída em `execucao_agente`. [kestra](https://kestra.io/blueprints/agent-text-summarizer)
  - Criar UI de histórico em `/historico/execucoes`:
    - lista por data, usuário, tipo de pipeline, documento/trecho afetado.
  - Criar tela de detalhes da execução com diffs entre texto original e texto processado.

### User Story 7.2 – Como administrador, quero controlar acesso e monitorar uso de recursos de IA

- Tasks:
  - Adicionar contadores de número de tokens/execuções de IA por usuário (pode ser tabela `uso_ia`).
  - Implementar limites por usuário (por exemplo, máximo de execuções/dia) no backend ou via n8n (condicionais).
  - Configurar logs e alertas básicos no n8n e no Next.js (falhas de workflows, erros de API de IA). [reddit](https://www.reddit.com/r/n8n/comments/1i9kixq/advice_on_using_n8n_as_an_api_endpoint_for_ai/)

