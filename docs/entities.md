# Entidades — RH Connect

## Visão Geral

O sistema RH Connect é composto por **15 entidades** organizadas em 4 domínios:

1. **Identidade e Acesso** — Quem é o usuário e como acessa o sistema
2. **Currículo** — Perfil profissional completo do candidato
3. **Recrutamento** — Vagas, candidaturas e pipeline seletivo
4. **Capacitação e Comunicação** — Cursos, notícias e configurações

O diagrama completo está em [database.dbml](database.dbml).

---

## Domínio 1 — Identidade e Acesso

### Usuario

**Papel central do sistema.** Toda pessoa que interage com o RH Connect possui um registro unificado de `Usuario`.

**O que representa:** A conta de autenticação **e** o perfil completo — nome, e-mail, CPF, senha, perfil de acesso **e** todos os dados de candidato/colaborador.

**Quem tem:** Candidatos, colaboradores de RH e administradores.

**Modelo unificado por role:** Não há tabela separada para `Candidato` ou `Colaborador`. Todos os campos de perfil vivem na própria tabela `usuario` e são **opcionais (nullable)**, preenchidos de forma condicional conforme o perfil:

- **CANDIDATO:** `data_nascimento`, `genero`, `pcd`, `cidade`, `uf`, `email_profissional`, `area_interesse`, `nivel_senioridade`, `expectativa_salarial`, `modalidade_trabalho_preferida`, `resumo_carreira`, `linkedin_url`, `portfolio_url`, `curriculo_arquivo_url`
- **COLABORADOR:** `matricula`, `cargo`, `departamento`, `gestor_imediato_id`, `email_corporativo`, `data_admissao`
- **ADMIN:** herda os dados base (sem campos extras obrigatórios)

**Relacionamentos:**
- `Usuario` → `curriculo` (1:1) — Se o perfil for CANDIDATO, pode haver um currículo
- `Usuario` → `vaga` (1:N) — Usuários RH criam vagas
- `Usuario` → `curso_corporativo` (1:N) — Usuários RH criam cursos
- `Usuario` → `noticia` (1:N) — Usuários RH criam notícias
- `Usuario` → `usuario` (1:N, auto) — `gestor_imediato_id` referencia outro colaborador
- `Usuario` → `candidatura` (1:N) — Candidatos se candidatam a vagas
- `Usuario` → `inscricao_curso` (1:N) — Candidatos/colaboradores se inscrevem em cursos

**Regras:**
- `email` é único no sistema
- `cpf` é único no sistema
- `matricula` e `email_corporativo` são únicos (quando preenchidos)
- `senha_hash` armazena a senha com criptografia (algoritmo a definir)
- `perfil` determina o que o usuário pode acessar: `CANDIDATO`, `COLABORADOR` ou `ADMIN`
- Se perfil = CANDIDATO, os campos de candidato devem ser preenchidos (validação no service); se COLABORADOR, os campos funcionais

---

### Curriculo

**Container principal do currículo estruturado.** Funciona como "cabeçalho" do currículo, com o resumo profissional.

**O que representa:** A versão organizada do histórico profissional do candidato.

**Relacionamentos:**
- `curriculo` ← `usuario` (1:1) — Um currículo por usuário candidato
- `curriculo` → `experiencia_profissional` (1:N)
- `curriculo` → `formacao_academica` (1:N)
- `curriculo` → `curso_certificacao` (1:N)
- `curriculo` → `competencia` (1:N)
- `curriculo` → `idioma` (1:N)

**Como funciona na prática:**
1. Candidato cria conta → `Usuario` é criado
2. Candidato preenche "Meu Currículo" → `curriculo` é criado com todas as sub-entidades
3. Candidato submete para Banco de Talentos → `curriculo` fica disponível para consulta pelo RH
4. RH visualiza "Detalhes do Currículo" → todas as sub-entidades são carregadas

---

### Sub-entidades do Currículo

Cada sub-entidade é uma lista de itens dentro do currículo:

| Entidade | O que armazena | Exemplo |
|---|---|---|
| **ExperienciaProfissional** | Cargos ocupados | "Analista de RH Jr." na "Empresa X" de "2020-2022" |
| **FormacaoAcademica** | Formação acadêmica | "Administração" na "USP" — "Graduação" |
| **CursoCertificacao** | Cursos extras e certificações | "Scrum Master" na "Scrum Alliance" — 2023 |
| **Competencia** | Habilidades e competências | "Gestão de Pessoas" — "Avançado" |
| **Idioma** | Idiomas e níveis | "Inglês" — "Avançado" |

**Padrão:** Todas seguem a mesma estrutura: `id`, `curriculo_id` (FK), campos específicos, `criado_em`.

---

