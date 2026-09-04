# Regras de Negócio — RH Connect

## 1. Candidatos

### RN-001 — Cadastro de Candidato

**Descrição:** O candidato deve fornecer dados pessoais completos para criação de conta.

**Quando ocorre:** Na tela de criação de conta (Tela 12).

**Dados obrigatórios:** Nome completo, e-mail, CPF, telefone/WhatsApp, senha.

**Resultado esperado:** Conta criada com sucesso; candidato pode acessar o sistema.

---

### RN-002 — Validação de CPF

**Descrição:** O CPF deve ser validado em tempo real durante o preenchimento. O sistema deve informar se o CPF é válido ou inválido antes do envio do formulário.

**Quando ocorre:** Nas telas de criação de conta (Tela 12) e envio de currículo (Tela 09).

**Resultado esperado:** Indicador visual de validação em tempo real (válido/inválido).

---

### RN-003 — Identificador Único por CPF

**Descrição:** Cada CPF deve estar associado a apenas um usuário no sistema.

**Quando ocorre:** Na criação de conta.

**Resultado esperado:** Se o CPF já estiver cadastrado, o sistema deve retornar erro de conflito.

---

### RN-004 — Dois Tipos de Login

**Descrição:** O sistema possui dois fluxos de login distintos: Candidato e Colaborador. Cada aba apresenta campos e comportamentos próprios.

**Quando ocorre:** Na tela de login (Tela 11).

**Resultado esperado:** O usuário seleciona o tipo de perfil antes de informar credenciais.

---

### RN-005 — Identificador de Login

**Descrição:** O login aceita tanto e-mail quanto CPF como identificador.

**Quando ocorre:** Na tela de login (Tela 11) e recuperação de senha (Tela 13).

**Resultado esperado:** O sistema deve buscar o usuário por e-mail ou CPF.

---

## 2. Currículos

### RN-006 — Currículo Estruturado

**Descrição:** O currículo do candidato é composto por 6 seções estruturadas: Resumo Profissional, Experiências Profissionais, Formação Acadêmica, Cursos e Certificações, Competências e Habilidades, Idiomas.

**Quando ocorre:** Na edição do currículo (Tela 18).

**Resultado esperado:** Cada seção pode ser editada individualmente.

---

### RN-007 — Envio de Currículo Multi-Etapas

**Descrição:** O envio de currículo para o Banco de Talentos é realizado em 3 etapas sequenciais: (1) Identificação e Contato, (2) Formação e Alinhamento de Carreira, (3) Upload de Currículo e Termos.

**Quando ocorre:** Na tela de envio de currículo (Tela 09).

**Resultado esperado:** O candidato avança pelas etapas com barra de progresso. Campos obrigatórios devem ser preenchidos em cada etapa antes de avançar.

---

### RN-008 — Upload de Arquivo de Currículo

**Descrição:** O candidato pode anexar arquivo de currículo via drag-and-drop ou seleção de arquivo. O sistema deve exibir estado de upload (idle/sucesso).

**Quando ocorre:** Etapa 3 do envio de currículo (Tela 09).

**Resultado esperado:** Arquivo armazenado e associado ao perfil do candidato.

---

### RN-009 — Gênero e Inclusão

**Descrição:** O formulário de cadastro/currículo oferece opções de gênero inclusivas: Mulher cis, Homem cis, Mulher trans, Homem trans, Não-binário, Prefiro não declarar.

**Quando ocorre:** Na tela de envio de currículo (Tela 09).

**Resultado esperado:** Dados de gênero são armazenados de forma opcional e inclusiva.

---

### RN-010 — PcD (Pessoa com Deficiência)

**Descrição:** O candidato pode indicar se é PcD via toggle no formulário de currículo.

**Quando ocorre:** Na tela de envio de currículo (Tela 09).

**Resultado esperado:** Flag PcD armazenada e disponível para filtros e relatórios.

---

## 3. Vagas

### RN-011 — Publicação de Vagas

**Descrição:** Vagas são criadas e gerenciadas exclusivamente por profissionais de RH/Admin.

**Quando ocorre:** Nas telas de criar vaga (Tela 25) e editar vaga (Tela 26).

**Resultado esperado:** Vaga criada com status "Rascunho" ou "Publicada", dependendo das configurações operacionais.

---

