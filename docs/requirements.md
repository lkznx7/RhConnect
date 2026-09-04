# Requisitos do Sistema — RH Connect

## 1. Visão Geral

O **RH Connect** é uma plataforma de gestão de pessoas e recrutamento voltada para o contexto corporativo de uma organização. O sistema integra as seguintes áreas funcionais:

- **Recrutamento e Seleção** — publicação de vagas, recebimento e triagem de candidaturas, gestão do funil seletivo.
- **Desenvolvimento e Capacitação** — catálogo de cursos corporativos, inscrições, acompanhamento de progresso.
- **Comunicação Institucional** — publicação de notícias, portarias, decretos e comunicados internos.
- **Banco de Talentos** — recebimento e armazenamento de currículos de candidatos externos.
- **Relatórios e Indicadores** — métricas de recrutamento, treinamento e gargalos operacionais.
- **Gestão de Acessos** — controle de usuários, perfis e configurações do sistema.

O sistema atende a dois públicos principais: **candidatos/colaboradores** (área pública e autenticada) e **profissionais de RH/administradores** (painel gerencial).

---

## 2. Perfis de Usuário

### 2.1 Visitante (Não autenticado)

- **Objetivo:** Explorar vagas, cursos, notícias e informações institucionais.
- **Permissões:** Acesso somente leitura às páginas públicas.
- **Funcionalidades disponíveis:** Visualização de página inicial, oportunidades, detalhes de vagas, cursos, detalhes de cursos, notícias, detalhes de notícias, página "Sobre o RH", envio de currículo (Banco de Talentos).

### 2.2 Candidato (Autenticado)

- **Objetivo:** Gerenciar seu perfil, candidaturas e inscrições em cursos.
- **Permissões:** Acesso à área do candidato; visualização e edição de dados próprios.
- **Funcionalidades disponíveis:** Dashboard com candidaturas recentes, gerenciamento de perfil pessoal, edição de currículo, visualização de candidaturas com status, inscrições em cursos com acompanhamento de progresso, busca e filtros em oportunidades e cursos.

### 2.3 Colaborador / Profissional de RH (Autenticado)

- **Objetivo:** Gerenciar todo o ciclo de recrutamento, capacitação e comunicação interna.
- **Permissões:** Acesso ao painel administrativo com funcionalidades de CRUD em vagas, notícias, cursos; triagem de candidaturas; visualização de currículos; gestão de inscrições; relatórios; configurações.
- **Funcionalidades disponíveis:** Dashboard RH com funil de recrutamento, gerenciamento de vagas (criar/editar), triagem de candidaturas (pipeline Kanban), visualização detalhada de currículos, gerenciamento de notícias (criar/editar), criação e edição de cursos, inscrições em cursos (validação de presença), relatórios e indicadores, gestão de usuários, configurações do sistema, categorias e tags.

### 2.4 Administrador do Sistema

- **Objetivo:** Configurações globais e gestão de acessos.
- **Permissões:** Todas as permissões do Colaborador RH, acrescidas de configurações do sistema e gestão de usuários.
- **Funcionalidades disponíveis:** Tudo o que o Colaborador RH possui, além de: gestão de usuários e acessos (convite, atribuição de papéis), configurações da empresa (logo, dados), parâmetros de recrutamento (notificações por e-mail, feedback automático), conformidade LGPD e governança de dados.

---

## 3. Funcionalidades

### 3.1 — Área Pública

#### RF-001 — Página Inicial

**Objetivo:** Apresentar o portal institucional com acesso a vagas, cursos e notícias em destaque.

**Ações disponíveis:**
- Busca por cargo, habilidade ou área
- Filtro por localização (cidade)
- Filtro por área (Todas as Áreas, Tecnologia, Operações)
- Acesso a seções: Oportunidades em Destaque, Universidade Corporativa & Capacitação, Notícias & Comunicados
- Links de navegação: Início, Sobre o RH, Oportunidades, Cursos, Notícias, Banco de Talentos, Acessar Portal, Cadastrar Currículo

**Dados envolvidos:** Títulos de vagas em destaque, nomes de cursos, títulos de notícias, áreas de atuação, localizações.

---

#### RF-002 — Página Sobre o RH

**Objetivo:** Apresentar informações institucionais sobre o setor de RH e canal de ouvidoria.

**Ações disponíveis:**
- Visualização dos pilares estratégicos (Gente no Centro, Inovação, Transparência)
- Visualização da equipe de gestão e liderança
- Envio de mensagem via formulário de contato/ouvidoria

**Campos do formulário:**
- Nome Completo (obrigatório)
- E-mail Institucional (obrigatório)
- Setor de Destino (select: DP & Folha, Benefícios, Recrutamento, Treinamento, Ouvidoria)
- Matrícula (opcional)
- Assunto (obrigatório)
- Mensagem Detalhada (obrigatório)
- Checkbox de termos

**Regra:** A Ouvidoria é classificada como "Sigilosa".

---

#### RF-003 — Lista de Oportunidades (Vagas)

**Objetivo:** Apresentar vagas disponíveis com filtros e busca.

**Ações disponíveis:**
- Busca textual por cargo, palavra-chave, competência ou número do edital
- Filtros: Campus, Área, Tipo de Contrato, Modalidade de Trabalho
- Limpeza de filtros ("Limpar tudo")
- Paginação
- Ordenação
- Acesso ao detalhe de cada vaga

**Dados exibidos por vaga:** Título do cargo, campus, área, tipo de contrato.

