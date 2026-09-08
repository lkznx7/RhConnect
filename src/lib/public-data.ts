export const AREAS = [
  "Todas as Áreas",
  "Tecnologia",
  "Atendimento & Suporte",
  "Operações",
  "Recursos Humanos",
  "Financeiro",
] as const

export const CAMPUS = [
  "Todas as Cidades",
  "São Paulo - SP",
  "Alphaville - SP",
  "100% Remoto",
  "Belo Horizonte - MG",
] as const

export const MODALIDADES = [
  "Todas as Modalidades",
  "Presencial",
  "Híbrido",
  "100% Remoto",
] as const

export const TIPOS_CONTRATO = ["CLT", "PJ", "Estágio", "Trainee"] as const

export interface Vaga {
  id: string
  titulo: string
  area: string
  campus: string
  tipoContrato: string
  modalidadeTrabalho: string
  categoria?: string
  senioridade?: string
  numeroEdital?: string
  descricao?: string
  faixaSalarial?: string
  publicadoHa?: string
  quantidadeVagas?: number
  regiao?: string
  publicadoEm?: string
  descricaoPerfil?: string
  responsabilidades?: string[]
  requisitos?: string[]
  diferenciais?: string[]
  beneficios?: string[]
  processo?: { titulo: string; descricao: string }[]
  compatibilidade?: number
}

export interface ModuloCurso {
  numero: number
  titulo: string
  horas: string
  descricao: string
  topicos?: string[]
  aulas?: number
  quiz?: boolean
}

export interface Instrutor {
  nome: string
  cargo: string
  formacao: string
  badges?: string[]
}

export interface Turma {
  codigo: string
  data: string
  vagasRestantes: string
  status: "inscricoes-abertas" | "vagas-restantes" | "esgotada"
}

export interface Curso {
  id: string
  titulo: string
  areaConhecimento: string
  modalidade: string
  categoria?: string
  nivelProficiencia?: string
  instrutor?: string
  descricao?: string
  cargaHoraria?: string
  formato?: string
  badge?: string
  capa?: string
  trilha?: string
  alunos?: string
  modulos?: ModuloCurso[]
  instrutores?: Instrutor[]
  turmas?: Turma[]
  avaliacao?: { nota: number; avaliacoes: number }
  requisitos?: string[]
  publicoAlvo?: string
  certificacao?: string
}

export interface Noticia {
  id: string
  titulo: string
  tipo: string
  criadoEm?: string
  data?: string
  autor?: string
  tempoLeitura?: string
  categoria?: string
  descricao?: string
  capa?: string
  destaque?: boolean
  conteudo?: string[]
  tags?: string[]
  relacionados?: string[]
}

export interface Candidatura {
  id: string
  vagaId: string
  vagaTitulo: string
  area: string
  modalidade: string
  cidade: string
  aplicadaEm: string
  status: "em-analise" | "entrevista" | "reprovada" | "selecionada" | "rascunho"
  compatibilidade: number
  etapa: string
}

export interface InscricaoCurso {
  id: string
  cursoId: string
  cursoTitulo: string
  turma: string
  dataInscricao: string
  status: "confirmada" | "em-analise" | "concluida" | "cancelada"
  frequencia: string
  certificado?: boolean
}

export interface Candidato {
  id: string
  nome: string
  email: string
  telefone: string
  cidade: string
  vagaId: string
  vagaTitulo: string
  fonte: string
  score: number
  status: "em-analise" | "entrevista" | "aprovado" | "descartado"
  aplicadoEm: string
  idiomas?: string[]
  formacao?: string
}

export interface Usuario {
  id: string
  nome: string
  email: string
  perfil: "ADMINISTRADOR" | "COLABORADOR" | "CANDIDATO"
  departamento: string
  status: "ativo" | "inativo"
  criadoEm: string
  ultimoAcesso: string
}

export interface CategoriaTag {
  id: string
  nome: string
  tipo: "vaga" | "curso" | "noticia"
  ativa: boolean
  atualizadaEm: string
}

export interface RelatorioSerie {
  mes: string
  valor: number
}

