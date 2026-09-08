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

## 5. Requisitos Não Funcionais

### 5.1 Acessibilidade

Não definido no design atual.

### 5.2 Idioma

O sistema apresenta toda a interface em **português do Brasil (pt-BR)**, conforme indicado no atributo `lang="pt-BR"` do HTML.

### 5.3 Design Responsivo

Não há evidência explícita de breakpoints de responsividade nos designs. As telas apresentam layout desktop.

> Decisão pendente de implementação: define-se responsividade para dispositivos móveis e tablets.

### 5.4 Performance

Não definido no design atual.

### 5.5 Conformidade LGPD

A Tela 36 (Configurações) apresenta uma seção dedicada a "Conformidade LGPD & Governança de Dados", indicando que o sistema deverá atender à Lei Geral de Proteção de Dados. Detalhes de implementação não definidos.

### 5.6 Compatibilidade de Navegadores

Não definido no design atual.

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