---

#### RF-004 — Detalhes da Vaga

**Objetivo:** Apresentar informações completas de uma vaga e permitir candidatura.

**Ações disponíveis:**
- Visualização de: Sobre a Oportunidade, Principais Responsabilidades, Requisitos Obrigatórios, Diferenciais Desejáveis, Benefícios & Vantagens, Etapas do Processo Seletivo
- Botão "Candidatar-se" (hero + sidebar)
- Compartilhamento (botão + toast de confirmação)
- Visualização de Vagas Similares
- Modal de confirmação de candidatura

**Dados exibidos:** Resumo da Vaga (sidebar), progresso da candidatura (se houver), galeria "Conheça Nosso Ambiente".

---

#### RF-005 — Catálogo de Cursos

**Objetivo:** Apresentar cursos corporativos disponíveis para inscrição.

**Ações disponíveis:**
- Busca por tema, competência, instrutor ou código do curso
- Filtros: Área de Conhecimento, Modalidade (EAD Síncrono, Presencial, Híbrido, Autoinstrucional), Nível de Proficiência
- Ordenação
- Acesso ao detalhe de cada curso
- Visualização de Trilhas de Carreira e Dúvidas Frequentes

**Dados exibidos:** Título, modalidade, área de conhecimento, nível.

---

#### RF-006 — Detalhes do Curso

**Objetivo:** Apresentar informações completas de um curso e permitir inscrição.

**Ações disponíveis:**
- Visualização de: Sobre o Curso & Objetivos, Competências Estratégicas, Ementa & Módulos (accordion), Metodologia & Critérios Avaliativos, Corpo Docente
- Inscrição via modal com campos: Identificador Corporativo (Matrícula/CPF), E-mail Corporativo, Gestor Imediato para Aprovação (select)
- Estados do modal: formulário e sucesso
- Visualização de Cursos Relacionados & Trilhas Complementares

---

#### RF-007 — Lista de Notícias

**Objetivo:** Apresentar comunicados, portarias e avisos institucionais.

**Ações disponíveis:**
- Busca por comunicados, normativas, palavras-chave ou editais
- Inscrição na newsletter (e-mail corporativo) com feedback
- Paginação
- Acesso ao detalhe de cada notícia
- Seções: Artigos & Atualizações Recentes, Portarias & Decretos, Mural de Avisos Rápidos

---

#### RF-008 — Detalhes da Notícia

**Objetivo:** Apresentar o conteúdo completo de uma notícia/comunicado.

**Ações disponíveis:**
- Leitura com barra de progresso
- Botão de copiar link
- Feedback: "Útil" / "Não útil"
- Visualização de Documentos e Anexos Relacionados
- Visualização de Notícias Relacionadas
- Toast de confirmação para cópia/feedback

---

#### RF-009 — Envio de Currículo (Banco de Talentos)

**Objetivo:** Receber currículo de candidato externo para o Banco de Talentos.

**Ações disponíveis:**
- Formulário multi-etapas (3 etapas) com barra de progresso

**Etapa 1 — Identificação e Contato:**
- Nome Completo (obrigatório)
- E-mail Profissional (obrigatório)
- Telefone/WhatsApp (obrigatório)
- CPF (obrigatório, com validação)
- Cidade/UF (obrigatório)
- Data de Nascimento (obrigatório)
- Gênero (Mulher cis, Homem cis, Mulher trans, Homem trans, Não-binário, Prefiro não declarar)
- PcD (toggle, opcional)

**Etapa 2 — Formação & Alinhamento de Carreira:**
- Área Principal de Interesse (obrigatório)
- Nível de Senioridade (obrigatório)
- Expectativa Salarial (obrigatório)
- Modalidade de Trabalho (obrigatório)
- Resumo de Carreira (textarea com contador de caracteres)
- LinkedIn URL (opcional)
- Portfolio URL (opcional)

**Etapa 3 — Upload de Currículo & Termos:**
- Upload de arquivo (drag-and-drop ou clique)
- Estados de upload: idle e sucesso
- Aceite de termos

---

#### RF-010 — Confirmação de Envio de Currículo

**Objetivo:** Confirmar o recebimento do currículo e fornecer número de protocolo.

**Dados exibidos:**
- Mensagem "Candidatura Registrada!"
- Número de protocolo (com botão de copiar)
- Próximos passos: Triagem & People Analytics, Aviso por E-mail & WhatsApp, Entrevista com RH Partner

---

### 3.2 — Autenticação

#### RF-011 — Login

**Objetivo:** Permitir acesso autenticado ao sistema.

**Ações disponíveis:**
- Abas: Candidato / Colaborador
- Campo: Identificador (e-mail ou CPF)
- Campo: Senha (com toggle mostrar/ocultar)
- Link: Esqueci minha senha
- Link: Criar conta

**Regra:** Dois fluxos de login distintos dependendo do tipo de usuário.

---

#### RF-012 — Criar Conta

**Objetivo:** Permitir registro de novo usuário no sistema.

**Campos:**
- Nome Completo (obrigatório)
- E-mail institucional ou pessoal (obrigatório)
- CPF (obrigatório, com validação em tempo real)
- Celular/WhatsApp (obrigatório)
- Senha (obrigatório, com indicador de força)
- Confirmação de Senha (obrigatório)
- Objetivo no RH Connect (radio buttons)

**Regras de senha:**
- Comprimento mínimo
- Letras maiúsculas
- Números
- Caracteres especiais