export const VAGAS_FALLBACK: Vaga[] = [
  {
    id: "v1",
    titulo: "Engenheiro(a) de Software Sênior — Plataforma Java/Kotlin",
    area: "Tecnologia",
    categoria: "Engenharia de Software",
    campus: "100% Remoto",
    regiao: "100% Remoto — Brasil",
    modalidadeTrabalho: "100% Remoto",
    tipoContrato: "CLT",
    senioridade: "Sênior",
    quantidadeVagas: 3,
    publicadoEm: "2024-10-12",
    publicadoHa: "Publicado há 3 dias",
    descricao:
      "Desenvolvimento de plataforma de recrutamento e seleção utilizada por mais de 8.000 empresas, com liderança técnica de squads multidisciplinares.",
    descricaoPerfil:
      "Buscamos uma pessoa engenheira de software sênior para atuar no desenvolvimento de uma plataforma de recrutamento e seleção utilizada por mais de 8.000 empresas. Você será responsável por evoluir arquitetura, garantir qualidade e performance e liderar tecnicamente squads multidisciplinares.",
    faixaSalarial: "R$ 12.000 - R$ 15.000",
    compatibilidade: 87,
    responsabilidades: [
      "Evoluir a arquitetura da plataforma e garantir qualidade e performance.",
      "Liderar tecnicamente squads multidisciplinares.",
      "Definir padrões de código, testes e revisão de pull requests.",
      "Atuar junto ao Product Management na priorização do backlog.",
    ],
    requisitos: [
      "Experiência sólida com Java 17+ e Kotlin.",
      "Domínio de Spring Boot, microsserviços e mensageria.",
      "Vivência com banco relacional (PostgreSQL) e NoSQL.",
      "Experiência com testes automatizados e CI/CD.",
    ],
    diferenciais: [
      "Conhecimento em plataformas de recrutamento ou RRHH.",
      "Experiência com eventos/event-sourcing.",
      "Contribuições open source ou palestras.",
    ],
    beneficios: [
      "Plano de saúde completo (sem coparticipação).",
      "PLR anual + participação em resultados.",
      "Auxílio home office e vale-refeição.",
      "Trilhas de aprendizado contínuo e certificações pagas.",
    ],
    processo: [
      { titulo: "Triagem de Currículos", descricao: "Análise de perfil por nossa equipe de atração." },
      { titulo: "Entrevista com RH", descricao: "Bate-papo inicial sobre trajetória e expectativas." },
      { titulo: "Desafio Técnico", descricao: "Exercício prático assíncrono de arquitetura." },
      { titulo: "Proposta & Onboarding", descricao: "Proposta comercial e integração ao time." },
    ],
  },
  {
    id: "v2",
    titulo: "Business Partner de RH (Tech & Dados)",
    area: "Recursos Humanos",
    categoria: "Gestão & Pessoas",
    campus: "100% Remoto",
    regiao: "100% Remoto — Brasil",
    modalidadeTrabalho: "100% Remoto",
    tipoContrato: "CLT",
    senioridade: "Pleno / Sênior",
    quantidadeVagas: 1,
    publicadoEm: "2024-10-13",
    publicadoHa: "Publicado há 1 dia",
    descricao:
      "Atuação consultiva próxima aos líderes de engenharia, planejamento sucessório, gestão do engajamento e métricas de retenção.",
    descricaoPerfil:
      "Atuação consultiva próxima aos líderes de engenharia, planejamento sucessório, gestão do engajamento e métricas de retenção, transformando dados de pessoas em decisões de negócio.",
    faixaSalarial: "R$ 11.200 - R$ 13.500",
    compatibilidade: 78,
    responsabilidades: [
      "Apoio a líderes de engenharia em ciclo completo de gestão de pessoas.",
      "Planejamento sucessório e mapas de talentos.",
      "Acompanhamento de indicadores de engajamento e retenção.",
    ],
    requisitos: [
      "Formação em Psicologia, Administração ou correlatas.",
      "Experiência como Business Partner em empresas de tecnologia.",
      "Domínio de métricas de people analytics.",
    ],
    diferenciais: [
      "Certificação em coaching ou mentoring.",
      "Experiência em ambientes ágeis.",
    ],
    beneficios: [
      "Auxílio home office + vale-alimentação.",
      "PLR anual e previdência privada.",
      "Plano de saúde e odontológico.",
    ],
    processo: [
      { titulo: "Triagem de Currículos", descricao: "Análise de perfil por nossa equipe de atração." },
      { titulo: "Entrevista com RH", descricao: "Bate-papo inicial sobre trajetória e expectativas." },
      { titulo: "Painel com a Diretoria", descricao: "Conversa final com stakeholders." },
      { titulo: "Proposta & Onboarding", descricao: "Proposta comercial e integração ao time." },
    ],
  },
  {
    id: "v3",
    titulo: "Analista de Compliance & ESG Pleno",
    area: "Financeiro",
    categoria: "Controladoria & Finanças",
    campus: "São Paulo - SP",
    regiao: "São Paulo - SP (Sede)",
    modalidadeTrabalho: "Presencial",
    tipoContrato: "CLT",
    senioridade: "Pleno",
    quantidadeVagas: 2,
    publicadoEm: "2024-10-10",
    publicadoHa: "Publicado há 4 dias",
    descricao:
      "Monitoramento de padrões éticos corporativos, suporte às auditorias de governança social e relatórios para stakeholders.",
    descricaoPerfil:
      "Monitoramento de padrões éticos corporativos, suporte às auditorias de governança social e elaboração de relatórios ESG para stakeholders internos e externos.",
    faixaSalarial: "R$ 8.400 - R$ 9.800",
    compatibilidade: 64,
    responsabilidades: [
      "Acompanhar controles internos e padrões éticos.",
      "Apoiar auditorias de governança e ESG.",
      "Elaborar relatórios para órgãos reguladores.",
    ],
    requisitos: [
      "Experiência com compliance, auditoria ou riscos.",
      "Conhecimento da Lei 12.527 e LGPD.",
      "Boa comunicação e excel analítico.",
    ],
    diferenciais: [
      "Certificação CEA/CGA.",
      "Inglês avançado.",
    ],
    beneficios: [
      "Vale-refeição e vale-transporte.",
      "Plano de saúde com coparticipação.",
      "Gympass e day off no aniversário.",
    ],
    processo: [
      { titulo: "Triagem de Currículos", descricao: "Análise de perfil por nossa equipe de atração." },
      { titulo: "Entrevista com RH", descricao: "Bate-papo inicial sobre trajetória e expectativas." },
      { titulo: "Desafio Técnico", descricao: "Estudo de caso de controles internos." },
      { titulo: "Proposta & Onboarding", descricao: "Proposta comercial e integração ao time." },
    ],
  },
  {
    id: "v4",
    titulo: "Especialista Cloud & DevOps",
    area: "Tecnologia",
    categoria: "Engenharia de Software",
    campus: "São Paulo - SP",
    regiao: "São Paulo - SP (Sede)",
    modalidadeTrabalho: "Híbrido",
    tipoContrato: "CLT",
    senioridade: "Sênior / Especialista",
    quantidadeVagas: 2,
    publicadoEm: "2024-10-14",
    publicadoHa: "Publicado hoje",
    descricao:
      "Liderança na arquitetura de resiliência multi-cloud, esteiras CI/CD seguras e governança de infraestrutura como código.",
    descricaoPerfil:
      "Liderança na arquitetura de resiliência multi-cloud, esteiras CI/CD seguras e governança de infraestrutura como código (IaC).",
    faixaSalarial: "R$ 16.500 - R$ 19.800",
    compatibilidade: 91,
    responsabilidades: [
      "Desenhar arquitetura multi-cloud resiliente (AWS + Azure).",
      "Manter esteiras de CI/CD com foco em segurança.",
      "Governar infraestrutura como código (Terraform).",
    ],
    requisitos: [
      "Experiência com AWS e Azure em produção.",
      "Domínio de Kubernetes, Docker e Terraform.",
      "Observabilidade com Prometheus/Grafana.",
    ],
    diferenciais: [
      "Certificações AWS/Azure.",
      "Experiência com multi-região e DR.",
    ],
    beneficios: [
      "Auxílio home office.",
      "PLR anual forte.",
      "Certificações pagas e trilhas técnica.",
    ],
    processo: [
      { titulo: "Triagem de Currículos", descricao: "Análise de perfil por nossa equipe de atração." },
      { titulo: "Entrevista com RH", descricao: "Bate-papo inicial sobre trajetória e expectativas." },
      { titulo: "Desafio Técnico", descricao: "Teste prático de infraestrutura." },
      { titulo: "Proposta & Onboarding", descricao: "Proposta comercial e integração ao time." },
    ],
  },
  {
    id: "v5",
    titulo: "Analista de Atendimento ao Cliente",
    area: "Atendimento & Suporte",
    categoria: "Atendimento & Suporte",
    campus: "Alphaville - SP",
    regiao: "Alphaville - SP",
    modalidadeTrabalho: "Presencial",
    tipoContrato: "CLT",
    senioridade: "Júnior / Pleno",
    quantidadeVagas: 5,
    publicadoEm: "2024-10-11",
    publicadoHa: "Publicado há 2 dias",
    descricao:
      "Atendimento humanizado multi-canal (chat, e-mail e telefone) para clientes corporativos, com foco em resolução no primeiro contato.",
    descricaoPerfil:
      "Atendimento humanizado multi-canal (chat, e-mail e telefone) para clientes corporativos, com foco em resolução no primeiro contato e satisfação contínua.",
    faixaSalarial: "R$ 3.200 - R$ 4.100",
    compatibilidade: 72,
    responsabilidades: [
      "Atender clientes em múltiplos canais.",
      "Registrar e acompanhar chamados no CRM.",
      "Identificar oportunidades de melhoria no produto.",
    ],
    requisitos: [
      "Excelente comunicação verbal e escrita.",
      "Experiência em atendimento/suporte.",
      "Empatia e resiliência sob pressão.",
    ],
    diferenciais: [
      "Conhecimento de CRM (Zendesk, Salesforce).",
      "Espanhol ou inglês básico.",
    ],
    beneficios: [
      "Vale-refeição e vale-transporte.",
      "Plano de saúde com coparticipação.",
      "Lanchas gratuitos na cafeteria.",
    ],
    processo: [
      { titulo: "Triagem de Currículos", descricao: "Análise de perfil por nossa equipe de atração." },
      { titulo: "Entrevista com RH", descricao: "Bate-papo inicial sobre trajetória e expectativas." },
      { titulo: "Dinâmica em Grupo", descricao: "Simulação de atendimento em grupo." },
      { titulo: "Proposta & Onboarding", descricao: "Proposta comercial e integração ao time." },
    ],
  },
  {
    id: "v6",
    titulo: "Auxiliar de Operações Logísticas",
    area: "Operações",
    categoria: "Operações",
    campus: "Belo Horizonte - MG",
    regiao: "Belo Horizonte - MG",
    modalidadeTrabalho: "Presencial",
    tipoContrato: "CLT",
    senioridade: "Operacional",
    quantidadeVagas: 8,
    publicadoEm: "2024-10-09",
    publicadoHa: "Publicado há 5 dias",
    descricao:
      "Apoio nas rotinas de recebimento, conferência, armazenagem e expedição do centro de distribuição de BH.",
    descricaoPerfil:
      "Apoio nas rotinas de recebimento, conferência, armazenagem e expedição do centro de distribuição de Belo Horizonte, garantindo acuracidade e segurança.",
    faixaSalarial: "R$ 2.400 - R$ 2.900",
    compatibilidade: 58,
    responsabilidades: [
      "Receber e conferir materiais com auxílio de coletores.",
      "Organizar armazenagem por política FIFO.",
      "Apoiar a expedição e a rastreabilidade.",
    ],
    requisitos: [
      "Ensino médio completo.",
      "Disponibilidade de horários (turnos).",
      "Perfil proativo e organizado.",
    ],
    diferenciais: [
      "Experiência com WMS.",
      "Curso de empilhadeira.",
    ],
    beneficios: [
      "Vale-refeição e vale-transporte.",
      "Plano de saúde com coparticipação.",
      "Programa de crescimento interno.",
    ],
    processo: [
      { titulo: "Triagem de Currículos", descricao: "Análise de perfil por nossa equipe de atração." },
      { titulo: "Entrevista com RH", descricao: "Bate-papo inicial sobre trajetória e expectativas." },
      { titulo: "Visita à Unidade", descricao: "Conhecimento das rotinas no CD." },
      { titulo: "Proposta & Onboarding", descricao: "Proposta comercial e integração ao time." },
    ],
  },
]

