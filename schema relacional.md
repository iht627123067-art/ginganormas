Segue o diagrama de entidades em texto, pronto para virar um ERD em qualquer ferramenta (Crow’s Foot, UML, dbdiagram.io, Mermaid, etc.). [atlassian](https://www.atlassian.com/work-management/project-management/entity-relationship-diagram)

***
## Entidades principais
### DOCUMENTO
- **documento**
  - id_documento (PK)
  - tipo_documento
  - titulo
  - subtitulo
  - ano_publicacao
  - fonte
  - idioma_original
  - jurisdicao
  - caminho_arquivo_original
  - status_processamento
  - hash_conteudo

- **autor**
  - id_autor (PK)
  - nome
  - afiliacao
  - orcid (opcional)

- **documento_autor**  
  (tabela de ligação N:N)
  - id_documento_autor (PK)
  - id_documento (FK → documento)
  - id_autor (FK → autor)
  - ordem_autoria

***
### ESTRUTURA TEXTUAL
- **trecho**
  - id_trecho (PK)
  - id_documento (FK → documento)
  - tipo_trecho
  - identificador_estrutural
  - texto_original
  - posicao_inicial
  - posicao_final
  - idioma_atual

Relacionamentos:
- documento 1 — N trecho

***
### TERMINOLOGIA E CONCEITOS
- **termo**
  - id_termo (PK)
  - texto_termo
  - lemma
  - idioma

- **conceito**
  - id_conceito (PK)
  - nome_conceito
  - descricao_conceito
  - area_tematica
  - notas_metodologicas

- **termo_conceito**  
  (relação N:N entre termo e conceito)
  - id_termo_conceito (PK)
  - id_termo (FK → termo)
  - id_conceito (FK → conceito)
  - tipo_relacao
  - peso_confianca
  - fonte_definicao

- **indexacao_trecho_conceito**  
  (relação N:N entre trecho e conceito)
  - id_indexacao (PK)
  - id_trecho (FK → trecho)
  - id_conceito (FK → conceito)
  - relevancia
  - metodo_indexacao
  - data_indexacao

Relacionamentos:
- termo N — N conceito (via termo_conceito)
- trecho N — N conceito (via indexacao_trecho_conceito)

***
### PROCESSAMENTO POR IA
- **execucao_agente**
  - id_execucao (PK)
  - id_documento (FK → documento, opcional)
  - id_trecho (FK → trecho, opcional)
  - tipo_agente        // revisao_textual, correcao_ortografica, traducao, notas_rodape
  - modelo_utilizado
  - idioma_entrada
  - idioma_saida
  - parametros (JSON)
  - texto_entrada_hash
  - texto_saida
  - data_execucao
  - usuario_solicitante
  - status

- **nota_rodape**
  - id_nota (PK)
  - id_execucao (FK → execucao_agente)
  - id_trecho (FK → trecho)
  - posicao_aproximada
  - texto_nota
  - tipo_nota          // doutrinária, histórica, jurisprudencial

Relacionamentos:
- documento 1 — N execucao_agente (quando nível de documento)
- trecho 1 — N execucao_agente (quando nível de trecho)
- execucao_agente 1 — N nota_rodape
- trecho 1 — N nota_rodape

***
### SAÍDAS HTML E VERSÕES
- **versao_html**
  - id_versao_html (PK)
  - id_documento (FK → documento)
  - id_execucao (FK → execucao_agente)
  - html_conteudo
  - css_tema
  - data_criacao
  - pode_editar
  - origem            // auto, manual, hibrido

Relacionamentos:
- documento 1 — N versao_html
- execucao_agente 1 — N versao_html

***
## Resumo dos relacionamentos (cardinalidades)
- documento 1 — N trecho  
- documento N — N autor (via documento_autor)  
- termo N — N conceito (via termo_conceito)  
- trecho N — N conceito (via indexacao_trecho_conceito)  
- documento 1 — N execucao_agente  
- trecho 1 — N execucao_agente  
- execucao_agente 1 — N nota_rodape  
- trecho 1 — N nota_rodape  
- documento 1 — N versao_html  
- execucao_agente 1 — N versao_html  

