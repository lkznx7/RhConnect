# Banco de Dados — RH Connect

## 1. Visão Geral

O RH Connect utiliza **PostgreSQL** como banco de dados relacional. O banco é responsável pelo armazenamento persistente de todas as entidades do sistema, garantindo integridade referencial e suporte a consultas para relatórios e indicadores.

O modelo de dados foi inferido a partir das telas e interfaces do sistema. Todos os campos listados possuem evidência visual nas telas.

---

## 2. Entidades Identificadas

### Entidade: Usuario

**Objetivo:** Armazenar dados de autenticação e acesso dos usuários do sistema (candidatos, colaboradores e administradores).

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito (identificador único) |
| nome_completo | VARCHAR(255) | Sim | Tela 12 — Criar Conta |
| email | VARCHAR(255) | Sim | Tela 12 — Criar Conta |
| cpf | VARCHAR(14) | Sim | Tela 12 — Criar Conta, Tela 11 — Login |
| telefone_whatsapp | VARCHAR(15) | Sim | Tela 12 — Criar Conta |
| senha_hash | VARCHAR(255) | Sim | Tela 12 — Criar Conta |
| perfil | ENUM / VARCHAR | Sim | Tela 11 (Candidato / Colaborador) |
| objetivo_no_rh_connect | VARCHAR | Sim | Tela 12 — Radio buttons |
| ativo | BOOLEAN | Sim | Implícito |
| criado_em | TIMESTAMP | Sim | Implícito |
| atualizado_em | TIMESTAMP | Sim | Implícito |

---

### Entidade: Candidato

**Objetivo:** Dados complementares do perfil de candidato, estendendo o Usuario.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| usuario_id | FK → Usuario | Sim | Implícito |
| data_nascimento | DATE | Sim | Tela 09 — Envio de Currículo |
| genero | ENUM / VARCHAR | Não | Tela 09 — Envio de Currículo |
| pcd | BOOLEAN | Não | Tela 09 — Toggle PcD |
| cidade | VARCHAR(100) | Sim | Tela 09 — Envio de Currículo |
| uf | CHAR(2) | Sim | Tela 09 — Envio de Currículo |
| email_profissional | VARCHAR(255) | Sim | Tela 09 — Envio de Currículo |
| area_interesse | VARCHAR(255) | Sim | Tela 09 — Etapa 2 |
| nivel_senioridade | VARCHAR(50) | Sim | Tela 09 — Etapa 2 |
| expectativa_salarial | VARCHAR(50) | Sim | Tela 09 — Etapa 2 |
| modalidade_trabalho_preferida | VARCHAR(50) | Sim | Tela 09 — Etapa 2 |
| resumo_carreira | TEXT | Não | Tela 09 — Etapa 2 |
| linkedin_url | VARCHAR(500) | Não | Tela 09 — Etapa 2 |
| portfolio_url | VARCHAR(500) | Não | Tela 09 — Etapa 2 |
| curriculo_arquivo_url | VARCHAR(500) | Não | Tela 09 — Etapa 3 (upload) |

---

### Entidade: Curriculo

**Objetivo:** Armazenar o currículo estruturado do candidato.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| candidato_id | FK → Candidato | Sim | Implícito |
| resumo_profissional | TEXT | Não | Tela 18 — Meu Currículo |
| atualizado_em | TIMESTAMP | Sim | Implícito |

**Observação:** Experiências profissionais, formação, cursos, competências e idiomas são sub-entidades relacionadas (ver entidades abaixo).

---

### Entidade: ExperienciaProfissional

**Objetivo:** Armazenar experiências profissionais do candidato.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| curriculo_id | FK → Curriculo | Sim | Implícito |
| cargo | VARCHAR(255) | Sim | Tela 18 — Experiências |
| empresa | VARCHAR(255) | Sim | Tela 18 — Experiências |
| periodo | VARCHAR(100) | Sim | Tela 18 — Experiências |
| descricao | TEXT | Não | Tela 23 — Detalhes do Currículo (visão RH) |

---

### Entidade: FormacaoAcademica