export const CURSOS_FALLBACK: Curso[] = [
  {
    id: "c1",
    titulo: "Liderança Estratégica & Gestão Humanizada",
    areaConhecimento: "Liderança e Gestão",
    modalidade: "EAD Síncrono",
    categoria: "Liderança & Gestão",
    nivelProficiencia: "Avançado",
    badge: "Em Alta",
    cargaHoraria: "24h",
    formato: "100% Online & Síncrono",
    trilha: "Trilha Executiva 2024.2",
    capa: "/landing/curso-lideranca.jpg",
    alunos: "+2.400 profissionais formados",
    descricao:
      "Formação completa para líderes atuais e emergentes, com foco em gestão humanizada, tomada de decisão estratégica e cultura de alta performance.",
    avaliacao: { nota: 4.8, avaliacoes: 212 },
    modulos: [
      { numero: 1, titulo: "Módulo 1 — Liderança Consciente", horas: "4h", descricao: "Autoconhecimento, propósito e princípios da liderança humanizada.", topicos: ["Autoconhecimento", "Propósito", "Liderança humanizada"], aulas: 4, quiz: true },
      { numero: 2, titulo: "Módulo 2 — Comunicação Não Violenta", horas: "4h", descricao: "Ferramentas de escuta ativa e feedback construtivo.", topicos: ["Escuta ativa", "Feedback construtivo", "Diálogo"], aulas: 4, quiz: true },
      { numero: 3, titulo: "Módulo 3 — People Analytics & Decisões", horas: "4h", descricao: "Dados para decisões de equipe e indicadores de clima.", topicos: ["Métricas de clima", "Decisão baseada em dados"], aulas: 4, quiz: true },
      { numero: 4, titulo: "Módulo 4 — Gestão de Desempenho Contínuo", horas: "4h", descricao: "Ciclos de avaliação 1:1, metas e planos de desenvolvimento.", topicos: ["Ciclo 1:1", "Metas", "PDI"], aulas: 4, quiz: true },
      { numero: 5, titulo: "Módulo 5 — Cultura de Inovação", horas: "4h", descricao: "Ambientes psicologicamente seguros e experimentação.", topicos: ["Segurança psicológica", "Experimentação"], aulas: 4, quiz: true },
      { numero: 6, titulo: "Módulo 6 — Projeto de Conclusão", horas: "4h", descricao: "Aplicação dos aprendizados em um desafio real de gestão.", topicos: ["Projeto aplicado", "Apresentação"], aulas: 4, quiz: false },
    ],
    instrutores: [
      { nome: "Juliana Menezes", cargo: "People & Culture", formacao: "MBA USP", badges: ["Especialista em liderança", "Certified PCC • ICF"] },
      { nome: "André Tavares", cargo: "Diretor de Pessoas", formacao: "MSc. Stanford", badges: ["People Analytics"] },
    ],
    turmas: [
      { codigo: "S02", data: "02/10", vagasRestantes: "Inscrições abertas", status: "inscricoes-abertas" },
      { codigo: "S05", data: "09/10", vagasRestantes: "8 vagas restantes", status: "vagas-restantes" },
      { codigo: "S08", data: "16/10", vagasRestantes: "Esgotada", status: "esgotada" },
    ],
    requisitos: ["Cargo de gestão ou coordenação", "Disponibilidade às terças e quintas (19h às 21h)", "Frequência mínima de 75%"],
    publicoAlvo: "Líderes atuais e emergentes de todas as áreas.",
    certificacao: "Certificado executivo emitido ao final com aproveitamento ≥ 7.0.",
  },
  {
    id: "c2",
    titulo: "People Analytics: Tomada de Decisão Baseada em Dados",
    areaConhecimento: "Dados & Tecnologia",
    modalidade: "Híbrido",
    categoria: "Dados & Tecnologia",
    nivelProficiencia: "Avançado",
    badge: "Certificação",
    cargaHoraria: "64h",
    formato: "Formato Híbrido",
    trilha: "Trilha de Dados 2024.2",
    capa: "/landing/curso-analytics.jpg",
    alunos: "+980 profissionais formados",
    descricao:
      "Construção de indicadores de absenteísmo, correlação de performance, turnover e modelagem preditiva de retenção interna.",
    avaliacao: { nota: 4.7, avaliacoes: 158 },
    modulos: [
      { numero: 1, titulo: "Módulo 1 — Fundamentos de People Analytics", horas: "10h", descricao: "Modelagem de dados de pessoas e ética no uso.", aulas: 10, quiz: true },
      { numero: 2, titulo: "Módulo 2 — Indicadores de Clima e Rotatividade", horas: "12h", descricao: "eNPS, turnover, absenteísmo e correlações.", aulas: 12, quiz: true },
      { numero: 3, titulo: "Módulo 3 — Análise Preditiva de Retenção", horas: "14h", descricao: "Regressão logística e árvores de decisão aplicadas.", aulas: 14, quiz: true },
    ],
    instrutores: [
      { nome: "Carla Nogueira", cargo: "Head de People Analytics", formacao: "MSc. Estatística USP", badges: ["Especialista em dados de pessoas"] },
    ],
    turmas: [
      { codigo: "D01", data: "05/11", vagasRestantes: "Inscrições abertas", status: "inscricoes-abertas" },
      { codigo: "D03", data: "19/11", vagasRestantes: "4 vagas restantes", status: "vagas-restantes" },
    ],
    requisitos: ["Excel ou SQL básico", "Atuação em RH ou áreas correlatas"],
    publicoAlvo: "Profissionais de RH, analistas e gestores.",
    certificacao: "Certificação People Analytics RH Connect.",
  },
  {
    id: "c3",
    titulo: "Comunicação Não-Violenta & Facilitação Ágil",
    areaConhecimento: "Comunicação & Oratória",
    modalidade: "Autoinstrucional",
    categoria: "Comunicação & Oratória",
    nivelProficiencia: "Intermediário",
    badge: "Essencial",
    cargaHoraria: "24h",
    formato: "Gravado + Mentorias",
    trilha: "Trilha Comportamental",
    capa: "/landing/curso-comunicacao.jpg",
    alunos: "+1.520 profissionais formados",
    descricao:
      "Desarmando conflitos em cerimônias de produto, mediação construtiva de expectativas entre squads e alinhamento executivo.",
    avaliacao: { nota: 4.9, avaliacoes: 304 },
    modulos: [
      { numero: 1, titulo: "Módulo 1 — Princípios da CNV", horas: "6h", descricao: "Observação, sentimentos, necessidades e pedidos.", aulas: 6, quiz: true },
      { numero: 2, titulo: "Módulo 2 — Escuta Ativa em Ritual", horas: "6h", descricao: "Técnicas para reuniões e cerimônias ágeis.", aulas: 6, quiz: true },
      { numero: 3, titulo: "Módulo 3 — Mediação de Conflitos", horas: "6h", descricao: "Facilitando acordos entre partes conflitantes.", aulas: 6, quiz: true },
      { numero: 4, titulo: "Módulo 4 — Feedback Construtivo", horas: "6h", descricao: "Estruturas claras de feedback para squads.", aulas: 6, quiz: true },
    ],
    instrutores: [
      { nome: "Patrícia Fonseca", cargo: "Facilitadora & Coach", formacao: "ICF ACC", badges: ["Comunicação", "Agilidade"] },
    ],
    turmas: [
      { codigo: "C04", data: "20/10", vagasRestantes: "Inscrições abertas", status: "inscricoes-abertas" },
      { codigo: "C09", data: "03/11", vagasRestantes: "12 vagas restantes", status: "vagas-restantes" },
    ],
    requisitos: ["Nenhum pré-requisito"],
    publicoAlvo: "Qualquer pessoa que conduza reuniões ou negociações.",
    certificacao: "Certificado de conclusão.",
  },
  {
    id: "c4",
    titulo: "Bem-Estar & Saúde Mental no Trabalho",
    areaConhecimento: "Bem-Estar & Saúde",
    modalidade: "EAD Síncrono",
    categoria: "Bem-Estar & Saúde",
    nivelProficiencia: "Iniciante",
    badge: "Essencial",
    cargaHoraria: "16h",
    formato: "100% Online",
    trilha: "Trilha de Bem-Estar",
    capa: "/landing/noticia-saude.jpg",
    alunos: "+3.100 profissionais formados",
    descricao:
      "Identificação precoce de sinais de burnout, práticas de autocuidado e construção de ambientes psicologicamente seguros.",
    avaliacao: { nota: 4.6, avaliacoes: 421 },
    modulos: [
      { numero: 1, titulo: "Módulo 1 — Sinais e Sintomas", horas: "4h", descricao: "Reconhecendo burnout e ansiedade no dia a dia.", aulas: 4, quiz: true },
      { numero: 2, titulo: "Módulo 2 — Autocuidado e Rotina", horas: "4h", descricao: "Hábitos de sono, movimento e pausas.", aulas: 4, quiz: true },
      { numero: 3, titulo: "Módulo 3 — Segurança Psicológica", horas: "4h", descricao: "Construindo times que acolhem.", aulas: 4, quiz: true },
      { numero: 4, titulo: "Módulo 4 — Redes de Apoio", horas: "4h", descricao: "Canais internos e externos de cuidado.", aulas: 4, quiz: true },
    ],
    instrutores: [
      { nome: "Dr. Rafael Ortiz", cargo: "Psicólogo Organizacional", formacao: "CRP 06/0000", badges: ["Saúde Mental", "Burnout"] },
    ],
    turmas: [
      { codigo: "B01", data: "22/10", vagasRestantes: "Inscrições abertas", status: "inscricoes-abertas" },
      { codigo: "B05", data: "12/11", vagasRestantes: "Esgotada", status: "esgotada" },
    ],
    requisitos: ["Nenhum pré-requisito"],
    publicoAlvo: "Todos os colaboradores e líderes.",
    certificacao: "Certificado de participação.",
  },
  {
    id: "c5",
    titulo: "Oratória & Apresentações de Alto Impacto",
    areaConhecimento: "Comunicação & Oratória",
    modalidade: "Presencial",
    categoria: "Comunicação & Oratória",
    nivelProficiencia: "Intermediário",
    badge: "Em Alta",
    cargaHoraria: "20h",
    formato: "Turma Presencial",
    trilha: "Trilha Comportamental",
    capa: "/landing/curso-comunicacao.jpg",
    alunos: "+740 profissionais formados",
    descricao:
      "Técnicas de storytelling executivo, controle de nervosismo e construção de slides que comunicam decisões.",
    avaliacao: { nota: 4.8, avaliacoes: 186 },
    modulos: [
      { numero: 1, titulo: "Módulo 1 — Storytelling Executivo", horas: "5h", descricao: "Estruturas narrativas para apresentações.", aulas: 5, quiz: true },
      { numero: 2, titulo: "Módulo 2 — Pitch e Improviso", horas: "5h", descricao: "Falar de improviso com estrutura.", aulas: 5, quiz: true },
      { numero: 3, titulo: "Módulo 3 — Slides que Comunicam", horas: "5h", descricao: "Design de apresentações eficazes.", aulas: 5, quiz: true },
      { numero: 4, titulo: "Módulo 4 — Laboratório de Prática", horas: "5h", descricao: "Apresentações com feedback individual.", aulas: 5, quiz: false },
    ],
    instrutores: [
      { nome: "Mariana Rios", cargo: "Comunicação Corporativa", formacao: "Jornalismo PUC-SP", badges: ["Oratória"] },
    ],
    turmas: [
      { codigo: "P02", data: "26/10", vagasRestantes: "6 vagas restantes", status: "vagas-restantes" },
    ],
    requisitos: ["Nenhum pré-requisito"],
    publicoAlvo: "Líderes e profissionais que apresentam a executivos.",
    certificacao: "Certificado com avaliação prática.",
  },
  {
    id: "c6",
    titulo: "Gestão de Desempenho Contínuo e Metas 360°",
    areaConhecimento: "Liderança & Gestão",
    modalidade: "EAD Síncrono",
    categoria: "Liderança & Gestão",
    nivelProficiencia: "Avançado",
    badge: "Certificação",
    cargaHoraria: "32h",
    formato: "100% Online & Síncrono",
    trilha: "Trilha Executiva 2024.2",
    capa: "/landing/curso-lideranca.jpg",
    alunos: "+870 profissionais formados",
    descricao:
      "Ciclos de avaliação 1:1, metas OKR e feedback 360° aplicados a culturas de alta performance e desenvolvimento contínuo.",
    avaliacao: { nota: 4.7, avaliacoes: 143 },
    modulos: [
      { numero: 1, titulo: "Módulo 1 — Modelos de Avaliação", horas: "8h", descricao: "Tradicional vs contínuo, 360° e autoavaliação.", aulas: 8, quiz: true },
      { numero: 2, titulo: "Módulo 2 — Metas OKR", horas: "8h", descricao: "Desdobramento de objetivos e KR mensuráveis.", aulas: 8, quiz: true },
      { numero: 3, titulo: "Módulo 3 — Conversas 1:1", horas: "8h", descricao: "Estrutura de conversas que geram desenvolvimento.", aulas: 8, quiz: true },
      { numero: 4, titulo: "Módulo 4 — Calibração de Comitês", horas: "8h", descricao: "Homologação e justiça na avaliação.", aulas: 8, quiz: true },
    ],
    instrutores: [
      { nome: "André Tavares", cargo: "Diretor de Pessoas", formacao: "MSc. Stanford", badges: ["People Analytics"] },
    ],
    turmas: [
      { codigo: "G01", data: "08/11", vagasRestantes: "Inscrições abertas", status: "inscricoes-abertas" },
    ],
    requisitos: ["Experiência em liderança de equipes"],
    publicoAlvo: "Gestores de pessoas e equipes.",
    certificacao: "Certificado executivo.",
  },
]