---

#### RF-013 — Esqueci Minha Senha

**Objetivo:** Iniciar fluxo de recuperação de senha.

**Campos:**
- Identificador (e-mail ou CPF)

**Fluxo:** Solicitação → E-mail de recuperação enviado → Timer de reenvio → Definição de nova senha.

---

#### RF-014 — Recuperação de Senha — E-mail Enviado

**Objetivo:** Informar que o e-mail de recuperação foi enviado.

**Funcionalidades:**
- Timer regressivo para reenvio
- Botão de reenvio (habilitado após timer)

---

#### RF-015 — Nova Senha

**Objetivo:** Permitir definição de nova senha após recuperação.

**Campos:**
- Nova Senha (com indicador de força visual)
- Confirmar Nova Senha (com validação de correspondência)

**Regras de senha:** Mesmas do RF-012.

---

### 3.3 — Área do Candidato

#### RF-016 — Dashboard do Candidato

**Objetivo:** Apresentar visão geral do candidato autenticado.

**Dados exibidos:**
- Minhas Candidaturas Recentes (cards com status)
- Próximas entrevistas (com opção "Adicionar ao Google Agenda" e "Reagendar")
- Sidebar: Banco de Talentos, Oportunidades, Cursos, Notícias, Cadastrar Currículo, Ouvidoria e Suporte, Política de Privacidade, Código de Ética

---

#### RF-017 — Meu Perfil

**Objetivo:** Permitir visualização e edição dos dados pessoais do candidato.

**Seções:**
- Dados Pessoais
- Informações de Contato
- Endereço Residencial
- Preferências de Oportunidades
- Segurança e Acessos (2FA toggle, alteração de senha, gerenciamento de sessões)

**Ações:** Edição de cada seção, ativação/desativação de 2FA, exclusão de dispositivos/sessões.

---

#### RF-018 — Meu Currículo

**Objetivo:** Permitir visualização e edição do currículo do candidato.

**Seções:**
- Resumo Profissional
- Experiências Profissionais (lista com títulos de cargo, empresa, período)
- Formação Acadêmica
- Cursos e Certificações
- Competências e Habilidades
- Idiomas

---

#### RF-019 — Minhas Candidaturas

**Objetivo:** Apresentar o status das candidaturas do candidato.

**Ações disponíveis:**
- Busca por número do edital ou cargo
- Visualização de cards de candidatura com status
- Informações sobre "Preparação para Entrevista com a Liderança"
- Contatos da Comissão de Seleção & Suporte

---

#### RF-020 — Minhas Inscrições

**Objetivo:** Apresentar inscrições em cursos do candidato.

**Ações disponíveis:**
- Filtro por nome ou competência
- Filtro por código de inscrição
- Seção "Continuar Estudando" (cursos em andamento)
- Seção "Cursos Recentes Concluídos" (histórico)

---

### 3.4 — Painel do RH

#### RF-021 — Dashboard do RH

**Objetivo:** Apresentar visão geral operacional para profissionais de RH.

**Dados exibidos:**
- Funil de Recrutamento (visualização de pipeline)
- Atalhos Operacionais (botões de acesso rápido)
- Processos Seletivos Críticos
- Últimas Candidaturas

**Navegação lateral:** Visão Geral, Vagas & Editais, Candidaturas, Triagem, Currículos, Treinamentos, Notícias, Relatórios, Configurações.

---

#### RF-022 — Gerenciamento de Vagas

**Objetivo:** Listar e gerenciar vagas publicadas.

**Ações disponíveis:**
- Busca por cargo, código ou tag do edital
- Listagem de vagas com indicadores de status
- Acesso a criar, editar e visualizar detalhes de vagas

---

#### RF-023 — Detalhes do Currículo (Visão RH)

**Objetivo:** Apresentar currículo completo de um candidato para análise pelo RH.

**Seções:**
- Resumo Executivo & Perfil
- Trajetória Profissional
- Formação Acadêmica
- Competências Técnicas & Hard Skills
- Idiomas & Certificados Auditados
- Fit Cultural & Perfil

---

#### RF-024 — Triagem de Candidaturas

**Objetivo:** Gerenciar o funil de recrutamento com pipeline Kanban.

**Etapas do pipeline:**
1. Novos Inscritos
2. Triagem Curricular
3. Entrevista com RH
4. Estudo de Caso
5. Entrevista com Liderança
6. Proposta / Contratação

**Ações disponíveis:**
- Busca por nome ou formação do candidato
- Movimentação de candidatos entre etapas

---

#### RF-025 — Criar Vaga

**Objetivo:** Permitir criação de nova vaga com todas as informações.

**Seções do formulário:**
1. Informações Básicas da Posição
2. Detalhes & Descrição da Vaga
3. Configurações Operacionais & Publicação

**Funcionalidade adicional:** Pré-visualização da vaga em tempo real.

---

#### RF-026 — Editar Vaga

**Objetivo:** Permitir edição de vaga existente.

**Seções:**
- Parâmetros Principais do Cargo
- Descrição da Vaga e Atribuições
- Funil Atual de Candidaturas
- Ciclo de Vida da Vaga

---

#### RF-027 — Gerenciamento de Notícias

**Objetivo:** Listar e gerenciar notícias/comunicados.

**Ações disponíveis:**
- Busca por colaboradores, vagas, processos
- Listagem de notícias com indicadores de status
- Acesso a criar, editar e visualizar notícias

---

#### RF-028 — Criar Notícia