## Domínio 3 — Recrutamento

### Vaga

**Publicação de emprego disponível.** Contém todas as informações que um candidato precisa para se candidatar.

**O que representa:** Uma oportunidade de trabalho com descrição, requisitos, benefícios e etapas do processo seletivo.

**Quem cria:** Usuários com perfil `COLABORADOR` ou `ADMIN`.

**Relacionamentos:**
- `vaga` ← `Usuario` (N:1) — Quem criou a vaga
- `vaga` → `candidatura` (1:N) — Candidaturas recebidas
- `vaga` → `categoria` (N:N) — Classificação por categorias/tags

**Ciclo de vida:**
```
RASCUNHO → PUBLICADA → EM_PROCESSO → ENCERRADA
```

**Campos-chave:**
- `numero_edital` — identificador único, usado em buscas
- `campus`, `area`, `tipo_contrato`, `modalidade_trabalho` — filtros de busca
- `etapas_processo` — define as fases do processo seletivo desta vaga

---

### Candidatura

**Registro de que um candidato se candidatou a uma vaga.** É a tabela associativa entre `usuario` (perfil candidato) e `vaga`.

**O que representa:** O momento exato em que um candidato expressa interesse em uma vaga, com protocolo de rastreamento.

**Relacionamentos:**
- `candidatura` ← `usuario` (N:1) — Quem se candidatou
- `candidatura` ← `vaga` (N:1) — A qual vaga

**Pipeline de triagem (status):**
```
NOVOS_INSCRITOS → TRIAGEM → ENTREVISTA_RH → ESTUDO_CASO → ENTREVISTA_LIDERANCA → PROPOSTA
```

**Como funciona na prática:**
1. Candidato clica "Candidatar-se" na vaga
2. Modal de confirmação é exibido
3. Candidato confirma → `candidatura` é criada com `protocolo` único
4. RH visualiza na tela "Triagem de Candidaturas" → candidato aparece na coluna "Novos Inscritos"
5. RH arrasta candidato para próxima etapa → `status` é atualizado
6. Candidato recebe notificação a cada mudança de status

---

## Domínio 4 — Capacitação e Comunicação

### Curso Corporativo

**Curso disponível no catálogo de capacitação.** Pode ser ministrado em diferentes modalidades.

**O que representa:** Um curso ou programa de treinamento que colaboradores e candidatos podem frequentar.

**Quem cria:** Usuários com perfil `COLABORADOR` ou `ADMIN`.

**Relacionamentos:**
- `curso_corporativo` ← `Usuario` (N:1) — Quem criou o curso
- `curso_corporativo` → `inscricao_curso` (1:N) — Inscrições recebidas
- `curso_corporativo` → `categoria` (N:N) — Classificação por categorias/tags

**Modalidades:** `EAD_SINCRONO`, `PRESENCIAL`, `HIBRIDO`, `AUTOINSTRUCIONAL`

---

### InscricaoCurso

**Registro de inscrição em curso.** É a tabela associativa entre `usuario` e `curso_corporativo`.

**O que representa:** O momento em que um candidato/colaborador se inscreve em um curso, incluindo aprovação do gestor.

**Relacionamentos:**
- `inscricao_curso` ← `usuario` (N:1) — Quem se inscreveu
- `inscricao_curso` ← `curso_corporativo` (N:1) — Em qual curso

**Fluxo:**
```
PENDENTE_APROVACAO → APROVADA → EM_ANDAMENTO → CONCLUIDA
```

**Dados obrigatórios na inscrição:**
- `identificador_corporativo` — Matrícula ou CPF
- `email_corporativo`
- `gestor_aprovador` — Nome do gestor que aprova a inscrição

---

### Noticia

**Comunicado, portaria ou aviso institucional.** Publicado pelo setor de RH para toda a organização.

**O que representa:** Um artigo ou comunicado que pode ser lido por todos os usuários (público ou autenticado).

**Quem cria:** Usuários com perfil `COLABORADOR` ou `ADMIN`.

**Relacionamentos:**
- `noticia` ← `Usuario` (N:1) — Quem publicou
- `noticia` → `anexo_noticia` (1:N) — Documentos anexos
- `noticia` → `categoria` (N:N) — Tags associadas

**Tipos:** `ARTIGO`, `PORTARIA`, `AVISO`

---

### AnexoNoticia

**Documento ou arquivo anexado a uma notícia.** Pode ser portaria, decreto ou outro documento oficial.

---

### Categoria

**Tag de classificação** utilizada para organizar vagas e cursos. Pode ser aplicada a ambos os domínios via tabelas associativas (`vaga_categoria`, `curso_categoria`).

**Tipos:** `VAGAS` ou `CURSOS`

---

## Entidades de Configuração

