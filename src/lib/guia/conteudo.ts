// Guia sobre Normativos para Servidores que Querem Inovar (GINGA)
//
// Aprofunda as quatro figuras do livreto (ginga/livreto/figura_marcos_legais)
// para o público inicial de servidores públicos federais. O texto legal NÃO
// é escrito aqui: os trechos vêm literalmente do Planalto, extraídos por
// scripts/guia_extrair_trechos.py para src/data/guia/trechos.json. Este
// arquivo só aponta para eles (fonte + artigo + ids dos dispositivos) e
// acrescenta as notas em linguagem simples.

import trechosJson from "@/data/guia/trechos.json";

// ─────────────────────────── texto legal ───────────────────────────

export interface Dispositivo {
  id: string;
  texto: string;
  notas: string[];
}

type TrechosArquivo = {
  obtidoEm: string;
  normas: Record<string, { url: string; artigos: Record<string, Dispositivo[]> }>;
};

const TRECHOS = trechosJson as TrechosArquivo;

export type Fonte =
  | "cf" | "l10973" | "d9283" | "lindb" | "d9830" | "d9739"
  | "d10534" | "l14129" | "l14133" | "lcp182" | "d12002";

export const TEXTO_OBTIDO_EM = TRECHOS.obtidoEm;

export function artigo(fonte: Fonte, art: string): Dispositivo[] {
  return TRECHOS.normas[fonte]?.artigos[art] ?? [];
}

export function urlFonte(fonte: Fonte, art?: string): string {
  const base = TRECHOS.normas[fonte]?.url ?? "";
  // O Planalto nomeia as âncoras de artigos com letra em minúscula (art20a, art219b)
  return art && art !== "anexo" ? `${base}#art${art.replace("-", "").toLowerCase()}` : base;
}

export function artigosDisponiveis(fonte: Fonte): string[] {
  return Object.keys(TRECHOS.normas[fonte]?.artigos ?? {});
}

// Rótulo legível de um id de dispositivo ("p1.II" → "§ 1º, II")
export function rotuloDispositivo(id: string): string {
  // Questões do Anexo do Decreto nº 12.002/2024 ("q1.8" → "questão 1.8")
  if (id.startsWith("q")) return `questão ${id.slice(1)}`;
  return id
    .split(".")
    .map((parte) => {
      if (parte === "caput") return "caput";
      if (parte === "pu") return "parágrafo único";
      const m = parte.match(/^p(\d+)(-[A-Z])?$/);
      if (m) {
        const n = Number(m[1]);
        return `§ ${n}${n < 10 ? "º" : ""}${m[2] ?? ""}`;
      }
      if (/^[a-z]$/.test(parte)) return `alínea ${parte}`;
      return parte;
    })
    .join(", ");
}

// ───────────────────────────── modelo ─────────────────────────────

// Paleta oficial GINGA (mesma do gerar.py do livreto)
export const COR = {
  azul: "#0e3e66",
  verde: "#0a6637",
  laranja: "#d14b2a",
  rosa: "#cc76a7",
  celeste: "#83c1e9",
  oliva: "#8f9928",
  amarelo: "#ebbe28",
} as const;

export type Perfil = "finalistica" | "contratacoes" | "gestao" | "ict";

export const PERFIS: Record<Perfil, string> = {
  finalistica: "cuido de uma política ou serviço",
  contratacoes: "trabalho com compras e contratos",
  gestao: "decido ou lidero uma equipe",
  ict: "atuo numa universidade ou instituto federal",
};

// Um trecho destacado: aponta para dispositivos do texto oficial e explica,
// em linguagem simples, por que ele importa (à maneira das Explanatory Notes
// do legislation.gov.uk)
export interface Destaque {
  fonte: Fonte;
  art: string;
  ids: string[];
  porque: string;
}

export interface Norma {
  slug: string;
  fonte: Fonte;
  apelido: string;
  numero: string;
  ano: number;
  cor: string;
  // "Em resumo", no formato fixo das Summaries of EU legislation
  emResumo: { oQueE: string; paraQueServe: string; quemPode: string; comoAplicar: string };
  destaques: Destaque[];
  leveEmConta: string[];
}

// Ato externo ao texto extraído (portaria, instrução normativa), sempre com
// link para a publicação oficial
export interface Ato {
  rotulo: string;
  url: string;
  nota?: string;
}

export interface Caminho {
  slug: string;
  quero: string;
  instrumento: string;
  cor: string;
  resumo: string;
  quemPode: string;
  perfis: Perfil[];
  sim: string[];
  nao: string[];
  passos: { titulo: string; texto: string }[];
  trechos: Destaque[];
  cuidados: string[];
  complementares?: Ato[];
  relacionados: string[];
}

const IN_ETP: Ato = {
  rotulo: "Instrução Normativa SEGES nº 58/2022 (Estudo Técnico Preliminar)",
  url: "https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-seges-no-58-de-8-de-agosto-de-2022",
  nota: "Onde você demonstra que as soluções de mercado não atendem.",
};
const MANUAL_CPSI: Ato = {
  rotulo: "Manual do CPSI (Labori/AGU)",
  url: "https://www.gov.br/agu/pt-br/assuntos-1/labori/inova-cpsi",
  nota: "Guia prático com modelos padronizados de edital, termo de referência e contrato.",
};
const INOVAMOS: Ato = {
  rotulo: "Modelo de Apoio a Compras Públicas de Inovação (BID e TCU, 2021)",
  url: "https://portal.tcu.gov.br/data/files/02/12/B7/05/1EDC9710FC66CE87E18818A8/Inovamos_modelo_apoio_compras_publicas_inovacao.pdf",
  nota: "Anterior ao Marco Legal das Startups: não trata do CPSI, mas ajuda a diagnosticar e planejar compras de inovação.",
};
const MODELOS_CPCTI: Ato = {
  rotulo: "Modelos, checklists e pareceres de CT&I (PGF/AGU)",
  url: "https://www.gov.br/agu/pt-br/composicao/procuradoria-geral-federal-1/subprocuradoria-federal-de-consultoria-juridica/ciencia-tecnologia-e-inovacao/cp-ct-i/",
  nota: "Para ICTs públicas federais da administração indireta: política de inovação, plano de trabalho, acordo de parceria com e sem aporte de recurso, outorga de uso de laboratórios e transferência de tecnologia.",
};
const IN_TR: Ato = {
  rotulo: "Instrução Normativa SEGES/ME nº 81/2022 (Termo de Referência)",
  url: "https://www.gov.br/compras/pt-br/acesso-a-informacao/legislacao/instrucoes-normativas/instrucao-normativa-seges-me-no-81-de-25-de-novembro-de-2022",
}

// ───────────────────────────── normas ─────────────────────────────