**Objetivo:** Armazenar formação acadêmica do candidato.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| curriculo_id | FK → Curriculo | Sim | Implícito |
| curso | VARCHAR(255) | Sim | Tela 18 — Formação Acadêmica |
| instituicao | VARCHAR(255) | Sim | Tela 18 — Formação Acadêmica |
| nivel | VARCHAR(100) | Sim | Tela 18 — Formação Acadêmica |
| periodo | VARCHAR(100) | Não | Tela 18 — Formação Acadêmica |

---

### Entidade: CursoCertificacao

**Objetivo:** Armazenar cursos e certificações do candidato.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| curriculo_id | FK → Curriculo | Sim | Implícito |
| nome | VARCHAR(255) | Sim | Tela 18 — Cursos e Certificações |
| instituicao | VARCHAR(255) | Não | Tela 18 — Cursos e Certificações |
| ano | INTEGER | Não | Tela 18 — Cursos e Certificações |

---

### Entidade: Competencia

**Objetivo:** Armazenar competências e habilidades do candidato.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| curriculo_id | FK → Curriculo | Sim | Implícito |
| nome | VARCHAR(255) | Sim | Tela 18 — Competências e Habilidades |
| nivel | VARCHAR(50) | Não | Tela 23 — Detalhes do Currículo (visão RH) |

---

### Entidade: Idioma

**Objetivo:** Armazenar idiomas do candidato.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| curriculo_id | FK → Curriculo | Sim | Implícito |
| idioma | VARCHAR(100) | Sim | Tela 18 — Idiomas |
| nivel | VARCHAR(50) | Sim | Tela 18 — Idiomas |

---

### Entidade: Vaga

**Objetivo:** Armazenar vagas/publicações de emprego.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| titulo | VARCHAR(255) | Sim | Tela 04, 25, 26 |
| descricao | TEXT | Sim | Tela 25 — Descrição da Vaga |
| responsabilidades | TEXT | Sim | Tela 04 — Principais Responsabilidades |
| requisitos_obrigatorios | TEXT | Sim | Tela 04 — Requisitos Obrigatórios |
| diferenciais | TEXT | Não | Tela 04 — Diferenciais Desejáveis |
| beneficios | TEXT | Sim | Tela 04 — Benefícios & Vantagens |
| etapas_processo | TEXT | Sim | Tela 04 — Etapas do Processo Seletivo |
| campus | VARCHAR(255) | Sim | Tela 03 — Filtro Campus |
| area | VARCHAR(255) | Sim | Tela 03 — Filtro Área |
| tipo_contrato | VARCHAR(100) | Sim | Tela 03 — Filtro Tipo de Contrato |
| modalidade_trabalho | VARCHAR(100) | Sim | Tela 03 — Filtro Modalidade de Trabalho |
| numero_edital | VARCHAR(50) | Sim | Tela 19 — Busca por edital |
| status | ENUM / VARCHAR | Sim | Tela 22, 26 — Ciclo de vida |
| criado_por | FK → Usuario | Sim | Implícito |
| criado_em | TIMESTAMP | Sim | Implícito |
| atualizado_em | TIMESTAMP | Sim | Implícito |

---

### Entidade: Candidatura

**Objetivo:** Registrar a candidatura de um candidato a uma vaga.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| candidato_id | FK → Candidato | Sim | Implícito |
| vaga_id | FK → Vaga | Sim | Implícito |
| status | ENUM / VARCHAR | Sim | Tela 19, 24 — Status de candidatura |
| protocolo | VARCHAR(50) | Sim | Tela 10 — Número de protocolo |
| data_candidatura | TIMESTAMP | Sim | Implícito |
| etapa_atual | VARCHAR(100) | Sim | Tela 24 — Pipeline Kanban |

---

### Entidade: Curso