**Objetivo:** Permitir criação de novo comunicado/notícia.

**Seções do formulário:**
- Capa & Banner de Apresentação
- Redação & Corpo do Comunicado (editor rich text com template)
- Documentos & Anexos Oficiais (tabela com Tópico, Data, Status)
- Configurações
- Prévia da Notícia no RH Connect

---

#### RF-029 — Editar Notícia

**Objetivo:** Permitir edição de notícia existente.

**Seções:**
- Conteúdo Principal
- Imagem de Capa
- Corpo da Matéria
- Publicação
- Tags Associadas
- Histórico de Revisões

---

#### RF-030 — Categorias e Tags

**Objetivo:** Gerenciar taxonomia e classificação de vagas e cursos.

**Ações disponíveis:**
- Criar nova classificação
- Toggle de escopo: Vagas / Cursos
- Listagem de categorias e tags existentes

---

#### RF-031 — Criar Curso

**Objetivo:** Permitir criação de novo curso corporativo.

**Seções do formulário:**
- Informações Básicas
- Descrição & Objetivos Pedagógicos
- Instrutor / Responsável Acadêmico
- Configurações da Turma & Frequência
- Material Didático & Gravações (upload drag-and-drop)

**Funcionalidade adicional:** Pré-visualização do curso em tempo real.

---

#### RF-032 — Editar Curso

**Objetivo:** Permitir edição de curso existente.

**Seções:**
- Informações Pedagógicas e Acesso
- Grade de Encontros Síncronos e Chamada (grade de presença/frequência)

---

#### RF-033 — Inscrições em Cursos (Gestão RH)

**Objetivo:** Gerenciar inscrições de colaboradores em cursos.

**Funcionalidades:**
- Validação de presença
- Acompanhamento de inscrições

---

#### RF-034 — Relatórios e Indicadores

**Objetivo:** Apresentar métricas e indicadores para tomada de decisão.

**Gráficos/Métricas:**
- Volume de Contratações por Mês
- Distribuição de Vagas
- Eficácia dos Programas de Treinamento
- Principais Gargalos de Recrutamento por Cargo

---

#### RF-035 — Gestão de Usuários

**Objetivo:** Gerenciar usuários e acessos do sistema.

**Ações disponíveis:**
- Convidar novo usuário (formulário de convite)
- Atribuição de papéis
- Gerenciamento de acessos

---

#### RF-036 — Configurações

**Objetivo:** Configurações globais do sistema.

**Seções:**
- Dados da Empresa (nome, logo upload)
- Parâmetros de Recrutamento & Seleção (toggle: Notificação por E-mail Imediata, Feedback Automático)
- Conformidade LGPD & Governança de Dados

---

## 4. Requisitos Funcionais Consolidados

| ID | Requisito | Módulo |
|---|---|---|
| RF-001 | Página inicial com busca e destaques | Pública |
| RF-002 | Página "Sobre o RH" com formulário de ouvidoria | Pública |
| RF-003 | Listagem de vagas com filtros e paginação | Pública |
| RF-004 | Detalhes da vaga com candidatura | Pública |
| RF-005 | Catálogo de cursos com filtros | Pública |
| RF-006 | Detalhes do curso com inscrição | Pública |
| RF-007 | Listagem de notícias com newsletter | Pública |
| RF-008 | Detalhes da notícia com feedback | Pública |
| RF-009 | Envio de currículo multi-etapas (Banco de Talentos) | Pública |
| RF-010 | Confirmação de envio com protocolo | Pública |
| RF-011 | Login (Candidato / Colaborador) | Autenticação |
| RF-012 | Criação de conta | Autenticação |
| RF-013 | Esqueci minha senha | Autenticação |
| RF-014 | Confirmação de envio de recuperação | Autenticação |
| RF-015 | Definição de nova senha | Autenticação |
| RF-016 | Dashboard do candidato | Candidato |
| RF-017 | Meu perfil (edição) | Candidato |
| RF-018 | Meu currículo (edição) | Candidato |
| RF-019 | Minhas candidaturas | Candidato |
| RF-020 | Minhas inscrições em cursos | Candidato |
| RF-021 | Dashboard do RH | RH/Admin |
| RF-022 | Gerenciamento de vagas | RH/Admin |
| RF-023 | Detalhes do currículo (visão RH) | RH/Admin |
| RF-024 | Triagem de candidaturas (pipeline Kanban) | RH/Admin |
| RF-025 | Criar vaga | RH/Admin |
| RF-026 | Editar vaga | RH/Admin |
| RF-027 | Gerenciamento de notícias | RH/Admin |
| RF-028 | Criar notícia | RH/Admin |
| RF-029 | Editar notícia | RH/Admin |
| RF-030 | Categorias e tags | RH/Admin |
| RF-031 | Criar curso | RH/Admin |
| RF-032 | Editar curso | RH/Admin |
| RF-033 | Inscrições em cursos (gestão) | RH/Admin |
| RF-034 | Relatórios e indicadores | RH/Admin |
| RF-035 | Gestão de usuários | RH/Admin |
| RF-036 | Configurações do sistema | RH/Admin |

---

## 5. Requisitos Não Funcionais (RNF)

### RNF-001 — Acessibilidade (WCAG 2.1 AA)