export const NORMAS: Norma[] = [
  {
    slug: "constituicao",
    fonte: "cf",
    apelido: "Constituição Federal",
    numero: "arts. 218 a 219-B (EC nº 85/2015)",
    ano: 2015,
    cor: COR.oliva,
    emResumo: {
      oQueE: "A Emenda Constitucional nº 85/2015 levou a inovação para a Constituição, ao lado da ciência e da tecnologia.",
      paraQueServe: "Fundamenta o dever do Estado de promover a inovação e autoriza a cooperação entre entes públicos e privados.",
      quemPode: "Vale para todos os entes e Poderes.",
      comoAplicar: "Cite-a na justificativa do projeto: inovar é um dever constitucional, e não uma excentricidade do gestor.",
    },
    destaques: [
      { fonte: "cf", art: "218", ids: ["caput"], porque: "O dever de promover a inovação é do Estado, e não um favor." },
      { fonte: "cf", art: "219-A", ids: ["caput"], porque: "Autoriza a cooperação com entidades públicas e privadas, inclusive para compartilhar pessoas e estrutura." },
    ],
    leveEmConta: ["A Constituição fundamenta, mas não detalha procedimentos. O \"como\" está nas leis e nos decretos."],
  },
  {
    slug: "lei-de-inovacao",
    fonte: "l10973",
    apelido: "Lei de Inovação",
    numero: "Lei nº 10.973/2004",
    ano: 2004,
    cor: COR.azul,
    emResumo: {
      oQueE: "A primeira lei brasileira dedicada à inovação, amplamente reformada pelo Marco Legal de CT&I (Lei nº 13.243/2016).",
      paraQueServe: "Cria os instrumentos de cooperação entre Estado, ICTs e empresas: encomenda tecnológica, acordos de parceria, compartilhamento de laboratórios, subvenção e bônus tecnológico.",
      quemPode: "Órgãos e entidades da administração pública, ICTs públicas e agências de fomento.",
      comoAplicar: "Escolha o instrumento, siga o regulamento (Decreto nº 9.283/2018) e use a contratação direta da Lei nº 14.133/2021, art. 75, V.",
    },
    destaques: [
      { fonte: "l10973", art: "2", ids: ["IV"], porque: "É a definição legal de inovação. Inclui o aperfeiçoamento do que já existe, e não só a novidade radical." },
      { fonte: "l10973", art: "20", ids: ["caput", "p4"], porque: "A encomenda tecnológica permite contratar diretamente PD&I com risco tecnológico e, depois, o fornecimento do que der certo." },
      { fonte: "l10973", art: "4", ids: ["caput", "I", "III"], porque: "A ICT pública pode abrir laboratórios e o conhecimento de seus pesquisadores para projetos de inovação." },
      { fonte: "l10973", art: "9", ids: ["caput", "p2"], porque: "Acordo de parceria: cada parte entra com algo e a propriedade intelectual é combinada antes." },
    ],
    leveEmConta: [
      "Boa parte da lei foi alterada em 2016. Leia sempre a versão compilada, como a deste guia.",
      "Risco tecnológico não é risco de execução: a encomenda pressupõe dúvida sobre se a solução é alcançável.",
    ],
  },
  {
    slug: "regulamento-cti",
    fonte: "d9283",
    apelido: "Regulamento do Marco de CT&I",
    numero: "Decreto nº 9.283/2018",
    ano: 2018,
    cor: COR.celeste,
    emResumo: {
      oQueE: "O decreto federal que regulamenta a Lei de Inovação e o Marco Legal de CT&I.",
      paraQueServe: "Detalha o passo a passo da encomenda tecnológica e do acordo de parceria, inclusive o que fazer quando o resultado não vem.",
      quemPode: "Órgãos e entidades da administração pública federal e ICTs públicas federais.",
      comoAplicar: "Use-o como roteiro do processo: o que precisa constar, quem decide e como o risco é tratado.",
    },
    destaques: [
      { fonte: "d9283", art: "2", ids: ["III"], porque: "Definição de risco tecnológico: o resultado é incerto porque o conhecimento disponível ainda é insuficiente." },
      { fonte: "d9283", art: "27", ids: ["p4", "p8.II"], porque: "Antes de contratar, consulte o mercado. A escolha mira a maior chance de sucesso, e não só o menor preço." },
      { fonte: "d9283", art: "28", ids: ["p5"], porque: "Se o projeto foi conduzido como contratado e o resultado não veio, o insucesso não é, por si só, irregularidade." },
    ],
    leveEmConta: ["A modalidade de remuneração escolhida deve ser motivada nos autos (art. 29, § 2º)."],
  },
  {
    slug: "lindb",
    fonte: "lindb",
    apelido: "LINDB: segurança jurídica",
    numero: "Decreto-Lei nº 4.657/1942, arts. 20 a 30 (Lei nº 13.655/2018)",
    ano: 2018,
    cor: COR.rosa,
    emResumo: {
      oQueE: "Em 2018, a Lei de Introdução às Normas do Direito Brasileiro ganhou dez artigos sobre segurança jurídica na aplicação do direito público.",
      paraQueServe: "Protege quem decide de boa-fé. Quem controla precisa considerar as consequências práticas e as dificuldades reais do gestor, e a responsabilização pessoal exige dolo ou erro grosseiro.",
      quemPode: "Todo agente público, e também quem controla e quem julga.",
      comoAplicar: "Registre no processo as alternativas, as consequências, os obstáculos reais e as orientações da época. A boa motivação é o seu escudo.",
    },
    destaques: [
      { fonte: "lindb", art: "20", ids: ["caput", "pu"], porque: "Ninguém decide só com princípios abstratos: é preciso olhar as consequências práticas e as alternativas." },
      { fonte: "lindb", art: "22", ids: ["caput", "p1"], porque: "O controle deve considerar as dificuldades reais que você enfrentou quando decidiu." },
      { fonte: "lindb", art: "24", ids: ["caput"], porque: "Uma mudança posterior de entendimento não invalida o que foi feito com base na orientação da época." },
      { fonte: "lindb", art: "28", ids: ["caput"], porque: "Você responde pessoalmente só por dolo ou erro grosseiro, e não pelo erro honesto." },
      { fonte: "lindb", art: "30", ids: ["caput", "pu"], porque: "Os órgãos devem dar segurança por regulamentos, súmulas e respostas a consultas, que vinculam o próprio órgão." },
    ],
    leveEmConta: ["O art. 28 não é salvo-conduto: protege o erro bem motivado, e não a decisão sem fundamentação."],
  },
  {
    slug: "regulamento-lindb",
    fonte: "d9830",
    apelido: "Regulamento da LINDB",
    numero: "Decreto nº 9.830/2019",
    ano: 2019,
    cor: COR.rosa,
    emResumo: {
      oQueE: "O decreto que regulamenta os arts. 20 a 30 da LINDB no Poder Executivo federal.",
      paraQueServe: "Define motivação adequada e erro grosseiro e orienta o controle a privilegiar a prevenção.",
      quemPode: "Agentes públicos do Poder Executivo federal.",
      comoAplicar: "Use-o como lista de verificação da sua motivação.",
    },
    destaques: [
      { fonte: "d9830", art: "2", ids: ["caput", "p3"], porque: "A motivação pode se apoiar em nota técnica ou parecer anterior: o trabalho da equipe protege a decisão." },
      { fonte: "d9830", art: "12", ids: ["p1"], porque: "Erro grosseiro é o manifesto, evidente e inescusável, com culpa grave. Não é qualquer erro." },
      { fonte: "d9830", art: "12", ids: ["p5"], porque: "O tamanho do dano, sozinho, não caracteriza erro grosseiro." },
      { fonte: "d9830", art: "12", ids: ["p6"], porque: "Quem decide com base em parecer técnico não herda automaticamente a responsabilidade pela opinião." },
      { fonte: "d9830", art: "13", ids: ["p1"], porque: "O controle deve privilegiar a prevenção antes da punição." },
      { fonte: "d9830", art: "8", ids: ["caput", "p1"], porque: "As circunstâncias práticas que limitaram a ação do agente entram na avaliação." },
      { fonte: "d9830", art: "23", ids: ["caput"], porque: "Enunciados do próprio órgão podem dar segurança a uma prática nova." },
    ],
    leveEmConta: ["O § 8º do art. 12 lembra que a proteção não dispensa atuar de forma diligente e eficiente."],
  },
  {
    slug: "siorg",
    fonte: "d9739",
    apelido: "SIORG",
    numero: "Decreto nº 9.739/2019",
    ano: 2019,
    cor: COR.oliva,
    emResumo: {
      oQueE: "O decreto que organiza o Sistema de Organização e Inovação Institucional do Governo Federal (SIORG).",
      paraQueServe: "Faz da inovação institucional uma função do sistema que organiza a estrutura dos órgãos federais.",
      quemPode: "Administração pública federal direta, autárquica e fundacional.",
      comoAplicar: "Ao propor uma unidade, um núcleo ou uma rede de inovação, ancore-a na estrutura formal, em vez de criar um arranjo paralelo.",
    },
    destaques: [
      { fonte: "d9739", art: "20", ids: ["caput", "II", "pu.IV"], porque: "A inovação já está entre as funções básicas do sistema, como rede colaborativa e difusão de tecnologias de inovação." },
    ],
    leveEmConta: [
      "O art. 21 ainda cita o \"Ministério da Economia\" como órgão central. Com a reorganização ministerial, a competência hoje é exercida pelo MGI.",
      "A proposta GINGA de fortalecer a inovação no SIORG está em estudo e minuta, sem tramitação formal iniciada.",
    ],
  },
  {
    slug: "politica-nacional-de-inovacao",
    fonte: "d10534",
    apelido: "Política Nacional de Inovação",
    numero: "Decreto nº 10.534/2020",
    ano: 2020,
    cor: COR.celeste,
    emResumo: {
      oQueE: "O decreto que institui a Política Nacional de Inovação e sua governança.",
      paraQueServe: "Orienta e articula as estratégias e ações de fomento à inovação, inclusive no setor público.",
      quemPode: "Administração pública federal.",
      comoAplicar: "Use-a para alinhar a sua iniciativa às diretrizes nacionais e reforçar a justificativa estratégica.",
    },
    destaques: [
      { fonte: "d10534", art: "1", ids: ["caput", "I"], porque: "A política cobre a inovação no setor público, e não só no setor produtivo." },
    ],
    leveEmConta: ["É uma norma de política: não cria, por si só, um procedimento de contratação."],
  },
  {
    slug: "governo-digital",
    fonte: "l14129",
    apelido: "Lei do Governo Digital",
    numero: "Lei nº 14.129/2021",
    ano: 2021,
    cor: COR.amarelo,
    emResumo: {
      oQueE: "A lei que estabelece princípios e instrumentos para o Governo Digital e para a eficiência pública.",
      paraQueServe: "Autoriza expressamente laboratórios de inovação abertos à sociedade.",
      quemPode: "Administração pública federal e os demais entes que a adotarem.",
      comoAplicar: "Fundamente nela a criação de um laboratório e siga as diretrizes do art. 45.",
    },
    destaques: [
      { fonte: "l14129", art: "44", ids: ["caput"], porque: "Base legal expressa para criar um laboratório de inovação." },
      { fonte: "l14129", art: "45", ids: ["I", "III", "IX"], porque: "Colaboração, métodos ágeis e participação de servidores são diretrizes legais, e não modismos." },
    ],
    leveEmConta: ["Laboratório não é unidade de compras: para contratar o que nasce dele, você ainda precisa de um instrumento como o CPSI."],
  },
  {
    slug: "nova-lei-de-licitacoes",
    fonte: "l14133",
    apelido: "Nova Lei de Licitações",
    numero: "Lei nº 14.133/2021",
    ano: 2021,
    cor: COR.laranja,
    emResumo: {
      oQueE: "A lei geral de licitações e contratos, que substituiu a Lei nº 8.666/1993.",
      paraQueServe: "Põe a inovação entre os objetivos da licitação e oferece o diálogo competitivo, o PMI e a contratação direta para PD&I.",
      quemPode: "Administração direta, autárquica e fundacional de todos os entes.",
      comoAplicar: "No estudo técnico preliminar, demonstre que as soluções disponíveis não atendem e escolha o instrumento adequado.",
    },
    destaques: [
      { fonte: "l14133", art: "11", ids: ["IV"], porque: "Incentivar a inovação é objetivo da licitação, e não um desvio dela." },
      { fonte: "l14133", art: "32", ids: ["I", "I.a", "I.b", "I.c"], porque: "As três condições para usar o diálogo competitivo." },
      { fonte: "l14133", art: "75", ids: ["V"], porque: "A porta de entrada da contratação direta para a encomenda tecnológica e outros instrumentos da Lei de Inovação." },
      { fonte: "l14133", art: "81", ids: ["p4"], porque: "O PMI pode ser restrito a startups." },
      { fonte: "l14133", art: "169", ids: ["caput", "I", "II", "p3.I"], porque: "Você é a primeira linha de defesa, e uma impropriedade formal pede saneamento, e não punição." },
    ],
    leveEmConta: ["O diálogo competitivo exige comissão de pelo menos três servidores efetivos ou empregados permanentes."],
  },
  {
    slug: "elaboracao-de-normas",
    fonte: "d12002",
    apelido: "Elaboração de atos normativos",
    numero: "Decreto nº 12.002/2024",
    ano: 2024,
    cor: COR.verde,
    emResumo: {
      oQueE: "O decreto que estabelece como os atos normativos federais são analisados, redigidos, alterados, consolidados e submetidos a consulta pública.",
      paraQueServe: "Obriga a analisar o problema antes de escrever a norma e traz, no Anexo, as perguntas para isso, inclusive se a solução não está em aplicar o que já existe.",
      quemPode: "Quem elabora ou revisa portarias, instruções normativas e propostas de decreto no Poder Executivo federal.",
      comoAplicar: "Antes do primeiro rascunho, percorra o Anexo. Depois escreva com clareza (art. 11) e, se a norma afetar terceiros, considere a consulta pública.",
    },
    destaques: [
      { fonte: "d12002", art: "3", ids: ["caput", "p1", "p2"], porque: "Problema primeiro, norma depois. O Anexo é um guia de reflexão, e não um formulário." },
      { fonte: "d12002", art: "anexo", ids: ["q1.8"], porque: "A pergunta que evita normas desnecessárias: o que acontece se nada for feito?" },
      { fonte: "d12002", art: "anexo", ids: ["q2.2"], porque: "A primeira alternativa listada pelo próprio decreto é aplicar e executar o que já existe, a tese central da dimensão Normas da GINGA." },
      { fonte: "d12002", art: "anexo", ids: ["q6", "q6.1"], porque: "Norma temporária: uma forma de testar antes de fixar a regra." },
      { fonte: "d12002", art: "11", ids: ["caput", "I", "I.a", "I.b", "I.c", "I.d"], porque: "Clareza é exigência normativa: sentido comum, frases curtas, ordem direta." },
      { fonte: "d12002", art: "34", ids: ["caput", "IV", "pu"], porque: "Um comitê ou núcleo de inovação criado por portaria pode formular propostas, mas não pode assumir competência de outra unidade." },
    ],
    leveEmConta: [
      "O Lab.Legis da AGU (Portaria Normativa AGU nº 208/2026) foi criado para apoiar o aprimoramento da elaboração normativa e pode ser um parceiro.",
    ],
  },
  {
    slug: "marco-legal-das-startups",
    fonte: "lcp182",
    apelido: "Marco Legal das Startups",
    numero: "Lei Complementar nº 182/2021",
    ano: 2021,
    cor: COR.azul,
    emResumo: {
      oQueE: "A lei que cria regras para startups e para o Estado contratar soluções inovadoras, como o CPSI.",
      paraQueServe: "Testar uma solução antes de contratar o fornecimento, com riscos repartidos, e criar sandboxes regulatórios.",
      quemPode: "Administração direta, autarquias e fundações de todos os entes. O sandbox é para quem tem competência de regulação setorial.",
      comoAplicar: "Descreva o problema, faça a licitação especial, firme o CPSI, acompanhe as metas e, se der certo, contrate o fornecimento.",
    },
    destaques: [
      { fonte: "lcp182", art: "13", ids: ["caput"], porque: "Pessoas físicas ou jurídicas, com ou sem risco tecnológico: o CPSI não é só para startups." },
      { fonte: "lcp182", art: "13", ids: ["p1"], porque: "Você pode licitar descrevendo apenas o problema e os resultados esperados, sem especificar a solução." },
      { fonte: "lcp182", art: "14", ids: ["caput", "p2"], porque: "Vigência e teto do contrato de teste." },
      { fonte: "lcp182", art: "15", ids: ["caput"], porque: "Deu certo? O fornecimento pode ser contratado sem nova licitação." },
      { fonte: "lcp182", art: "11", ids: ["caput"], porque: "O sandbox regulatório permite suspender temporariamente normas para testar inovações." },
    ],
    leveEmConta: [
      "Os valores do capítulo podem ser atualizados anualmente pelo Poder Executivo federal (art. 12, § 3º). Em outubro de 2026 não localizamos ato que atualize os valores da LC nº 182/2021. O Decreto nº 12.807/2025 atualiza apenas os valores da Lei nº 14.133/2021. Confira antes de publicar o edital.",
      "Não há instrução normativa federal específica do CPSI. Os editais federais aplicam o Capítulo VI da LC nº 182/2021, a Lei nº 14.133/2021 subsidiariamente e as instruções normativas gerais de planejamento (ETP e TR).",
    ],
  },
];