### RN-012 — Ciclo de Vida da Vaga

**Descrição:** Uma vaga passa por um ciclo de vida que inclui pelo menos: Rascunho → Publicada → Em Processo → Encerrada.

**Quando ocorre:** Na edição de vaga (Tela 26), na seção "Ciclo de Vida da Vaga".

**Resultado esperado:** Transições de status controladas e registradas.

---

### RN-013 — Pré-visualização de Vaga

**Descrição:** O formulário de criação/edição de vaga oferece pré-visualização em tempo real do que será publicado.

**Quando ocorre:** Nas telas criar vaga (Tela 25) e editar vaga (Tela 26).

**Resultado esperado:** O profissional de RH visualiza como a vaga aparecerá para os candidatos enquanto a edita.

---

### RN-014 — Filtros de Vagas

**Descrição:** As vagas podem ser filtradas por Campus, Área, Tipo de Contrato e Modalidade de Trabalho. Filtros combinados são suportados.

**Quando ocorre:** Na listagem de oportunidades (Tela 03).

**Resultado esperado:** A listagem é atualizada dinamicamente com base nos filtros selecionados. Um botão "Limpar tudo" reseta todos os filtros.

---

### RN-015 — Vagas Similares

**Descrição:** Na página de detalhes de uma vaga, o sistema exibe vagas similares para aumentar o engajamento do candidato.

**Quando ocorre:** Na tela de detalhes da vaga (Tela 04).

**Resultado esperado:** Lista de vagas com características semelhantes é exibida na sidebar.

---

## 4. Candidaturas

### RN-016 — Confirmação de Candidatura

**Descrição:** Antes de confirmar a candidatura, o sistema exibe modal de confirmação para evitar ações acidentais.

**Quando ocorre:** Ao clicar em "Candidatar-se" na tela de detalhes da vaga (Tela 04).

**Resultado esperado:** Modal com opções "Confirmar" e "Cancelar". A candidatura só é registrada após confirmação explícita.

---

### RN-017 — Protocolo de Candidatura

**Descrição:** Ao confirmar candidatura, o sistema gera um número de protocolo único para acompanhamento.

**Quando ocorre:** Na tela de confirmação de envio (Tela 10).

**Resultado esperado:** Protocolo exibido com opção de cópia. Próximos passos comunicados ao candidato.

---

### RN-018 — Notificações de Candidatura

**Descrição:** O candidato deve ser notificado por e-mail e WhatsApp sobre atualizações na candidatura.

**Quando ocorre:** Após registro de candidatura e em cada mudança de etapa (inferido da Tela 10).

**Resultado esperado:** Notificações automáticas disparadas a cada mudança de status.

---

### RN-019 — Pipeline de Triagem

**Descrição:** As candidaturas passam por 6 etapas sequenciais no pipeline de triagem: Novos Inscritos → Triagem Curricular → Entrevista com RH → Estudo de Caso → Entrevista com Liderança → Proposta / Contratação.

**Quando ocorre:** Na tela de triagem de candidaturas (Tela 24).

**Resultado esperado:** Profissionais de RH movem candidatos entre etapas manualmente (arrastar ou alterar status).

---

### RN-020 — Busca de Candidaturas

**Descrição:** Candidaturas podem ser buscadas por número do edital ou nome do cargo.

**Quando ocorre:** Na tela "Minhas Candidaturas" (Tela 19).

**Resultado esperado:** Filtragem instantânea com base no termo de busca.

---

## 5. Cursos

### RN-021 — Inscrição com Aprovação de Gestor

**Descrição:** A inscrição em cursos requer a indicação de um gestor imediato para aprovação. O candidato/colaborador seleciona o gestor no momento da inscrição.

**Quando ocorre:** No modal de inscrição do curso (Tela 06).

**Dados obrigatórios:** Identificador corporativo (Matrícula ou CPF), e-mail corporativo, gestor imediato.

**Resultado esperado:** Inscrição registrada com status "Pendente de Aprovação" até confirmação do gestor.

---

### RN-022 — Identificação Corporativa

**Descrição:** A inscrição em cursos aceita dois tipos de identificação: Matrícula ou CPF. O usuário escolhe via radio button.

**Quando ocorre:** No modal de inscrição do curso (Tela 06).

**Resultado esperado:** O sistema valida o identificador escolhido antes de processar a inscrição.