export const NOTICIAS_FALLBACK: Noticia[] = [
  {
    id: "n1",
    titulo: "Lançamento do Programa de Saúde Integral 2025 com Apoio Psicológico Ilimitado",
    tipo: "Comunicado",
    categoria: "Saúde & Bem-Estar",
    criadoEm: "2024-11-08T10:00:00.000Z",
    data: "8 de novembro de 2024",
    autor: "Célia Martins",
    tempoLeitura: "4 min de leitura",
    capa: "/landing/noticia-saude.jpg",
    descricao:
      "Nova parceria institucional amplia cobertura com sessões virtuais com psicólogos credenciados sem coparticipação para colaboradores e dependentes diretos.",
  },
  {
    id: "n2",
    titulo: "RH Connect conquista Selo Ouro de Equidade e Pluralidade no Trabalho",
    tipo: "Comunicado",
    categoria: "Governança",
    criadoEm: "2024-11-03T10:00:00.000Z",
    data: "3 de novembro de 2024",
    autor: "Ana Beatriz Souza",
    tempoLeitura: "5 min de leitura",
    capa: "/landing/noticia-evento.jpg",
    descricao:
      "Auditoria independente destaca nosso progresso contínuo na equiparação salarial por gênero e no acolhimento de grupos minorizados em posições executivas.",
  },
  {
    id: "n3",
    titulo: "Abertura Oficial do Ciclo de Avaliação de Desempenho e Metas 360°",
    tipo: "Aviso",
    categoria: "Não perca o prazo",
    criadoEm: "2024-10-28T10:00:00.000Z",
    data: "28 de outubro de 2024",
    autor: "Equipe de Pessoas",
    tempoLeitura: "3 min de leitura",
    capa: "/landing/noticia-gestao.jpg",
    descricao:
      "Confira os prazos para autoavaliação, alinhamento com lideranças e homologação dos comitês de calibração para o fechamento do exercício fiscal.",
  },
  {
    id: "n4",
    titulo: "Novo modelo de jornada flexível chega às equipes de Tecnologia",
    tipo: "Comunicado",
    categoria: "Governança",
    criadoEm: "2024-10-21T10:00:00.000Z",
    data: "21 de outubro de 2024",
    autor: "Rodrigo Sampaio",
    tempoLeitura: "6 min de leitura",
    capa: "/landing/noticia-gestao.jpg",
    descricao:
      "Jornada híbrida 60/40 com autonomia para escolha de dias presenciais passará por experimentação controlada entre novembro e janeiro.",
  },
  {
    id: "n5",
    titulo: "Pesquisa de Clima 2024: participe agora",
    tipo: "Comunicado",
    categoria: "Fale sobre isso",
    criadoEm: "2024-10-15T10:00:00.000Z",
    data: "15 de outubro de 2024",
    autor: "Carla Nogueira",
    tempoLeitura: "2 min de leitura",
    capa: "/landing/noticia-evento.jpg",
    descricao:
      "A pesquisa anônima leva menos de 10 minutos e orienta as prioridades de People para o próximo ano. Garantimos confidencialidade total.",
  },
  {
    id: "n6",
    titulo: "RH Connect expande programa de voluntariado corporativo",
    tipo: "Aviso",
    categoria: "Fora do expediente",
    criadoEm: "2024-10-08T10:00:00.000Z",
    data: "8 de outubro de 2024",
    autor: "Equipe de Sustentabilidade",
    tempoLeitura: "3 min de leitura",
    capa: "/landing/noticia-saude.jpg",
    descricao:
      "Nova parceria com ONGs locais oferece 4 horas mensais remuneradas de voluntariado para todos os colaboradores.",
  },
  {
    id: "n7",
    titulo: "Novo canal 0800 para suporte em LGPD",
    tipo: "Aviso",
    categoria: "Avisos & Aditivos",
    criadoEm: "2024-10-01T10:00:00.000Z",
    data: "1 de outubro de 2024",
    autor: "Jurídico & Compliance",
    tempoLeitura: "2 min de leitura",
    capa: "/landing/noticia-gestao.jpg",
    descricao:
      "Canal exclusivo para dúvidas e requisições de titulares de dados, com atendimento de segunda a sexta das 8h às 18h.",
  },
  {
    id: "n8",
    titulo: "RH Connect Conquista Certificação Ouro em Boas Práticas",
    tipo: "Destaque",
    categoria: "Destaques",
    criadoEm: "2024-08-12T10:00:00.000Z",
    data: "12 de agosto de 2024",
    autor: "Ana Beatriz Souza",
    tempoLeitura: "5 min de leitura",
    destaque: true,
    capa: "/landing/noticia-evento.jpg",
    descricao:
      "Avaliação externa reconhece nossas práticas de governança, transparência e desenvolvimento humano. Entenda o que muda na prática.",
    conteudo: [
      "O RH Connect recebeu a certificação Ouro em Boas Práticas de Gestão de Pessoas, concedida por auditoria independente após avaliação de 47 critérios distribuídos em governança, políticas de desenvolvimento, diversidade e conformidade.",
      "A distinção posiciona o RH Connect no seleto grupo de organizações com práticas maduras e auditáveis de gestão de pessoas no país.",
      "O que muda na prática? A certificação traz um ciclo contínuo de acreditação, com auditorias semestrais e metas públicas de melhoria em todos os critérios avaliados.",
      "Governança e Transparência: os resultados completos da avaliação serão publicados em nosso painel de dados abertos, em conformidade com a Lei nº 12.527 (LAI) e com a Lei nº 13.709 (LGPD).",
      "Linha do tempo da certificação: do lançamento do RH Connect em 2015 ao reconhecimento atual, o percurso incluiu o programa de lideranças de 2019 e a adesão ao Pacto Global em 2022.",
    ],
    tags: ["Governança", "Certificação", "Transparência", "LGPD"],
    relacionados: ["n2", "n4"],
  },
]