// ───────────────────── caminhos: "quero… posso usar…" ─────────────────────

export const CAMINHOS: Caminho[] = [
  {
    slug: "testar-antes-de-comprar",
    quero: "testar uma solução antes de comprar",
    instrumento: "Contrato Público para Solução Inovadora (CPSI)",
    cor: COR.azul,
    resumo: "Você descreve um problema, seleciona uma ou mais propostas por licitação especial e paga para testá-las em condições reais. Se o teste der certo, pode contratar o fornecimento sem nova licitação.",
    quemPode: "Administração direta, autárquica e fundacional de qualquer ente.",
    perfis: ["finalistica", "contratacoes", "gestao"],
    sim: [
      "Você conhece bem o problema, mas não sabe qual solução funciona.",
      "Existem soluções emergentes que nunca foram testadas no seu contexto.",
      "Você quer comparar mais de uma abordagem antes de escalar.",
    ],
    nao: [
      "Já existe solução de prateleira que atende: use uma licitação comum.",
      "Ninguém sabe se o problema é solucionável: avalie a encomenda tecnológica.",
      "Você não tem como medir se o teste deu certo.",
    ],
    passos: [
      { titulo: "Descreva o problema", texto: "O edital pode se limitar ao problema e aos resultados esperados, incluindo os desafios tecnológicos." },
      { titulo: "Monte a comissão especial", texto: "Ao menos três pessoas, sendo uma servidora do órgão e uma professora de instituição pública de ensino superior na área." },
      { titulo: "Publique com 30 dias de antecedência", texto: "No sítio oficial de licitações e no diário oficial." },
      { titulo: "Julgue pelo potencial", texto: "O preço só entra como viabilidade econômica e custo-benefício comparado." },
      { titulo: "Firme o CPSI", texto: "Com metas, forma de aferição, matriz de riscos e regras de propriedade intelectual. Pode haver mais de um contratado." },
      { titulo: "Decida sobre o fornecimento", texto: "Com êxito comprovado, contrate o fornecimento sem nova licitação." },
    ],
    trechos: [
      { fonte: "lcp182", art: "13", ids: ["caput", "p1"], porque: "Licitação descrevendo o problema, e não a solução." },
      { fonte: "lcp182", art: "13", ids: ["p3", "p3.I", "p3.II"], porque: "Quem compõe a comissão." },
      { fonte: "lcp182", art: "13", ids: ["p4", "p4.I", "p4.II", "p4.III", "p4.IV", "p4.V", "p5"], porque: "Os critérios de julgamento. O preço não é o centro." },
      { fonte: "lcp182", art: "13", ids: ["p6"], porque: "Você pode selecionar mais de uma proposta." },
      { fonte: "lcp182", art: "14", ids: ["caput", "p1", "p1.I", "p1.III", "p1.IV"], porque: "O que o contrato precisa conter." },
      { fonte: "lcp182", art: "14", ids: ["p2"], porque: "O teto por CPSI." },
      { fonte: "lcp182", art: "15", ids: ["caput", "p2", "p3"], porque: "O fornecimento depois do teste." },
    ],
    cuidados: [
      "Os valores podem ser atualizados por ato do Executivo (art. 12, § 3º). Em outubro de 2026 não localizamos ato que atualize os valores da LC nº 182/2021. O Decreto nº 12.807/2025 atualiza apenas os valores da Lei nº 14.133/2021.",
      "Comece pelos modelos de edital, termo de referência e contrato do Manual do CPSI da AGU, em vez de partir do zero.",
    ],
    complementares: [MANUAL_CPSI, IN_ETP, IN_TR, {
      rotulo: "Decreto nº 12.807/2025 (valores atualizados da Lei nº 14.133)",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12807.htm",
      nota: "Não alcança os valores do CPSI, que seguem os da LC nº 182/2021.",
    }],
    relacionados: ["construir-com-o-mercado", "contratar-pesquisa", "ouvir-o-mercado"],
  },
  {
    slug: "contratar-pesquisa",
    quero: "contratar pesquisa para um problema que ninguém resolveu",
    instrumento: "Encomenda tecnológica (ETEC)",
    cor: COR.verde,
    resumo: "Contratação direta de ICT, entidade sem fins lucrativos ou empresa com capacitação reconhecida para desenvolver uma solução que ainda não existe e cujo sucesso é incerto.",
    quemPode: "Órgãos e entidades da administração pública, em matéria de interesse público.",
    perfis: ["finalistica", "contratacoes", "ict"],
    sim: [
      "O problema é técnico e específico, e ninguém sabe ainda se ele é solucionável.",
      "Há risco tecnológico real: incerteza sobre o resultado, e não só sobre prazo ou custo.",
    ],
    nao: [
      "A solução existe e só precisa ser testada no seu contexto: o CPSI tende a ser mais adequado.",
      "O risco é só de execução ou de gestão do contrato.",
    ],
    passos: [
      { titulo: "Descreva a necessidade", texto: "Permita que os interessados identifiquem a solução, sem amarrá-la de antemão." },
      { titulo: "Consulte o mercado", texto: "Consulte potenciais contratados e anexe as respostas ao processo." },
      { titulo: "Crie um comitê técnico, se precisar", texto: "Com especialistas sem conflito de interesse." },
      { titulo: "Negocie com transparência", texto: "Escolha pela maior probabilidade de alcançar o resultado, documentando tudo." },
      { titulo: "Escolha a remuneração", texto: "Preço fixo, incentivo variável ou reembolso de custos, com motivação nos autos." },
      { titulo: "Acompanhe e aceite o risco", texto: "O insucesso decorrente do risco tecnológico não é irregularidade." },
    ],
    trechos: [
      { fonte: "l10973", art: "20", ids: ["caput"], porque: "A autorização legal da encomenda." },
      { fonte: "d9283", art: "2", ids: ["III"], porque: "O que é risco tecnológico." },
      { fonte: "l14133", art: "75", ids: ["V"], porque: "A contratação direta." },
      { fonte: "d9283", art: "27", ids: ["p3", "p4"], porque: "Descreva a necessidade e consulte antes." },
      { fonte: "d9283", art: "27", ids: ["p8", "p8.I", "p8.II"], porque: "Negociação transparente, com foco na chance de sucesso." },
      { fonte: "d9283", art: "28", ids: ["p2", "p4", "p5"], porque: "Como encerrar e o que acontece se não der certo." },
      { fonte: "l10973", art: "20", ids: ["p4"], porque: "O fornecimento do que deu certo." },
    ],
    cuidados: [
      "Documente o risco tecnológico desde o início: é ele que justifica o instrumento.",
      "Envolva a consultoria jurídica cedo, porque o desenho do contrato é decisivo.",
    ],
    complementares: [
      {
        rotulo: "Parecer nº 1/2023/CP-CT&I/DEPCONSU/PGF/AGU",
        url: "https://www.gov.br/agu/pt-br/composicao/procuradoria-geral-federal-1/subprocuradoria-federal-de-consultoria-juridica/ciencia-tecnologia-e-inovacao/cp-ct-i/ict_publica/parecer12023cpctisubconsupgfaguetecfundaoapoiobolsa.pdf",
        nota: "Quando a ICT pública é a contratada na encomenda tecnológica, admite interveniência de fundação de apoio e pagamento de bolsa aos servidores e estudantes envolvidos.",
      },
      {
        rotulo: "Encomenda tecnológica: registro da experiência do TCU (2021)",
        url: "https://portal.tcu.gov.br/data/files/5A/23/35/CD/DCE19710FC66CE87E18818A8/ETEC%20-%20Registro%20de%20experiencia.pdf",
        nota: "O próprio TCU conduziu uma encomenda tecnológica a partir da constatação de que o gestor receia contratar inovação e tem medo do controle.",
      },
    ],
    relacionados: ["testar-antes-de-comprar", "pesquisar-junto"],
  },
  {
    slug: "construir-com-o-mercado",
    quero: "construir a solução junto com o mercado",
    instrumento: "Diálogo competitivo",
    cor: COR.laranja,
    resumo: "Uma modalidade de licitação em que você conversa com licitantes pré-selecionados até identificar a solução, e só então abre a disputa de propostas.",
    quemPode: "Administração direta, autárquica e fundacional de todos os entes.",
    perfis: ["contratacoes", "gestao"],
    sim: [
      "O objeto envolve inovação tecnológica ou técnica.",
      "Nenhuma solução disponível atende sem adaptação.",
      "Você não consegue especificar tecnicamente o que quer.",
    ],
    nao: [
      "Você já sabe exatamente o que comprar.",
      "Não há três servidores efetivos para compor a comissão.",
    ],
    passos: [
      { titulo: "Publique as necessidades", texto: "Dê ao menos 25 dias úteis para a manifestação de interesse." },
      { titulo: "Pré-selecione", texto: "Admita todos os que cumprirem os critérios objetivos do edital." },
      { titulo: "Dialogue e registre", texto: "Reuniões gravadas e registradas em ata, sem revelar a solução de um licitante a outro." },
      { titulo: "Conclua o diálogo", texto: "Junte as gravações aos autos e publique o edital da fase competitiva." },
      { titulo: "Receba as propostas", texto: "Com prazo de pelo menos 60 dias úteis." },
    ],
    trechos: [
      { fonte: "l14133", art: "6", ids: ["XLII"], porque: "A definição legal." },
      { fonte: "l14133", art: "32", ids: ["caput", "I", "I.a", "I.b", "I.c"], porque: "Quando você pode usar." },
      { fonte: "l14133", art: "32", ids: ["p1.I", "p1.IV", "p1.VI"], porque: "Prazo, sigilo e registro das reuniões." },
      { fonte: "l14133", art: "32", ids: ["p1.VIII", "p1.XI"], porque: "Fechamento do diálogo e composição da comissão." },
    ],
    cuidados: ["As gravações e atas são exigência legal e também a proteção do servidor."],
    complementares: [IN_ETP, IN_TR, INOVAMOS],
    relacionados: ["testar-antes-de-comprar", "ouvir-o-mercado"],
  },
  {
    slug: "ouvir-o-mercado",
    quero: "ouvir o mercado antes de decidir o que contratar",
    instrumento: "Procedimento de Manifestação de Interesse (PMI)",
    cor: COR.amarelo,
    resumo: "Um chamamento público para que a iniciativa privada proponha estudos e projetos de soluções inovadoras. Pode ser restrito a startups.",
    quemPode: "Administração direta, autárquica e fundacional de todos os entes.",
    perfis: ["contratacoes", "finalistica"],
    sim: ["Você quer mapear soluções possíveis antes de desenhar a contratação."],
    nao: ["Você precisa testar em operação real: o PMI gera estudos, e não contratos de teste."],
    complementares: [IN_ETP, INOVAMOS],
    passos: [
      { titulo: "Publique o chamamento", texto: "Com o problema, o escopo dos estudos e os critérios de avaliação." },
      { titulo: "Restrinja a startups, se fizer sentido", texto: "Microempreendedores, microempresas e empresas de pequeno porte de natureza emergente." },
      { titulo: "Use o resultado", texto: "Alimente o estudo técnico preliminar e escolha a modalidade." },
    ],
    trechos: [
      { fonte: "l14133", art: "81", ids: ["caput"], porque: "O que é o PMI." },
      { fonte: "l14133", art: "81", ids: ["p2", "p2.I", "p2.II", "p2.IV"], porque: "O que o PMI não gera: preferência, obrigação de licitar ou pagamento pelo poder público." },
      { fonte: "l14133", art: "81", ids: ["p4"], porque: "PMI só para startups." },
    ],
    cuidados: [],
    relacionados: ["construir-com-o-mercado", "testar-antes-de-comprar"],
  },
  {
    slug: "decidir-com-seguranca",
    quero: "decidir algo novo com mais segurança jurídica",
    instrumento: "Decisão motivada com base na LINDB",
    cor: COR.rosa,
    resumo: "Não é um contrato, e sim um modo de decidir: motivar com consequências práticas, alternativas e dificuldades reais, de forma que o controle posterior entenda o que você fez e por quê.",
    quemPode: "Todo agente público.",
    perfis: ["finalistica", "contratacoes", "gestao", "ict"],
    sim: ["Você vai tomar uma decisão sem precedente claro no órgão.", "Há mais de uma interpretação razoável da norma."],
    nao: [],
    passos: [
      { titulo: "Contextualize", texto: "O problema, quem é afetado e por que agir agora." },
      { titulo: "Compare alternativas", texto: "Inclusive a de não fazer nada." },
      { titulo: "Explicite as consequências", texto: "Que resultados você espera e como vai medi-los." },
      { titulo: "Registre as dificuldades reais", texto: "Prazo, orçamento, equipe, dados e limites técnicos." },
      { titulo: "Ancore em pareceres", texto: "Notas técnicas e jurídicas podem compor a motivação." },
    ],
    trechos: [
      { fonte: "lindb", art: "20", ids: ["caput", "pu"], porque: "Consequências práticas e alternativas." },
      { fonte: "lindb", art: "22", ids: ["caput", "p1"], porque: "As dificuldades reais contam." },
      { fonte: "d9830", art: "8", ids: ["caput", "p1"], porque: "O regulamento repete e detalha: circunstâncias práticas que limitaram a ação contam." },
      { fonte: "lindb", art: "28", ids: ["caput"], porque: "Dolo ou erro grosseiro." },
      { fonte: "d9830", art: "12", ids: ["p1", "p5", "p6"], porque: "O que é, e o que não é, erro grosseiro." },
      { fonte: "d9830", art: "2", ids: ["p3"], porque: "Motivação apoiada em pareceres." },
    ],
    cuidados: ["A motivação protege, mas não substitui a manifestação da consultoria jurídica quando ela for obrigatória."],
    relacionados: ["interpretacao-oficial"],
  },
  {
    slug: "interpretacao-oficial",
    quero: "ter uma interpretação oficial antes de agir",
    instrumento: "Consulta, orientação vinculante e compromisso",
    cor: COR.celeste,
    resumo: "Pedir orientação à consultoria jurídica, buscar respostas a consultas com efeito vinculante e, em caso de incerteza, celebrar compromisso com os interessados.",
    quemPode: "Autoridades administrativas e agentes que dependem da interpretação de uma norma.",
    perfis: ["gestao", "contratacoes"],
    sim: ["A norma é ambígua e a interpretação muda o desenho da sua iniciativa."],
    nao: ["A dúvida já está respondida em parecer referencial ou orientação normativa aplicável."],
    passos: [
      { titulo: "Procure o que já vincula o seu órgão", texto: "Orientações normativas do órgão central do sistema, enunciados do próprio órgão e pareceres aprovados pelo Ministro, que devem estar no site do órgão." },
      { titulo: "Pergunte por uma manifestação referencial", texto: "Se o caso é repetitivo, a consultoria pode já ter emitido manifestação jurídica referencial (Orientação Normativa AGU nº 55/2014), que dispensa nova análise individual." },
      { titulo: "Formule a pergunta", texto: "O caso concreto, as interpretações possíveis e a que você propõe." },
      { titulo: "Consulte a consultoria jurídica", texto: "CONJUR na administração direta; Procuradoria Federal em autarquias e fundações. Junte a resposta ao processo." },
      { titulo: "Se a dúvida for de muitos órgãos, proponha uniformizar", texto: "Controvérsias sobre orientação de órgão central de sistema podem ser submetidas à AGU." },
    ],
    trechos: [
      { fonte: "lindb", art: "30", ids: ["caput", "pu"], porque: "Respostas a consultas vinculam o órgão." },
      { fonte: "lindb", art: "26", ids: ["caput"], porque: "Compromisso para eliminar incerteza jurídica." },
      { fonte: "lindb", art: "24", ids: ["caput", "pu"], porque: "A orientação da época protege o que foi feito." },
      { fonte: "d9830", art: "19", ids: ["caput", "pu"], porque: "Orientações, súmulas, enunciados e respostas a consultas vinculam até serem revistos." },
      { fonte: "d9830", art: "21", ids: ["caput"], porque: "O parecer da consultoria aprovado pelo Ministro vincula o órgão e as entidades vinculadas." },
      { fonte: "d9830", art: "22", ids: ["caput", "p1"], porque: "O órgão central do sistema orienta os demais, e divergências podem ir à AGU." },
      { fonte: "d9830", art: "23", ids: ["caput"], porque: "A autoridade máxima pode editar enunciados que vinculam o próprio órgão: um caminho para dar segurança a uma prática inovadora." },
      { fonte: "d9830", art: "24", ids: ["caput"], porque: "Essas orientações precisam estar publicadas e atualizadas no site do órgão." },
      { fonte: "d9830", art: "10", ids: ["caput", "I", "II", "III"], porque: "O compromisso exige oitiva do órgão jurídico e razões de relevante interesse geral." },
    ],
    cuidados: ["O parecer orienta a decisão, mas a decisão continua sendo do gestor."],
    relacionados: ["decidir-com-seguranca"],
  },
  {
    slug: "espaco-para-experimentar",
    quero: "ter um espaço permanente para experimentar",
    instrumento: "Laboratório de inovação",
    cor: COR.rosa,
    resumo: "Uma estrutura, formal ou em rede, aberta à sociedade, para experimentar métodos e soluções na gestão e nos serviços públicos.",
    quemPode: "Entes públicos de qualquer esfera.",
    perfis: ["gestao", "finalistica"],
    sim: ["O órgão precisa de capacidade permanente de experimentação, e não de um projeto isolado."],
    nao: ["A necessidade é pontual e cabe num projeto com prazo definido."],
    passos: [
      { titulo: "Defina o mandato", texto: "Que problemas o laboratório enfrenta e para quem trabalha." },
      { titulo: "Ancore na estrutura", texto: "Formalize por ato e registre a unidade na estrutura do órgão (SIORG)." },
      { titulo: "Conecte-se à rede", texto: "Rede InovaGov, GNova (Enap) e outros laboratórios federais." },
    ],
    trechos: [
      { fonte: "l14129", art: "44", ids: ["caput"], porque: "A autorização legal." },
      { fonte: "l14129", art: "45", ids: ["caput", "I", "III", "IV", "IX"], porque: "As diretrizes." },
      { fonte: "d9739", art: "20", ids: ["caput", "II", "pu.IV"], porque: "Inovação como função do SIORG." },
    ],
    cuidados: ["Laboratório que depende de uma única liderança é vulnerável a trocas de gestão: institucionalize."],
    complementares: [
      {
        rotulo: "Laboratórios de inovação no setor público: mapeamento e diagnóstico (Enap, 2020)",
        url: "https://repositorio.enap.gov.br/handle/1/5112",
        nota: "Pesquisa sobre como os laboratórios brasileiros se organizam e que resultados entregam. Útil para desenhar o mandato do seu.",
      },
      {
        rotulo: "Rede InovaGov",
        url: "https://inovagov.enap.gov.br/o-que-e",
        nota: "Rede que conecta unidades de inovação dos três Poderes. Bom lugar para encontrar quem já fez.",
      },
    ],
    relacionados: ["testar-antes-de-comprar"],
  },
  {
    slug: "pesquisar-junto",
    quero: "desenvolver algo junto com uma universidade ou instituto",
    instrumento: "Acordo de parceria para PD&I",
    cor: COR.verde,
    resumo: "Um acordo entre ICT e instituições públicas ou privadas para pesquisa conjunta, com a propriedade intelectual definida antes.",
    quemPode: "ICTs públicas e seus parceiros.",
    perfis: ["ict", "finalistica"],
    sim: ["Há interesse comum e cada parte contribui com pessoas, laboratórios, dados ou recursos."],
    nao: ["Você quer comprar um resultado, e não construí-lo junto: considere a encomenda tecnológica."],
    passos: [
      { titulo: "Escreva o plano de trabalho", texto: "Atividades, metas, prazos e meios de cada parceiro." },
      { titulo: "Combine a propriedade intelectual", texto: "Titularidade e participação nos resultados." },
      { titulo: "Formalize", texto: "Siga a política de inovação da ICT." },
    ],
    trechos: [
      { fonte: "l10973", art: "9", ids: ["caput", "p2"], porque: "O acordo e a propriedade intelectual." },
      { fonte: "d9283", art: "35", ids: ["caput", "p1", "p1.I", "p1.II"], porque: "O plano de trabalho." },
      { fonte: "l10973", art: "4", ids: ["caput", "I", "II", "III"], porque: "Compartilhar estrutura e conhecimento." },
    ],
    cuidados: [
      "Em autarquias e fundações federais, a consultoria jurídica é a Procuradoria Federal junto ao órgão (PGF); na administração direta, a CONJUR do ministério.",
    ],
    complementares: [
      MODELOS_CPCTI,
      {
        rotulo: "Checklist para acordo de parceria (CP-CT&I/PGF/AGU)",
        url: "https://www.gov.br/agu/pt-br/composicao/procuradoria-geral-federal-1/subprocuradoria-federal-de-consultoria-juridica/ciencia-tecnologia-e-inovacao/cp-ct-i/parce_desenv_inov/Checklistparaacordodeparceria.docx",
      },
      {
        rotulo: "Parecer nº 2/2023/CP-CT&I/SUBCONSU/PGF/AGU",
        url: "https://www.gov.br/agu/pt-br/composicao/procuradoria-geral-federal-1/subprocuradoria-federal-de-consultoria-juridica/ciencia-tecnologia-e-inovacao/cp-ct-i/parce_desenv_inov/parecern-000022023cpctisubconsupgfagu.pdf",
        nota: "Interpreta as \"atividades conjuntas\" do art. 9º de forma teleológica: o parceiro pode participar apenas como financiador do projeto.",
      },
    ],
    relacionados: ["contratar-pesquisa"],
  },
  {
    slug: "propor-uma-norma",
    quero: "criar ou mudar uma norma interna para viabilizar a inovação",
    instrumento: "Portaria ou instrução normativa, com análise prévia",
    cor: COR.verde,
    resumo: "Antes de escrever uma regra nova, o Decreto nº 12.002/2024 manda analisar o problema e as alternativas, inclusive aplicar o que já existe. Se a norma for mesmo necessária, ela deve ser clara, pode ser temporária e pode passar por consulta pública.",
    quemPode: "Unidades que propõem atos normativos inferiores a decreto no Poder Executivo federal.",
    perfis: ["gestao", "finalistica"],
    sim: [
      "Uma regra interna do órgão impede ou atrasa a inovação.",
      "Você precisa formalizar um comitê, núcleo ou laboratório de inovação.",
    ],
    nao: [
      "A norma que você precisa já existe e só não está sendo usada: comece pelos outros caminhos deste guia.",
      "A matéria exige lei ou decreto: a portaria não basta.",
    ],
    passos: [
      { titulo: "Analise o problema primeiro", texto: "Use as perguntas de diagnóstico do Anexo: qual é o problema, quem é afetado e o que acontece se nada for feito." },
      { titulo: "Pergunte se precisa de norma nova", texto: "Aplicar e executar o que já existe é a primeira alternativa listada pelo próprio decreto." },
      { titulo: "Considere uma norma temporária", texto: "Prazo de vigência limitado permite testar e revisar." },
      { titulo: "Escreva com clareza", texto: "Sentido comum, frases curtas, ordem direta, sem preciosismos." },
      { titulo: "Ouça quem será afetado", texto: "Consulta pública no Participa + Brasil, que pode ser também no portal do órgão." },
      { titulo: "Se criar um colegiado, respeite os limites", texto: "Comitê criado por portaria não assume competência de outra unidade." },
    ],
    trechos: [
      { fonte: "d12002", art: "3", ids: ["caput", "p1", "p2"], porque: "A análise prévia é obrigatória; o Anexo é o roteiro." },
      { fonte: "d12002", art: "anexo", ids: ["q1", "q1.2", "q1.7", "q1.8"], porque: "O diagnóstico." },
      { fonte: "d12002", art: "anexo", ids: ["q2", "q2.2", "q2.3", "q2.3.2", "q2.3.6"], porque: "As alternativas, a começar por aplicar o que já existe." },
      { fonte: "d12002", art: "anexo", ids: ["q6", "q6.1"], porque: "A norma temporária." },
      { fonte: "d12002", art: "11", ids: ["caput", "I", "I.a", "I.b", "I.c", "I.d"], porque: "Clareza." },
      { fonte: "lindb", art: "29", ids: ["caput"], porque: "A consulta pública prévia, considerada na decisão." },
      { fonte: "d12002", art: "30", ids: ["caput", "p1", "p2"], porque: "Onde fazer a consulta." },
      { fonte: "d12002", art: "32", ids: ["caput"], porque: "O resultado da consulta não vincula, mas precisa ser analisado." },
      { fonte: "d12002", art: "34", ids: ["caput", "I", "II", "IV", "pu"], porque: "O que um colegiado criado por portaria pode e não pode fazer." },
    ],
    cuidados: [
      "Antes de propor norma nova, confira se o problema não é de uso das normas que já existem. Foi o principal aprendizado do Diagnóstico GINGA.",
    ],
    complementares: [
      { rotulo: "Portaria Normativa AGU nº 208/2026 (Lab.Legis)", url: "https://www.in.gov.br/web/dou/-/portaria-normativa-agu-n-208-de-3-de-marco-de-2026-690203912", nota: "Laboratório de legística da AGU, que apoia o aprimoramento da elaboração de normas." },
    ],
    relacionados: ["testar-uma-regra", "espaco-para-experimentar", "decidir-com-seguranca"],
  },
  {
    slug: "testar-uma-regra",
    quero: "testar uma regra nova antes de mudá-la",
    instrumento: "Sandbox regulatório",
    cor: COR.azul,
    resumo: "O órgão regulador suspende temporariamente normas sob sua competência para que modelos inovadores sejam testados com supervisão.",
    quemPode: "Órgãos e entidades com competência de regulação setorial.",
    perfis: ["gestao"],
    sim: ["A regra vigente impede uma inovação e o regulador quer aprender antes de alterá-la."],
    nao: ["O seu órgão não regula o setor em questão."],
    passos: [
      { titulo: "Defina critérios", texto: "Seleção dos participantes, duração, alcance e normas abrangidas." },
      { titulo: "Monitore", texto: "Acompanhe riscos e resultados." },
      { titulo: "Aprenda e regule", texto: "Mantenha, ajuste ou revogue a regra." },
    ],
    trechos: [
      { fonte: "lcp182", art: "11", ids: ["caput", "p3", "p3.I", "p3.II", "p3.III"], porque: "A autorização e o que o programa precisa definir." },
    ],
    cuidados: ["O sandbox suspende normas do próprio regulador, e não leis: o que a lei exige continua valendo."],
    complementares: [
      {
        rotulo: "Sandbox Regulatório: guia referencial (Labori/AGU)",
        url: "https://www.gov.br/agu/pt-br/assuntos-1/labori/sandbox-regulatorio-pagina",
        nota: "Conceitos, base legal, jornada de implementação e gestão de riscos.",
      },
    ],
    relacionados: ["interpretacao-oficial"],
  },
];