---

### RN-023 — Modalidades de Curso

**Descrição:** Os cursos possuem quatro modalidades: EAD Síncrono, Presencial, Híbrido, Autoinstrucional.

**Quando ocorre:** Na criação de curso (Tela 31) e filtros de busca (Tela 05).

**Resultado esperado:** Cada curso é classificado em uma modalidade que afeta a configuração de turma e presença.

---

### RN-024 — Progresso de Curso

**Descrição:** O sistema acompanha o progresso do candidato/colaborador nos cursos inscritos.

**Quando ocorre:** Na tela "Minhas Inscrições" (Tela 20), seção "Continuar Estudando".

**Resultado esperado:** Percentual de progresso exibido para cada curso em andamento.

---

### RN-025 — Presença em Encontros Síncronos

**Descrição:** Para cursos com encontros síncronos, o sistema gerencia a grade de chamada/presença.

**Quando ocorre:** Na edição de curso (Tela 32), seção "Grade de Encontros Síncronos e Chamada".

**Resultado esperado:** Registro de presença por sessão, com validação pelo profissional de RH.

---

## 6. Inscrições

### RN-026 — Validação de Presença

**Descrição:** O profissional de RH valida a presença dos inscritos em cursos.

**Quando ocorre:** Na tela "Inscrições em Cursos" (Tela 33), seção "Validação de Presença".

**Resultado esperado:** Status de presença atualizado para cada inscrito.

---

### RN-027 — Código de Inscrição

**Descrição:** Cada inscrição em curso gera um código único que pode ser utilizado para busca e acompanhamento.

**Quando ocorre:** Na tela "Minhas Inscrições" (Tela 20).

**Resultado esperado:** Código exibido e utilizável como filtro de busca.

---

## 7. Notícias

### RN-028 — Tipos de Notícia

**Descrição:** As notícias são classificadas em categorias: Artigos & Atualizações, Portarias & Decretos, Mural de Avisos Rápidos.

**Quando ocorre:** Na listagem de notícias (Tela 07) e na criação (Tela 28).

**Resultado esperado:** Notícias são organizadas por tipo na listagem.

---

### RN-029 — Newsletter

**Descrição:** Os usuários podem se inscrever na newsletter informando e-mail corporativo. O sistema confirma a inscrição com feedback visual.

**Quando ocorre:** Na tela de listagem de notícias (Tela 07).

**Resultado esperado:** Inscrição registrada; e-mail adicionado à lista de distribuição.

---

### RN-030 — Feedback de Leitura

**Descrição:** Os leitores podem avaliar se uma notícia foi útil ou não. O feedback é registrado anonimamente.

**Quando ocorre:** Na tela de detalhes da notícia (Tela 08).

**Resultado esperado:** Feedback registrado com toast de confirmação.

---

### RN-031 — Histórico de Revisões

**Descrição:** Edições em notícias são rastreadas em um histórico de revisões.

**Quando ocorre:** Na edição de notícia (Tela 29), seção "Histórico de Revisões".

**Resultado esperado:** Lista cronológica de alterações com data e responsável.

---

### RN-032 — Tags em Notícias

**Descrição:** Notícias podem ser associadas a tags para facilitar categorização e busca.

**Quando ocorre:** Na criação e edição de notícias (Telas 28 e 29).

**Resultado esperado:** Tags são selecionadas ou criadas e associadas à notícia.

---

## 8. Usuários

### RN-033 — Convite de Usuários

**Descrição:** Novos usuários (colaboradores/administradores) são adicionados ao sistema via convite, não por registro direto.

**Quando ocorre:** Na gestão de usuários (Tela 35).

**Resultado esperado:** Convite enviado por e-mail; usuário aceita e define senha.

---

### RN-034 — Autenticação de Dois Fatores (2FA)

**Descrição:** O candidato/colaborador pode ativar a autenticação de dois fatores nas configurações de segurança do perfil.

**Quando ocorre:** No perfil do usuário (Tela 17), seção "Segurança e Acessos".

**Resultado esperado:** Toggle ativa/desativa 2FA. Quando ativado, login requer segunda forma de verificação.

---

### RN-035 — Gerenciamento de Sessões

**Descrição:** O usuário pode visualizar e encerrar sessões ativas em dispositivos diferentes.