export const MINHAS_CANDIDATURAS: Candidatura[] = [
  { id: "cand1", vagaId: "v1", vagaTitulo: "Engenheiro(a) de Software Sênior — Plataforma Java/Kotlin", area: "Tecnologia", modalidade: "100% Remoto", cidade: "100% Remoto", aplicadaEm: "12/10/2024", status: "em-analise", compatibilidade: 87, etapa: "Triagem de Currículos" },
  { id: "cand2", vagaId: "v2", vagaTitulo: "Business Partner de RH (Tech & Dados)", area: "Recursos Humanos", modalidade: "100% Remoto", cidade: "100% Remoto", aplicadaEm: "28/09/2024", status: "entrevista", compatibilidade: 78, etapa: "Entrevista com RH" },
  { id: "cand3", vagaId: "v4", vagaTitulo: "Especialista Cloud & DevOps", area: "Tecnologia", modalidade: "Híbrido", cidade: "São Paulo - SP", aplicadaEm: "15/09/2024", status: "em-analise", compatibilidade: 91, etapa: "Desafio Técnico" },
  { id: "cand4", vagaId: "v3", vagaTitulo: "Analista de Compliance & ESG Pleno", area: "Financeiro", modalidade: "Presencial", cidade: "São Paulo - SP", aplicadaEm: "02/09/2024", status: "reprovada", compatibilidade: 64, etapa: "Processo encerrado" },
  { id: "cand5", vagaId: "v5", vagaTitulo: "Analista de Atendimento ao Cliente", area: "Atendimento & Suporte", modalidade: "Presencial", cidade: "Alphaville - SP", aplicadaEm: "18/08/2024", status: "rascunho", compatibilidade: 72, etapa: "Aguardando envio" },
]