**Objetivo:** Armazenar cursos corporativos.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| titulo | VARCHAR(255) | Sim | Tela 31, 32 |
| descricao | TEXT | Sim | Tela 31 — Descrição & Objetivos |
| area_conhecimento | VARCHAR(255) | Sim | Tela 05 — Filtro |
| modalidade | VARCHAR(100) | Sim | Tela 05 — Filtro (EAD, Presencial, Híbrido, Autoinstrucional) |
| nivel_proficiencia | VARCHAR(100) | Sim | Tela 05 — Filtro |
| instrutor | VARCHAR(255) | Sim | Tela 31 — Instrutor / Responsável |
| ementa | TEXT | Sim | Tela 06 — Ementa & Módulos |
| metodologia | TEXT | Sim | Tela 06 — Metodologia |
| corpo_docente | TEXT | Não | Tela 06 — Corpo Docente |
| configuracoes_turma | JSON / TEXT | Sim | Tela 31 — Configurações da Turma |
| material_didatico_url | VARCHAR(500) | Não | Tela 31 — Upload de Material |
| status | ENUM / VARCHAR | Sim | Implícito |
| criado_por | FK → Usuario | Sim | Implhecito |
| criado_em | TIMESTAMP | Sim | Implícito |
| atualizado_em | TIMESTAMP | Sim | Implícito |

---

### Entidade: InscricaoCurso

**Objetivo:** Registrar inscrição de candidato/colaborador em curso.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| curso_id | FK → Curso | Sim | Implícito |
| candidato_id | FK → Candidato | Sim | Tela 06 — Modal de inscrição |
| email_corporativo | VARCHAR(255) | Sim | Tela 06 — Modal de inscrição |
| identificador_corporativo | VARCHAR(50) | Sim | Tela 06 — Matrícula ou CPF |
| gestor_aprovador | VARCHAR(255) | Sim | Tela 06 — Select de gestor |
| status | ENUM / VARCHAR | Sim | Implícito |
| progresso | INTEGER | Não | Tela 20 — Continuar Estudando |
| data_inscricao | TIMESTAMP | Sim | Implícito |
| codigo_inscricao | VARCHAR(50) | Sim | Tela 20 — Filtro por código |

---

### Entidade: Noticia

**Objetivo:** Armazenar notícias, comunicados e portarias.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| titulo | VARCHAR(255) | Sim | Tela 28, 29 |
| corpo | TEXT | Sim | Tela 28 — Corpo do Comunicado |
| imagem_capa_url | VARCHAR(500) | Não | Tela 28 — Capa & Banner |
| tipo | ENUM / VARCHAR | Sim | Tela 07 — Seções (Artigos, Portarias, Avisos) |
| tags | JSON / TEXT | Não | Tela 29 — Tags Associadas |
| status | ENUM / VARCHAR | Sim | Tela 27 — Status de publicação |
| criado_por | FK → Usuario | Sim | Implícito |
| criado_em | TIMESTAMP | Sim | Implícito |
| atualizado_em | TIMESTAMP | Sim | Implícito |

---

### Entidade: AnexoNoticia

**Objetivo:** Armazenar anexos/documentos associados a notícias.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| noticia_id | FK → Noticia | Sim | Implícito |
| topico | VARCHAR(255) | Sim | Tela 28 — Tabela de Anexos |
| data | DATE | Sim | Tela 28 — Tabela de Anexos |
| status | VARCHAR(100) | Sim | Tela 28 — Tabela de Anexos |
| arquivo_url | VARCHAR(500) | Sim | Implícito |

---

### Entidade: Categoria

**Objetivo:** Armazenar categorias e tags de classificação.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| nome | VARCHAR(255) | Sim | Tela 30 — Taxonomia & Classificação |
| tipo | ENUM / VARCHAR | Sim | Tela 30 — Toggle Vagas / Cursos |
| criado_em | TIMESTAMP | Sim | Implícito |

---

### Entidade: ConfiguracaoSistema

**Objetivo:** Armazenar configurações globais do sistema.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| nome_empresa | VARCHAR(255) | Sim | Tela 36 — Dados da Empresa |
| logo_url | VARCHAR(500) | Não | Tela 36 — Upload de Logo |
| notificacao_email_imediata | BOOLEAN | Sim | Tela 36 — Toggle |
| feedback_automatico | BOOLEAN | Sim | Tela 36 — Toggle |
| conformidade_lgpd | TEXT | Sim | Tela 36 — LGPD & Governança |

---

### Entidade: ContatoOuvidoria

**Objetivo:** Armazenar mensagens enviadas via formulário de ouvidoria.

**Campos identificados:**