| ID | Requisito | Descrição |
|---|---|---|
| RNF-001.1 | Conformidade WCAG 2.1 nível AA | Toda a interface pública e autenticada deverá atender ao nível AA de conformidade com as Diretrizes de Acessibilidade para Conteúdo Web 2.1 (WCAG 2.1). |
| RNF-001.2 | Leitura por tecnologias assistivas | Cada página deverá possuir `<title>` descritivo, landmarks ARIA (`<main>`, `<nav>`, `<header>`, `<footer>`) e hierarquia de headings (`h1`–`h6`) sem saltos. |
| RNF-001.3 | Contraste mínimo | Relação de contraste entre texto e fundo deverá ser ≥ 4.5:1 (texto normal) e ≥ 3:1 (texto grande, ≥ 18pt ou 14pt bold). |
| RNF-001.4 | Navegação por teclado | Todos os elementos interativos (botões, links, formulários, modais, accordion, Kanban) deverão ser acessíveis via `Tab`/`Shift+Tab` e operáveis via `Enter`/`Space`. |
| RNF-001.5 | Indicadores de foco | Elementos focáveis deverão exibir indicador de foco visível (outline) com contraste ≥ 3:1. |
| RNF-001.6 | Textos alternativos | Imagens informativas deverão possuir `alt` descritivo. Imagens decorativas deverão possuir `alt=""`. �cones sem texto visível deverão possuir `aria-label`. |
| RNF-001.7 | Formulários acessíveis | Campos de formulário deverão possuir `<label>` associado via `for`/`id`. Mensagens de erro deverão ser vinculadas via `aria-describedby`. Indicador de força da senha deverá comunicar estado via `aria-live`. |
| RNF-001.8 | Modais acessíveis | Modais deverão capturar foco, permitir fechamento via `Escape`, retornar foco ao elemento triggering ao fechar e possuir `aria-modal="true"` + `aria-labelledby`. |
| RNF-001.9 | Kanban acessível | Pipeline Kanban deverá suportar navegação por setas entre cards e colunas, com instrução clara de uso via `aria-roledescription`. |
| RNF-001.10 | Upload acessível | Zona de drag-and-drop deverá possuir alternativa de clique com rótulo claro e feedback via `aria-live` para estados (idle, sucesso, erro). |
| RNF-001.11 | Skip links | Páginas com sidebar/navegação lateral deverão oferecer "Pular para o conteúdo principal". |
| RNF-001.12 | Redução de movimento | Respeitar `prefers-reduced-motion: reduce` — desativar animações e transições não essenciais. |

---

### RNF-002 — Design Responsivo

| ID | Requisito | Descrição |
|---|---|---|
| RNF-002.1 | Breakpoints | A interface deverá se adaptar a no mínimo 3 breakpoints: **mobile** (≤ 640px), **tablet** (641–1024px) e **desktop** (≥ 1025px). |
| RNF-002.2 | Grade responsiva | Utilizar sistema de grade fluida (12 colunas desktop → 8 colunas tablet → 4 colunas mobile) com container responsivo. |
| RNF-002.3 | Tabelas em mobile | Tabelas extensas (vagas, candidaturas, inscrições) deverão usar scroll horizontal ou layout adaptativo (cards) em telas estreitas. |
| RNF-002.4 | Sidebar colapsável | Painel RH e dashboard do candidato deverão possuir sidebar colapsável em tablet e menu hamburger em mobile. |
| RNF-002.5 | Formulários multi-etapas | Formulários (envio de currículo, criar vaga) deverão manter progresso visível e campos empilhados verticalmente em mobile. |
| RNF-002.6 | Kanban responsivo | Pipeline Kanban deverá permitir scroll horizontal em tablet e modo lista/accordion em mobile. |
| RNF-002.7 | Touch targets | Elementos interativos deverão possuir área mínima de toque de 44×44px em dispositivos touch. |
| RNF-002.8 | Imagens responsivas | Imagens e banners deverão usar `srcset`/`sizes` ou CSS `object-fit` para evitar distorção e excesso de download. |

---

### RNF-003 — Performance

| ID | Requisito | Descrição |
|---|---|---|
| RNF-003.1 | Core Web Vitals | As páginas públicas (home, listagem de vagas, notícias) deverão atender: LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1 em conexão 4G. |
| RNF-003.2 | Tempo de carregamento inicial | Página inicial deverá carregar em ≤ 3s em conexão broadband (50 Mbps). Páginas autenticadas ≤ 4s. |
| RNF-003.3 | Time to First Byte (TTFB) | TTFB ≤ 600ms para páginas estáticas (SSG/ISR) e ≤ 1200ms para páginas dinâmicas (SSR). |
| RNF-003.4 | Lote de requisições | Requisições à API deverão ser agrupadas (batching) quando possível para reduzir round-trips. |
| RNF-003.5 | Cache de dados | Listagens públicas (vagas, cursos, notícias) deverão utilizar ISR (Incremental Static Regeneration) com revalidação de no mínimo 60s. |
| RNF-003.6 | Lazy loading | Imagens below-the-fold, componentes pesados (Recharts, editor rich text) e modais deverão ser carregados sob demanda (dynamic import). |
| RNF-003.7 | Paginação | Listagens com > 20 registros deverão usar paginação server-side com limite de 20 itens/página por padrão. |
| RNF-003.8 | Compressão de assets | Imagens deverão ser servidas em formato WebP/AVIF com compressão adequada. CSS e JS deverão ser minificados e servidos com gzip/brotli. |
| RNF-003.9 | Bundle size | O bundle principal (JS) não deverá exceder 250KB (gzipped). Páginas individuais não deverão exceder 150KB (gzipped). |
| RNF-003.10 | Database queries | Queries à API não deverão exceder 200ms em operações simples (CRUD) e 500ms em operações de agregação (relatórios). |