export const MINHAS_INSCRICOES: InscricaoCurso[] = [
  { id: "incs1", cursoId: "c1", cursoTitulo: "Liderança Estratégica & Gestão Humanizada", turma: "S02 — 02/10", dataInscricao: "10/09/2024", status: "confirmada", frequencia: "75%" },
  { id: "incs2", cursoId: "c2", cursoTitulo: "People Analytics: Tomada de Decisão Baseada em Dados", turma: "D01 — 05/11", dataInscricao: "22/09/2024", status: "confirmada", frequencia: "—" },
  { id: "incs3", cursoId: "c3", cursoTitulo: "Comunicação Não-Violenta & Facilitação Ágil", turma: "C04 — 20/10", dataInscricao: "01/10/2024", status: "em-analise", frequencia: "—" },
  { id: "incs4", cursoId: "c4", cursoTitulo: "Bem-Estar & Saúde Mental no Trabalho", turma: "B01 — 22/10", dataInscricao: "15/08/2024", status: "concluida", frequencia: "92%", certificado: true },
]

export const CANDIDATOS_TRIAGEM: Candidato[] = [
  { id: "cp1", nome: "Camila Mariana Ribeiro", email: "camila.ribeiro@email.com", telefone: "(11) 98765-4321", cidade: "São Paulo - SP", vagaId: "v1", vagaTitulo: "Engenheiro(a) de Software Sênior — Plataforma Java/Kotlin", fonte: "Banco de Talentos", score: 87, status: "em-analise", aplicadoEm: "12/10/2024", idiomas: ["Português", "Inglês"], formacao: "Eng. de Software — USP" },
  { id: "cp2", nome: "Rafael Torres Almeida", email: "rafael.almeida@email.com", telefone: "(21) 99876-1122", cidade: "Rio de Janeiro - RJ", vagaId: "v1", vagaTitulo: "Engenheiro(a) de Software Sênior — Plataforma Java/Kotlin", fonte: "LinkedIn", score: 92, status: "entrevista", aplicadoEm: "11/10/2024", idiomas: ["Português", "Inglês", "Espanhol"], formacao: "Ciência da Computação — UFRJ" },
  { id: "cp3", nome: "Mariana Costa Lima", email: "mariana.lima@email.com", telefone: "(31) 99887-6655", cidade: "Belo Horizonte - MG", vagaId: "v1", vagaTitulo: "Engenheiro(a) de Software Sênior — Plataforma Java/Kotlin", fonte: "Banco de Talentos", score: 79, status: "em-analise", aplicadoEm: "10/10/2024", idiomas: ["Português"], formacao: "Sistemas de Informação — UFMG" },
  { id: "cp4", nome: "João Pedro Nunes", email: "joao.nunes@email.com", telefone: "(11) 97654-3210", cidade: "São Paulo - SP", vagaId: "v2", vagaTitulo: "Business Partner de RH (Tech & Dados)", fonte: "Indicação", score: 84, status: "em-analise", aplicadoEm: "09/10/2024", idiomas: ["Português", "Inglês"], formacao: "Psicologia — PUC-SP" },
  { id: "cp5", nome: "Larissa Mendes Ferreira", email: "larissa.ferreira@email.com", telefone: "(41) 98877-4433", cidade: "Curitiba - PR", vagaId: "v2", vagaTitulo: "Business Partner de RH (Tech & Dados)", fonte: "LinkedIn", score: 73, status: "descartado", aplicadoEm: "08/10/2024", idiomas: ["Português"], formacao: "Admin. — UFPR" },
  { id: "cp6", nome: "Fernando Augusto Prado", email: "fernando.prado@email.com", telefone: "(11) 96543-2109", cidade: "Alphaville - SP", vagaId: "v4", vagaTitulo: "Especialista Cloud & DevOps", fonte: "Banco de Talentos", score: 95, status: "aprovado", aplicadoEm: "07/10/2024", idiomas: ["Português", "Inglês"], formacao: "Redes — FATEC" },
  { id: "cp7", nome: "Beatriz Campos da Silva", email: "beatriz.campos@email.com", telefone: "(19) 99876-5544", cidade: "Campinas - SP", vagaId: "v5", vagaTitulo: "Analista de Atendimento ao Cliente", fonte: "Gupy", score: 68, status: "em-analise", aplicadoEm: "06/10/2024", idiomas: ["Português", "Inglês"], formacao: "Ensino Médio" },
  { id: "cp8", nome: "Gustavo Henrique Ramos", email: "gustavo.ramos@email.com", telefone: "(31) 98765-9988", cidade: "Belo Horizonte - MG", vagaId: "v6", vagaTitulo: "Auxiliar de Operações Logísticas", fonte: "Banco de Talentos", score: 61, status: "em-analise", aplicadoEm: "05/10/2024", idiomas: ["Português"], formacao: "Ensino Médio" },
]