| Campo | Tipo Sugerido | Obrigatório | Origem |
|---|---|---|---|
| id | UUID / BIGINT | Sim | Implícito |
| nome_completo | VARCHAR(255) | Sim | Tela 02 — Formulário |
| email_institucional | VARCHAR(255) | Sim | Tela 02 — Formulário |
| setor_destino | VARCHAR(100) | Sim | Tela 02 — Select |
| matricula | VARCHAR(50) | Não | Tela 02 — Formulário |
| assunto | VARCHAR(255) | Sim | Tela 02 — Formulário |
| mensagem | TEXT | Sim | Tela 02 — Formulário |
| criado_em | TIMESTAMP | Sim | Implícito |

---

## 3. Relacionamentos

```
Usuario (1) ──── (1) Candidato
Candidato (1) ──── (1) Curriculo
Curriculo (1) ──── (N) ExperienciaProfissional
Curriculo (1) ──── (N) FormacaoAcademica
Curriculo (1) ──── (N) CursoCertificacao
Curriculo (1) ──── (N) Competencia
Curriculo (1) ──── (N) Idioma
Candidato (N) ──── (N) Vaga          [via Candidatura]
Candidato (N) ──── (N) Curso         [via InscricaoCurso]
Vaga (N) ──── (N) Candidato          [via Candidatura]
Curso (N) ──── (N) Candidato         [via InscricaoCurso]
Noticia (1) ──── (N) AnexoNoticia
Usuario (1) ──── (N) Vaga            [como criador]
Usuario (1) ──── (N) Curso           [como criador]
Usuario (1) ──── (N) Noticia         [como criador]
Categoria (N) ──── (N) Vaga          [via categorias/tags]
Categoria (N) ──── (N) Curso          [via categorias/tags]
```

---

## 4. Regras de Integridade

- **Cada Candidato possui exatamente um Curriculo** — o currículo é vinculado ao perfil do candidato.
- **Cada Candidatura é única por candidato-vaga** — um candidato não pode se candidatar duas vezes à mesma vaga (inferido a partir do pipeline de triagem).
- **CPF deve ser único** entre todos os usuarios — validação em tempo real na criação de conta.
- **Email deve ser único** entre todos os usuarios — usado como identificador de login.
- **Número de edital deve ser único** — usado como referência em buscas.
- **Protocolo de candidatura deve ser único** — gerado automaticamente no envio.

---

## 5. Índices

> Índices ainda não definidos.

Recomendações iniciais (pendentes de definição):
- `usuario.cpf` (único)
- `usuario.email` (único)
- `vaga.numero_edital` (único)
- `candidatura.protocolo` (único)
- `candidatura.status` (filtro frequente)
- `vaga.status` (filtro frequente)
- `noticia.status` (filtro frequente)
- `curso.area_conhecimento` (filtro frequente)

---

## 6. Histórico / Auditoria

### Evidências identificadas

- **Tela 29 (Editar Notícia):** Apresenta seção "Histórico de Revisões", indicando que o sistema deverá rastrear alterações em notícias.
- **Tela 23 (Detalhes do Currículo):** Apresenta "Certificados Auditados", indicando que o sistema poderá rastrear validação de certificados.

### Pendências

- Não está definido se o histórico de revisões se aplica a outras entidades além de notícias.
- Não está definido o que compõe um registro de auditoria (campos, timestamps, usuário responsável).

---

## 7. Decisões Pendentes

| Decisão | Impacto |
|---|---|
| Estratégia de soft delete vs. hard delete | Afeta todas as entidades |
| Estratégia de versionamento de dados | Afeta entidades com histórico (notícias, currículos) |
| Estratégia de auditoria (quem alterou, quando) | Afeta todas as entidades com edição |
| Tipos exatos de ENUM para status | Afeta Vaga, Candidatura, Curso, Noticia |
| Estratégia de armazenamento de arquivos | Afeta currículos, materiais didáticos, logos, imagens |
| Estratégia de paginação no banco | Afeta consultas com grandes volumes |
| Estratégia de backup | Não definido |
| Estratégia de replicação/failover | Não definido |
| Regras de retenção de dados LGPD | Afeta dados pessoais de candidatos |