// ─────────────── termos definidos em lei (à maneira do Cornell LII) ───────────────

export const TERMOS: { termo: string; padrao: RegExp; fonte: Fonte; art: string; id: string }[] = [
  { termo: "risco tecnológico", padrao: /risco tecnológico/i, fonte: "d9283", art: "2", id: "III" },
  { termo: "inovação", padrao: /\binovação\b/i, fonte: "l10973", art: "2", id: "IV" },
  { termo: "ICT", padrao: /\bICTs?\b/, fonte: "l10973", art: "2", id: "V" },
  { termo: "erro grosseiro", padrao: /erro grosseiro/i, fonte: "d9830", art: "12", id: "p1" },
  { termo: "diálogo competitivo", padrao: /diálogo competitivo/i, fonte: "l14133", art: "6", id: "XLII" },
  { termo: "bônus tecnológico", padrao: /bônus tecnológico/i, fonte: "l10973", art: "2", id: "XIII" },
  { termo: "capital intelectual", padrao: /capital intelectual/i, fonte: "l10973", art: "2", id: "XIV" },
];

export function definicao(termo: (typeof TERMOS)[number]): string {
  return artigo(termo.fonte, termo.art).find((d) => d.id === termo.id)?.texto ?? "";
}

// ─────────────────────── quem já faz (rede federal) ───────────────────────