export const USUARIOS: Usuario[] = [
  { id: "u1", nome: "Gilberto P. Lima", email: "gilberto.lima@connect.corp", perfil: "ADMINISTRADOR", departamento: "RH & Pessoas", status: "ativo", criadoEm: "02/01/2020", ultimoAcesso: "Hoje, 09:41" },
  { id: "u2", nome: "Ana Beatriz Souza", email: "ana.souza@connect.corp", perfil: "COLABORADOR", departamento: "Comunicação", status: "ativo", criadoEm: "14/03/2021", ultimoAcesso: "Ontem, 18:22" },
  { id: "u3", nome: "Rodrigo Sampaio", email: "rodrigo.sampaio@connect.corp", perfil: "COLABORADOR", departamento: "Tecnologia", status: "ativo", criadoEm: "09/07/2019", ultimoAcesso: "Hoje, 08:05" },
  { id: "u4", nome: "Mariana Rios", email: "mariana.rios@connect.corp", perfil: "COLABORADOR", departamento: "Operações", status: "ativo", criadoEm: "22/11/2020", ultimoAcesso: "Ontem, 14:50" },
  { id: "u5", nome: "Camila Mariana Ribeiro", email: "camila.ribeiro@email.com", perfil: "CANDIDATO", departamento: "—", status: "ativo", criadoEm: "12/10/2024", ultimoAcesso: "Hoje, 10:02" },
  { id: "u6", nome: "Patrícia Fonseca", email: "patricia.fonseca@connect.corp", perfil: "COLABORADOR", departamento: "Governança", status: "inativo", criadoEm: "30/04/2018", ultimoAcesso: "05/08/2024" },
  { id: "u7", nome: "Carla Nogueira", email: "carla.nogueira@connect.corp", perfil: "ADMINISTRADOR", departamento: "People Analytics", status: "ativo", criadoEm: "17/09/2022", ultimoAcesso: "Hoje, 07:30" },
  { id: "u8", nome: "João Pedro Nunes", email: "joao.nunes@email.com", perfil: "CANDIDATO", departamento: "—", status: "inativo", criadoEm: "09/10/2024", ultimoAcesso: "09/10/2024" },
]

