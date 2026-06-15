export type CategoriaNoticia = "Hubs" | "IA" | "Legal" | "Fomento" | "Eventos";

export interface Noticia {
  t: string;
  d: string;
  p: string;
  u: string;
  c: CategoriaNoticia;
  dt: string;
}

export const noticias: Noticia[] = [
  {
    "t": "Canoas realiza pela primeira vez o 12º Startup Day e fortalece ecossistema de inovação",
    "d": "... gov.br/wp-content/uploads/2026/03/RED-21-03-26-1°-STARTUP-DAY-VINICIUS ... O encontro ocorreu na Universidade La Salle, e reuniu empreendedores, ...",
    "p": "Prefeitura de Canoas",
    "u": "https://www.canoas.rs.gov.br/noticias/canoas-realiza-pela-primeira-vez-o-12o-startup-day-e-fortalece-ecossistema-de-inovacao/",
    "c": "Hubs",
    "dt": "22/03/2026"
  },
  {
    "t": "Startup Day 2026 reúne empreendedores e especialistas em inovação em Atibaia",
    "d": "Mais informações podem ser obtidas pelo e-mail desenvolvimento@atibaia.sp.gov.br ou pelo WhatsApp (11) 97320-9516. Conteúdos Relacionados ...",
    "p": "Prefeitura de Atibaia",
    "u": "https://www.atibaia.sp.gov.br/noticias/desenvolvimento-economico/startup-day-2026-reune-empreendedores-e-especialistas-em-inovacao-em-atibaia",
    "c": "Hubs",
    "dt": "22/03/2026"
  },
  {
    "t": "Prefeitura de Gurupi prepara lançamento de rede inédita de laboratórios para fortalecer ...",
    "d": "... inovação e a melhoria contínua dos processos produtivos. Outro diferencial da iniciativa é o subsídio governamental para a realização das análises ...",
    "p": "Prefeitura de Gurupi",
    "u": "https://gurupi.to.gov.br/2026/03/prefeitura-de-gurupi-prepara-lancamento-de-rede-inedita-de-laboratorios-para-fortalecer-agroindustria-familiar/",
    "c": "IA",
    "dt": "22/03/2026"
  },
  {
    "t": "Azeitech 2026 traz novidades em sua programação | MG.GOV.BR - Agricultura",
    "d": "... novidades na programação. No dia 10 de abril, no Campo Experimental de Maria da Fé, a difusão do conhecimento e inovação na olivicultura será ...",
    "p": "Portal MG",
    "u": "https://www.mg.gov.br/agricultura/noticias/azeitech-2026-traz-novidades-em-sua-programacao",
    "c": "IA",
    "dt": "22/03/2026"
  },
  {
    "t": "Evento Nacional de Inovação Tecnológica Assistiva é aberto – Portal da Prefeitura de Uberlândia",
    "d": "Promovido pela Prefeitura e parceiros, Sisconec.TA 2026 – Evento Nacional de Inovação Tecnológica Assistiva é aberto ... O portal uberlandia.mg.gov.br ...",
    "p": "Prefeitura de Uberlândia",
    "u": "https://www.uberlandia.mg.gov.br/2026/03/20/promovido-pela-prefeitura-e-parceiros-sisconec-ta-2026-evento-nacional-de-inovacao-tecnologica-assistiva-e-aberto/",
    "c": "IA",
    "dt": "22/03/2026"
  },
  {
    "t": "MGI leva inclusão digital e amplia acesso a serviços públicos em ação do Governo na Rua ...",
    "d": "Portal institucional do Ministério da Gestão e da Inovação em Serviços Públicos. Aqui você encontra. GOV.BR: porta de entrada para a cidadania digital.",
    "p": "Governo Federal",
    "u": "https://www.gov.br/gestao/pt-br/assuntos/noticias/2026/marco/mgi-leva-inclusao-digital-e-amplia-acesso-a-servicos-publicos-em-acao-do-governo-na-rua-no-rio-de-janeiro",
    "c": "IA",
    "dt": "22/03/2026"
  },
  {
    "t": "12ª edição do Startup Day impulsiona a inovação e o empreendedorismo no Amapá",
    "d": "portal.ap.gov.br · Transparência · Agência de Notícias do Amapá. Governo do ... inovação. A programação foi estruturada para promover conteúdo ...",
    "p": "Agência de Notícias do Amapá",
    "u": "https://agenciaamapa.com.br/noticia/34831/12-edicao-do-startup-day-impulsiona-a-inovacao-e-o-empreendedorismo-no-amapa",
    "c": "Hubs",
    "dt": "22/03/2026"
  },
  {
    "t": "Senhor do Bonfim dá passo histórico e lança Marco Legal da Inovação",
    "d": "... Inovação do Município. O evento aconteceu no auditório do Sebrae e ... Dúvidas, Críticas ou Sugestões? Gabinete:gabinete@senhordobonfim.ba.gov.br",
    "p": "Prefeitura Municipal de Senhor do Bonfim",
    "u": "https://senhordobonfim.ba.gov.br/senhor-do-bonfim-da-passo-historico-e-lanca-marco-legal-da-inovacao/",
    "c": "Legal",
    "dt": "22/03/2026"
  },
  {
    "t": "Centro de Inovação Tecnológica de Araçatuba (Cita) é destaque no Startup Day do Sebrae",
    "d": "O Startup Day é um evento idealizado pelo Sebrae Startups e acontece em todo o Brasil. O evento reúne o ecossistema de inovação em uma programação com ...",
    "p": "Prefeitura Municipal de Araçatuba",
    "u": "https://aracatuba.sp.gov.br/noticias/centro-de-inovacao-tecnologica-de-aracatuba-cita-e-destaque-no-startup-day-do-sebrae",
    "c": "Hubs",
    "dt": "22/03/2026"
  },
  {
    "t": "Espírito Santo apresenta Plano Estadual de Ciência, Tecnologia e Inovação - FAPES",
    "d": "Assessoria de Comunicação da Secti. Bernardo Barbosa. (27) 3636-1806 / (27) 9 8829-2953. comunicacao@secti.es.gov.br. Assessoria de Comunicação da ...",
    "p": "FAPES",
    "u": "https://fapes.es.gov.br/Not%C3%ADcia/espirito-santo-apresenta-plano-estadual-de-ciencia-tecnologia-e-inovacao",
    "c": "Legal",
    "dt": "22/03/2026"
  },
  {
    "t": "Parceria entre governo e BID pode gerar R$ 11,5 bi em investimentos - MSN",
    "d": "Nenhuma língua é mais “estrangeira” por causa dessa inovação japonesa inteligente ... A nova declaração do governo Trump sobre PCC e CV que preocupa o ...",
    "p": "MSN",
    "u": "https://www.msn.com/pt-br/noticias/brasil/parceria-entre-governo-e-bid-pode-gerar-r-11-5-bi-em-investimentos/ar-AA1YR791?ocid=finance-verthp-feeds&apiversion=v2&domshim=1&noservercache=1&noservertelemetry=1&batchservertelemetry=1&renderwebcomponents=1&wcseo=1",
    "c": "Fomento",
    "dt": "22/03/2026"
  },
  {
    "t": "Spotlight Paraíba: João Azevêdo entrega Carreta Tecnológica para levar qualificação digital ...",
    "d": "Daniel reconheceu os avanços dos investimentos do Governo da Paraíba em inovação e destacou a realização do Spotlight na Paraíba como simbólica ...",
    "p": "Reporter PB",
    "u": "https://www.reporterpb.com.br/noticia/paraiba/2026/03/21/spotlight-paraiba-joao-azevedo-entrega-carreta-tecnologica-para-levar-qualificacao-digital-para-os-223-municipios-da-paraiba/185037.html",
    "c": "Fomento",
    "dt": "22/03/2026"
  },
  {
    "t": "Ministério da Previdência Social premia inovação e aproxima ciência da gestão pública",
    "d": "No concurso de monografias, foram premiados trabalhos sobre temas como sustentabilidade dos sistemas previdenciários, financiamento da seguridade ...",
    "p": "SBPC",
    "u": "https://portal.sbpcnet.org.br/noticias/ministerio-da-previdencia-social-premia-inovacao-e-aproxima-ciencia-da-gestao-publica/",
    "c": "IA",
    "dt": "21/03/2026"
  },
  {
    "t": "Sict e Fapergs lançam edital de R$ 8 milhões para fortalecer ambientes de inovação no RS",
    "d": "... inovação. Isso faz parte da estratégia do governo para recuperar o Estado e fortalecer as instituições de diferentes regiões”, aponta a titular da ...",
    "p": "FAPERGS",
    "u": "https://fapergs.rs.gov.br/sict-e-fapergs-lancam-edital-de-r-8-milhoes-para-fortalecer-ambientes-de-inovacao-no-rs",
    "c": "Fomento",
    "dt": "21/03/2026"
  },
  {
    "t": "Ceará lança comitê para acelerar a inovação no setor agropecuário",
    "d": "... Governo do Ceará oficializa, nesta segunda-feira (23/3), a posse do Comitê Gestor Estadual de Inovação Agropecuária (CGEIA). O evento de ...",
    "p": "Governo do Estado do Ceará",
    "u": "https://www.ceara.gov.br/2026/03/20/ceara-lanca-comite-para-acelerar-a-inovacao-no-setor-agropecuario/",
    "c": "IA",
    "dt": "21/03/2026"
  },
  {
    "t": "Governo recebe prêmio por inovação em sistema da rede socioassistencial com foco na ...",
    "d": "O governo do Acre, por meio da Secretaria de Estado de Assistência Social e dos Direitos Humanos (SEASDH), foi reconhecido nacionalmente durante o ...",
    "p": "agencia.ac.gov.br",
    "u": "https://agencia.ac.gov.br/governo-recebe-premio-por-inovacao-em-sistema-da-rede-socioassistencial-com-foco-na-migracao-em-evento-nacional-em-belo-horizonte/",
    "c": "IA",
    "dt": "21/03/2026"
  },
  {
    "t": "Carreta da Inovação atinge 100 mil atendimentos e leva novidades a Londrina - Governo do Paraná",
    "d": "Agora, o projeto ofertará o novo jogo “Vila do Ed”, na plataforma Roblox, sobre educação fiscal, desenvolvido pela Secretaria da Fazenda (Sefa), por ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Carreta-da-Inovacao-atinge-100-mil-atendimentos-e-leva-novidades-Londrina",
    "c": "IA",
    "dt": "21/03/2026"
  },
  {
    "t": "Sema participa do South Summit Brazil 2026 com foco em inovação e sustentabilidade",
    "d": "... inovação e à sustentabilidade. Correalizado pelo Governo do Estado, o evento ocorre nos dias 25, 26 e 27/3, no Cais Mauá, em Porto A...",
    "p": "Sema",
    "u": "https://www.sema.rs.gov.br/sema-participa-do-south-summit-brazil-2026-com-foco-em-inovacao-e-sustentabilidade",
    "c": "Eventos",
    "dt": "21/03/2026"
  },
  {
    "t": "ECA Digital: MCTI anuncia edital de R$ 100 milhões para desenvolvimento de tecnologias ... - Adufg",
    "d": "Publicado em 19/03/2026 - GOV.BR, Na mídia · Facebook · Twitter ... O Ministério da Ciência, Tecnologia e Inovação (MCTI), em parceria com ...",
    "p": "Adufg",
    "u": "https://www.adufg.org.br/noticias/58-gov-br/12542-eca-digital-mcti-anuncia-edital-de-r-100-milhoes-para-desenvolvimento-de-tecnologias-de-protecao-a-criancas-e-adolescentes",
    "c": "Fomento",
    "dt": "21/03/2026"
  },
  {
    "t": "Notícias - Prefeitura Municipal de São Caetano do Sul",
    "d": "São Caetano se destacou em duas categorias estratégicas: “Gestão Inovadora” e “Compras Governamentais”. Na área de inovação, o reconhecimento veio ...",
    "p": "Prefeitura Municipal de São Caetano do Sul",
    "u": "https://www.saocaetanodosul.sp.gov.br/noticia/6400",
    "c": "Hubs",
    "dt": "21/03/2026"
  },
  {
    "t": "Inteligência artificial, políticas públicas e novas competências profissionais pautam Fórum ...",
    "d": "Evento reúne especialistas para discutir inovação, transformação digital, relações governamentais e orçamento climático entre março e abril.",
    "p": "FGV",
    "u": "https://portal.fgv.br/noticias/inteligencia-artificial-politicas-publicas-e-novas-competencias-profissionais-pautam-forum",
    "c": "IA",
    "dt": "21/03/2026"
  },
  {
    "t": "Segundo Encontro do Ecossistema de Inovação de Navegantes busca planejar ações para 2026",
    "d": "A ideia é reunir empreendedores, líderes, agentes de inovação e membros da comunidade em ações que orientem e impulsionem Navegantes em 2026.",
    "p": "Prefeitura de Navegantes -",
    "u": "https://navegantes.sc.gov.br/2026/03/19/segundo-encontro-do-ecossistema-de-inovacao-de-navegantes-busca-planejar-acoes-para-2026/",
    "c": "Hubs",
    "dt": "21/03/2026"
  },
  {
    "t": "RESULTADO FINAL DE MÉRITO – Chamada Pública FAPESC/UDESC n.º 70/2025 ...",
    "d": "RESULTADO FINAL DE MÉRITO – Chamada Pública FAPESC/UDESC n.º 70/2025 – Programa de Fomento à Pesquisa e Inovação ... inovacao@fapesc.sc.gov.br. Para ...",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/resultado-final-de-merito-chamada-publica-fapesc-udesc-n-o-70-2025-programa-de-fomento-a-pesquisa-e-inovacao-em-areas-estrategicas-para-atender-a-demanda-da-sociedade-catarinense-pela-universidade/",
    "c": "Fomento",
    "dt": "21/03/2026"
  },
  {
    "t": "Promovido pela Prefeitura e parceiros, Evento Nacional de Inovação Tecnológica Assistiva ...",
    "d": "O portal uberlandia.mg.gov.br não tem controle sobre quais cookies de terceiros serão ativados. Alguns cookies de terceiros que podem ser ...",
    "p": "Prefeitura de Uberlândia",
    "u": "https://www.uberlandia.mg.gov.br/2026/03/19/realizado-pela-prefeitura-e-parceiros-evento-nacional-de-inovacao-tecnologica-assistiva-comeca-nesta-sexta-20/",
    "c": "Eventos",
    "dt": "21/03/2026"
  },
  {
    "t": "RN fortalece ecossistema de inovação e Macaíba recebe programação do Startup Day 2026",
    "d": "... inovação e tecnologia. A edição de 2026 já registra adesão recorde em ... gabinete@macaiba.rn.gov.br. Selo UNICEF - Prefeitura Municipal de ...",
    "p": "Prefeitura Municipal de Macaíba",
    "u": "https://macaiba.rn.gov.br/rn-fortalece-ecossistema-de-inovacao-e-macaiba-recebe-programacao-do-startup-day-2026/",
    "c": "Hubs",
    "dt": "21/03/2026"
  },
  {
    "t": "11H30: CARRETA DA INOVAÇÃO CHEGA A LONDRINA COM ATIVIDADES GRATUITAS",
    "d": "Nesta sexta-feira (20), às 11h30, o secretário da Inovação e Inteligência Artificial, Alex Canziani, e o prefeito Tiago Amaral, anunciam oficialmente ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/PAUTA-DIA-20-11H30-CARRETA-DA-INOVACAO-CHEGA-LONDRINA-COM-ATIVIDADES-GRATUITAS",
    "c": "IA",
    "dt": "21/03/2026"
  },
  {
    "t": "Maceió reforça protagonismo nacional em inovação no Smart Gov Anciti - Painel Notícias",
    "d": "reuniu gestores municipais que ressaltaram como a gestão do prefeito JHC e do vice-prefeito Rodrigo Cunha tem impulsionado a inovação na capital.",
    "p": "Painel Notícias",
    "u": "https://painelnoticias.com.br/geral/261991/maceio-reforca-protagonismo-nacional-em-inovacao-no-smart-gov-anciti",
    "c": "IA",
    "dt": "21/03/2026"
  },
  {
    "t": "Programação virtual da Caravana de Inovação reúne debates sobre inovação e gestão ...",
    "d": "... GOV.BR/SECTI///. COM INFORMAÇÕES DA SECOM BAHIA/ EMERSON GESTEIRA///. Logo do Governo da Bahia. Estado da Bahia SECOM - Secretaria de Comunicação ...",
    "p": "BA.Gov",
    "u": "https://www.ba.gov.br/comunicacao/noticias/2026-03/379809/audio-programacao-virtual-da-caravana-de-inovacao-reune-debates-sobre",
    "c": "IA",
    "dt": "21/03/2026"
  },
  {
    "t": "Governo vai investir R$ 1,5 milhão em até 30 projetos de IA aplicada ao setor produtivo",
    "d": "A Agência Brasileira de Desenvolvimento Industrial (ABDI) e a Agência de Desenvolvimento e Inovação Brasileira (Agência Inova) realizam, ...",
    "p": "ConvergenciaDigital",
    "u": "https://convergenciadigital.com.br/mercado/governo-vai-investir-r-15-milhao-em-ate-30-projetos-de-ia-aplicada-ao-setor-produtivo/",
    "c": "Fomento",
    "dt": "20/03/2026"
  },
  {
    "t": "Estado promove treinamento para 48 cidades contempladas com investimentos em inovação",
    "d": "O Governo do Estado, por meio da Secretaria da Inovação e Inteligência Artificial (SEIA), realiza nesta quinta e sexta-feira (19 e 20) um workshop ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Estado-promove-treinamento-para-48-cidades-contempladas-com-investimentos-em-inovacao",
    "c": "Fomento",
    "dt": "20/03/2026"
  },
  {
    "t": "Indústria, governo e academia debatem inovação e desenvolvimento tecnológico",
    "d": "O encontro que será realizado no SESI Lab, reunirá representantes da indústria, do governo, de instituições científicas e do setor produtivo para ...",
    "p": "Capital Digital",
    "u": "https://capitaldigital.com.br/industria-governo-e-academia-debatem-inovacao-e-desenvolvimento-tecnologico/",
    "c": "IA",
    "dt": "20/03/2026"
  },
  {
    "t": "Projeto Caravanas de Inovação chega à etapa presencial em Vitória e segue com inscrições abertas",
    "d": "brasão Governo do Estado Espírito Santo. Governo do Estado do Espírito ... Após a realização dos encontros virtuais ao longo do mês de março, o projeto ...",
    "p": "SEGER",
    "u": "https://seger.es.gov.br/Not%C3%ADcia/projeto-caravanas-de-inovacao-chega-a-etapa-presencial-em-vitoria-e-segue-com-inscricoes-abertas",
    "c": "IA",
    "dt": "20/03/2026"
  },
  {
    "t": "Fapesc lança edital para credenciar Núcleos de Inovação Tecnológica em SC",
    "d": "Acesse o edital completo. Fundação de Amparo à Pesquisa e Inovação do Estado de Santa Catarina (Fapesc). Gizely Campos / gizely.campos@fapesc.sc.gov.",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/fapesc-lanca-edital-para-credenciar-nucleos-de-inovacao-tecnologica-em-sc/",
    "c": "Fomento",
    "dt": "19/03/2026"
  },
  {
    "t": "Inovação que nasce na Amazônia: PCT Guamá conecta universidades, empresas e governo",
    "d": "... inovação. O fortalecimento desses ambientes requer suporte governamental, base científica e uma cultura de empreendedorismo. “O arranjo de ...",
    "p": "Agência Pará",
    "u": "https://agenciapara.com.br/noticia/75567/inovacao-que-nasce-na-amazonia-pct-guama-conecta-universidades-empresas-e-governo",
    "c": "IA",
    "dt": "19/03/2026"
  },
  {
    "t": "Secretaria de Estado de Planejamento e Gestão é reconhecida com quatro prêmios no ...",
    "d": "... Inovação Pública entre os dias 11 e 13/3, em Goiânia (GO). As ... Gov.br, substituindo etapas de atendimento presencial ou realizadas por e ...",
    "p": "Agência Minas Gerais",
    "u": "https://www.agenciaminas.mg.gov.br/noticia/secretaria-de-estado-de-planejamento-e-gestao-e-reconhecida-com-quatro-premios-no-conexao-inova",
    "c": "IA",
    "dt": "19/03/2026"
  },
  {
    "t": "Encontro entre órgãos estratégicos reforça pautas de transformação digital e ... - Governo do Piauí",
    "d": "... inovação no âmbito estadual. A reunião teve como foco a integração ... Crie sua conta no GOV.PI Cidadão · Tabela de pagamento dos servidores do ...",
    "p": "Governo do Piauí",
    "u": "https://www.pi.gov.br/encontro-entre-orgaos-estrategicos-reforca-pautas-de-transformacao-digital-e-modernizacao-de-servicos-publicos-no-piaui/",
    "c": "IA",
    "dt": "19/03/2026"
  },
  {
    "t": "Comitiva chinesa visita empresa no Parque Canoas de Inovação para avançar tratativas de ...",
    "d": "... gov.br/wp-content/uploads/2026/03/RED-17-03-26-VISITA-EXATRON-COM-CHINESES-JULIA-KRAUSPENHAR-33-125x125.jpg. Desenvolvimento Econômico. Comitiva ...",
    "p": "Prefeitura de Canoas",
    "u": "https://www.canoas.rs.gov.br/noticias/comitiva-chinesa-visita-empresa-no-parque-canoas-de-inovacao-para-avancar-tratativas-de-investimento/",
    "c": "Hubs",
    "dt": "19/03/2026"
  },
  {
    "t": "Seplan realiza reunião do Núcleo Estratégico do PDI Bahia 2050 e avança na consolidação ...",
    "d": "... inovação. O plano está organizado a partir de uma arquitetura ... governamental e permitem o monitoramento contínuo dos resultados. Esses ...",
    "p": "BA.GOV",
    "u": "https://www.ba.gov.br/noticias/379773/seplan-realiza-reuniao-do-nucleo-estrategico-do-pdi-bahia-2050-e-avanca-na-consolidacao-do-planejamento-de-longo-prazo",
    "c": "IA",
    "dt": "19/03/2026"
  },
  {
    "t": "Entre autonomia e indução: A IA pode recomendar em quem votar nas eleições de 2026?",
    "d": "Por Júlia Matos Coelho. A IA nas eleições de 2026 exige regras para proteger a escolha do eleitor, equilibrando inovação tecnológica e integridade ...",
    "p": "Migalhas",
    "u": "https://www.migalhas.com.br/depeso/452050/autonomia-ia-pode-recomendar-em-quem-votar-nas-eleicoes-de-2026",
    "c": "IA",
    "dt": "18/03/2026"
  },
  {
    "t": "São Paulo no centro da inovação - YouTube",
    "d": "São Paulo no centro da inovação. 54 views · 6 hours ago ...more. Governo do Estado de São Paulo ... Business and innovation from São Paulo at SXSW.",
    "p": "YouTube",
    "u": "https://www.youtube.com/watch?v=n6qtl0B49as",
    "c": "Hubs",
    "dt": "17/03/2026"
  },
  {
    "t": "Programa Centelha 3: com capacitações e fomento de R$ 4 milhões, Governo do Estado ... - Fapesc",
    "d": "... Inovação (CTI). ... “Esse investimento de R$ 4 milhões dedicado à inovação reforça o papel do Governo do Estado em incentivar a economia criativa.",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/programa-centelha-3-com-capacitacoes-e-fomento-de-r-4-milhoes-governo-do-estado-incentiva-empreendedores-catarinenses-a-inovarem-na-criacao-de-novos-negocios/",
    "c": "Fomento",
    "dt": "17/03/2026"
  },
  {
    "t": "Relatório alerta para avanço de conteúdos políticos feitos com IA nas redes - YouTube",
    "d": "A nove meses das eleições de 2026, um relatório do Observatório IA nas Eleições alerta para o avanço de conteúdos políticos produzidos com ...",
    "p": "YouTube",
    "u": "https://www.youtube.com/watch?v=cxe28fjmGBs",
    "c": "IA",
    "dt": "15/03/2026"
  },
  {
    "t": "TSE cria 'lei seca da IA' e aperta o cerco contra plataformas nas eleições - UOL",
    "d": "O Tribunal Superior Eleitoral (TSE) publicou um conjunto de 14 resoluções para as eleições de 2026. As normas aprofundam o tratamento dado à ...",
    "p": "UOL",
    "u": "https://www.uol.com.br/tilt/colunas/carlos-affonso-de-souza/2026/03/15/tse-cria-lei-seca-da-ia-e-aperta-o-cerco-contra-plataformas-nas-eleicoes.htm",
    "c": "IA",
    "dt": "15/03/2026"
  },
  {
    "t": "ELEIÇÕES 2026: TSE fecha cerco ao uso de inteligência artificial, mas deixa lacunas em regras",
    "d": "O ex-presidente Jair Bolsonaro (PL) apresentou melhora em sua função renal, mas teve piora nos indicadores inflamatórios e precisou ampliar a ...",
    "p": "Blog do BG",
    "u": "https://www.blogdobg.com.br/eleicoes-2026-tse-fecha-cerco-ao-uso-de-inteligencia-artificial-mas-deixa-lacunas-em-regras/",
    "c": "IA",
    "dt": "15/03/2026"
  },
  {
    "t": "Governo atrasa edital para compra do supercomputador do plano de IA - Poder360",
    "d": "Projeto é a principal infraestrutura do programa e sustentará nuvem estatal para dados do SUS e da Petrobras. Leia mais no Poder360.",
    "p": "Poder360",
    "u": "https://www.poder360.com.br/poder-tech/governo-atrasa-edital-para-compra-do-supercomputador-do-plano-de-ia/",
    "c": "Fomento",
    "dt": "15/03/2026"
  },
  {
    "t": "TSE fecha o cerco ao uso de IA nas eleições, mas deixa lacunas em regras - PressReader",
    "d": "Corte endurece exigências para campanhas e plataformas; especialistas, porém, apontam dúvidas sobre empresas que produzem sistemas de inteligência ...",
    "p": "PressReader",
    "u": "https://www.pressreader.com/brazil/o-estado-de-s-paulo/20260315/281694031292129",
    "c": "IA",
    "dt": "15/03/2026"
  },
  {
    "t": "Advogado chama atenção para novas resoluções do TSE que vão orientar as eleições de 2026",
    "d": "Em entrevista para a rádio Nova Brasil, o advogado e presidente da Comissão de Direito Eleitoral da OAB/SE, Acácio Souto, falou sobre as recentes ...",
    "p": "AJN1",
    "u": "https://ajn1.com.br/urbano/advogado-chama-atencao-para-novas-resolucoes-do-tse-que-vao-orientar-as-eleicoes-de-2026/",
    "c": "Hubs",
    "dt": "15/03/2026"
  },
  {
    "t": "'We will hold free and fair elections' - PressReader",
    "d": "Potential clash between states and the federal government. Other bills seeking to ban immigration agents at the polls are pending in Democratic-led ...",
    "p": "PressReader",
    "u": "https://www.pressreader.com/usa/albuquerque-journal/20260315/281625311815806",
    "c": "Hubs",
    "dt": "15/03/2026"
  },
  {
    "t": "US Military Could Use AI Chatbots For War Planning, Palantir Demo Suggests - NDTV",
    "d": "US defence contractor Palantir has shown how artificial intelligence chatbots could help military analysts review intelligence and generate ...",
    "p": "NDTV",
    "u": "https://www.ndtv.com/world-news/middle-east-iran-israel-war-us-military-could-use-ai-chatbots-for-war-planning-palantir-demo-suggests-11217322",
    "c": "Hubs",
    "dt": "15/03/2026"
  },
  {
    "t": "India pushes self-reliance, ai and Drones in defence - The Sunday Guardian",
    "d": "... artificial intelligence, drones and advanced defence systems. Top 5 ... BRICS Faces Critical Test Amid Expansion and Global Tensions. News · AI ...",
    "p": "The Sunday Guardian",
    "u": "https://sundayguardianlive.com/news/india-pushes-self-reliance-ai-and-drones-in-defence-176466/",
    "c": "IA",
    "dt": "15/03/2026"
  },
  {
    "t": "Comissão aprova proposta de serviço de atendimento domiciliar a pessoa idosa",
    "d": "O substitutivo altera a Lei 8.842/94 e o Estatuto da Pessoa Idosa (Lei 10.741/03). O texto determina que a política de atendimento prevista deve ...",
    "p": "Plantão News",
    "u": "https://plantaonews.com.br/comissao-aprova-proposta-de-servico-de-atendimento-domiciliar-a-pessoa-idosa/",
    "c": "Hubs",
    "dt": "15/03/2026"
  },
  {
    "t": "Programa 'Envelhecer é Legal' ganha plano de metas para fortalecer políticas para a pessoa idosa",
    "d": "A iniciativa está alinhada à Política Nacional do Idoso, ao Estatuto da Pessoa Idosa e à Política Estadual do Idoso, além de outras legislações que ...",
    "p": "MS.GOV.",
    "u": "https://www.ms.gov.br/noticias/programa-envelhecer-e-legal-ganha-plano-de-metas-para-fortalecer-politicas-para-a-pessoa-idosa",
    "c": "Hubs",
    "dt": "15/03/2026"
  },
  {
    "t": "Finep apresenta novos investimentos em ciência, tecnologia e inovação em Cuiabá",
    "d": "Agência pública que financia a inovação, desde a pesquisa básica ... Ao restabelecer previsibilidade e escala aos recursos do FNDCT, o governo ...",
    "p": "Finep",
    "u": "http://finep.gov.br/noticias/todas-noticias/7112-finep-apresenta-novos-investimentos-em-ciencia-tecnologia-e-inovacao-em-cuiaba",
    "c": "Fomento",
    "dt": "08/03/2026"
  },
  {
    "t": "Correalizado pelo governo do Estado, Programa Impacta RS vai qualificar até 30 negócios ...",
    "d": "... governo do Estado, por meio da Secretaria de Inovação, Ciência e Tecnologia (Sict). A iniciativa vai selecionar até 30 empreendimentos com atuação ...",
    "p": "Governo RS",
    "u": "https://www.estado.rs.gov.br/correalizado-pelo-governo-do-estado-programa-impacta-rs-vai-qualificar-ate-30-negocios-em-gestao-e-captacao-de-recursos",
    "c": "IA",
    "dt": "08/03/2026"
  },
  {
    "t": "MGI recebe novos servidores do CPNU 1 e destaca diversidade, inovação e fortalecimento ...",
    "d": "... governo federal”. Para ele, o certame consolidou “um novo modelo de acesso ao serviço público, mais democrático, mais inclusivo e mais eficiente ...",
    "p": "Serviços e Informações do Brasil",
    "u": "https://www.gov.br/gestao/pt-br/assuntos/noticias/2026/marco/mgi-recebe-novos-servidores-do-cpnu-1-e-destaca-diversidade-inovacao-e-fortalecimento-do-estado",
    "c": "Hubs",
    "dt": "05/03/2026"
  },
  {
    "t": "Inovação com menor risco: a estratégia do governo para alavancar soluções criativas na ...",
    "d": "O governo federal decidiu adotar uma estratégia para inovar a administração pública reduzindo os riscos e os entraves legais do processo: aumentar ...",
    "p": "Notícias R7",
    "u": "https://noticias.r7.com/prisma/r7-planalto/inovacao-com-menor-risco-a-estrategia-do-governo-para-alavancar-solucoes-criativas-na-administracao-publica-04032026/",
    "c": "IA",
    "dt": "05/03/2026"
  },
  {
    "t": "Finep inova e avança em iniciativas de diversidade, equidade e inclusão",
    "d": "Logomarca GovBR Governo Federal. Acesso Rápido; Órgãos do Governo ... Outras iniciativas foram a inserção no Prêmio Finep de Inovação de uma ...",
    "p": "Serviços e Informações do Brasil",
    "u": "https://www.gov.br/gestao/pt-br/assuntos/noticias/2026/marco/finep-inova-e-avanca-em-iniciativas-de-diversidade-equidade-e-inclusao",
    "c": "Fomento",
    "dt": "05/03/2026"
  },
  {
    "t": "Embrapa e Governo do Paraná assinam carta de intenções para inovar cadeia produtiva da soja",
    "d": "A Empresa Brasileira de Pesquisa Agropecuária (Embrapa) e o Governo do Estado do Paraná, por intermédio da Secretaria de Inovação e Inteligência ...",
    "p": "A Embrapa",
    "u": "https://www.embrapa.br/busca-de-noticias/-/noticia/111245059/embrapa-e-governo-do-parana-assinam-carta-de-intencoes-para-inovar-cadeia-produtiva-da-soja",
    "c": "IA",
    "dt": "05/03/2026"
  },
  {
    "t": "Com investimento de R$ 5 milhões do Governo do Estado, laboratórios de Chapecó ... - Fapesc",
    "d": "O desenvolvimento de pesquisas avançadas em Santa Catarina nas áreas da saúde, biotecnologia, meio ambiente e inovação, será potencializado com a ...",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/com-investimento-de-r-5-milhoes-do-governo-do-estado-laboratorios-de-chapeco-recebem-equipamentos-de-alta-tecnologia-para-o-desenvolvimento-de-pesquisa-avancada/",
    "c": "Fomento",
    "dt": "05/03/2026"
  },
  {
    "t": "Tech Gov Fórum MT reúne especialistas e fortalece debate sobre inovação no setor público",
    "d": "Evento promovido pela MTI e Network Eventos conecta gestores, servidores e profissionais de tecnologia em Cuiabá .",
    "p": "MidiaNews",
    "u": "https://www.midianews.com.br/cotidiano/tech-gov-forum-mt-reune-especialistas-e-fortalece-debate-sobre-inovacao-no-setor-publico/515339",
    "c": "IA",
    "dt": "05/03/2026"
  },
  {
    "t": "Estação Hub promove Março da Inovação com ciclo de palestras e workshops gratuitos",
    "d": "A Prefeitura de Ponta Grossa, por meio da Agência de Inovação e Desenvolvimento e da Estação Hub, realiza durante o mês de março uma programação ...",
    "p": "Prefeitura Municipal",
    "u": "https://www.pontagrossa.pr.gov.br/2026/03/04/estacao-hub-promove-marco-da-inovacao-com-ciclo-de-palestras-e-workshops-gratuitos/",
    "c": "Hubs",
    "dt": "05/03/2026"
  },
  {
    "t": "2º lugar no Prêmio Nacional de Inovação Previdenciária reconhece modernização da ...",
    "d": "O Instituto de Previdência do Município de Caraguatatuba (CaraguaPrev) conquistou o 2º lugar do 8º Prêmio Nacional de Inovação ... gov.br/pmc/, na área ...",
    "p": "Prefeitura de Caraguatatuba",
    "u": "https://www.caraguatatuba.sp.gov.br/pmc/2026/03/2o-lugar-no-premio-nacional-de-inovacao-previdenciaria-reconhece-modernizacao-da-gestao-previdenciaria-do-caraguaprev/",
    "c": "IA",
    "dt": "04/03/2026"
  },
  {
    "t": "Participar de cursos de inovação​ - pelo Portal da Escola Virtual de Governo",
    "d": "E os cursos de inovação são projetados para desenvolver competências práticas e teóricas, promover a inovação governamental e estimular a aplicação de ...",
    "p": "GOV",
    "u": "https://www.gov.br/pt-br/servicos/participar-de-cursos-de-inovacao200b-pelo-portal-da-escola-virtual-de-governo",
    "c": "Hubs",
    "dt": "04/03/2026"
  },
  {
    "t": "Governo inaugura Laboratório Central de Inovações para impulsionar melhorias no serviço ...",
    "d": "O LabSin foi criado como núcleo permanente de inovação governamental, estimulando a cocriação, a experimentação e o desenvolvimento de novos ...",
    "p": "mt.gov.br",
    "u": "https://www.secom.mt.gov.br/w/governo-inaugura-laborat%C3%B3rio-central-de-inova%C3%A7%C3%B5es-para-impulsionar-melhorias-no-servi%C3%A7o-p%C3%BAblico-em-mt",
    "c": "Hubs",
    "dt": "04/03/2026"
  },
  {
    "t": "Seplag inaugura Espaço de Eventos e laboratório de inovação - O MATO GROSSO",
    "d": "A solenidade contou com a presença do governador Mauro Mendes e ocorreu durante o Tech Gov Forum MT. Na ocasião, também foram lançados seis novos ...",
    "p": "O MATO GROSSO",
    "u": "https://omatogrosso.com/variedades/seplag-inaugura-espaco-de-eventos-e-laboratorio-de-inovacao/",
    "c": "Eventos",
    "dt": "04/03/2026"
  },
  {
    "t": "Lançar desafio de inovação aberta​ na Plataforma (Gnova) - GOV",
    "d": "E \"Desafios\" é uma plataforma da GNova/Enap para conectar sociedade e gestores públicos na busca por soluções inovadoras que fazem a diferença no país ...",
    "p": "GOV",
    "u": "https://www.gov.br/pt-br/servicos/lancar-desafio-de-inovacao-aberta200b-na-plataforma",
    "c": "Hubs",
    "dt": "04/03/2026"
  },
  {
    "t": "Inovação Tecnológica — Instituto Chico Mendes de Conservação da Biodiversidade - GOV",
    "d": "Para melhorar a sua experiência na plataforma e prover serviços personalizados, utilizamos cookies. Ao aceitar, você terá acesso a todas as ...",
    "p": "GOV",
    "u": "https://www.gov.br/icmbio/pt-br/assuntos/pesquisa/inovacao-tecnologica",
    "c": "IA",
    "dt": "04/03/2026"
  },
  {
    "t": "Ceará fortalece inovação em hardware com DemoDay 2026 do CriarCE",
    "d": "O evento também busca aproximar empreendedores de investidores, parceiros estratégicos e representantes do ecossistema de inovação. ... SCT.CE.GOV.BR ...",
    "p": "Secretaria da Ciência, Tecnologia e Educação Superior",
    "u": "https://www.sct.ce.gov.br/2026/03/03/ceara-fortalece-inovacao-em-hardware-com-demoday-2026-do-criarce/",
    "c": "Hubs",
    "dt": "04/03/2026"
  },
  {
    "t": "Seplag inaugura Espaço de Eventos e Laboratório de Inovação no seu Complexo Administrativo",
    "d": "... governamental. O projeto arquitetônico do LabSin acompanha as tendências mais ousadas do mercado, criando um ecossistema favorável ao pensamento ...",
    "p": "mt.gov.br",
    "u": "https://www.secom.mt.gov.br/w/seplag-inaugura-espa%C3%A7o-de-eventos-e-laborat%C3%B3rio-de-inova%C3%A7%C3%A3o-no-seu-complexo-administrativo",
    "c": "Hubs",
    "dt": "04/03/2026"
  },
  {
    "t": "Estruturas do South Summit Brazil 2026 começam a ser montadas no Cais Mauá, em Porto Alegre",
    "d": "Por que é importante para o Estado sediar eventos que fomentam iniciativas de inovação como o South Summit Brazil? ... governamentais. As ...",
    "p": "Governo RS",
    "u": "https://www.estado.rs.gov.br/estruturas-do-south-summit-brazil-2026-comecam-a-ser-montadas-no-cais-maua-em-porto-alegre",
    "c": "Eventos",
    "dt": "04/03/2026"
  },
  {
    "t": "Paraíba sem Fronteiras leva servidores à Escócia e fortalece inovação no serviço público",
    "d": "Projetos que nasceram na rotina do serviço público paraibano cruzaram o Atlântico e para adquirir novas estratégias de inovação.",
    "p": "Governo da Paraíba",
    "u": "https://paraiba.pb.gov.br/diretas/secretaria-da-ciencia-tecnologia-inovacao-e-ensino-superior/noticias/paraiba-sem-fronteiras-leva-servidores-a-escocia-e-fortalece-inovacao-no-servico-publico",
    "c": "IA",
    "dt": "04/03/2026"
  },
  {
    "t": "Educação de Tubarão busca referências em inovação e tecnologia em Governador Celso Ramos",
    "d": "Durante a agenda, foram apresentadas as 17 unidades escolares da rede municipal, com destaque para a estrutura física, manutenção contínua e ...",
    "p": "Prefeitura de Tubarão",
    "u": "https://tubarao.sc.gov.br/educacao-de-tubarao-busca-referencias-em-inovacao-e-tecnologia-em-governador-celso-ramos/",
    "c": "IA",
    "dt": "04/03/2026"
  },
  {
    "t": "Paulista conquista 1º lugar nacional e coloca o município no topo da inovação previdenciária",
    "d": "A tecnologia utilizada em Paulista alia inovação, eficiência administrativa e cuidado com o segurado, reafirmando o compromisso institucional com a ...",
    "p": "Paulista",
    "u": "https://paulista.pe.gov.br/paulista-conquista-1o-lugar-nacional-e-coloca-o-municipio-no-topo-da-inovacao-previdenciaria/",
    "c": "IA",
    "dt": "04/03/2026"
  },
  {
    "t": "Prefeitura divulga inscrições para a Trilha da Inovação para Empreendedores - Presidente Kennedy",
    "d": "Origem das informações: https://presidentekennedy.es.gov.br/secretarias/Secretaria Municipal de Assistência Social. Galeria de Imagens ...",
    "p": "Presidente Kennedy",
    "u": "https://presidentekennedy.es.gov.br/noticia/3426",
    "c": "IA",
    "dt": "04/03/2026"
  },
  {
    "t": "SENAPREV conquista 4º lugar nacional em prêmio de inovação previdenciária - Senador Canedo",
    "d": "... gov.br. Go 403 Km 9 - Morada do Morro. CEP: 75.250-000. Senador Canedo - GO. Funcionamento: Segunda a Sexta das 08h às 12h e das 13h às 17h.",
    "p": "Senador Canedo",
    "u": "https://senadorcanedo.go.gov.br/senaprev-conquista-4o-lugar-nacional-em-premio-de-inovacao-previdenciaria/",
    "c": "IA",
    "dt": "04/03/2026"
  },
  {
    "t": "Sedu realiza formação para Professores Coordenadores de Inovação",
    "d": "... Inovação e fortalece a integração entre teoria e prática no cotidiano das escolas certificadas. ... Cícero Giuri | cgbona@sedu.es.gov.br. (27) 3636-7888 ...",
    "p": "SEDU",
    "u": "https://sedu.es.gov.br/Not%C3%ADcia/sedu-realiza-formacao-para-professores-coordenadores-de-inovacao-2",
    "c": "IA",
    "dt": "04/03/2026"
  },
  {
    "t": "Programa StartUP Pará lança em Belém as Trilhas da Inovação - Agência Pará",
    "d": "... Inovação, a fim de fortalecer a integração entre educação ... gov.br, e organizar os grupos participantes. As visitas ocorrerão ...",
    "p": "Agência Pará",
    "u": "https://agenciapara.com.br/noticia/75098/programa-startup-para-lanca-em-belem-as-trilhas-da-inovacao",
    "c": "Hubs",
    "dt": "04/03/2026"
  },
  {
    "t": "Hub GovTech Paraná inaugura sede em Curitiba e lança primeiro edital de aceleração",
    "d": "Localizado no terceiro andar do Canal da Música, o ambiente passa a funcionar como centro permanente de inovação aberta, conectando governo, startups, ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Hub-GovTech-Parana-inaugura-sede-em-Curitiba-e-lanca-primeiro-edital-de-aceleracao",
    "c": "Fomento",
    "dt": "03/03/2026"
  },
  {
    "t": "Guto Silva participa de entrega do Centro de Inovação Tecnológica da UEL e destaca ...",
    "d": "Por meio de uma Parceria Público-Privada (PPP) entre o Governo do Estado, a UEL e o grupo A.Yoshii, foi entregue neste sábado (28), em Londrina, o ...",
    "p": "Tribuna do Vale",
    "u": "https://tribunadovale.com.br/2026/03/01/guto-silva-participa-de-entrega-do-centro-de-inovacao-tecnologica-da-uel-e-destaca-desenvolvimento-do-setor-em-londrina/",
    "c": "Hubs",
    "dt": "02/03/2026"
  },
  {
    "t": "João Azevêdo inaugura o “Paraíba TecHub” em Lisboa e firma parceria para ampliar rede ...",
    "d": "... inovação produzida no estado. Publicado em 01/03/2026 10:17. Reprodução. O Governo da Paraíba inaugurou, nesta sexta-feira (27), em Lisboa, o Paraíba ...",
    "p": "Araruna Online",
    "u": "https://www.ararunaonline.com/noticias/paraiba/joao-azevedo-inaugura-o-paraiba-techub-em-lisboa-e-firma-parceria-para-ampliar-rede-de-inovacao-produzida-no-estado.html",
    "c": "Hubs",
    "dt": "02/03/2026"
  },
  {
    "t": "Novo modelo de estágio reforça diretrizes de inovação na gestão pública estadual",
    "d": "... inovação, eficiência administrativa e práticas de governança. A ... Entre as atribuições previstas, a Secretaria de Estado de Governo e ...",
    "p": "Rádio Caçula",
    "u": "https://www.radiocacula.com.br/novo-modelo-de-estagio-reforca-diretrizes-de-inovacao-na-gestao-publica-estadual/",
    "c": "IA",
    "dt": "02/03/2026"
  },
  {
    "t": "UEL recebe prédio do Centro de Inovação para ampliar conexão entre academia e empresas",
    "d": "A partir de agora o Governo do Paraná, por meio da UEL, executará a fase de aquisição e instalação de rede lógica, sistema de ar-condicionado, ...",
    "p": "Paçoca com Cebola",
    "u": "https://www.pacocacomcebola.com.br/destaque/uel-recebe-predio-do-centro-de-inovacao-para-ampliar-conexao-entre-academia-e-empresas/",
    "c": "Hubs",
    "dt": "02/03/2026"
  },
  {
    "t": "Secretaria de Ciência, Tecnologia e Inovação recebe mais uma edição do meetup da ...",
    "d": "Evento promovido na Secretaria de Ciência, Tecnologia e Inovação reuniu desenvolvedores, estudantes e profissionais para debates sobre carreira, ...",
    "p": "Prefeitura de Guarapuava",
    "u": "https://guarapuava.pr.gov.br/noticias/guarapuava-recebe-mais-uma-edicao-do-meetup-da-devparana-e-fortalece-a-inovacao/",
    "c": "IA",
    "dt": "01/03/2026"
  },
  {
    "t": "Conselho de Inovação e Tecnologia discute estratégias para impulsionar o ...",
    "d": "O Conselho Municipal de Inovação e Tecnologia (CMIT) realizou, no último dia 25, uma reunião para discutir estratégias para i.",
    "p": "Prefeitura de Mogi das Cruzes -",
    "u": "https://www.mogidascruzes.sp.gov.br/noticia/conselho-de-inovacao-e-tecnologia-discute-estrategias-para-impulsionar-o-desenvolvimento-tecnologico-em-mogi",
    "c": "IA",
    "dt": "01/03/2026"
  },
  {
    "t": "Campinas abre novos editais permanentes para ampliar testes de inovação no Sandbox Regulatório",
    "d": "A Prefeitura de Campinas, por meio da Secretaria de Desenvolvimento Econômico, Tecnologia e Inovação ... governamentais-inicio-/sites/ ...",
    "p": "Prefeitura Municipal de Campinas",
    "u": "https://campinas.sp.gov.br/noticias/campinas-abre-novos-editais-permanentes-para-ampliar-testes-de-inovacao-no-sandbox-regulatorio-137284",
    "c": "IA",
    "dt": "01/03/2026"
  },
  {
    "t": "TVAL | Instituto SENAI de Inovação - Ideias Que Transformam - Alesc",
    "d": "Instituto Senai. Vamos conhecer o avanço dos projetos aeroespaciais que estão colocando Santa Catarina no mapa da inovação global, com parcerias ...",
    "p": "Alesc - Assembleia Legislativa",
    "u": "https://agenciaal.alesc.sc.gov.br/index.php/tval/noticia_single_tval/instituto-senai-de-inovacaeo-ideias-que-transformam",
    "c": "IA",
    "dt": "01/03/2026"
  },
  {
    "t": "Fórum de Inovação debate cidades inteligentes e transformação digital",
    "d": "O Fórum Permanente sobre Inovação, Ciência e Tecnologia da Câmara Municipal de Piracicaba, sob a coordenação da vereadora Rai de Almeida (PT), reuniu- ...",
    "p": "Câmara Municipal de Piracicaba",
    "u": "https://www.camarapiracicaba.sp.gov.br/forum-de-inovacao-debate-cidades-inteligentes-e-transformacao-digital-70220",
    "c": "IA",
    "dt": "01/03/2026"
  },
  {
    "t": "Borbulhas Ecossistema de Inovação é oficialmente lançado em Garibaldi - Notícias",
    "d": "... Inovação. O evento ocorreu na sede do Apeme Colab Centro de ... atendimento@garibaldi.rs.gov.br. ATENDIMENTO. Segunda a Sexta-feira. Manhã ...",
    "p": "Prefeitura de Garibaldi",
    "u": "https://www.garibaldi.rs.gov.br/noticias/borbulhas-ecossistema-de-inovacao-e-oficialmente-lancado-em-garibaldi",
    "c": "Hubs",
    "dt": "01/03/2026"
  },
  {
    "t": "I Seminário Ceará Inova fortalece governança e articula inovação nos municípios cearenses",
    "d": "27 de fevereiro: O debate voltou-se para a implementação de normas municipais, compras governamentais (case EITA Recife) e acesso a recursos ...",
    "p": "Governo do Estado do Ceará",
    "u": "https://www.ceara.gov.br/2026/02/27/i-seminario-ceara-inova-fortalece-governanca-e-articula-inovacao-nos-municipios-cearenses/",
    "c": "Fomento",
    "dt": "01/03/2026"
  },
  {
    "t": "Governo realiza Spotlight Paraíba e seleciona startups para participação internacional no ...",
    "d": "O Governo da Paraíba, por meio da Secretaria de Estado da Ciência, Tecnologia, Inovação ... gov.br/. Com a realização do Spotlight Paraíba, o ...",
    "p": "Governo da Paraíba",
    "u": "https://paraiba.pb.gov.br/diretas/secretaria-da-ciencia-tecnologia-inovacao-e-ensino-superior/noticias/governo-realiza-spotlight-paraiba-e-seleciona-startups-para-participacao-internacional-no-web-summit",
    "c": "Hubs",
    "dt": "01/03/2026"
  },
  {
    "t": "Edital de Chamada Pública FAPESC/UDESC n.º 70/2025 Programa de Fomento à Pesquisa ...",
    "d": "... Inovação em Áreas Estratégicas para Atender à Demanda da Sociedade ... inovacao@fapesc.sc.gov.br. Para assuntos relacionados à Bolsas. bolsas ...",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/resultado-final-de-admissibilidade-edital-de-chamada-publica-fapesc-udesc-n-o-70-2025-programa-de-fomento-a-pesquisa-e-inovacao-em-areas-estrategicas-para-atender-a-demanda-da-sociedade-catarinense/",
    "c": "Fomento",
    "dt": "01/03/2026"
  },
  {
    "t": "11H: GOVERNO DO ESTADO INAUGURA NOVO ESPAÇO HUB GOVTECH EM CURITIBA",
    "d": "Durante a programação, representantes do governo estadual e do ecossistema de inovação estarão disponíveis para atendimento à imprensa, abordando ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/PAUTA-DIA-2-11H-GOVERNO-DO-ESTADO-INAUGURA-NOVO-ESPACO-HUB-GOVTECH-EM-CURITIBA",
    "c": "Hubs",
    "dt": "01/03/2026"
  },
  {
    "t": "Governo do Paraná, UEL e A. Yoshii entregam novo prédio do centro de inovação ... - Rádio Maringá",
    "d": "Pelo Estado, a entrega será formalizada pelos secretários Alex Canziani (Inovação e Inteligência Artificial) e Aldo Bona (Ciência, Tecnologia e Ensino ...",
    "p": "Rádio Maringá",
    "u": "https://radiomaringa.com.br/noticia/2390951/governo-do-parana-uel-e-a-yoshii-entregam-novo-predio-do-centro-de-inovacao-tecnologica-da-universidade",
    "c": "Hubs",
    "dt": "01/03/2026"
  },
  {
    "t": "Governo de SP anuncia novo polo de inovação e R$ 1,38 bilhão em investimentos no ...",
    "d": "Saúde • 10:12h • 28 de fevereiro de 2026. Governo de SP anuncia novo polo de inovação e R$ 1,38 bilhão em investimentos no Instituto Butantan.",
    "p": "Âncora 1",
    "u": "https://ancora1.com/noticias/governo-de-sp-anuncia-novo-polo-de-inovao-e-r-138-bilho-em-investimentos-no-instituto-butantan",
    "c": "Fomento",
    "dt": "01/03/2026"
  },
  {
    "t": "Governo de MG reconhece Cidade da Inovação em Poços como 11º parque tecnológico",
    "d": "Reconhecimento do Governo de Minas Gerais fortalece o Parque Tecnológico Cidade da Inovação e amplia acesso a fomento, parcerias e investimentos.",
    "p": "G1 – Globo",
    "u": "https://g1.globo.com/mg/sul-de-minas/especial-publicitario/prefeitura-de-pocos-de-caldas/prefeitura-de-pocos-de-caldas/noticia/2026/02/27/governo-de-mg-reconhece-cidade-da-inovacao-em-pocos-como-11o-parque-tecnologico.ghtml",
    "c": "Fomento",
    "dt": "01/03/2026"
  },
  {
    "t": "Prefeitura de Joinville inicia programa para impulsionar inovação entre servidores",
    "d": "A Prefeitura de Joinville, por meio da Secretaria de Desenvolvimento Econômico e Inovação, deu início nesta semana ao programa Join.",
    "p": "Prefeitura de Joinville",
    "u": "https://www.joinville.sc.gov.br/noticias/prefeitura-de-joinville-inicia-programa-para-impulsionar-inovacao-entre-servidores/",
    "c": "IA",
    "dt": "28/02/2026"
  },
  {
    "t": "Prefeitura de Jataí realiza cerimônia de tríplice lançamento e avança em inovação ...",
    "d": "... inovação. Durante a programação, foram oficializados três importantes atos ... governamental; IV. Encaminhar à Secretaria de Administração e ...",
    "p": "Prefeitura de Jataí",
    "u": "https://www.jatai.go.gov.br/prefeitura-de-jatai-realiza-cerimonia-de-triplice-lancamento-e-avanca-em-inovacao-planejamento-e-qualificacao-profissional/",
    "c": "IA",
    "dt": "28/02/2026"
  },
  {
    "t": "Finalistas do Prêmio Destaque Mulher Empreendedora 2025 realizam visita técnica à Natura",
    "d": "A experiência permitiu compreender como cada etapa é planejada com rigor técnico, inovação e responsabilidade. ... cajamar.sp.gov.br. 2026 ...",
    "p": "Prefeitura de Cajamar",
    "u": "https://cajamar.sp.gov.br/noticias/2026/02/26/finalistas-do-premio-destaque-mulher-empreendedora-2025-realizam-visita-tecnica-a-natura/",
    "c": "IA",
    "dt": "28/02/2026"
  },
  {
    "t": "Com apoio da Fapesc, UFSC celebra Prêmio INOVA e Empreendedor DNA-UFSC 2025",
    "d": "... Inovação Pedagógica, Inovação em Marketing e Inovação em Modelo de Negócio. ... inovacao@fapesc.sc.gov.br. Para assuntos relacionados à Bolsas. bolsas ...",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/com-apoio-da-fapesc-ufsc-celebra-premio-inova-e-empreendedor-dna-ufsc-2025/",
    "c": "Fomento",
    "dt": "28/02/2026"
  },
  {
    "t": "Caravana Federativa: MCTI leva soluções de inovação e educação científica para Alagoas",
    "d": "A iniciativa do Governo do Brasil ocorreu em 26 e 27 de fevereiro, em Maceió (AL). “Estamos entusiasmados em trazer para Alagoas programas ...",
    "p": "GOV",
    "u": "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2026/02/caravana-federativa-mcti-leva-solucoes-de-inovacao-e-educacao-cientifica-para-alagoas",
    "c": "Hubs",
    "dt": "27/02/2026"
  },
  {
    "t": "Governo do Estado realiza visitas de reconhecimento a ações sociais selecionadas para o ...",
    "d": "A ação busca promover acesso amplo ao ecossistema de inovação e empreendedorismo. Correalizado pelo governo do Estado, o SSB ocorrerá de 25 a 27 de ...",
    "p": "Portal do Estado do Rio Grande do Sul",
    "u": "https://www.estado.rs.gov.br/governo-do-estado-realiza-visitas-de-reconhecimento-a-acoes-sociais-selecionadas-para-o-south-summit-brazil-2026",
    "c": "Hubs",
    "dt": "27/02/2026"
  },
  {
    "t": "Ex-presidente da Estônia será destaque em evento nacional de inovação pública em Goiânia",
    "d": "... governo digital e sociedade conectada. WhatsApp Image 2026-02-26 at 09.21.29 Toomas Hendrik Ilves | Foto: Divulgação. COMPARTILHAR. RELACIONADAS. CEO ...",
    "p": "Jornal Opção",
    "u": "https://www.jornalopcao.com.br/mundo/ex-presidente-da-estonia-sera-destaque-em-evento-nacional-de-inovacao-publica-em-goiania-797911/",
    "c": "IA",
    "dt": "27/02/2026"
  },
  {
    "t": "Governo de Goiás avança na política estadual de Inteligência Artificial durante 2ª reunião do NEI-IA",
    "d": "Foi realizada, nesta quarta-feira (25/2), a 2ª Reunião Ordinária do Núcleo de Ética e Inovação em Inteligência Artificial (NEI-IA), ...",
    "p": "Portal Goiás",
    "u": "https://goias.gov.br/governo/governo-de-goias-avanca-na-politica-estadual-de-inteligencia-artificial-durante-2a-reuniao-do-nei-ia/",
    "c": "IA",
    "dt": "27/02/2026"
  },
  {
    "t": "Francisco Beltrão recebe mais de R$ 1 milhão para fortalecer inovação e tecnologia",
    "d": "... Inovação e Fundo a Fundo, iniciativa do ... Expediente Interno: 16:00h-17:30min. Telefone: (46) 3520-2121. fbeltrao@franciscobeltrao.pr.gov ...",
    "p": "Prefeitura Municipal de Francisco Beltrão",
    "u": "https://franciscobeltrao.pr.gov.br/noticias/francisco-beltrao-recebe-mais-de-r-1-milhao-para-fortalecer-inovacao-e-tecnologia/",
    "c": "Fomento",
    "dt": "26/02/2026"
  },
  {
    "t": "Missão do Ipea à China amplia cooperação em inovação, saúde e desenvolvimento",
    "d": "... governamentais, universidades e instituições estratégicas. A comitiva do Ipea foi representada pela presidenta Luciana Santos Servo e pelos ...",
    "p": "Ipea",
    "u": "https://www.ipea.gov.br/portal/categorias/45-todas-as-noticias/noticias/16270-missao-do-ipea-a-china-amplia-cooperacao-em-inovacao-saude-e-desenvolvimento",
    "c": "IA",
    "dt": "26/02/2026"
  },
  {
    "t": "Fapema lança editais para impulsionar inovação e deep techs no Maranhão",
    "d": "“A exemplo do Parque Tecnóligo Renato Archer, ambiente de inovação que está sendo reestrututrado, estas oportunidades irão impactar no desenvolvimento ...",
    "p": "Governo do Maranhão",
    "u": "https://www.ma.gov.br/noticias/fapema-lanca-editais-para-impulsionar-inovacao-e-deep-techs-no-maranhao",
    "c": "Fomento",
    "dt": "26/02/2026"
  },
  {
    "t": "Projetos contemplados em edital de internacionalização apresentam experiência em ...",
    "d": "Participaram presencialmente, na sede da Fapesc, a diretora de Ciência, Tecnologia e Inovação ... inovacao@fapesc.sc.gov.br. Para assuntos relacionados ...",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/projetos-contemplados-em-edital-de-internacionalizacao-apresentam-experiencia-em-missoes-no-exterior/",
    "c": "Fomento",
    "dt": "26/02/2026"
  },
  {
    "t": "Meetup do South Summit Brazil 2026 movimenta ecossistema de inovação em Santa Maria",
    "d": "Santa Maria sediou na terça-feira (24/2) o Meetup Regional do South Summit Brazil (SSB) 2026, evento correalizado pelo governo do Estado e que ...",
    "p": "Governo RS",
    "u": "https://www.estado.rs.gov.br/meetup-do-south-summit-brazil-2026-movimenta-ecossistema-de-inovacao-em-santa-maria",
    "c": "Hubs",
    "dt": "26/02/2026"
  },
  {
    "t": "\"Caravanas de Inovação\" da AGU chega ao Espírito Santo para fortalecer a advocacia pública",
    "d": "Hoje, a plataforma “Desafios AGU (https://desafios.agu.gov.br/)” reúne 24 projetos que vão desde um sistema de integração entre setores jurídicos para ...",
    "p": "SEGER",
    "u": "https://seger.es.gov.br/Not%C3%ADcia/caravanas-de-inovacao-da-agu-chega-ao-espirito-santo-para-fortalecer-a-advocacia-publica",
    "c": "IA",
    "dt": "26/02/2026"
  },
  {
    "t": "São Sebastião estrutura Centro Tecnológico, consolida política pública de inovação voltada ...",
    "d": "www.portaldocidadao.tce.sp.gov.br · Radar da Transparência · Política de Privacidade do Site. Home · Emails · Telefones · Mapa do Site. Depto de ...",
    "p": "Prefeitura de São Sebastião",
    "u": "https://www.saosebastiao.sp.gov.br/noticia.asp?id=N24220261741",
    "c": "IA",
    "dt": "26/02/2026"
  },
  {
    "t": "Falta um mês para o 11º Congresso de Inovação da Indústria",
    "d": "Confira os principais temas que serão debatidos por lideranças empresariais, especialistas e representantes do governo nos dias 25 e 26 de março, ...",
    "p": "Agência de Notícias da Indústria",
    "u": "https://noticias.portaldaindustria.com.br/noticias/inovacao-e-tecnologia/falta-um-mes-para-o-11o-congresso-de-inovacao-da-industria/",
    "c": "IA",
    "dt": "26/02/2026"
  },
  {
    "t": "Com apoio do Estado, startup desenvolve sistema de IA para inspeção automatizada de ativos",
    "d": "“Quando o Governo do Estado investe em uma startup, ele sinaliza confiança, credibilidade e compromisso com a inovação. O Anjo Inovador acelera ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Com-apoio-do-Estado-startup-desenvolve-sistema-de-IA-para-inspecao-automatizada-de",
    "c": "Hubs",
    "dt": "26/02/2026"
  },
  {
    "t": "Projeto Vida Longa fortalece cuidado integral à população idosa em São Pedro da Aldeia",
    "d": "“O Projeto Vida Longa reafirma o compromisso do município com a valorização da pessoa idosa, promovendo cuidado humanizado, fortalecimento de vínculos ...",
    "p": "Prefeitura de São Pedro da Aldeia",
    "u": "https://pmspa.rj.gov.br/projeto-vida-longa-fortalece-cuidado-integral-a-populacao-idosa-em-sao-pedro-da-aldeia/",
    "c": "IA",
    "dt": "24/02/2026"
  },
  {
    "t": "Com apoio de conselho, Estado terá mais R$ 20 milhões para ações com pessoas idosas",
    "d": "O Paraná aprovou, por meio do Conselho Estadual dos Direitos da Pessoa Idosa (Cedipi/PR), duas deliberações para os programas Viaja Mais 60 e Cuida ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Com-apoio-de-conselho-Estado-tera-mais-R-20-milhoes-para-acoes-com-pessoas-idosas",
    "c": "Fomento",
    "dt": "24/02/2026"
  },
  {
    "t": "Regulamento n.º 177/2026, de 23 de fevereiro | DR - Diário da República",
    "d": "O Projeto “Dar Voz ao idoso” tem como objetivos específicos: 1 - Identificar as necessidades da pessoa idosa, que permitam a definição de um plano ...",
    "p": "Diário da República",
    "u": "https://diariodarepublica.pt/dr/detalhe/regulamento/177-2026-1055938611",
    "c": "Hubs",
    "dt": "24/02/2026"
  },
  {
    "t": "Educação Financeira para a Pessoa Idosa: Qualidade de Vida e Bem-Estar Econômico - Sesc SP",
    "d": "As oficinas “Dinheiro com Sabedoria: Finanças para Viver Melhor” é voltada as pessoas idosas e tem como objetivo promover o equilíbrio financeiro ...",
    "p": "Programação - Sesc São Paulo",
    "u": "https://www.sescsp.org.br/programacao/educacao-financeira-para-a-pessoa-idosa-qualidade-de-vida-e-bem-estar-economico",
    "c": "Hubs",
    "dt": "24/02/2026"
  },
  {
    "t": "Regras do TSE para 2026 buscarão conciliar liberdade e controle da IA, avalia especialista",
    "d": "Neste ano, a disputa será para presidente, governadores, senadores e deputados federais, estaduais e distritais. O primeiro turno ocorre em 4 de ...",
    "p": "Notícias R7",
    "u": "https://noticias.r7.com/brasilia/regras-do-tse-para-2026-buscarao-conciliar-liberdade-e-controle-da-ia-avalia-especialista-23022026/",
    "c": "IA",
    "dt": "24/02/2026"
  },
  {
    "t": "TRE-GO e UFG ampliam ferramenta contra fake news e lançam aplicativo para a população ...",
    "d": "Ferramenta GuaIA está sendo sondada por diversos tribunais regionais do país — além do próprio Tribunal Superior Eleitoral (TSE).",
    "p": "Jornal Opção",
    "u": "https://www.jornalopcao.com.br/reportagem-especial/tre-go-e-ufg-ampliam-ferramenta-contra-fake-news-e-lancam-aplicativo-para-a-populacao-as-vesperas-de-2026-796320/",
    "c": "IA",
    "dt": "24/02/2026"
  },
  {
    "t": "Debate sobre moderação de plataformas avança no mundo - Poder360",
    "d": "A Índia reduziu na 6ª feira (20.fev.2026) de 36 para 3 horas o prazo para plataformas digitais removerem conteúdos considerados ilegais após ...",
    "p": "Poder360",
    "u": "https://www.poder360.com.br/poder-tech/debate-sobre-moderacao-de-plataformas-avanca-no-mundo/",
    "c": "IA",
    "dt": "24/02/2026"
  },
  {
    "t": "ONG acusam gigantes tecnológicas de mentir sobre benefícios climáticos da IA",
    "d": "Uma coligação de organizações não governamentais acusa empresas como Google e Microsoft de autopromoção ecológica para ocultar os elevados custos ...",
    "p": "SIC Notícias",
    "u": "https://sicnoticias.pt/especiais/inteligencia-artificial/2026-02-22-ong-acusam-gigantes-tecnologicas-de-mentir-sobre-beneficios-climaticos-da-ia--32b7eb65",
    "c": "IA",
    "dt": "24/02/2026"
  },
  {
    "t": "Christian scholars call for moral framework as AI reshapes relationships and community",
    "d": "... Convention in Nashville. Christian Daily International. As artificial intelligence continues to reshape media, ministry and daily life, Christian ...",
    "p": "Christian Daily International",
    "u": "https://www.christiandaily.com/news/christian-scholars-call-for-moral-framework-as-ai-reshapes-relationships-and-community",
    "c": "Hubs",
    "dt": "24/02/2026"
  },
  {
    "t": "Anthropic e Pentágono tentam resolver impasse sobre o uso militar de IA - Times Brasil",
    "d": "As duas organizações entraram em conflito ao tentar negociar os termos de uso para os modelos de IA da Anthropic. ... inteligência artificial da ...",
    "p": "Times Brasil",
    "u": "https://timesbrasil.com.br/brasil/anthropic-e-pentagono-tentam-resolver-impasse-sobre-o-uso-militar-de-ia/",
    "c": "IA",
    "dt": "24/02/2026"
  },
  {
    "t": "Inteligência de dados transforma logística marítima e amplia competitividade no comércio exterior",
    "d": "Nesse cenário, o uso estratégico de inteligência de dados e inteligência artificial ... A estratégia da Datamar inclui o uso de modelos ...",
    "p": "RADAR DIGITAL BRASÍLIA",
    "u": "https://radardigitalbrasilia.com.br/agronegocio/inteligencia-de-dados-transforma-logistica-maritima-e-amplia-competitividade-no-comercio-exterior/",
    "c": "IA",
    "dt": "24/02/2026"
  },
  {
    "t": "Secti promove Pitch Day do VAI Startup e reúne 15 startups no Centro de Inovação do Jaraguá",
    "d": "gabinetecivilal@gabinetecivil.al.gov.br; Rua Cincinato Pinto, s/n Centro - CEP 57020-050 Maceió - Alagoas; Horário de Atendimento: Segunda a sexta ...",
    "p": "Governo de Alagoas",
    "u": "https://alagoas.al.gov.br/noticia/secti-promove-pitch-day-do-vai-startup-e-reune-15-startups-no-centro-de-inovacao-do-jaragua",
    "c": "Hubs",
    "dt": "24/02/2026"
  },
  {
    "t": "Em 20 anos, Lei do Bem apoiou mais de 14 mil projetos de pesquisa, desenvolvimento e inovação",
    "d": "Por dentro do Gov.br · Dúvidas Frequentes em relação ao Portal gov.br · Dúvidas Frequentes da conta gov.br · Ajuda para Navegar o Portal · Conheça os ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2026/02/em-20-anos-lei-do-bem-apoiou-mais-de-14-mil-projetos-de-pesquisa-desenvolvimento-e-inovacao",
    "c": "Hubs",
    "dt": "24/02/2026"
  },
  {
    "t": "Promover a colaboração entre os \"Três Stakeholders\": Criar um ecossistema de inovação.",
    "d": "... inovação em larga escala, alinhado às metas de desenvolvimento até 2030 ... Fonte: https://mst.gov.vn/thuc-day-hop-tac-ba-nha-kien-tao-he-sinh-thai ...",
    "p": "Vietnam.vn",
    "u": "https://www.vietnam.vn/pt/thuc-day-hop-tac-ba-nha-kien-tao-he-sinh-thai-doi-moi-sang-tao",
    "c": "Hubs",
    "dt": "24/02/2026"
  },
  {
    "t": "Programa Catarinense de Inovação e Desenvolvimento Científico na Gestão Pública II – Fapesc",
    "d": "pesquisa@fapesc.sc.gov.br. Para assuntos relacionados à Inovação. inovacao@fapesc.sc.gov.br. Para assuntos relacionados à Bolsas. bolsas@fapesc.sc.gov ...",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/a-fapesc-comunica-a-segunda-retificacao-ao-edital-de-chamada-publica-fapesc-seplan-no-69-2025-programa-catarinense-de-inovacao-e-desenvolvimento-cientifico-na-gestao-publica-ii/",
    "c": "Fomento",
    "dt": "24/02/2026"
  },
  {
    "t": "Fapes lança 2ª edição do Edital Clusters Inovadores para fortalecer ecossistemas ...",
    "d": "A Fundação de Amparo à Pesquisa e Inovação do Espírito Santo (Fapes) lançou a 2ª edição do edital de Apoio aos Clusters de Inovação Capixaba. ... gov.br ...",
    "p": "FAPES",
    "u": "https://fapes.es.gov.br/Not%C3%ADcia/fapes-lanca-2a-edicao-do-edital-clusters-inovadores-para-fortalecer-ecossistemas-estrategicos-no-espirito-santo",
    "c": "Fomento",
    "dt": "24/02/2026"
  },
  {
    "t": "Da burocracia à tecnologia: o novo papel do governo no ecossistema de inovação",
    "d": "O Estado precisa caminhar junto do ecossistema da inovação e não esperar que as soluções simplesmente surjam e estejam prontas.",
    "p": "TecMundo",
    "u": "https://www.tecmundo.com.br/mercado/411049-da-burocracia-a-tecnologia-o-novo-papel-do-governo-no-ecossistema-de-inovacao.htm",
    "c": "Hubs",
    "dt": "24/02/2026"
  },
  {
    "t": "Governo do Estado abre inscrições para seleção de startups para o GovTech Summit 2026",
    "d": "O governo do Estado, por meio da Secretaria de Inovação, Ciência e Tecnologia (Sict), publicou, nesta segunda-feira (23/2), o edital 02/2026 de ...",
    "p": "Governo RS",
    "u": "https://www.estado.rs.gov.br/governo-do-estado-abre-inscricoes-para-selecao-de-startups-para-o-govtech-summit-2026",
    "c": "Fomento",
    "dt": "24/02/2026"
  },
  {
    "t": "HackaTchê Business 2026 está com inscrições abertas para estudantes da Rede Estadual",
    "d": "... inovação do Rio Grande do Sul. As equipes interessadas podem se ... Governo do Estado alerta para última semana de pagamento do IPVA com até ...",
    "p": "Governo RS",
    "u": "https://estado.rs.gov.br/hackatche-business-2026-esta-com-inscricoes-abertas-para-estudantes-da-rede-estadual",
    "c": "Hubs",
    "dt": "23/02/2026"
  },
  {
    "t": "Exército cria unidades de ciência e tecnologia em São Paulo - Poder360",
    "d": "Com unidades em Campinas e na capital, iniciativa foca na integração entre governo, indústria e academia para inovação em Defesa.",
    "p": "Poder360",
    "u": "https://www.poder360.com.br/poder-brasil/exercito-cria-unidades-de-ciencia-e-tecnologia-em-sao-paulo/",
    "c": "IA",
    "dt": "23/02/2026"
  },
  {
    "t": "Prefeito Marden reforça agenda de inovação e anuncia hub tecnológico em Trindade",
    "d": "... Inovação de Goiás, Raphael ... Parceria entre Prefeitura de Trindade e Governo de Goiás garante reconstrução do Terminal de Transporte Coletivo.",
    "p": "Prefeitura de Trindade",
    "u": "https://trindade.go.gov.br/prefeito-marden-reforca-agenda-de-inovacao-e-anuncia-hub-tecnologico-em-trindade/",
    "c": "Hubs",
    "dt": "23/02/2026"
  },
  {
    "t": "Fapes recebe missão da União Europeia no Espírito Santo para ampliar cooperação ...",
    "d": "Fapes recebe missão da União Europeia no Espírito Santo para ampliar cooperação internacional em ciência e inovação ... comunicacao@fapes.es.gov.br.",
    "p": "FAPES",
    "u": "https://fapes.es.gov.br/Not%C3%ADcia/fapes-recebe-missao-da-uniao-europeia-no-espirito-santo-para-ampliar-cooperacao-internacional-em-ciencia-e-inovacao",
    "c": "Fomento",
    "dt": "23/02/2026"
  },
  {
    "t": "Conecta HUB reúne especialistas, empreendedores e estudantes em dois dias de palestras ...",
    "d": "A Prefeitura de Ponta Grossa, por meio da Agência de Inovação e Desenvolvimento e da Estação Hub, realizou nesta semana o Conecta HUB – Ciclo de ...",
    "p": "Prefeitura Municipal de Ponta Grossa",
    "u": "https://www.pontagrossa.pr.gov.br/2026/02/20/conecta-hub-reune-especialistas-empreendedores-e-estudantes-em-dois-dias-de-palestras-sobre-inovacao-e-desenvolvimento-estrategico/",
    "c": "Hubs",
    "dt": "23/02/2026"
  },
  {
    "t": "MGI aposta em IA para transformar serviços públicos e fortalecer a soberania digital",
    "d": "Gestão e Inovação · Compras públicas centralizadas · Informações, sistemas e serviços de gestão · Inovação Governamental e Carreiras Transversais ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/gestao/pt-br/assuntos/noticias/2026/fevereiro/mgi-aposta-em-ia-para-transformar-servicos-publicos-e-fortalecer-a-soberania-digital",
    "c": "IA",
    "dt": "23/02/2026"
  },
  {
    "t": "Inscrições abertas para o Programa Trajetórias – Internacionalização de Servidores ... - Portal Gov.br",
    "d": "Você está aqui: Página Inicial Assuntos Gestão e Inovação Inovação Governamental e Carreiras Transversais Inovação Governamental Gestão de ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/gestao/pt-br/assuntos/gestaoeinovacao/inovacao-governamental-carreiras-transversais/inovacao-governamental/gestao-de-carreiras/fique-por-dentro/inscricoes-abertas-para-o-programa-trajetorias-2013-internacionalizacao-de-servidores-publicos-federais",
    "c": "Hubs",
    "dt": "23/02/2026"
  },
  {
    "t": "ODS Santos 2030 passa a integrar ecossistema mundial de inovação | Notícia",
    "d": "... inovação e do desenvolvimento tecnológico. O objetivo da parceria é ... gov.br/saladeimprensa. Contato e Redes Sociais. Paço Municipal Sede ...",
    "p": "Prefeitura de Santos |",
    "u": "https://www.santos.sp.gov.br/?q=noticia/ods-santos-2030-passa-a-integrar-ecossistema-mundial-de-inovacao",
    "c": "Hubs",
    "dt": "23/02/2026"
  },
  {
    "t": "Centro de Inovação Cadeia Criativa de Sobral apresenta resultados de 2025 e fortalece ...",
    "d": "SCT.CE.GOV.BR. Sede da Secitece. Av. Dr. José Martins Rodrigues, 150. Edson Queiroz, Fortaleza - CE CEP: 60.811-520. Horário de Atendimento. 08 às 17 ...",
    "p": "Secretaria da Ciência, Tecnologia e Educação Superior",
    "u": "https://www.sct.ce.gov.br/2026/02/20/centro-de-inovacao-cadeia-criativa-de-sobral-apresenta-resultados-de-2025-e-fortalece-integracao-com-secitece/",
    "c": "Hubs",
    "dt": "23/02/2026"
  },
  {
    "t": "nstituições e Plataformas para busca de Editais de Fomento a Projetos de Pesquisa - UFMA",
    "d": "Imagem Logo da ageufma - Agência de Inovação, Empreendedorismo, Pesquisa, Pós-Graduação ... Ministério da Ciência, Tecnologia e Inovação https://www.gov ...",
    "p": "UFMA",
    "u": "https://portalpadrao.ufma.br/ageufma/pesquisa/nstituicoes-e-plataformas-para-busca-de-editais-de-fomento-a-projetos-de-pesquisa",
    "c": "Fomento",
    "dt": "23/02/2026"
  },
  {
    "t": "TalksCiT movimenta ecossistema de inovação e marca aquecimento para o South Summit ...",
    "d": "Evento realizado no CIT - Parque ACCIE reuniu empreendedores, startups e lideranças para pitches, networking e conexões estratégicas.",
    "p": "Prefeitura Municipal de Erechim",
    "u": "https://www.pmerechim.rs.gov.br/noticia/22076/talkscit-movimenta-ecossistema-de-inovacao-e-marca-aquecimento-para-o-south-summit-brazil-2026",
    "c": "Hubs",
    "dt": "23/02/2026"
  },
  {
    "t": "Governo lança edital para Rede Goiana de Laboratórios de Inovação",
    "d": "A Fundação de Amparo à Pesquisa do Estado de Goiás (Fapeg) e a Secretaria de Ciência, Tecnologia e Inovação (Secti) lançaram, ...",
    "p": "Agência Cora Coralina de Notícias",
    "u": "https://agenciacoradenoticias.go.gov.br/183429-governo-lanca-edital-para-rede-goiana-de-laboratorios-de-inovacao",
    "c": "Fomento",
    "dt": "21/02/2026"
  },
  {
    "t": "Administração municipal e Sebrae oferecem consultoria gratuita para aumentar faturamento ...",
    "d": "Governo, Desenv. Econômico e Inovação · Notícias. Administração municipal ... Inovação, para identificar gargalos, reduzir custos, eliminar ...",
    "p": "Prefeitura de Bragança Paulista",
    "u": "https://www.braganca.sp.gov.br/assuntos/governo-desenv-economico-e-inovacao/administracao-municipal-e-sebrae-oferecem-consultoria-gratuita-para-aumentar-faturamento-e-produtividade-de-micro-e-pequenas-empresas",
    "c": "IA",
    "dt": "21/02/2026"
  },
  {
    "t": "Finep abre inscrições para investimento de R$ 150 milhões em economia circular e projetos ...",
    "d": "Modalidade faz parte do Programa Mais Inovação, que tem recursos não reembolsáveis e envolvem parceria com ICTs. ... Logomarca GovBR Governo Federal.",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/mdic/pt-br/assuntos/noticias/2026/fevereiro/finep-abre-inscricoes-para-investimento-de-r-150-milhoes-em-economia-circular-e-projetos-sustentaveis",
    "c": "Fomento",
    "dt": "21/02/2026"
  },
  {
    "t": "Invest RS participa de missão empresarial liderada pelo governo brasileiro para Índia e ...",
    "d": "... inovação. De forma complementar à programação oficial, a agência também realizará agendas estratégicas com empresas da Índia e da Coreia do Sul ...",
    "p": "Governo RS",
    "u": "https://estado.rs.gov.br/invest-rs-participa-de-missao-empresarial-liderada-pelo-governo-brasileiro-para-india-e-coreia-do-sul",
    "c": "IA",
    "dt": "21/02/2026"
  },
  {
    "t": "Inova RS participa de Meetup do South Summit Brazil",
    "d": "... governo do Estado e que ocorrerá de 25 a 27 de março, no Cais Mauá, em ... Na sequência, foram apresentadas as ações do ecossistema local de inovação, ...",
    "p": "Inova RS",
    "u": "https://inova.rs.gov.br/inova-rs-participa-de-meetup-do-south-summit-brazil",
    "c": "Hubs",
    "dt": "21/02/2026"
  },
  {
    "t": "Fapeg prorroga prazo de inscrição para edital de inovação no Nordeste goiano",
    "d": "Edital de inovação no Nordeste goiano: pesquisadores têm até 27/ 2 para submeter propostas de bioeconomia e desenvolvimento sustentável.",
    "p": "Agência Cora Coralina de Notícias",
    "u": "https://agenciacoradenoticias.go.gov.br/183395-fapeg-prorroga-prazo-de-inscricao-para-edital-de-inovacao-no-nordeste-goiano",
    "c": "Fomento",
    "dt": "20/02/2026"
  },
  {
    "t": "Conheça as empresas selecionadas no edital Innova Ademicon - Prefeitura de Curitiba",
    "d": "A Agência Curitiba de Desenvolvimento e Inovação divulgou o resultado do edital referente à chamada Innova Ademicon. ... gov.br/mapadosite/",
    "p": "Prefeitura Municipal de Curitiba",
    "u": "https://www.curitiba.pr.gov.br/noticias/conheca-as-empresas-selecionadas-no-edital-innova-ademicon/81750?utm_content=rss",
    "c": "Fomento",
    "dt": "19/02/2026"
  },
  {
    "t": "Seduct reforça apoio ao ecossistema de inovação com programa de apoio a startups",
    "d": "Esse é o objetivo do Programa Municipal de Apoio a Startups, conduzido em parceria com a Secretaria Municipal de Educação, Ciência e Tecnologia ( ...",
    "p": "Prefeitura Municipal de Campos dos Goytacazes",
    "u": "https://www.campos.rj.gov.br/exibirNoticia.php?id_noticia=102574",
    "c": "Hubs",
    "dt": "19/02/2026"
  },
  {
    "t": "Prefeitura de Imperatriz apresenta agenda com programas de emprego e seminários de inovação",
    "d": "A Prefeitura de Imperatriz, por meio da Secretaria Municipal de Desenvolvimento Econômico (SEDEC), divulgou o calendário de ações previstas para o ...",
    "p": "Prefeitura Municipal de Imperatriz",
    "u": "https://imperatriz.ma.gov.br/noticias/prefeitura-de-imperatriz-apresenta-agenda-com-programas-de-emprego-e-seminarios-de-inovacao.html",
    "c": "IA",
    "dt": "19/02/2026"
  },
  {
    "t": "Estamos anunciando o novo Desafio de Impacto Global do Google.org: IA para inovação ...",
    "d": "Para ajudar a diminuir a distância entre a promessa e a prática, estamos lançando o Desafio de Impacto do Google.org: IA para inovação governamental, ...",
    "p": "blog.google",
    "u": "https://blog.google/intl/pt-br/novidades/estamos-anunciando-o-novo-desafio-de-impacto-global-do-googleorg-ia-para-inovacao-governamental/",
    "c": "IA",
    "dt": "19/02/2026"
  },
  {
    "t": "Fapeg e Secti lançam segunda chamada de edital para apoio a laboratórios de inovação",
    "d": "... inovação da Rede Goiana de Laboratórios de Inovação. A vigência da ... gov.br. Edital: Acesse aqui. Foto: Secti. Compartilhar.",
    "p": "Portal Goiás",
    "u": "https://goias.gov.br/inovacao/fapeg-e-secti-lancam-segunda-chamada-de-edital-para-apoio-a-laboratorios-de-inovacao/",
    "c": "Fomento",
    "dt": "19/02/2026"
  },
  {
    "t": "Governo tem 3 ME para 'start up' de investigação e inovação agrícola - SAPO",
    "d": "O ministro da Agricultura e Pescas anunciou que o Governo vai ter três milhões de euros (3 ME) para criação de 'start up' nas áreas da ...",
    "p": "SAPO",
    "u": "https://sapo.pt/artigo/governo-tem-3-me-para-start-up-de-investigacao-e-inovacao-agricola-68ad9c591b42150e6084c492",
    "c": "Fomento",
    "dt": "19/02/2026"
  },
  {
    "t": "Sobradinho recebe Arena Tech com três dias de inovação, hackathon e experiências ...",
    "d": "O evento é resultado de uma parceria entre a Secretaria de Ciência, Tecnologia e Inovação ... GOVERNO DO DISTRITO FEDERAL | 2026 © Todos os direitos ...",
    "p": "Agência Brasília",
    "u": "https://www.agenciabrasilia.df.gov.br/w/sobradinho-recebe-arena-tech-com-tres-dias-de-inovacao-hackathon-e-experiencias-digitais-gratuitas",
    "c": "IA",
    "dt": "19/02/2026"
  },
  {
    "t": "Governo cria grupo de trabalho para analisar ecossistema nacional de investigação e inovação",
    "d": "Governo português cria grupo de trabalho para analisar o ecossistema nacional de investigação e inovação, visando apoiar o planejamento ...",
    "p": "Diário de Notícias",
    "u": "https://www.dn.pt/pol%C3%ADtica/governo-cria-grupo-de-trabalho-para-analisar-ecossistema-nacional-de-investigao-e-inovao",
    "c": "Hubs",
    "dt": "18/02/2026"
  },
  {
    "t": "Inovaqui fortalece protagonismo regional em acordo histórico de inovação em MS",
    "d": "Tiago Calves é coordenador do Ecossistema de Inovação de Aquidauana e um dos fundadores da Pantabio, que firmou Acordo de Parceria com o Governo ...",
    "p": "O Pantaneiro",
    "u": "https://www.opantaneiro.com.br/aquidauana/inovaqui-fortalece-protagonismo-regional-em-acordo-historico-de/232877/",
    "c": "Hubs",
    "dt": "18/02/2026"
  },
  {
    "t": "Paraíba emerge como novo polo estratégico de inovação no Nordeste",
    "d": "“Os investimentos em tecnologia da informação e inovação são fundamentais para o desenvolvimento regional. O governo tem investido no Complexo ...",
    "p": "Paraíba Business",
    "u": "https://paraibabusiness.com.br/paraiba-emerge-como-novo-polo-estrategico-de-inovacao-no-nordeste/",
    "c": "Fomento",
    "dt": "16/02/2026"
  },
  {
    "t": "UEM obtém novos registros no INPI e amplia portfólio de inovação tecnológica - Governo do Paraná",
    "d": "Entre os registros concedidos estão os softwares Obsidiana, Acesso_COR e HystTools 1.0, todos com a UEM como titular. As certificações asseguram o ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/UEM-obtem-novos-registros-no-INPI-e-amplia-portfolio-de-inovacao-tecnologica",
    "c": "IA",
    "dt": "16/02/2026"
  },
  {
    "t": "Edital seleciona instituições de ensino para inovação no SUS - Diário de Petrópolis",
    "d": "O Governo do Brasil recebe, até o dia 20 de fevereiro ... inovação, conforme avaliação técnica, jurídica e de conveniência do governo federal.",
    "p": "Diário de Petrópolis",
    "u": "https://diariodepetropolis.com.br/integra/edital-seleciona-instituicoes-de-ensino-para-inovacao-no-sus-39754",
    "c": "Fomento",
    "dt": "16/02/2026"
  },
  {
    "t": "Prefeitura investe mais de R$ 1,2 milhão em inclusão e inovação nas escolas",
    "d": "... inovação nas escolas. Prefeitura investe mais de R$ 1,2 milhão em inclusão e inovação nas escolas ... gov.br é um site confiável e verdadeiro.",
    "p": "Prefeitura de Nova Andradina",
    "u": "https://www.pmna.ms.gov.br/noticias/educacao-cultura-e-esporte/prefeitura-investe-mais-de-r-1-2-milhao-em-inclusao-e-inovacao-nas-escolas",
    "c": "Fomento",
    "dt": "15/02/2026"
  },
  {
    "t": "ITI publica Plano de Transformação Digital 2025-2027 com foco em biometria federal ...",
    "d": "Clique em Entrar para acessar sua conta gov.br. Abrir menu ... Pactuado com o Ministério da Gestão e da Inovação em Serviços Públicos ...",
    "p": "Governo Federal",
    "u": "https://www.gov.br/iti/pt-br/assuntos/noticias/indice-de-noticias/iti-publica-plano-de-transformacao-digital-2025-2027-com-foco-em-biometria-federal-assinatura-eletronica-e-interoperabilidade-de-dados",
    "c": "IA",
    "dt": "15/02/2026"
  },
  {
    "t": "Fapema lança edição especial da Revista Inovação | Estado do Maranhão",
    "d": "O periódico reúne 40 reportagens que traduzem pesquisas, projetos e trajetórias de pesquisadores vencedores do Prêmio Fapema 2025 em linguagem ...",
    "p": "Governo do Maranhão",
    "u": "https://www.ma.gov.br/noticias/fapema-lanca-edicao-especial-da-revista-inovacao",
    "c": "Fomento",
    "dt": "15/02/2026"
  },
  {
    "t": "HackaSaúde aposta em inovação para enfrentar desafios da saúde",
    "d": "Já está disponível no site da Prefeitura de Nova Lima o edital (acesse clicando aqui) do iNovaTech HackaSaúde, maratona de inovação que vai reunir ...",
    "p": "Prefeitura de Nova Lima",
    "u": "https://novalima.mg.gov.br/inicio/noticias/hackasaude_aposta_em_inovacao_para_enfrentar_desafios_da_saude",
    "c": "Fomento",
    "dt": "15/02/2026"
  },
  {
    "t": "Inovação divulga balanço do 'Dia de Oportunidade' - Portal Oficial de Franca - São Paulo",
    "d": "A Secretaria de Inovação e Desenvolvimento realizou nesta semana a primeira edição do 'Dia de Oportunidade' deste ano, evento que busca ...",
    "p": "Portal Oficial de Franca - São Paulo",
    "u": "https://www3.franca.sp.gov.br/noticia/37944/inovao-divulga-balano-do-dia-de-oportunidade.html",
    "c": "IA",
    "dt": "15/02/2026"
  },
  {
    "t": "IBGE reafirma seu compromisso com a inovação e estuda novas alternativas para modernização",
    "d": "O IBGE reafirma sua convicção na legalidade e na necessidade estratégica de um Núcleo de Inovação ... comunica@ibge.gov.br · (21) 2142-0919 e (21) 2142- ...",
    "p": "Agência de Notícias - IBGE",
    "u": "https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/45905-ibge-reafirma-seu-compromisso-com-a-inovacao-e-estuda-novas-alternativas-para-modernizacao",
    "c": "IA",
    "dt": "15/02/2026"
  },
  {
    "t": "Governo de Sergipe institui Agenda Estratégica de Inovação e regulamenta Lei Estadual de ...",
    "d": "... Inovação, como os órgãos governamentais; a academia; Instituições Científicas, Tecnológicas e de Inovação (ICTs); e os setores primário ...",
    "p": "Governo de Sergipe",
    "u": "https://www.se.gov.br/agencia/noticias/desenvolvimento/governo_de_sergipe_institui_agenda_estrategica_de_inovacao_e_regulamenta_lei_estadual_de_inovacao",
    "c": "Legal",
    "dt": "15/02/2026"
  },
  {
    "t": "Semana de formação integra tecnologia, inteligência artificial e inovação na magistratura",
    "d": "Encerrando mais uma semana com uma programação intensa de formação durante o Curso Oficial de Formação Inicial (Cofi 2026), os(as) juízes(as) ...",
    "p": "TJMT",
    "u": "https://www.tjmt.jus.br/noticias/2026/2/semana-formacao-integra-tecnologia-inteligencia-artificial-e-inovacao-na-magistratura",
    "c": "IA",
    "dt": "14/02/2026"
  },
  {
    "t": "Pacto pela Diversidade, Equidade e Inclusão nas Estatais Federais avança com ... - Governo Federal",
    "d": "O Ministério da Gestão e da Inovação em Serviços Públicos (MGI), por meio da Secretaria de Coordenação e Governança das Empresas Estatais (SEST) ...",
    "p": "Governo Federal",
    "u": "https://www.gov.br/gestao/pt-br/assuntos/noticias/2026/fevereiro/pacto-pela-diversidade-equidade-e-inclusao-nas-estatais-federais-avanca-com-planejamento-do-ciclo-202620132027",
    "c": "IA",
    "dt": "14/02/2026"
  },
  {
    "t": "Exército cria novas estruturas de ciência e tecnologia em São Paulo - Notícias",
    "d": "As iniciativas são resultado de parcerias e visam integrar governo, academia e indústria, promovendo inovações em defesa. ... inovação no Estado de São ...",
    "p": "Exército Brasileiro",
    "u": "https://www.eb.mil.br/web/noticias/w/exercito-cria-novas-estruturas-de-ciencia-e-tecnologia-em-sao-paulo",
    "c": "IA",
    "dt": "14/02/2026"
  },
  {
    "t": "Governo Lula, através do MCTI, investe R$ 300 milhões em inovação nas indústrias de defesa",
    "d": "... Inovação Brasil e busca reduzir a dependência de tecnologias estrangeiras. O governo Lula, através do Ministério da Ciência, Tecnologia e Inovação ...",
    "p": "Hora do Povo",
    "u": "https://horadopovo.com.br/governo-lula-e-mcti-investem-r-300-milhoes-em-inovacao-nas-industrias-de-defesa/",
    "c": "Fomento",
    "dt": "14/02/2026"
  },
  {
    "t": "Sudene participa do lançamento do edital Mais Inovação, da Finep, com R$ 150 milhões ...",
    "d": "Clique em Entrar para acessar sua conta gov.br. Abrir menu principal de navegação. Superintendência do Desenvolvimento do Nordeste. Termos mais ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/sudene/pt-br/assuntos/noticias/sudene-participa-do-lancamento-do-edital-mais-inovacao-da-finep-com-r-150-milhoes-para-o-nordeste",
    "c": "Fomento",
    "dt": "13/02/2026"
  },
  {
    "t": "Meetup do South Summit Brazil 2026 reúne ecossistema de inovação em Lajeado",
    "d": "Lajeado recebeu, na terça-feira (10/2), o primeiro Meetup Regional do South Summit Brazil (SSB) 2026, evento correalizado pelo governo do Estado e ...",
    "p": "Portal do Estado do Rio Grande do Sul",
    "u": "https://www.estado.rs.gov.br/meetup-do-south-summit-brazil-2026-reune-ecossistema-de-inovacao-em-lajeado",
    "c": "Hubs",
    "dt": "13/02/2026"
  },
  {
    "t": "Proposta de metodologia de avaliação estratégica para a definição das prioridades ...",
    "d": "... inovação no âmbito da criação da AI2 - XXV Governo Constitucional. ... inovação no âmbito da nova Agência para a Investigação e Inovação (AI2).",
    "p": "XXV Governo Constitucional",
    "u": "https://www.portugal.gov.pt/pt/gc25/comunicacao/documento?i=proposta-de-metodologia-de-avaliacao-estrategica-para-a-definicao-das-prioridades-nacionais-de-investigacao-e-inovacao-no-ambito-da-criacao-da-ai2",
    "c": "IA",
    "dt": "13/02/2026"
  },
  {
    "t": "Conselho de Inovação e Tecnologia define prioridades para investimentos",
    "d": "imprensa@umuarama.pr.gov.br. Atendimento das 8h às 12h e das 13h30 às 17h30. 2026 Prefeitura de Umuarama - Todos os direitos reservados. Desenvolvido ...",
    "p": "Prefeitura de Umuarama",
    "u": "https://www.umuarama.pr.gov.br/noticias/inovao-cincia-e-tecnologia/conselho-de-inovao-e-tecnologia-define-prioridades-para-investimentos",
    "c": "Fomento",
    "dt": "13/02/2026"
  },
  {
    "t": "MoVi e Aliança para Inovação unificam ecossistema em Novo Hamburgo",
    "d": "prefeituraatende@novohamburgo.rs.gov.br. Atendimento para Imprensa: imprensa@novohamburgo.rs.gov.br. Prefeitura Municipal de Novo Hamburgo. ✓. Thanks ...",
    "p": "Prefeitura Municipal de Novo Hamburgo",
    "u": "https://www.novohamburgo.rs.gov.br/noticia/movi-alianca-inovacao-unificam-ecossistema-novo-hamburgo",
    "c": "Hubs",
    "dt": "13/02/2026"
  },
  {
    "t": "Estado planeja criação de Hub de Inovação com Paraguai para projetos na fronteira",
    "d": "... governamental, segurança pública inteligente, logística estratégica, energia e hidrogênio verde, cidades inteligentes, além de projetos de ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Estado-planeja-criacao-de-Hub-de-Inovacao-com-Paraguai-para-projetos-na-fronteira",
    "c": "Hubs",
    "dt": "13/02/2026"
  },
  {
    "t": "Estação Hub promove Conecta HUB, ciclo de palestras sobre inovação, marketing ...",
    "d": "A Prefeitura de Ponta Grossa, por meio da Agência de Inovação e Desenvolvimento e da Estação Hub, realiza nos dias 19 e 20 de fevereiro, o Conecta HUB ...",
    "p": "Prefeitura Municipal de Ponta Grossa",
    "u": "https://www.pontagrossa.pr.gov.br/2026/02/11/estacao-hub-promove-conecta-hub-ciclo-de-palestras-sobre-inovacao-marketing-seguranca-digital-e-gestao-de-pessoas/",
    "c": "Hubs",
    "dt": "13/02/2026"
  },
  {
    "t": "Governo do Brasil amplia presença feminina na ciência e na inovação em saúde",
    "d": "Clique em Entrar para acessar sua conta gov.br. Abrir menu principal de ... inovação. Foto: Getty Images. O Governo do Brasil, por meio do ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2026/02/governo-do-brasil-amplia-presenca-feminina-na-ciencia-e-na-inovacao-em-saude",
    "c": "IA",
    "dt": "13/02/2026"
  },
  {
    "t": "Fundação iNOVA fortalece ensino, pesquisa e inovação na saúde pública do Estado",
    "d": "imprensa@saude.es.gov.br. Comunicação iNOVA Capixaba. Luan Ribeiro / Giuliana Pedrini / Henrique Alves / Vinícius Gusmão / Anna Beatriz Figueiredo.",
    "p": "SESA",
    "u": "https://saude.es.gov.br/Not%C3%ADcia/fundacao-inova-fortalece-ensino-pesquisa-e-inovacao-na-saude-publica-do-estado",
    "c": "Hubs",
    "dt": "13/02/2026"
  },
  {
    "t": "Novo edital do MCTI e da Finep destina R$ 300 milhões para projetos inovadores na Base ...",
    "d": "Redes de Atendimento do Governo Federal ... A política de ciência, tecnologia e inovação é um instrumento estratégico para fortalecer a capacidade ...",
    "p": "GOV.BR",
    "u": "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2026/02/novo-edital-do-mcti-e-da-finep-destinam-r-300-milhoes-para-projetos-inovadores-na-base-industrial-de-defesa",
    "c": "Fomento",
    "dt": "13/02/2026"
  },
  {
    "t": "Estado repassa R$ 3,3 milhões para implusionar inovação em Irati, Prudentópolis e Castro",
    "d": "... Inovação e Fundo a Fundo. O aporte do Governo do Estado para as três cidades soma R$ 3.384.034,35, por meio da Secretaria da Inovação e ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Estado-repassa-R-33-milhoes-para-implusionar-inovacao-em-Irati-Prudentopolis-e-Castro",
    "c": "Fomento",
    "dt": "13/02/2026"
  },
  {
    "t": "Parceria entre BRDE e Iguassu Valley amplia ações de inovação no Oeste do Paraná",
    "d": "... Inovação Iguassu Valley para apoio à 6ª edição do Link Iguassu ... Governo do Paraná. SECRETARIA DA COMUNICAÇÃO. Palácio Iguaçu Praça Nossa ...",
    "p": "Secretaria da Comunicação",
    "u": "https://www.comunicacao.pr.gov.br/noticias/aen/f23bf4de-25dc-467d-aed8-8f38e26207dc",
    "c": "IA",
    "dt": "13/02/2026"
  },
  {
    "t": "“É preciso ter mais transparência no uso da IA no período eleitoral”, defende pesquisador",
    "d": "Bruno Mattos, coordenador de projetos no NetLab-UFRJ, falou sobre o cenário de regulamentação da Inteligência Artificial no Brasil.",
    "p": "Fundação Perseu Abramo",
    "u": "https://fpabramo.org.br/focusbrasil/2026/02/10/e-preciso-ter-mais-transparencia-no-uso-da-ia-no-periodo-eleitoral-defende-pesquisador/",
    "c": "Legal",
    "dt": "11/02/2026"
  },
  {
    "t": "PODCAST | O Café da Manhã desta quarta-feira (11) trata das regras para inteligência artificial ...",
    "d": "Andressa Michelotti, pesquisadora da UFMG e doutoranda em ciência política, discute as ferramentas e os usos que precisam de regulação e analisa os ...",
    "p": "Instagram",
    "u": "https://www.instagram.com/reel/DUm-GNkjE6E/",
    "c": "IA",
    "dt": "11/02/2026"
  },
  {
    "t": "Candidatos de MS podem ser multados em até R$ 30 mil por vídeos falsos feitos com IA",
    "d": "Candidatos podem ser multados por vídeo manipulado com IA (inteligência artificial). A medida é prevista pelo MPE (Ministério Público Eleitoral), ...",
    "p": "Jornal Midiamax",
    "u": "https://midiamax.com.br/politica/2026/candidatos-ms-podem-ser-multados-ate-r-30-mil-videos-falsos-feitos-ia/",
    "c": "Fomento",
    "dt": "11/02/2026"
  },
  {
    "t": "Lídia Jorge elogiou \"votação tão expressiva\" em António José Seguro por ser de inclusão",
    "d": "À margem da cerimónia de entrega do Prémio Pessoa, Lídia Jorge, em declarações aos jornalistas presentes na sessão, fez o elogio da Literatura ...",
    "p": "RTP",
    "u": "https://www.rtp.pt/noticias/cultura/lidia-jorge-elogiou-votacao-tao-expressiva-em-antonio-jose-seguro-por-ser-de-inclusao_n1718026",
    "c": "IA",
    "dt": "11/02/2026"
  },
  {
    "t": "IA nas eleições preocupa especialistas | Política - Valor Econômico - Globo",
    "d": "... uso de inteligência artificial (IA), avaliam especialistas ouvidos pelo Valor. As propostas sugeridas nos encontros incluem multa de até R$ 30 mil ...",
    "p": "Valor Econômico - Globo",
    "u": "https://valor.globo.com/politica/noticia/2026/02/10/ia-nas-eleicoes-preocupa-especialistas.ghtml",
    "c": "Fomento",
    "dt": "11/02/2026"
  },
  {
    "t": "Índia reforça regulação da inteligência artificial nas redes sociais - UOL",
    "d": "Índia reforça regras para uso de inteligência artificial em redes sociais ... A Índia reforçou hoje a regulação da inteligência artificial (IA), ao ...",
    "p": "UOL",
    "u": "https://www.uol.com.br/tilt/noticias/afp/2026/02/10/india-reforca-regras-para-uso-de-inteligencia-artificial-em-redes-sociais.amp.htm",
    "c": "IA",
    "dt": "11/02/2026"
  },
  {
    "t": "Bruxelas quer medidas cautelares para WhatsApp não excluir outros fornecedores de IA",
    "d": "... inteligência artificial à plataforma de conversação WhatsApp, viola regras de concorrência da União Europeia. Chega agora à conclusão de que “esta ...",
    "p": "RDP Internacional - RTP",
    "u": "https://rdpinternacional.rtp.pt/uniao-europeia/bruxelas-quer-medidas-cautelares-para-whatsapp-nao-excluir-outros-fornecedores-de-ia",
    "c": "IA",
    "dt": "11/02/2026"
  },
  {
    "t": "Como o recuo da UE nas regras sobre a IA afeta a Suíça? - SWI swissinfo.ch",
    "d": "A Comissão Europeia pretende adiar a implementação de algumas partes da nova Lei sobre o uso da inteligência artificial (IA), concedendo às ...",
    "p": "Swissinfo",
    "u": "https://www.swissinfo.ch/por/ia-suica/como-o-recuo-da-ue-nas-regras-sobre-a-ia-afeta-a-su%C3%AD%C3%A7a/90601504",
    "c": "IA",
    "dt": "11/02/2026"
  },
  {
    "t": "Senado em Pernambuco: TSE não andou com processo que pode mudar disputa - Jamildo",
    "d": "Partido do ministro Silvio Filho, consultou Justiça Eleitoral sobre candidato a governador ter mais de dois candidatos ao Senado apoiando ...",
    "p": "Jamildo",
    "u": "https://jamildo.com/politica/senado-em-pernambuco-tse-nao-andou-com-processo-que-pode-mudar-disputa.html",
    "c": "Hubs",
    "dt": "11/02/2026"
  },
  {
    "t": "Manual contra Fake News salva vidas por meio da informação - Portal Gov.br",
    "d": "Inspirada em caso trágico de fake news, Marta Alencar cria iniciativa de checagem no Nordeste e transforma a vida de professores, ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/secom/pt-br/assuntos/educacao-midiatica/mapa/iniciativas-em-destaque/manual-contra-fake-news-salva-vidas-por-meio-da-informacao",
    "c": "IA",
    "dt": "10/02/2026"
  },
  {
    "t": "Óculos inteligentes, nudes e deepfakes: TSE estuda os riscos do uso da IA nas eleições",
    "d": "TSE avalia riscos do uso de IA nas eleições de 2026 e discute novas regras para propaganda, deepfakes e conteúdos artificiais.",
    "p": "DCM",
    "u": "https://www.diariodocentrodomundo.com.br/oculos-inteligentes-nudes-e-deepfakes-tse-estuda-os-riscos-do-uso-da-ia-nas-eleicoes/",
    "c": "IA",
    "dt": "10/02/2026"
  },
  {
    "t": "Acordo de Cooperação Técnica para Pesquisa, Desenvolvimento e Inovação - Portal Gov.br",
    "d": "OBJETO: O objeto do presente Acordo de Cooperação Técnica para Pesquisa, Desenvolvimento e Inovação – PD&I nº 019/2024 é a concessão de cotas ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/iec/pt-br/acesso-a-informacao/convenios-e-transferencias/acordo-de-cooperacao-tecnica-para-pesquisa-desenvolvimento-e-inovacao",
    "c": "Hubs",
    "dt": "09/02/2026"
  },
  {
    "t": "Com vários reconhecimentos em governança e inovação, Piauí acumula conquistas pelos ...",
    "d": "... inovação na oferta de serviços digitais. Foto: Renato Braga. A ... Crie sua conta no GOV.PI Cidadão · Tabela de pagamento dos servidores do ...",
    "p": "Governo do Piauí",
    "u": "https://www.pi.gov.br/com-varios-reconhecimentos-em-governanca-e-inovacao-piaui-acumula-conquistas-pelos-bons-indicadores-sociais-de-saude-educacao-e-seguranca/",
    "c": "Hubs",
    "dt": "09/02/2026"
  },
  {
    "t": "CNJ destaca inovação do TJMT e avalia LexIA como referência em inteligência artificial",
    "d": "O Conselho Nacional de Justiça (CNJ) destacou a inovação tecnológica desenvolvida pelo Tribunal de Justiça de Mato Grosso (TJMT) durante a ...",
    "p": "TJMT",
    "u": "https://www.tjmt.jus.br/noticias/2026/1/cnj-destaca-inovacao-tjmt-e-avalia-lexia-como-referencia-em-inteligencia-artificial",
    "c": "IA",
    "dt": "30/01/2026"
  },
  {
    "t": "Regulação eleitoral não acompanha evolução da tecnologia nem da sociedade - JOTA",
    "d": "Minuta do TSE preserva pontos problemáticos de resolução de 2024 e limita debate público sobre essas escolhas.",
    "p": "JOTA",
    "u": "https://www.jota.info/opiniao-e-analise/artigos/regulacao-eleitoral-nao-acompanha-evolucao-da-tecnologia-nem-da-sociedade",
    "c": "IA",
    "dt": "30/01/2026"
  },
  {
    "t": "Eleições 2026: PF detalha estratégias de segurança e de combate à desinformação",
    "d": "A Polícia Federal participou, nessa terça-feira (27/1), do Seminário da Justiça Eleitoral promovido pelo Tribunal Superior Eleitoral (TSE)…",
    "p": "Neto Ferreira",
    "u": "https://www.netoferreira.com.br/eleicoes-2026-pf-detalha-estrategias-de-seguranca-e-de-combate-a-desinformacao/",
    "c": "IA",
    "dt": "29/01/2026"
  },
  {
    "t": "Guarujá passa a integrar grupo da Coalizão de Cidades para a Inteligência Artificial no Brasil",
    "d": "Município passa a fazer parte de um grupo escolhido pela Rede de Inovação Local (RIL) e pelo BID Lab braço de inovação do Banco Interamericano de ...",
    "p": "Prefeitura Municipal de Guarujá",
    "u": "https://www.guaruja.sp.gov.br/guaruja-passa-a-integrar-grupo-da-coalizao-de-cidades-para-a-inteligencia-artificial-no-brasil",
    "c": "IA",
    "dt": "29/01/2026"
  },
  {
    "t": "Transformação digital: novos comitês vão trabalhar para inovação da saúde pública capixaba",
    "d": "A Secretaria da Saúde coordena e dirige atividades de assistência à saúde e prestação de serviços na área médica e hospitalar em todo o Estado.",
    "p": "SESA",
    "u": "https://saude.es.gov.br/Not%C3%ADcia/transformacao-digital-novos-comites-vao-trabalhar-para-inovacao-da-saude-publica-capixaba",
    "c": "IA",
    "dt": "29/01/2026"
  },
  {
    "t": "Governo do Paraná apresenta governança do primeiro Hub de GovTech do Brasil",
    "d": "... Inovação e Inteligência Artificial (SEIA) que estrutura o modelo ... governamental, fortalecendo a transformação digital do setor público e a ...",
    "p": "Secretaria da Comunicação",
    "u": "https://www.comunicacao.pr.gov.br/noticias/aen/2c6c4eaa-0dec-4a1a-92a7-751b5badde63",
    "c": "Hubs",
    "dt": "29/01/2026"
  },
  {
    "t": "Ministério da Previdência Social cria Laboratório de Inovação em Inteligência Artificial",
    "d": "Clique em Entrar para acessar sua conta gov.br. Abrir menu principal de ... O ministro da Previdência Social, Wolney Queiroz, oficializou nesta segunda- ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/previdencia/pt-br/noticias/2026/janeiro/ministerio-da-previdencia-social-cria-laboratorio-de-inovacao-em-inteligencia-artificial",
    "c": "IA",
    "dt": "29/01/2026"
  },
  {
    "t": "Guaraqueçaba e Morretes fecham programação da Carreta da Inovação no Verão Maior",
    "d": "Segundo o secretário da Inovação e Inteligência Artificial, Alex Canziani, ao promover atividades de inovação, tecnologia, ciência e empreendedorismo ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Guaraquecaba-e-Morretes-fecham-programacao-da-Carreta-da-Inovacao-no-Verao-Maior",
    "c": "IA",
    "dt": "29/01/2026"
  },
  {
    "t": "Navegantes reúne setor produtivo e comunidade para planejar agenda de inovação em 2026",
    "d": "O 1º Encontro do Ecossistema de Inovação do ano acontece no dia 4 de fevereiro, a partir das 8h30, na ACIN.",
    "p": "Prefeitura de Navegantes -",
    "u": "https://navegantes.sc.gov.br/2026/01/27/navegantes-reune-setor-produtivo-e-comunidade-para-planejar-agenda-de-inovacao-em-2026/",
    "c": "Hubs",
    "dt": "29/01/2026"
  },
  {
    "t": "Realidade Virtual impulsiona inovação, educação e desenvolvimento - Prefeitura de Umuarama",
    "d": "... inovação local e regional. A iniciativa também contribui para a ... imprensa@umuarama.pr.gov.br. Atendimento das 8h às 12h e das 13h30 às ...",
    "p": "Prefeitura de Umuarama",
    "u": "https://www.umuarama.pr.gov.br/noticias/inovao-cincia-e-tecnologia/realidade-virtual-impulsiona-inovao-educao-e-desenvolvimento",
    "c": "Hubs",
    "dt": "29/01/2026"
  },
  {
    "t": "Vinhedo inaugura Sala Sebrae Inovação e amplia apoio ao empreendedorismo no município",
    "d": "A Prefeitura de Vinhedo inaugurou, nesta segunda-feira (26), a Sala Sebrae Inovação, o primeiro espaço do país instalado dentro de uma prefeitura com ...",
    "p": "Prefeitura de Vinhedo",
    "u": "https://www.vinhedo.sp.gov.br/portal/noticias/0/3/21124/vinhedo-inaugura-sala-sebrae-inovacao-e-amplia-apoio-ao-empreendedorismo-no-municipio",
    "c": "IA",
    "dt": "29/01/2026"
  },
  {
    "t": "Secti recebe Prêmio Ecossistema Local de Inovação de Teresina",
    "d": "... inovação da secretaria no fortalecimento do ambiente inovador da capital. ... Email: ouvidoria@pmt.pi.gov.br. Contatos Úteis. BOMBEIROS: 193; GUARDA ...",
    "p": "Prefeitura de Teresina",
    "u": "https://pmt.pi.gov.br/2026/01/27/secti-recebe-premio-ecossistema-local-de-inovacao-de-teresina/",
    "c": "Hubs",
    "dt": "29/01/2026"
  },
  {
    "t": "EDITAL DE CHAMADA PÚBLICA FAPESC N.º 006/2026 PROEVENTOS 2026 — FASE II",
    "d": "... Inovação (ICTs) catarinenses, por meio de seus pesquisadores, a ... inovacao@fapesc.sc.gov.br. Para assuntos relacionados à Bolsas. bolsas ...",
    "p": "Fapesc",
    "u": "https://fapesc.sc.gov.br/edital-de-chamada-publica-fapesc-n-o-006-2026-proeventos-2026-fase-ii/",
    "c": "Fomento",
    "dt": "29/01/2026"
  },
  {
    "t": "Governo de Sergipe fortalece conexões com o Tiradentes Innovation Center para inovação ...",
    "d": "A agenda contou com a presença do presidente da Emgetis, Bráulio Abreu, do assessor de Planejamento Estratégico da empresa, Mário Andrade, e do ...",
    "p": "Governo de Sergipe",
    "u": "https://www.se.gov.br/agencia/noticias/governo/governo_de_sergipe_fortalece_conexoes_com_o_tiradentes_innovation_center_para_inovacao_e_transformacao_digital",
    "c": "Hubs",
    "dt": "29/01/2026"
  },
  {
    "t": "Lei Municipal de Inovação fortalece ambiente tecnológico e impulsiona o desenvolvimento ...",
    "d": "O ano de 2025 consolidou Passo Fundo como um dos principais polos regionais de tecnologia e inovação do Rio Grande do Sul. ... pmpf@pmpf.rs.gov.br.",
    "p": "Prefeitura de Passo Fundo",
    "u": "https://www.pmpf.rs.gov.br/inovacao/2026/01/27/lei-municipal-de-inovacao-fortalece-ambiente-tecnologico-e-impulsiona-o-desenvolvimento-de-passo-fundo/",
    "c": "Legal",
    "dt": "29/01/2026"
  },
  {
    "t": "Jataí será a primeira cidade de Goiás com certificação ABNT em tecnologia e inovação",
    "d": "... Inovação, Cledson Matias de Oliveira, no 2º Workshop do Plano Estadual de ... governamental; IV. Encaminhar à Secretaria de Administração e ...",
    "p": "Prefeitura de Jataí",
    "u": "https://www.jatai.go.gov.br/jatai-sera-a-primeira-cidade-de-goias-com-certificacao-abnt-em-tecnologia-e-inovacao/",
    "c": "Legal",
    "dt": "29/01/2026"
  },
  {
    "t": "IncubaScience completa um ano transformando ciência em negócios inovadores no Nordeste",
    "d": "Incubadora apoia startups de tecnologia avançada e fortalece ecossistema de inovação regional com resultados concretos.",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2026/01/incubascience-completa-um-ano-transformando-ciencia-em-negocios-inovadores-no-nordeste",
    "c": "Hubs",
    "dt": "29/01/2026"
  },
  {
    "t": "Com apoio do Estado, startups criam soluções inovadoras para escolas e estudantes",
    "d": "São inovações que tiveram apoio financeiro do Governo do Estado, por meio do Programa Paraná Anjo Inovador ... Inovação e Inteligência Artificial (SEIA) ...",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Com-apoio-do-Estado-startups-criam-solucoes-inovadoras-para-escolas-e-estudantes",
    "c": "Hubs",
    "dt": "29/01/2026"
  },
  {
    "t": "Evento na Suíça fortalece Santa Catarina como plataforma internacional de inovação e negócios",
    "d": "A avaliação compartilhada por autoridades suíças, lideranças empresariais e representantes do governo catarinense indica que o encontro avançou da ...",
    "p": "Estado SC",
    "u": "https://estado.sc.gov.br/noticias/evento-na-suica-fortalece-santa-catarina-como-plataforma-internacional-de-inovacao-e-negocios/",
    "c": "Eventos",
    "dt": "29/01/2026"
  },
  {
    "t": "Conheça as Startups vencedoras do 2º Desafio de Inovação Aberta do InovaSerra",
    "d": "Laboratório de Inovação; Gerência de Governo Digital; Conselho Municipal de Ciência e Tecnologia- CMCT; COLAB; Manual - Protocolo (Servidor); Manual ...",
    "p": "Prefeitura Municipal da Serra",
    "u": "https://www.serra.es.gov.br/noticias/startups-vencedoras-do-2-desafio-de-inovacao-aberta-do-inovaserra-sao-anunciadas",
    "c": "Hubs",
    "dt": "29/01/2026"
  },
  {
    "t": "TSE publica novas regras e consulta pública para Eleições 2026 - Exame",
    "d": "Propostas incluem medidas contra ataques ao processo eleitoral nas redes sociais.",
    "p": "Exame",
    "u": "https://exame.com/esferabrasil/tse-publica-novas-regras-e-consulta-publica-para-eleicoes-2026/",
    "c": "Hubs",
    "dt": "28/01/2026"
  },
  {
    "t": "Justiça Eleitoral ainda não tem protocolos para enfrentar IA - Poder360",
    "d": "O chefe da seção de Defesa Cibernética do TSE, Marcelo Carneiro, declarou nesta 3ª feira (27.jan.2026) que ainda não há “procedimentos bem ...",
    "p": "Poder360",
    "u": "https://www.poder360.com.br/poder-eleicoes/justica-eleitoral-ainda-nao-tem-protocolos-para-enfrentar-ia/",
    "c": "IA",
    "dt": "28/01/2026"
  },
  {
    "t": "TSE atento à inteligência artificial na campanha - Correio Braziliense",
    "d": "Ministra Cármen Lúcia diz que uso abusivo da inteligência artificial ameaça a liberdade do voto e a confiança no processo eleitoral.",
    "p": "Correio Braziliense",
    "u": "https://www.correiobraziliense.com.br/politica/2026/01/7342136-tse-atento-a-inteligencia-artificial-na-campanha.html",
    "c": "IA",
    "dt": "28/01/2026"
  },
  {
    "t": "Inovação no setor público é tema da primeira edição de 2026 dos Diálogos Digitais do TJMT",
    "d": "... governo eletrônico e pela concepção e operação de laboratórios de inovação, como o iGovLab. Vitória Maria Sena. Coordenadoria de Comunicação do ...",
    "p": "TJMT",
    "u": "https://www.tjmt.jus.br/noticias/2026/1/inovacao-no-setor-publico-e-tema-primeira-edicao-2026-dialogos-digitais-tjmt",
    "c": "IA",
    "dt": "28/01/2026"
  },
  {
    "t": "Governo de SP lança edital para selecionar projetos de startups que tragam soluções para ...",
    "d": "Para o presidente da Prodesp, Gileno Barreto, a iniciativa amplia a aproximação do setor público com o ecossistema de inovação. “Estamos abrindo ...",
    "p": "Agência SP",
    "u": "https://www.agenciasp.sp.gov.br/governo-de-sp-lanca-edital-para-selecionar-projetos-de-startups-que-tragam-solucoes-para-desafios-da-administracao-publica/",
    "c": "Fomento",
    "dt": "28/01/2026"
  },
  {
    "t": "TSE discute regras das eleições e avalia uso de inteligência artificial nas campanhas",
    "d": "O Tribunal Superior Eleitoral (TSE) tem até 5 de março para aprovar as normas que vão guiar as eleições de 2026. Entre os temas mais discutidos ...",
    "p": "Noticias R7",
    "u": "https://noticias.r7.com/jr-na-tv/video/tse-discute-regras-das-eleicoes-e-avalia-uso-de-inteligencia-artificial-nas-campanhas-28012026/",
    "c": "IA",
    "dt": "28/01/2026"
  },
  {
    "t": "‘Wake up to the risks of AI, they are almost here,’ Anthropic boss warns - The Guardian",
    "d": "‘Wake up to the risks of AI, they are almost here,’ Anthropic boss warns &nbsp;&nbsp; The Guardian",
    "p": "The Guardian",
    "u": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNTFhiSWRDczVwRzhscjl1dVBCRzdKUGd5UkJEUDVOR3Bpd3JSVVhFNG5LdzlxVXJ5c1ZicThfOHQ2Y25UaWhsRVFZNmYwLTFINWxhd0VKSElna1JSZ3dQdXI1S3ktQVRkZ3l3MFcyMmQ5ZlBjZWhaaHdsZDB5STQxUkpXVGtuajNLUmhaa25qUmNIcVFGTUJhTy1aMXpJZXZYd1lfUUhRYnUxMTg5S3p6UW1",
    "c": "Hubs",
    "dt": "27/01/2026"
  },
  {
    "t": "Cármen Lúcia diz que TSE deve adotar “medidas preventivas” contra manipulação por IA",
    "d": "Presidente do TSE afirma que Justiça Eleitoral deve combater manipulações, mas sem interferir na liberdade de expressão. Leia na Gazeta do Povo.",
    "p": "Gazeta do Povo",
    "u": "https://www.gazetadopovo.com.br/eleicoes/2026/carmen-lucia-tse-adotar-medidas-preventivas-contra-manipulacao-ia/",
    "c": "IA",
    "dt": "27/01/2026"
  },
  {
    "t": "Cármen Lúcia defende uso transparente de tecnologias e atuação preventiva da Justiça",
    "d": "A presidente do Tribunal Superior Eleitoral (TSE), ministra Cármen Lúcia, disse nesta terça-feira (27/01) que é preciso garantir um uso ...",
    "p": "JOTA",
    "u": "https://www.jota.info/eleicoes/eleicoes-2026/carmen-lucia-defende-uso-transparente-de-tecnologias-e-atuacao-preventiva-da-justica",
    "c": "IA",
    "dt": "27/01/2026"
  },
  {
    "t": "IA e big techs dificultam monitoramento de desinformação nas eleições, dizem parceiros do TSE",
    "d": "Para a pesquisadora Débora Salles, coordenadora geral de pesquisa no Netlab, o Laboratório de Estudos de Internet e Redes Sociais da UFRJ ( ...",
    "p": "Folha de S.Paulo",
    "u": "https://www1.folha.uol.com.br/poder/2026/01/ia-e-big-techs-dificultam-monitoramento-de-desinformacao-nas-eleicoes-dizem-parceiros-do-tse.shtml",
    "c": "IA",
    "dt": "26/01/2026"
  },
  {
    "t": "Palantir Deepens Commercial Roots With HD Hyundai And Sovereign AI Push",
    "d": "Palantir Technologies (NasdaqGS:PLTR) has entered a large, multi-year commercial partnership with South Korea's HD Hyundai, covering shipbuilding, ...",
    "p": "Simply Wall St",
    "u": "https://simplywall.st/stocks/us/software/nasdaq-pltr/palantir-technologies/news/palantir-deepens-commercial-roots-with-hd-hyundai-and-sovere",
    "c": "Hubs",
    "dt": "26/01/2026"
  },
  {
    "t": "AI startup accused by Palantir claims lawsuit aims to scare employees from leaving - MSN",
    "d": "Three former Palantir Technologies (PLTR) employees say the company is trying to use the courts to squash their startup and deny poaching staff ...",
    "p": "MSN",
    "u": "https://www.msn.com/en-us/money/companies/ai-startup-accused-by-palantir-claims-lawsuit-aims-to-scare-employees-from-leaving/ar-AA1Ub06l?apiversion=v2&domshim=1&noservercache=1&noservertelemetry=1&batchservertelemetry=1&renderwebcomponents=1&wcseo=1",
    "c": "Hubs",
    "dt": "26/01/2026"
  },
  {
    "t": "Palantir's UK boss blasts woke criticism of NHS deal - This is Money",
    "d": "The UK boss of controversial tech firm Palantir has slammed its woke critics for trying to get the firm banned from the NHS. Advertisement. Louis ...",
    "p": "This is Money",
    "u": "https://www.thisismoney.co.uk/money/markets/article-15494175/Palantirs-UK-boss-blasts-woke-criticism-NHS-deal.html",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "Our US roots are no threat to Britain's security, claims Palantir boss - The Telegraph",
    "d": "Louis Mosley, the UK boss of Palantir, told The Telegraph there was no “kill switch” the president could deploy if he was looking for a new way to ...",
    "p": "The Telegraph",
    "u": "https://www.telegraph.co.uk/business/2026/01/25/us-roots-no-threat-to-britains-security-claims-palantir/",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "Violência contra idosos: RS é o quarto Estado com mais denúncias; saiba como se proteger | GZH",
    "d": "A violência contra a pessoa idosa é um dos fenômenos mais complexos e silenciosos da sociedade brasileira. ... Delegacia de Polícia de Proteção ao Idoso ...",
    "p": "GZH",
    "u": "https://gauchazh.clicrbs.com.br/comportamento/60-mais/noticia/2026/01/violencia-contra-idosos-rs-e-o-quarto-estado-com-mais-denuncias-saiba-como-se-proteger-cmkplwpjg01jc013gexf07cka.html",
    "c": "IA",
    "dt": "25/01/2026"
  },
  {
    "t": "Policlínica do Idoso promove oficina de artes com confecção de máscaras carnavalescas",
    "d": "... Melhor Idade' · Governo incentiva cuidado com a saúde da mulher e ... Policlínica do Idoso promove semana especial de celebração à terceira idade ...",
    "p": "Governo do Maranhão",
    "u": "https://www.ma.gov.br/noticias/policlinica-do-idoso-promove-oficina-de-artes-com-confeccao-de-mascaras-carnavalescas",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "Rio do Sul terá uma segunda Cidade do Idoso",
    "d": "Segundo ele, o foco agora se amplia para políticas públicas voltadas à terceira idade. Lagoa da Ilha amplia áreas de lazer e educação ambiental no ...",
    "p": "Portal GCD",
    "u": "https://www.gcd.com.br/rio-do-sul/rio-do-sul-tera-uma-segunda-cidade-do-idoso/",
    "c": "IA",
    "dt": "25/01/2026"
  },
  {
    "t": "Como solicitar carteira do idoso, que dá acesso a benefícios culturais e esportivos - Viva",
    "d": "A solicitação da Carteira da Pessoa Idosa é realizada no site oficial, com login pelo gov.br ou presencial pelo CRAS; o serviço é gratuito.",
    "p": "Viva",
    "u": "https://viva.com.br/cidadania-e-direitos/como-solicitar-carteira-do-idoso-em-2026-que-da-acesso-a-beneficios-culturais-e-esportivas.html",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "Governo libera cartão cheio de benefícios para idosos que ganham até 2 salários mínimos",
    "d": "Em determinados municípios do Brasil, idosos e aposentados de baixa renda também conseguem pedir a isenção do IPTU, usando a Carteira da Pessoa Idosa ...",
    "p": "Correio do Estado",
    "u": "https://correiodoestado.com.br/mix/governo-libera-cartao-cheio-de-beneficios-para-idosos-que-ganham-ate-2-salarios-minimos/",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "Políticas públicas para idosos avançam, mas execução e fiscalização seguem frágeis",
    "d": "Avanços garantiram direitos à pessoa idosa, mas falta de gestão, fiscalização e atuação dos conselhos compromete a efetivação das políticas públicas ...",
    "p": "Sintep-MT",
    "u": "https://sintep.org.br/sintep/Utilidades/view_noticia/politicas-publicas-para-idosos-avancam-mas-execucao-e-fiscalizacao-seguem-frageis/i:4668",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "Em menos de 4 anos, Fapepi bate recorde na oferta de bolsas e impulsiona inovação no Piauí",
    "d": "Em menos de 4 anos, Fapepi bate recorde na oferta de bolsas e impulsiona inovação no Piauí ... Crie sua conta no GOV.PI Cidadão · Tabela de pagamento ...",
    "p": "Governo do Piauí",
    "u": "https://www.pi.gov.br/em-menos-de-4-anos-fapepi-bate-recorde-na-oferta-de-bolsas-e-impulsiona-inovacao-no-piaui/",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "Etipi promove encontro do curso Agentes de Inovação com oficina de Design Thinking",
    "d": "A iniciativa capacita colaboradores da instituição para disseminar a cultura de inovação no ambiente organizacional. ... Crie sua conta no GOV.PI ...",
    "p": "Governo do Piauí",
    "u": "https://www.pi.gov.br/etipi-promove-encontro-do-curso-agentes-de-inovacao-com-oficina-de-design-thinking/",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "PORTARIA SGD/MGI Nº 6.618, DE 25 DE SETEMBRO DE 2024 — Governo Digital",
    "d": "... INOVAÇÃO EM SERVIÇOS PÚBLICOS, no uso das atribuições que lhe conferem o art. ... Implantar no GOV.BR solução que integrará informações governamentais ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/EFGD/portaria-sgd-mgi-no-6-618-de-25-de-setembro-de-2024",
    "c": "IA",
    "dt": "25/01/2026"
  },
  {
    "t": "Inscrições abertas para curso gratuito voltado à inovação e produtividade de empresas locais",
    "d": "... inovação, da transformação digital e do aumento da produtividade. O programa é 100% gratuito e busca empresas motivadas a inovar, que terão acesso ...",
    "p": "Prefeitura de Caçapava",
    "u": "https://www.cacapava.sp.gov.br/noticias/geral/inscricoes-abertas-para-curso-gratuito-voltado-a-inovacao-e-produtividade-de-empresas-locais",
    "c": "IA",
    "dt": "25/01/2026"
  },
  {
    "t": "Secretaria de Inovação abre inscrições para a primeira edição do Hackathon gratuito em...",
    "d": "prefeitura@olimpia.sp.gov.br. Horários Segunda-feira a Sexta-feira das 8h às 17h. CNpj 46.596.151/0001-55. Versão do Sistema: 3.4.5 ...",
    "p": "Prefeitura de Olimpia",
    "u": "https://www.olimpia.sp.gov.br/portal/noticias/0/3/7982/secretaria-de-inovacao-abre-inscricoes-para-a-primeira-edicao-do-hackathongratuitoem-olimpia",
    "c": "IA",
    "dt": "25/01/2026"
  },
  {
    "t": "Paraná inicia formação de novos residentes para impulsionar a transformação digital",
    "d": "O Governo do Paraná iniciou nesta quinta-feira (22) as atividades da terceira edição do Programa de Residência Técnica (Restec) em Inovação, ...",
    "p": "Coluna do Meio",
    "u": "https://colunadomeio.com.br/noticia/22335/parana-inicia-formacao-de-novos-residentes-para-impulsionar-a-transformacao-digital/amp",
    "c": "IA",
    "dt": "25/01/2026"
  },
  {
    "t": "Especialista vê 5 prioridades para SP e Brasil liderarem a inovação: 'Desburocratizar'; veja lista",
    "d": "Lá, o governo influencia fortemente o desenvolvimento das empresas em conexão com as universidades e investem muito em mestrados e doutorados com essa ...",
    "p": "Estadão",
    "u": "https://www.estadao.com.br/sao-paulo/sp-porta-de-entrada-para-empresas-que-querem-entrar-na-america-latina-diz-professora-sobre-inovacao/",
    "c": "IA",
    "dt": "25/01/2026"
  },
  {
    "t": "Secretário destaca importância do Observatório Econômico e do Centro de Inovação e ...",
    "d": "... Inovação nos próximos meses. “No centésimo dia de governo, fomos presenteados com a chancela do Centro de Inovação Tecnológica. Está fluindo muito ...",
    "p": "O LIBERAL REGIONAL",
    "u": "https://lr1.com.br/cidades/aracatuba/secretario-destaca-importancia-do-observatorio-economico-e-do-centro-de-inovacao-e-comemora-resultados-do-balcao-de-empregos-e-da-gol/",
    "c": "Hubs",
    "dt": "25/01/2026"
  },
  {
    "t": "Pará consolida avanços com investimentos recordes em infraestrutura e inovação",
    "d": "O governo do Pará tem realizado uma série de investimentos que consolidam avanços expressivos na educação pública estadual....",
    "p": "Agência Pará",
    "u": "https://agenciapara.com.br/noticia/74172/para-consolida-avancos-com-investimentos-recordes-em-infraestrutura-e-inovacao",
    "c": "Fomento",
    "dt": "25/01/2026"
  },
  {
    "t": "Junta pone en marcha la convocatoria para ayudas predoctorales - La Tribuna de Toledo",
    "d": "El Gobierno de Castilla-La Mancha ha puesto en marcha una convocatoria para ayudas predoctorales con una dotación económica de 1,7 millones de euros y ...",
    "p": "La Tribuna de Toledo",
    "u": "https://www.latribunadetoledo.es/noticia/ze73880df-d5e0-4d15-aad2bd9b4426a94e/202601/junta-pone-en-marcha-la-convocatoria-para-ayudas-predoctorales",
    "c": "IA",
    "dt": "24/01/2026"
  },
  {
    "t": "Amazon Launches $68M AI PhD Program - I Programmer",
    "d": "Written by Kay Ewbank. Friday, 23 January 2026. Amazon has announced a new AI PhD Fellowship program for PhD students in the area of AI research ...",
    "p": "I Programmer",
    "u": "https://www.i-programmer.info/news/150-training-a-education/18615-amazon-launches-68m-ai-phd-program.html",
    "c": "Hubs",
    "dt": "24/01/2026"
  },
  {
    "t": "AI race moves into 'API' usage phase - YouTube",
    "d": "32:29 · Go to channel DRM News. FULL: Palantir CEO Alex Karp Warns AI Will Redefine Power, War, and Economies at WEF | AI1G. DRM News. New. 83K views.",
    "p": "YouTube",
    "u": "https://www.youtube.com/watch?v=SzE0Dq-5iWk",
    "c": "Hubs",
    "dt": "24/01/2026"
  },
  {
    "t": "Palantir: How is AI Reshaping Workforce Skills and Hiring? | Technology Magazine",
    "d": "AI is changing how organisations hire, build skills & collaborate with technology to prepare for a rapidly evolving workforce, says Palantir CEO ...",
    "p": "Technology Magazine",
    "u": "https://technologymagazine.com/news/palantir-how-ai-is-reshaping-workforce-skills-and-hiring",
    "c": "Hubs",
    "dt": "24/01/2026"
  },
  {
    "t": "The great Ministry of Defence-to-Palantir pipeline - openDemocracy",
    "d": "Palantir hired four Ministry of Defence officials last year. Then it won its biggest ever contract with the department.",
    "p": "openDemocracy",
    "u": "https://www.opendemocracy.net/en/palantir-ministry-defence-hire-four-officials-2025-record-defence-contract-240-million/",
    "c": "Hubs",
    "dt": "24/01/2026"
  },
  {
    "t": "Projetos contemplados nos últimos editais do Fundo Estadual do Idoso começam a sair do papel",
    "d": "... pessoas com mais de 60 anos. ... “Esse é um projeto que nasce com propósito muito claro, valorizar a pessoa idosa, promover a autonomia inclusão social ...",
    "p": "SAS - Secretaria de Estado da Assistência Social, Mulher e F",
    "u": "https://www.sas.sc.gov.br/index.php/noticias/2762-projetos-contemplados-nos-ultimos-editais-do-fundo-estadual-do-idoso-comecam-a-sair-do-papel",
    "c": "IA",
    "dt": "24/01/2026"
  },
  {
    "t": "Governo do Estado divulga propostas selecionadas em edital do RS Talentos com 200 ...",
    "d": "O governo do Estado, por meio da Secretaria de Inovação, Ciência e Tecnologia (Sict), divulgou na sexta-feira (23/1) o resultado final das ...",
    "p": "Governo RS",
    "u": "https://www.estado.rs.gov.br/governo-do-estado-divulga-propostas-selecionadas-em-edital-do-rs-talentos-com-200-bolsas-em-engenharias-e-ciencia-da-computacao",
    "c": "Fomento",
    "dt": "24/01/2026"
  },
  {
    "t": "Seplan e Sebrae promovem capacitação de servidores sobre inovação e ... - Governo de Sergipe",
    "d": "O Governo de Sergipe, por meio da Secretaria de Estado do Planejamento, Orçamento e Gestão (Seplan), em parceria com o Serviço de Apoio às Micro e ...",
    "p": "Governo de Sergipe",
    "u": "https://www.se.gov.br/secom/noticia/seplan_e_sebrae_promovem_capacitacao_de_servidores_sobre_inovacao_e_modernizacao_de_contratacoes_publicas_em_sergipe",
    "c": "IA",
    "dt": "24/01/2026"
  },
  {
    "t": "Governo lança Prêmio Goiano de Ciência, Tecnologia e Inovação",
    "d": "A Fundação de Amparo à Pesquisa do Estado de Goiás (Fapeg) e a Secretaria de Ciência, Tecnologia e Inovação de Goiás (Secti) lançaram a edição ...",
    "p": "Agência Cora Coralina de Notícias",
    "u": "https://agenciacoradenoticias.go.gov.br/181329-governo-lanca-premio-goiano-de-ciencia-tecnologia-e-inovacao",
    "c": "Fomento",
    "dt": "24/01/2026"
  },
  {
    "t": "Agência de Inovação de UEPG vai incubar startups que trabalham com fungos e tilápias",
    "d": "GOVERNO DO ESTADO DO PARANÁ Governo do Estado do Paraná. Navegação AEN. Inicial · Últimas notícias · Rádio · Vídeos · Imagens; Editorias.",
    "p": "Governo do Paraná",
    "u": "https://www.parana.pr.gov.br/aen/Noticia/Agencia-de-Inovacao-de-UEPG-vai-incubar-startups-que-trabalham-com-fungos-e-tilapias",
    "c": "Hubs",
    "dt": "24/01/2026"
  },
  {
    "t": "Comissão de Ciência e Tecnologia impulsiona inovação com 53 leis sancionadas - Alepe",
    "d": "alepe@alepe.pe.gov.br. COMO CHEGAR. Rua da União, 397, Boa Vista, Recife, Pernambuco, Brasil, CEP: 50050-909. CNPJ: 11.426.103/0001-34. SERVIÇO DE ...",
    "p": "Alepe - Assembleia Legislativa do Estado de Pernambuco",
    "u": "https://www.alepe.pe.gov.br/2026/01/22/comissao-de-ciencia-e-tecnologia-impulsiona-inovacao-com-53-leis-sancionadas/",
    "c": "IA",
    "dt": "24/01/2026"
  },
  {
    "t": "Agência de Inovação NEO-IFPB lança chamada interna para seleção de subprojetos",
    "d": "Chamada Pública: PROINFRA 2025 EXPANSÃO; http://www.finep.gov.br/chamadas-publicas/chamadapublica/770; Inscrições de 21/01/2026 a 20/02/2026. Chamada ...",
    "p": "IFPB",
    "u": "https://www.ifpb.edu.br/noticias/2026/01/agencia-de-inovacao-neo-ifpb-lanca-chamada-interna-para-selecao-de-subprojetos",
    "c": "Fomento",
    "dt": "24/01/2026"
  },
  {
    "t": "Finep e OCB firmam acordo para ampliar acesso das cooperativas ao financiamento para inovação",
    "d": "O objetivo é estimular investimentos em inovação, com impacto direto na produtividade, sustentabilidade e competitividade do setor cooperativista. A ...",
    "p": "Finep",
    "u": "http://www.finep.gov.br/noticias/todas-noticias/7096-finep-e-ocb-firmam-acordo-para-ampliar-acesso-das-cooperativas-ao-financiamento-para-inovacao",
    "c": "Fomento",
    "dt": "24/01/2026"
  },
  {
    "t": "Why Palantir CEO Alex Karp says \"AI will destroy humanities jobs\" - The Times of India",
    "d": "In the debate over artificial intelligence, Palantir CEO Alex Karp has placed himself firmly in the second camp, at least when it comes to the ...",
    "p": "Times of India",
    "u": "https://timesofindia.indiatimes.com/education/careers/news/why-palantir-ceo-alex-karp-says-ai-will-destroy-humanities-jobs/articleshow/127122513.cms",
    "c": "IA",
    "dt": "23/01/2026"
  },
  {
    "t": "Inovação, Transparência e Democracia: Guimarães no Encerramento do Projeto CitiLink",
    "d": "O Município de Guimarães marcou presença no Workshop de Encerramento do Projeto CitiLink – Atas Transparentes, Acessíveis e Simplificadas com IA .",
    "p": "Guimarães Visível",
    "u": "https://www.guimaraesvisivel.pt/noticia-56/inovacao-transparencia-e-democracia-guimaraes-no-encerramento-do-projeto-citilink",
    "c": "IA",
    "dt": "23/01/2026"
  },
  {
    "t": "Palantir CEO Alex Karp says AI 'bolsters civil liberties,' slams EU leaders for falling behind US, China",
    "d": "Palantir CEO Alex Karp says AI \"bolsters civil liberties,\" while noting that Europe is technologically behind in adapting current AI programs ...",
    "p": "New York Post",
    "u": "https://nypost.com/2026/01/20/business/palantir-ceo-alex-karp-says-ai-bolsters-civil-liberties-slams-europe-for-falling-behind-us-china/",
    "c": "Hubs",
    "dt": "22/01/2026"
  },
  {
    "t": "MURPI afirma que o Estatuto da Pessoa Idosa nada concretiza - AbrilAbril",
    "d": "O Estatuto da Pessoa Idosa não garante aos idosos condições de vida com dignidade, independência e autonomia, nem a defesa dos seus direitos, ...",
    "p": "AbrilAbril",
    "u": "https://www.abrilabril.pt/nacional/murpi-afirma-que-o-estatuto-da-pessoa-idosa-nada-concretiza",
    "c": "IA",
    "dt": "22/01/2026"
  },
  {
    "t": "Ministério da Saúde discute diretrizes para impulsionar inovação radical em Saúde",
    "d": "Clique em Entrar para acessar sua conta gov.br. Abrir menu principal de ... Inovação Radical em Saúde. O encontro foi realizado entre os dias ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/saude/pt-br/assuntos/noticias/2026/janeiro/ministerio-da-saude-discute-diretrizes-para-impulsionar-inovacao-radical-em-saude",
    "c": "Hubs",
    "dt": "22/01/2026"
  },
  {
    "t": "Financiamentos em inovação superam R$ 300 milhões pelo segundo ano e consolidam ...",
    "d": "Em dois anos, Banco de Desenvolvimento de Minas liberou R$ 700 milhões para iniciativas inovadoras em empresas como a Sabor da Serra Laticínios.",
    "p": "SEDE - SECRETARIA DE DESENVOLVIMENTO ECONÔMICO",
    "u": "https://desenvolvimento.mg.gov.br/inicio/noticias/noticia/3289/financiamentos-em-inovacao-superam-r$-300-milhoes-pelo-segundo-ano-e-consolidam-novo-patamar-no-bdmg",
    "c": "Fomento",
    "dt": "22/01/2026"
  },
  {
    "t": "Portaria recompõe orçamento do CNPq e fortalece a formação científica no Brasil",
    "d": "Dúvidas Frequentes em relação ao Portal gov.br · Dúvidas Frequentes ... Inovação (MCTI). O crédito suplementar destinado à agência soma R$ 186 ...",
    "p": "Portal Gov.br",
    "u": "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2026/01/portaria-recompoe-orcamento-do-cnpq-e-fortalece-a-formacao-cientifica-no-brasil",
    "c": "Fomento",
    "dt": "22/01/2026"
  },
  {
    "t": "Senac e Prefeitura iniciam curso gratuito de TI no Technopark",
    "d": "“O Technopark foi criado justamente para impulsionar o conhecimento, a inovação e o empreendedorismo em Umuarama. ... imprensa@umuarama.pr.gov.br.",
    "p": "Prefeitura de Umuarama",
    "u": "https://www.umuarama.pr.gov.br/noticias/inovao-cincia-e-tecnologia/senac-e-prefeitura-iniciam-curso-gratuito-de-ti-no-technopark",
    "c": "Hubs",
    "dt": "22/01/2026"
  },
  {
    "t": "Governo de Sergipe reforça protagonismo da Sedetec no ecossistema estadual de inovação",
    "d": "Na programação, foi debatido o decreto de regulamentação da Lei Estadual de Inovação, que inclui entre seus atores a Secretaria de Estado do ...",
    "p": "Governo de Sergipe",
    "u": "https://www.se.gov.br/agencia/noticias/desenvolvimento/governo_de_sergipe_reforca_protagonismo_da_sedetec_no_ecossistema_estadual_de_inovacao",
    "c": "Legal",
    "dt": "22/01/2026"
  },
  {
    "t": "Araxá fortalece ambiente de inovação e se prepara para novos investimentos em ...",
    "d": "Araxá avança na consolidação de um ambiente favorável à inovação, ao desenvolvimento econômico e à sustentabilidade. ... ouvidoria@araxa.mg.gov.br. (34) ...",
    "p": "Notícia | Prefeitura de Araxá",
    "u": "https://www.araxa.mg.gov.br/noticia/8659/araxa-fortalece-ambiente-de-inovacao-e-se-prepara-para-novos-investimentos-em-mobilidade-sustentavel",
    "c": "Fomento",
    "dt": "22/01/2026"
  },
  {
    "t": "Prazo de inscrições do Inova Cemig Lab é prorrogado até 1/2 - Agência Minas Gerais",
    "d": "Maior programa de inovação aberta do país amplia prazo para receber startups do Brasil e do exterior ... Governo de Minas lança PPP que prevê ...",
    "p": "Agência Minas Gerais",
    "u": "https://agenciaminas.mg.gov.br/noticia/prazo-de-inscricoes-do-inova-cemig-lab-e-prorrogado-ate-1-2",
    "c": "Hubs",
    "dt": "22/01/2026"
  },
  {
    "t": "Governo do Estado lança edital de seleção de startups para a Gramado Summit 2026",
    "d": "O governo do Estado, por meio da Secretaria de Inovação, Ciência e Tecnologia (Sict), lançou, nesta quarta-feira (21/1), um edital de seleção de ...",
    "p": "Portal do Estado do Rio Grande do Sul",
    "u": "https://www.estado.rs.gov.br/governo-do-estado-lanca-edital-de-selecao-de-startups-para-a-gramado-summit-2026",
    "c": "Fomento",
    "dt": "22/01/2026"
  },
  {
    "t": "Funses 1 abre inscrições para 12° turma de Aceleração Digital - Governo ES",
    "d": "Os interessados podem se inscrever até o dia 09 de fevereiro pelo site da ACE Ventures. Para garantir o fortalecimento do ecossistema de inovação ...",
    "p": "Governo ES",
    "u": "https://www.es.gov.br/Noticia/funses-1-abre-inscricoes-para-12-turma-de-aceleracao-digital",
    "c": "Hubs",
    "dt": "22/01/2026"
  },
  {
    "t": "TSE não atualiza regras sobre IA em 1ª versão de normas para eleições - Valor Econômico",
    "d": "Um dos textos trata das regras de propaganda eleitoral e traz mudanças como a previsão de que um perfil só pode ser removido pela Justiça se houver ...",
    "p": "Valor Econômico - Globo",
    "u": "https://valor.globo.com/politica/noticia/2026/01/21/tse-nao-atualiza-regras-sobre-ia-em-1a-versao-de-normas-para-eleicoes.ghtml",
    "c": "IA",
    "dt": "21/01/2026"
  },
  {
    "t": "Palantir CEO Says AI Will Somehow Be So Great That People Will Stop Immigrating",
    "d": "When all you have is a hammer, everything looks like a nail. All Palantir CEO Alex Karp has is AI, and boy, is he ready to nail some things down ...",
    "p": "Gizmodo",
    "u": "https://gizmodo.com/palantir-ceo-says-ai-will-somehow-be-so-great-that-people-will-stop-immigrating-2000712148",
    "c": "Hubs",
    "dt": "21/01/2026"
  },
  {
    "t": "Palantir CEO says AI “will destroy\" humanities jobs but there will be “more than enough jobs ...",
    "d": "CEO of Palantir Technologies Alex Karp speaks during the World Economic Forum (WEF) annual meeting in Davos on January 20, 2026.",
    "p": "Fortune",
    "u": "https://fortune.com/2026/01/20/palantir-ceo-ai-humanities-jobs-davos-alex-karp/",
    "c": "Eventos",
    "dt": "21/01/2026"
  },
  {
    "t": "Palantir CEO Alex Karp Warns AI Will 'Destroy Humanities Jobs' - Business Insider",
    "d": "Alex Karp, CEO of Palantir, said vocational skills will dominate in the AI future.",
    "p": "Business Insider",
    "u": "https://www.businessinsider.com/palantir-ceo-alex-karp-ai-humanities-jobs-doomed-2026-1",
    "c": "Hubs",
    "dt": "21/01/2026"
  },
  {
    "t": "Prefeitura de Contagem destina R$ 500 mil do Conselho do Idoso a entidade ligada a ...",
    "d": "Organização também possui termo de cessão de área pública e outra parceria na política de assistência social.",
    "p": "O Fator",
    "u": "https://ofator.com.br/informacao/prefeitura-de-contagem-destina-r-500-mil-do-conselho-do-idoso-a-entidade-ligada-a-servidor-comissionado/",
    "c": "Fomento",
    "dt": "21/01/2026"
  }
];