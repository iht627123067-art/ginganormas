# Ginga Normas (Textual Lab)

O **Ginga Normas** é um laboratório textual digital (Textual Lab) projetado para pesquisadores analisarem dados textuais de conceitos extraídos de livros, legislações e artigos científicos. O sistema auxilia na ingestão de corpus acadêmicos, organização de termos, aplicação de pipelines editoriais de Inteligência Artificial e geração de relatórios acadêmicos formatados para impressão em PDF.

## 🚀 Funcionalidades Principais

- **Ingestão de Corpus:** Upload e organização de trechos de textos acadêmicos, leis e artigos com metadados (autor, ano, tipo, referência).
- **Gestão de Termos e Conceitos:** Mapeamento de múltiplos conceitos associados aos mesmos termos jurídicos ou acadêmicos.
- **Marco Conceitual:** Navegação interativa por termos-chave e visualizações inteligentes de dados textuais.
- **Pipeline de IA Editorial:** Agentes de IA dedicados para normalizar textos, revisar português acadêmico, traduzir e sugerir notas de rodapé com referências.
- **Leitor e Editor Integrado:** Visualização e ajustes do material normalizado antes da exportação.
- **Exportação Acadêmica:** Geração de documento final em HTML estruturado com suporte a formatação para impressão em PDF.

---

## 🛠️ Tecnologias Utilizadas

O projeto é construído em cima de uma stack moderna e de alta performance:

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes & Animações:** [Framer Motion](https://www.framer.com/motion/) & [Lucide React](https://lucide.dev/)
- **Gráficos & Métricas:** [Recharts](https://recharts.org/)

---

## 📂 Estrutura do Projeto

```text
ginganormas/
├── src/
│   ├── app/                    # Páginas e rotas do Next.js (App Router)
│   │   ├── api/                # Endpoints backend (Corpus, Termos, IA)
│   │   ├── marco-conceitual/   # Painel principal do marco conceitual
│   │   ├── legislacao/         # Mapeamento e visualização de leis
│   │   ├── recomendacoes/      # Painel de recomendações geradas
│   │   └── layout.tsx & page.tsx
│   ├── components/             # Componentes reutilizáveis da interface
│   └── lib/                    # Utilitários, conexões de banco e clientes de IA
├── data/                       # Arquivos e fontes de dados locais
├── docs/                       # Documentações do projeto
├── scripts/                    # Scripts utilitários de ingestão ou automação
├── package.json                # Dependências e scripts npm
└── tsconfig.json               # Configurações do TypeScript
```

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (v18 ou superior recomendado)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1. Clone o repositório em sua máquina:
   ```bash
   git clone <url-do-seu-repositorio>
   cd ginganormas
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente (se aplicável):
   Crie um arquivo `.env.local` na raiz do projeto e configure suas chaves de API e banco de dados:
   ```env
   DATABASE_URL=seu-banco-de-dados-postgres
   OPENAI_API_KEY=sua-chave-de-api-openai
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o aplicativo em execução.

---

## 📄 Licença

Este projeto é de uso privado e acadêmico. Para mais detalhes, verifique o arquivo de licença ou os termos com o pesquisador responsável.