export const CATEGORIAS_TAGS: CategoriaTag[] = [
  { id: "t1", nome: "Engenharia de Software", tipo: "vaga", ativa: true, atualizadaEm: "12/10/2024" },
  { id: "t2", nome: "Gestão & Pessoas", tipo: "vaga", ativa: true, atualizadaEm: "11/10/2024" },
  { id: "t3", nome: "Atendimento & Suporte", tipo: "vaga", ativa: true, atualizadaEm: "10/10/2024" },
  { id: "t4", nome: "Liderança & Gestão", tipo: "curso", ativa: true, atualizadaEm: "09/10/2024" },
  { id: "t5", nome: "Dados & Tecnologia", tipo: "curso", ativa: true, atualizadaEm: "08/10/2024" },
  { id: "t6", nome: "Comunicação & Oratória", tipo: "curso", ativa: true, atualizadaEm: "07/10/2024" },
  { id: "t7", nome: "Saúde & Bem-Estar", tipo: "noticia", ativa: true, atualizadaEm: "06/10/2024" },
  { id: "t8", nome: "Avisos & Aditivos", tipo: "noticia", ativa: false, atualizadaEm: "05/10/2024" },
]

export const RELATORIO_ADMISSOES: RelatorioSerie[] = [
  { mes: "Jan", valor: 28 },
  { mes: "Fev", valor: 34 },
  { mes: "Mar", valor: 41 },
  { mes: "Abr", valor: 30 },
  { mes: "Mai", valor: 47 },
  { mes: "Jun", valor: 52 },
  { mes: "Jul", valor: 40 },
  { mes: "Ago", valor: 61 },
  { mes: "Set", valor: 55 },
  { mes: "Out", valor: 66 },
]

export const RELATORIO_RETENCAO: RelatorioSerie[] = [
  { mes: "T1 2023", valor: 82 },
  { mes: "T2 2023", valor: 78 },
  { mes: "T3 2023", valor: 84 },
  { mes: "T4 2023", valor: 80 },
  { mes: "T1 2024", valor: 88 },
  { mes: "T2 2024", valor: 86 },
  { mes: "T3 2024", valor: 92 },
]

export const RELATORIO_ROTATIVIDADE: RelatorioSerie[] = [
  { mes: "Jan", valor: 6 },
  { mes: "Fev", valor: 5 },
  { mes: "Mar", valor: 7 },
  { mes: "Abr", valor: 4 },
  { mes: "Mai", valor: 6 },
  { mes: "Jun", valor: 8 },
  { mes: "Jul", valor: 5 },
  { mes: "Ago", valor: 7 },
  { mes: "Set", valor: 4 },
  { mes: "Out", valor: 6 },
]