---

### RNF-004 — Segurança

| ID | Requisito | Descrição |
|---|---|---|
| RNF-004.1 | Autenticação JWT | Sessões autenticadas deverão utilizar JWT (access token + refresh token) com assinatura RS256 ou HS256. Access token: 15min. Refresh token: 7d. |
| RNF-004.2 | Senhas | Senhas deverão ser armazenadas com hash bcrypt (cost 12) ou Argon2id. Nunca em texto plano. |
| RNF-004.3 | Força de senha | Senhas deverão conter: ≥ 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial. |
| RNF-004.4 | Autenticação de dois fatores (2FA) | O sistema deverá suportar 2FA via TOTP (Google Authenticator, Authy) para usuários que optarem por ativar (conforme RF-017). |
| RNF-004.5 | Rate limiting | Endpoints de login deverão limitar a 5 tentativas/minuto por IP. Endpoints de API deverão limitar a 100 req/min por usuário autenticado. |
| RNF-004.6 | Bloqueio de conta | Conta deverá ser bloqueada temporariamente após 5 tentativas de login falhadas (lockout de 15min). |
| RNF-004.7 | CORS | API deverá permitir origem apenas do frontend configurado (`localhost:3000` em dev, domínio de produção). Headers: `Access-Control-Allow-Credentials: true`. |
| RNF-004.8 | Headers de segurança | Respostas HTTP deverão incluir: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 0`, `Referrer-Policy: strict-origin-when-cross-origin`, `Content-Security-Policy` (política restritiva). |
| RNF-004.9 | HSTS | Em produção, deverá usar `Strict-Transport-Security: max-age=31536000; includeSubDomains`. |
| RNF-004.10 | Validação server-side | Todos os dados de entrada deverão ser validados no backend (Bean Validation + sanitização). Nunca confiar na validação apenas no frontend. |
| RNF-004.11 | Proteção contra XSS | Saídas dinâmicas deverão ser sanitizadas. Rich text editor deverá sanitizar HTML antes de persistir. |
| RNF-004.12 | Proteção contra CSRF | Tokens CSRF deverão ser utilizados em mutações state-changing (POST, PUT, DELETE) via cookies. |
| RNF-004.13 | Sessões | Usuário deverá visualizar e encerrar sessões dispositivos em RF-017. Sessão expira após 30min de inatividade. |
| RNF-004.14 | Logs de auditoria | Ações críticas (login, alteração de dados, exclusão, mudança de papel) deverão ser registradas com timestamp, IP, user-agent e identificador do usuário. |
| RNF-004.15 | Upload seguro | Uploads deverão validar: tipo MIME permitido, tamanho máximo (5MB currículo, 10MB materiais didáticos, 2MB imagens), extensões permitidas. Arquivos deverão ser armazenados fora do diretório público. |
| RNF-004.16 | Secret management | Chaves secretas (JWT_SECRET, DB_PASSWORD, SMTP credentials) deverão ser gerenciadas via variáveis de ambiente. Nunca no código-fonte. |
| RNF-004.17 | Vulnerabilidades | O projeto deverá ser verificado periodicamente contra vulnerabilidades conhecidas (OWASP Top 10) usando ferramentas como Snyk ou Dependabot. |

---

### RNF-005 — Conformidade LGPD

| ID | Requisito | Descrição |
|---|---|---|
| RNF-005.1 | Base legal | Todo tratamento de dados pessoais deverá ter base legal identificada (consentimento, execução de contrato, legítimo interesse). |
| RNF-005.2 | Consentimento explícito | Envio de currículo (Banco de Talentos) e inscrição em newsletter deverão exigir consentimento explícito (checkbox de termos). |
| RNF-005.3 | Direito ao esquecimento | Usuário autenticado deverá poder solicitar exclusão de seus dados pessoais via painel (Configurações/LGPD). Dados deverão ser anonimizados ou removidos em até 15 dias. |
| RNF-005.4 | Portabilidade de dados | Usuário deverá poder exportar seus dados pessoais e currículo em formato estruturado (JSON/PDF). |
| RNF-005.5 | Minimização de dados | Formulários deverão coletar apenas dados estritamente necessários. Campos opcionais deverão ser claramente identificados. |
| RNF-005.6 | Retenção de dados | Dados de candidatos não selecionados deverão ser mantidos por no máximo 12 meses após o encerramento do processo seletivo, depois anonimizados ou excluídos. |
| RNF-005.7 | Registro de operações | O sistema deverá manter registro de todas as operações de tratamento de dados pessoais (criação, alteração, exclusão, acesso). |
| RNF-005.8 | Dados sensíveis | Dados sensíveis ( PcD, gênero) deverão possuir tratamento diferenciado com acesso restrito e justificativa de coleta. |
| RNF-005.9 | Política de privacidade | O sistema deverá exibir link acessível para a Política de Privacidade em todas as páginas (footer). |
| RNF-005.10 | Encarregado de dados (DPO) | As Configurações deverão permitir configurar os dados de contato do Encarregado de Proteção de Dados. |
| RNF-005.11 | Notificação de incidentes | Em caso de incidente de segurança com dados pessoais, o sistema deverá notificar os afetados e a ANPD em prazo razoável (até 72h). |

---

### RNF-006 — Compatibilidade de Navegadores e Dispositivos

| ID | Requisito | Descrição |
|---|---|---|
| RNF-006.1 | Navegadores suportados | Chrome (2 últimas versões), Firefox (2 últimas versões), Safari (2 últimas versões), Edge (2 últimas versões). |
| RNF-006.2 | Mobile | Safari iOS (2 últimas versões), Chrome Android (2 últimas versões). |
| RNF-006.3 | Resolução mínima | Largura mínima suportada: 320px (mobile pequeno). Resolução recomendada: 1280×720 ou superior. |
| RNF-006.4 | JavaScript obrigatório | O sistema requer JavaScript habilitado. Páginas públicas deverão exibir mensagem amigável quando JS estiver desabilitado. |
| RNF-006.5 | Cookies | O sistema dependerá de cookies para autenticação (httpOnly, secure, sameSite). O navegador deverá permitir cookies de first-party. |

---

### RNF-007 — Idioma e Localização

| ID | Requisito | Descrição |
|---|---|---|
| RNF-007.1 | Idioma padrão | Toda a interface deverá ser exibida em **português do Brasil (pt-BR)**, conforme `lang="pt-BR"` no HTML. |
| RNF-007.2 | Formatação de dados | Datas: DD/MM/AAAA. Moeda: R$ X.XXX,XX. Números: separador de milhar (.) e decimal (,). Telefone: (XX) XXXXX-XXXX. |
| RNF-007.3 | Timezone | Servidor e frontend deverão operar no fuso horário `America/Sao_Paulo` (UTC-3). |
| RNF-007.4 | Múltiplos idiomas | Não há necessidade de suporte a múltiplos idiomas na versão atual. Estrutura de i18n deverá ser prevista para facilitar futura internacionalização. |

---

### RNF-008 — Disponibilidade e Confiabilidade

| ID | Requisito | Descrição |
|---|---|---|
| RNF-008.1 | Uptime | O sistema deverá manter disponibilidade de ≥ 99.5% mensal (exceto manutenções programadas). |
| RNF-008.2 | Manutenção programada | Manutenções deverão ser agendadas com aviso mínimo de 48h e realizadas em horário de menor uso (00h–06h horário de Brasília). |
| RNF-008.3 | Backup | Banco de dados deverá possuir backup automático diário com retenção de 30 dias. Backup deverá ser testado mensalmente. |
| RNF-008.4 | Recuperação de falhas | O sistema deverá implementar graceful degradation — páginas públicas deverão permanecer acessíveis mesmo com falha parcial da API. |
| RNF-008.5 | Logs | Todas as requisições deverão gerar logs estruturados (JSON) com timestamp, método, path, status code, latência e user-id. Logs de erro deverão incluir stack trace. |
| RNF-008.6 | Monitoramento | Métricas de application performance (latência, throughput, erro rate) deverão ser coletadas e disponibilizadas em dashboard. |
| RNF-008.7 | Health check | Backend deverá expor endpoint `GET /health` retornando status do banco de dados e dependências externas. |
| RNF-008.8 | Tratamento de erros | Erros 5xx deverão exibir mensagem genérica ao usuário. Erros 4xx deverão exibir mensagem descritiva. Todos os erros deverão ser registrados em log. |

---

### RNF-009 — Manutenibilidade e Extensibilidade

| ID | Requisito | Descrição |
|---|---|---|
| RNF-009.1 | Arquitetura modular | Backend deverá seguir arquitetura modular (módulos por domínio: auth, candidato, vagas, cursos, notícias, etc.) conforme definido na estrutura de pacotes `br.com.rhconnect`. |
| RNF-009.2 | Padrões de código | Backend: convenções Spring Boot, Java 21, naming conventions padrão Maven. Frontend: convenções Next.js, TypeScript, componentes React funcionais. |
| RNF-009.3 | Testes unitários | Cobertura mínima de 70% em services do backend. Testes unitários em utils, validators e lógica de negócio. |
| RNF-009.4 | Testes de integração | Testes de integração para endpoints críticos (auth, candidatura, inscrição) usando Testcontainers (PostgreSQL). |
| RNF-009.5 | Documentação da API | Backend deverá gerar documentação OpenAPI 3.0 (SpringDoc/Swagger) acessível em `/swagger-ui.html`. |
| RNF-009.6 | Versionamento de API | API deverá suportar versionamento via path (`/api/v1/...`). |
| RNF-009.7 | CI/CD | Pipeline de CI deverá executar: lint, testes unitários, build, verificação de vulnerabilidades antes de cada merge na branch `main`. |
| RNF-009.8 | Code review | Nenhum código deverá ser mergingado sem pelo menos 1 review e aprovação de um membro da equipe. |
| RNF-009.9 | Branching strategy | Utilizar Git Flow: branches `main` (produção), `develop` (integração), `feature/*` (funcionalidades), `hotfix/*` (correções urgentes). |

---

### RNF-010 — Infraestrutura e Deploy

| ID | Requisito | Descrição |
|---|---|---|
| RNF-010.1 | Containerização | Backend e frontend deverão ser containerizados com Docker com Dockerfiles otimizados (multi-stage build). |
| RNF-010.2 | Orquestração | Produção deverá utilizar Docker Compose (simples) ou Kubernetes (escalável) conforme porte. |
| RNF-010.3 | Variáveis de ambiente | Todas as configurações sensíveis (DB_URL, DB_PASSWORD, JWT_SECRET, SMTP_* ) deverão ser gerenciadas via variáveis de ambiente ou secret manager. |
| RNF-010.4 | Portas padrão | Frontend: `3000`. Backend: `3001`. PostgreSQL: `5432`. |
| RNF-010.5 | HTTPS | Em produção, tráfego deverá ser servido via HTTPS com certificado TLS válido. |
| RNF-010.6 | CDN | Assets estáticos (imagens, fontes, bundles) deverão ser servidos via CDN em produção. |
| RNF-010.7 | Estratégia de upload | Arquivos deverão ser armazenados em bucket S3 (ou equivalente) com política de acesso privado e URLs temporárias (presigned URLs). |
| RNF-010.8 | Estratégia de cache | API: Redis (ou equivalente) para cache de sessões e dados frequentes. Frontend: ISR + stale-while-revalidate. |

---

### RNF-011 — Usabilidade

| ID | Requisito | Descrição |
|---|---|---|
| RNF-011.1 | Consistência visual | Componentes do design system (shadcn/ui + tokens do design.md) deverão ser utilizados de forma consistente em todas as telas. |
| RNF-011.2 | Feedback imediato | Ações do usuário deverão gerar feedback visual: toast para sucesso/erro, spinner para carregamento, skeleton para content loading. |
| RNF-011.3 | Validação inline | Formulários deverão validar campos em tempo real (blur) e exibir mensagens de erro abaixo do campo. |
| RNF-011.4 | Estados de UI | Todas as telas deverão implementar estados: carregamento (skeleton), vazio, erro, sucesso. |
| RNF-011.5 | Navegação | Breadcrumbs deverão estar presentes em páginas internas. Sidebar deverá indicar a página ativa. |
| RNF-011.6 | Atalhos | Dashboard do RH e do candidato deverão oferecer atalhos para ações frequentes. |
| RNF-011.7 | Mensagens de erro | Mensagens de erro deverão ser claras, orientar o usuário sobre como resolver e evitar códigos técnicos. |
| RNF-011.8 | Confirmação de ações destrutivas | Exclusões e alterações irreversíveis deverão exigir confirmação explícita (modal). |

---

### Quadro Resumo dos RNF

| ID | Categoria | Status |
|---|---|---|
| RNF-001 | Acessibilidade (WCAG 2.1 AA) | A implementar |
| RNF-002 | Design Responsivo | A implementar |
| RNF-003 | Performance | A implementar |
| RNF-004 | Segurança | A implementar |
| RNF-005 | Conformidade LGPD | A implementar |
| RNF-006 | Compatibilidade | A implementar |
| RNF-007 | Idioma e Localização | Parcialmente definido |
| RNF-008 | Disponibilidade e Confiabilidade | A implementar |
| RNF-009 | Manutenibilidade e Extensibilidade | A implementar |
| RNF-010 | Infraestrutura e Deploy | A implementar |
| RNF-011 | Usabilidade | A implementar |

---

## 6. Estados da Interface

### 6.1 Estados identificados nas telas

| Estado | Onde ocorre | Descrição |
|---|---|---|
| **Loading** | Não visível nas telas estáticas | Decisão pendente de implementação |
| **Vazio** | Não visível nas telas estáticas | Decisão pendente de implementação |
| **Erro** | Formulários (validação inline) | Mensagens de erro em campos de formulário (ex.: validação de CPF, confirmação de senha) |
| **Sucesso** | Envio de currículo (Tela 10), Inscrição em curso (Tela 06 modal), Newsletter (Tela 07), Feedback notícia (Tela 08) | Confirmação visual com mensagem e, quando aplicável, protocolo |
| **Confirmação** | Modal de candidatura (Tela 04) | Modal antes de confirmar ação de candidatura |
| **Toast/Notificação** | Compartilhamento (Tela 04), Copiar link (Tela 08), Feedback (Tela 08) | Mensagem temporária de feedback |
| **Indicador de força** | Criar conta (Tela 12), Nova senha (Tela 15) | Barra visual de força da senha com requisitos listados |
| **Validação em tempo real** | Criar conta (Tela 12), Envio de currículo (Tela 09) | Validação de CPF, correspondência de senhas |
| **Barra de progresso** | Envio de currículo (Tela 09) | Indicador de progresso multi-etapas |
| **Barra de progresso de leitura** | Detalhes da notícia (Tela 08) | Indicador de progresso de leitura do artigo |
| **Upload** | Envio de currículo (Tela 09), Criar curso (Tela 01), Configurações (Tela 36) | Zona de drag-and-drop com estados idle/sucesso |
| **Toggle** | Meu perfil (Tela 17), Configurações (Tela 36) | Switches para ativar/desativar funcionalidades (2FA, notificações) |
| **Pipeline Kanban** | Triagem de candidaturas (Tela 24) | Visualização de candidatos em colunas por etapa |
| **Accordion** | Detalhes do curso (Tela 06) | Módulos programáticos expansíveis com toggle "expandir todos" |
| **Preview em tempo real** | Criar vaga (Tela 25), Criar notícia (Tela 28) | Pré-visualização do conteúdo enquanto é digitado |

### 6.2 Estados não visíveis (pendentes)

Os seguintes estados não foram representados nos designs estáticos e deverão ser definidos durante a implementação:

- Estado de carregamento (skeleton/spinner)
- Estado vazio (nenhum registro encontrado)
- Estado de erro de rede/conexão
- Timeout de sessão
- Erro 404 (página não encontrada)
- Erro 500 (erro interno do servidor)