**Quando ocorre:** No perfil do usuário (Tela 17), seção "Segurança e Acessos".

**Resultado esperado:** Lista de sessões ativas com opção de remoção.

---

## 9. Relatórios

### RN-036 — Métricas de Recrutamento

**Descrição:** O dashboard de relatórios apresenta: Volume de Contratações por Mês, Distribuição de Vagas, Eficácia dos Programas de Treinamento, Principais Gargalos de Recrutamento por Cargo.

**Quando ocorre:** Na tela de relatórios e indicadores (Tela 34).

**Resultado esperado:** Gráficos e dados consolidados para tomada de decisão.

---

## 10. Configurações

### RN-037 — Notificações por E-mail

**Descrição:** O administrador pode ativar ou desativar o envio de notificações por e-mail de forma global.

**Quando ocorre:** Nas configurações do sistema (Tela 36), toggle "Notificação por E-mail Imediata".

**Resultado esperado:** Quando desativado, nenhuma notificação por e-mail é enviada pelo sistema.

---

### RN-038 — Feedback Automático

**Descrição:** O administrador pode ativar ou desativar o envio automático de feedback para candidatos.

**Quando ocorre:** Nas configurações do sistema (Tela 36), toggle "Feedback Automático".

**Resultado esperado:** Quando ativado, o sistema envia feedback automático aos candidatos a cada mudança de etapa.

---

### RN-039 — Conformidade LGPD

**Descrição:** O sistema deve possui seção dedicada a conformidade com a Lei Geral de Proteção de Dados (LGPD) e governança de dados.

**Quando ocorre:** Nas configurações do sistema (Tela 36), seção "Conformidade LGPD & Governança de Dados".

**Resultado esperado:** Regras de retenção, consentimento e exclusão de dados pessoais.

---

## 11. Status

### Status de Vaga

| Status | Descrição |
|---|---|
| Rascunho | Vaga em criação, não publicada |
| Publicada | Vaga visível para candidatos |
| Em Processo | Vaga com candidaturas em andamento |
| Encerrada | Vaga finalizada |

> Mapeamento inferido a partir do "Ciclo de Vida da Vaga" (Tela 26). Nomes exatos dos status podem divergir na implementação.

---

### Status de Candidatura

| Status | Descrição |
|---|---|
| Novos Inscritos | Candidatura recém-registrada |
| Triagem Curricular | Em análise de currículo |
| Entrevista com RH | Agendada ou em andamento |
| Estudo de Caso | Etapa de avaliação prática |
| Entrevista com Liderança | Entrevista final |
| Proposta / Contratação | Proposta enviada ou contratado |

> Mapeado diretamente do pipeline Kanban (Tela 24).

---

### Status de Inscrição em Curso

| Status | Descrição |
|---|---|
| Pendente de Aprovação | Aguardando confirmação do gestor |
| Aprovada | Inscrição confirmada |
| Em Andamento | Curso em progresso |
| Concluída | Curso finalizado |

> Inferido a partir das telas de inscrição (Tela 06) e acompanhamento (Tela 20).

---

### Status de Notícia

| Status | Descrição |
|---|---|
| Rascunho | Notícia em criação |
| Publicada | Notícia visível |
| Arquivada | Notícia removida da listagem |

> Inferido a partir do gerenciamento de notícias (Tela 27).

---

## 12. Regras Não Definidas

As seguintes regras de negócio foram identificadas como necessárias, mas não possuem definição nas telas:

| Regra | Pendência |
|---|---|
| Regras de aprovação de gestor para inscrição em curso | Fluxo exato de aprovação não definido |
| Regras de exclusão de dados pessoais (LGPD) | Políticas de retenção não definidas |
| Regras de reenvio de currículo | Não é possível reenviar? Editar? |
| Regras de cancelamento de candidatura | Fluxo de cancelamento não visível nas telas |
| Regras de notificação por WhatsApp | Integração com WhatsApp não definida |
| Regras de acesso a dados entre perfis | Quem vê quê exatamente não totalmente definido |
| Regras de exportação de dados | Funcionalidade não visível nas telas |
| Regras de backup de dados | Não definido |
| Regras de expiração de vagas | Tempo máximo de publicação não definido |
| Regras de limite de candidaturas | Candidato pode se candidatar a quantas vagas? |