// Cada laboratório ou rede aponta para o ato que o institui ou prevê. Onde
// não localizamos ato formal de criação, dizemos isso em vez de inventar.
export const REDE: { nome: string; org: string; texto: string; atos: Ato[]; nota?: string }[] = [
  {
    nome: "GNova Lab",
    org: "Enap",
    texto: "Laboratório pioneiro de inovação do governo federal, criado em 2016.",
    atos: [
      { rotulo: "Decreto nº 10.369/2020 (Estatuto da Enap)", url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10369.htm" },
    ],
    nota: "O estatuto inclui entre as competências da Enap disseminar soluções inovadoras \"no âmbito do Laboratório de Inovação em Governo\".",
  },
  {
    nome: "LA-BORA! gov",
    org: "MGI",
    texto: "Laboratório de gestão inovadora de pessoas.",
    atos: [
      { rotulo: "Portaria SGP/SEDGG/ME nº 21.224, de 23/9/2020", url: "https://www.in.gov.br/web/dou/-/portaria-n-21.224-de-23-de-setembro-de-2020-279261311" },
    ],
    nota: "Entre os valores do laboratório está o \"apetite ao risco\": experimentação que não penaliza erros e falhas durante a criação de ideias (art. 2º, VI).",
  },
  {
    nome: "coLAB-i",
    org: "TCU",
    texto: "Laboratório de Inovação e Coparticipação do TCU, criado em 2015. Autor da pesquisa sobre contratação de soluções inovadoras (2019).",
    atos: [
      { rotulo: "Notícia de inauguração (TCU)", url: "https://portal.tcu.gov.br/data/pages/8A81881E77D527270177D5845F685D55.htm" },
    ],
    nota: "Não localizamos o ato formal de criação. Desde 2025, o laboratório integra a Secretaria de Estratégia, Inovação e Transformação Organizacional (Seta) do TCU.",
  },
  {
    nome: "Labori",
    org: "AGU",
    texto: "Laboratório de inovação da AGU, autor do manual do CPSI.",
    atos: [
      { rotulo: "Portaria Normativa AGU nº 120, de 18/12/2023", url: "https://www.gov.br/agu/pt-br/governanca/PortariaNormativaAGUn120_18.12.2023InstituioLaboratriodeInovaodaAGUeoPrmiodeInovaodaAGU.pdf" },
    ],
  },
  {
    nome: "Lab.Legis",
    org: "AGU",
    texto: "Laboratório de Legística da AGU, na Secretaria de Atos Normativos, que atua articulado ao Labori na melhoria da elaboração de normas.",
    atos: [
      { rotulo: "Portaria Normativa AGU nº 208, de 3/3/2026", url: "https://www.in.gov.br/web/dou/-/portaria-normativa-agu-n-208-de-3-de-marco-de-2026-690203912" },
    ],
  },
  {
    nome: "Rede InovaGov",
    org: "",
    texto: "Rede que conecta unidades de inovação dos três Poderes e de diferentes esferas.",
    atos: [
      { rotulo: "Acordo de Cooperação Técnica de 2016 (Planejamento, TCU e CJF)", url: "https://www.cjf.jus.br/observatorio2/normas/normas/cjf/acordo-de-cooperacao-2013-rede-federal-de-inovacao-no-setor-publico/at_download/file" },
      { rotulo: "Regulamento da Rede", url: "https://www.cjf.jus.br/observatorio/arq/Regulamento_Rede_InovaGov.pdf" },
    ],
    nota: "Outros órgãos aderem por termo de adesão ao acordo.",
  },
  {
    nome: "ECT&I",
    org: "PGF/AGU",
    texto: "Equipe de Ciência, Tecnologia e Inovação da Procuradoria-Geral Federal, que apoia a consultoria jurídica das autarquias e fundações federais em CT&I.",
    atos: [
      { rotulo: "Portaria Normativa PGF/AGU nº 78, de 15/4/2025", url: "https://www.gov.br/agu/pt-br/composicao/procuradoria-geral-federal-1/subprocuradoria-federal-de-consultoria-juridica/ciencia-tecnologia-e-inovacao/portaria-normativa-78-de-2025-institui-a-ecti.pdf" },
    ],
    nota: "Mantém modelos, checklists e pareceres para parcerias e contratos do Marco Legal de CT&I.",
  },
  {
    nome: "CONJUR do seu órgão",
    org: "AGU",
    texto: "A primeira parada para validar o caminho jurídico. Leve o problema, e não só a minuta.",
    atos: [
      { rotulo: "Lei Complementar nº 73/1993, art. 11", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp73.htm#art11" },
    ],
  },
];

export const normaPorSlug = (s: string) => NORMAS.find((n) => n.slug === s);
export const normaPorFonte = (f: Fonte) => NORMAS.find((n) => n.fonte === f);
export const caminhoPorSlug = (s: string) => CAMINHOS.find((c) => c.slug === s);

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function dataPorExtenso(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}

// Artigos 1 a 9 levam ordinal (art. 2º); do 10 em diante, cardinal (art. 10)
export function numeroArt(art: string): string {
  if (art === "anexo") return "Anexo";
  const m = art.match(/^(\d+)(.*)$/);
  return m && Number(m[1]) < 10 ? `${m[1]}º${m[2]}` : art;
}

// ─────────────── o que o controle tem dito (TCU, Jurisprudência Selecionada) ───────────────
// Enunciados copiados literalmente da base de Jurisprudência Selecionada do
// TCU, pesquisada em outubro de 2026. O próprio TCU adverte que o enunciado
// não é resumo oficial da decisão nem representa necessariamente o
// entendimento prevalecente; por isso mostramos formulações diferentes lado
// a lado, sem escolher uma.

export interface Entendimento {
  acordao: string;
  url: string;
  enunciado: string;
  leitura: string;
}

const acordaoTcu = (numero: number, ano: number, colegiado: "Plenário" | "Primeira Câmara" | "Segunda Câmara") =>
  `https://pesquisa.apps.tcu.gov.br/doc/acordao-completo/${numero}/${ano}/${encodeURIComponent(colegiado)}`;

export const AVISO_TCU =
  "O TCU adverte que o enunciado procura retratar o entendimento da deliberação de origem, mas não é resumo oficial da decisão nem representa necessariamente o posicionamento prevalecente no Tribunal.";

export const ERRO_GROSSEIRO_TCU: Entendimento[] = [
  {
    acordao: "Acórdão 2.391/2018-Plenário",
    url: acordaoTcu(2391, 2018, "Plenário"),
    enunciado:
      "Para fins do exercício do poder sancionatório do TCU, erro grosseiro é o que decorreu de grave inobservância do dever de cuidado, isto é, que foi praticado com culpa grave.",
    leitura: "A definição de base, repetida em outros acórdãos do Plenário.",
  },
  {
    acordao: "Acórdão 63/2023-Primeira Câmara",
    url: acordaoTcu(63, 2023, "Primeira Câmara"),
    enunciado:
      "Para fins do exercício do poder sancionatório do TCU, considera-se erro grosseiro (art. 28 do Decreto-lei 4.657/1942 - Lindb) aquele que poderia ser percebido por pessoa com diligência abaixo do normal ou que poderia ser evitado por pessoa com nível de atenção aquém do ordinário, decorrente de grave inobservância do dever de cuidado. Associar culpa grave à conduta desviante da que seria esperada do homem médio significa tornar aquela idêntica à culpa comum ou ordinária, negando eficácia às mudanças promovidas pela Lei 13.655/2018 na Lindb, que buscaram instituir novo paradigma de avaliação da culpabilidade dos agentes públicos, tornando mais restritos os critérios de responsabilização.",
    leitura: "Parâmetro mais protetivo: o erro precisa ser perceptível até por quem tem diligência abaixo do normal.",
  },
  {
    acordao: "Acórdão 755/2025-Plenário",
    url: acordaoTcu(755, 2025, "Plenário"),
    enunciado:
      "Para fins do exercício do poder sancionatório do TCU, o erro grosseiro a que alude o art. 28 do Decreto-lei 4.657/1942 (Lindb) fica configurado quando a conduta do agente público se distancia acentuadamente daquela que seria esperada do administrador médio, parâmetro que retrata o dever de cuidado objetivo esperado de um gestor comum, capaz e prudente.",
    leitura: "Outro parâmetro: o afastamento acentuado do administrador médio. As duas formulações convivem na base do TCU.",
  },
  {
    acordao: "Acórdão 11.674/2023-Primeira Câmara",
    url: acordaoTcu(11674, 2023, "Primeira Câmara"),
    enunciado:
      "Incorre no erro grosseiro a que alude o art. 28 do Decreto-lei 4.657/1942 (Lindb), entendido como grave inobservância do dever de cuidado e zelo com a coisa pública, o gestor que falha nas circunstâncias em que não falharia aquele que emprega nível de diligência normal no desempenho de suas funções, considerados os obstáculos e as dificuldades reais apresentados à época da prática do ato impugnado.",
    leitura: "As dificuldades reais da época contam. Por isso vale registrá-las no processo (LINDB, art. 22).",
  },
  {
    acordao: "Acórdão 2.028/2020-Plenário",
    url: acordaoTcu(2028, 2020, "Plenário"),
    enunciado:
      "Para fins do exercício do poder sancionatório do TCU, pode ser tipificado como erro grosseiro (art. 28 do Decreto-lei 4.657/1942 - Lindb) o descumprimento, sem a devida motivação, de determinação expedida pelo TCU, pois tal conduta revela grave inobservância do dever de cuidado, o que configura culpa grave.",
    leitura: "O ponto decisivo é a falta de motivação: decidir diferente sem explicar por quê.",
  },
];