### ConfiguracaoSistema

**Configurações globais** — dados da empresa, parâmetros de recrutamento e conformidade LGPD. É uma tabela singleton.

### ContatoOuvidoria

**Mensagens de ouvidoria** — formulário público para contato com o setor de RH. Classificada como "Sigilosa".

### NewsletterInscricao

**Inscritos na newsletter** — e-mails que recebem comunicados automaticamente.

---

## Fluxo de Dados Geral

```
                    ┌──────────────┐
                    │   USUARIO    │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │CURRICULO │ │ vaga.criador│ │curso.criador│
        └────┬─────┘ └──────────┘ └──────────┘
             │
    ┌────────┼────────┐
    │        │        │
    ▼        ▼        ▼
┌────────┐┌──────┐┌──────────┐
│CURRICULO││CANDIDATURA││INSCRICAO_CURSO│
└────┬────┘└──────┘└──────────┘
     │
     ├── ExperienciaProfissional
     ├── FormacaoAcademica
     ├── CursoCertificacao
     ├── Competencia
     └── Idioma
```

---

## Resumo de Regras de Integridade

| Regra | Entidades | Descrição |
|---|---|---|
| **1 usuario = 1 perfil unificado** | `Usuario` | Todos os dados (candidato/colaborador/admin) em uma única tabela; campos condicionais pela role |
| **1 curriculo = 1 usuario** | `usuario` ↔ `curriculo` | Relação 1:1; cada usuário candidato tem no máximo um currículo |
| **CPF único** | `Usuario` | Não pode haver dois usuários com o mesmo CPF |
| **Email único** | `Usuario` | Não pode haver dois usuários com o mesmo e-mail |
| **Matrícula única** | `Usuario` | Não pode haver dois colaboradores com a mesma matrícula (quando preenchida) |
| **Email corporativo único** | `Usuario` | Não pode haver dois colaboradores com o mesmo e-mail corporativo (quando preenchido) |
| **1 candidatura por usuario-vaga** | `candidatura` | Um candidato não pode se candidatar duas vezes à mesma vaga |
| **Protocolo único** | `candidatura` | Cada candidatura gera um protocolo único para rastreamento |
| **Edital único** | `vaga` | Número do edital é identificador único da vaga |
| **Codigo de inscrição único** | `inscricao_curso` | Cada inscrição em curso gera código único |

---

## Enums e Status

### Perfil de Usuario

| Valor | Descrição |
|---|---|
| `CANDIDATO` | Acessa área pública e dashboard do candidato |
| `COLABORADOR` | Acessa painel RH (gerenciamento) |
| `ADMIN` | Acessa painel RH + configurações do sistema |

### Status de Vaga

| Valor | Descrição |
|---|---|
| `RASCUNHO` | Vaga em criação, não publicada |
| `PUBLICADA` | Vaga visível para candidatos |
| `EM_PROCESSO` | Vaga com candidaturas em andamento |
| `ENCERRADA` | Vaga finalizada |

### Status de Candidatura

| Valor | Descrição |
|---|---|
| `NOVOS_INSCRITOS` | Candidatura recém-registrada |
| `TRIAGEM` | Em análise de currículo |
| `ENTREVISTA_RH` | Entrevista com RH em andamento |
| `ESTUDO_CASO` | Etapa de avaliação prática |
| `ENTREVISTA_LIDERANCA` | Entrevista com liderança |
| `PROPOSTA` | Proposta enviada ou contratado |

### Status de Inscrição em Curso

| Valor | Descrição |
|---|---|
| `PENDENTE_APROVACAO` | Aguardando confirmação do gestor |
| `APROVADA` | Inscrição confirmada |
| `EM_ANDAMENTO` | Curso em progresso |
| `CONCLUIDA` | Curso finalizado |

### Status de Noticia

| Valor | Descrição |
|---|---|
| `RASCUNHO` | Notícia em criação |
| `PUBLICADA` | Notícia visível |
| `ARQUIVADA` | Notícia removida da listagem |

### Modalidade de Curso

| Valor | Descrição |
|---|---|
| `EAD_SINCRONO` | Aula online ao vivo |
| `PRESENCIAL` | Presencial |
| `HIBRIDO` | Misto (presencial + online) |
| `AUTOINSTRUCIONAL` | Conteúdo sob demanda |

### Genero

| Valor | Descrição |
|---|---|
| `MULHER_CIS` | Mulher cisgênero |
| `HOMEM_CIS` | Homem cisgênero |
| `MULHER_TRANS` | Mulher transgênero |
| `HOMEM_TRANS` | Homem transgênero |
| `NAO_BINARIO` | Pessoa não-binária |
| `PREFIRO_NAO_DECLARAR` | Prefere não declarar |
