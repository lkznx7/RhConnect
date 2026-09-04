# API — RH Connect

## 1. Visão Geral

Este documento define o contrato de comunicação entre o **Frontend (Next.js)** e o **Backend (Spring Boot)** do RH Connect. A API é do tipo REST e utiliza JSON como formato de dados.

> **Nota:** O backend ainda não foi implementado. Este documento representa o contrato esperado com base nas funcionalidades identificadas nas telas.

---

## 2. Padrão de Comunicação

| Aspecto | Definição |
|---|---|
| **Protocolo** | HTTP/HTTPS |
| **Formato** | JSON (`application/json`) |
| **Estilo** | REST |
| **URL base** | `http://localhost:3001/api` (configurável via `NEXT_PUBLIC_API_URL`) |
| **Autenticação** | Bearer Token (JWT) via header `Authorization` |

---

## 3. Endpoints

### 3.1 Autenticação

#### POST /auth/login

**Objetivo:** Autenticar usuário e retornar token de acesso.

**Request:**
```json
{
  "identifier": "email@exemplo.com ou 000.000.000-00",
  "senha": "string",
  "perfil": "CANDIDATO ou COLABORADOR"
}
```

**Response (200):**
```json
{
  "accessToken": "string",
  "refreshToken": "string",
  "usuario": {
    "id": "uuid",
    "nome": "string",
    "email": "string",
    "perfil": "CANDIDATO"
  }
}
```

**Erros:**
- `400` — Dados inválidos
- `401` — Credenciais inválidas
- `404` — Usuário não encontrado

---

#### POST /auth/register

**Objetivo:** Criar nova conta de usuário.

**Request:**
```json
{
  "nomeCompleto": "string",
  "email": "string",
  "cpf": "000.000.000-00",
  "telefoneWhatsapp": "(00) 00000-0000",
  "senha": "string",
  "confirmacaoSenha": "string",
  "objetivoRhConnect": "string"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "mensagem": "Conta criada com sucesso"
}
```

**Erros:**
- `400` — Dados inválidos ou senhas não conferem
- `409` — CPF ou e-mail já cadastrado

---

#### POST /auth/forgot-password

**Objetivo:** Solicitar recuperação de senha.

**Request:**
```json
{
  "identifier": "email@exemplo.com ou 000.000.000-00"
}
```

**Response (200):**
```json
{
  "mensagem": "E-mail de recuperação enviado"
}
```

---

#### POST /auth/reset-password

**Objetivo:** Definir nova senha após recuperação.

**Request:**
```json
{
  "token": "string",
  "novaSenha": "string",
  "confirmacaoSenha": "string"
}
```

**Response (200):**
```json
{
  "mensagem": "Senha redefinida com sucesso"
}
```

**Erros:**
- `400` — Senhas não conferem ou requisitos não atendidos
- `401` — Token inválido ou expirado

---

#### POST /auth/refresh

**Objetivo:** Renovar token de acesso.

**Request:**
```json
{
  "refreshToken": "string"
}
```

**Response (200):**
```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

---

### 3.2 Candidato

#### GET /candidates/me/profile

**Objetivo:** Obter perfil do candidato autenticado.

**Response (200):**
```json
{
  "id": "uuid",
  "nomeCompleto": "string",
  "email": "string",
  "cpf": "000.000.000-00",
  "telefone": "string",
  "dataNascimento": "YYYY-MM-DD",
  "genero": "string",
  "pcd": false,
  "cidade": "string",
  "uf": "SP",
  "areaInteresse": "string",
  "nivelSenioridade": "string",
  "expectativaSalarial": "string",
  "modalidadeTrabalho": "string",
  "resumoCarreira": "string",
  "linkedinUrl": "string",
  "portfolioUrl": "string"
}
```

---

#### PUT /candidates/me/profile

**Objetivo:** Atualizar perfil do candidato.

**Request:** Mesmo schema do GET, com campos opcionais para atualização parcial.

**Response (200):**
```json
{
  "mensagem": "Perfil atualizado com sucesso"
}
```

---

#### GET /candidates/me/curriculo

**Objetivo:** Obter currículo estruturado do candidato.

**Response (200):**
```json
{
  "resumoProfissional": "string",
  "experiencias": [
    {
      "id": "uuid",
      "cargo": "string",
      "empresa": "string",
      "periodo": "string",
      "descricao": "string"
    }
  ],
  "formacao": [
    {
      "id": "uuid",
      "curso": "string",
      "instituicao": "string",
      "nivel": "string",
      "periodo": "string"
    }
  ],
  "cursosCertificacoes": [
    {
      "id": "uuid",
      "nome": "string",
      "instituicao": "string",
      "ano": 2024
    }
  ],
  "competencias": [
    {
      "id": "uuid",
      "nome": "string",
      "nivel": "string"
    }
  ],
  "idiomas": [
    {
      "id": "uuid",
      "idioma": "string",
      "nivel": "string"
    }
  ]
}
```

---

#### PUT /candidates/me/curriculo

**Objetivo:** Atualizar currículo do candidato.

**Request:** Mesmo schema do GET.

**Response (200):**
```json
{
  "mensagem": "Currículo atualizado com sucesso"
}
```

---

#### GET /candidates/me/candidaturas

**Objetivo:** Listar candidaturas do candidato autenticado.

**Query params:** `busca` (número do edital ou cargo), `pagina`, `tamanhoPagina`.

**Response (200):**
```json
{
  "candidaturas": [
    {
      "id": "uuid",
      "vaga": {
        "id": "uuid",
        "titulo": "string",
        "campus": "string",
        "area": "string"
      },
      "status": "string",
      "etapaAtual": "string",
      "dataCandidatura": "YYYY-MM-DDTHH:mm:ss"
    }
  ],
  "totalRegistros": 0,
  "paginaAtual": 1,
  "totalPaginas": 1
}
```

---

#### GET /candidates/me/inscricoes

**Objetivo:** Listar inscrições em cursos do candidato.

**Query params:** `busca` (nome, competência), `codigo`, `pagina`, `tamanhoPagina`.

**Response (200):**
```json
{
  "inscricoes": [
    {
      "id": "uuid",
      "curso": {
        "id": "uuid",
        "titulo": "string",
        "modalidade": "string"
      },
      "status": "string",
      "progresso": 75,
      "dataInscricao": "YYYY-MM-DDTHH:mm:ss",
      "codigoInscricao": "string"
    }
  ],
  "totalRegistros": 0,
  "paginaAtual": 1,
  "totalPaginas": 1
}
```

---

#### POST /candidates/talent-bank

**Objetivo:** Submeter currículo para o Banco de Talentos (acesso público).

**Request (multipart/form-data):**
```
nomeCompleto: string
emailProfissional: string
telefoneWhatsapp: string
cpf: string
cidade: string
uf: string
dataNascimento: YYYY-MM-DD
genero: string
pcd: boolean
areaInteresse: string
nivelSenioridade: string
expectativaSalarial: string
modalidadeTrabalho: string
resumoCarreira: string
linkedinUrl: string (opcional)
portfolioUrl: string (opcional)
curriculo: arquivo (opcional)
aceiteTermos: boolean
```

**Response (201):**
```json
{
  "protocolo": "string",
  "mensagem": "Candidatura registrada com sucesso"
}
```

---

### 3.3 Vagas

#### GET /vagas

**Objetivo:** Listar vagas disponíveis (acesso público ou autenticado).

**Query params:** `busca`, `campus`, `area`, `tipoContrato`, `modalidadeTrabalho`, `pagina`, `tamanhoPagina`, `ordenarPor`.

**Response (200):**
```json
{
  "vagas": [
    {
      "id": "uuid",
      "titulo": "string",
      "campus": "string",
      "area": "string",
      "tipoContrato": "string",
      "modalidadeTrabalho": "string",
      "numeroEdital": "string"
    }
  ],
  "totalRegistros": 0,
  "paginaAtual": 1,
  "totalPaginas": 1
}
```

---

#### GET /vagas/{id}

**Objetivo:** Obter detalhes de uma vaga.

**Response (200):**
```json
{
  "id": "uuid",
  "titulo": "string",
  "descricao": "string",
  "responsabilidades": "string",
  "requisitosObrigatorios": "string",
  "diferenciais": "string",
  "beneficios": "string",
  "etapasProcesso": "string",
  "campus": "string",
  "area": "string",
  "tipoContrato": "string",
  "modalidadeTrabalho": "string",
  "numeroEdital": "string",
  "status": "string",
  "vagasSimilares": [
    {
      "id": "uuid",
      "titulo": "string",
      "campus": "string"
    }
  ]
}
```

---

#### POST /vagas

**Objetivo:** Criar nova vaga (somente RH/Admin).

**Request:**
```json
{
  "titulo": "string",
  "descricao": "string",
  "responsabilidades": "string",
  "requisitosObrigatorios": "string",
  "diferenciais": "string",
  "beneficios": "string",
  "etapasProcesso": "string",
  "campus": "string",
  "area": "string",
  "tipoContrato": "string",
  "modalidadeTrabalho": "string"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "mensagem": "Vaga criada com sucesso"
}
```

---

#### PUT /vagas/{id}

**Objetivo:** Atualizar vaga existente (somente RH/Admin).

**Request:** Mesmo schema do POST, com campos opcionais.

**Response (200):**
```json
{
  "mensagem": "Vaga atualizada com sucesso"
}
```

---

#### GET /vagas/{id}/funil

**Objetivo:** Obter funil de candidaturas de uma vaga.

**Response (200):**
```json
{
  "vagaId": "uuid",
  "etapas": [
    {
      "nome": "Novos Inscritos",
      "candidatos": [
        {
          "id": "uuid",
          "nome": "string",
          "formacao": "string",
          "dataCandidatura": "YYYY-MM-DD"
        }
      ]
    }
  ]
}
```

---

### 3.4 Candidaturas (Gestão RH)

#### GET /candidatures

**Objetivo:** Listar todas as candidaturas (visão RH).

**Query params:** `vagaId`, `status`, `busca`, `pagina`, `tamanhoPagina`.

**Response (200):** Mesmo schema de `/candidates/me/candidaturas`, com dados expandidos.

---

#### PUT /candidatures/{id}/status

**Objetivo:** Atualizar status/etapa de uma candidatura (movimentação no pipeline).

**Request:**
```json
{
  "novoStatus": "string",
  "observacao": "string (opcional)"
}
```

**Response (200):**
```json
{
  "mensagem": "Status atualizado com sucesso"
}
```

---

### 3.5 Currículos (Visão RH)

#### GET /curriculos/{id}

**Objetivo:** Obter detalhes completos de um currículo para análise pelo RH.

**Response (200):** Mesmo schema de `/candidates/me/curriculo`, com dados adicionais de fit cultural e perfil.

---

### 3.6 Cursos

#### GET /cursos

**Objetivo:** Listar cursos disponíveis.

**Query params:** `busca`, `areaConhecimento`, `modalidade`, `nivelProficiencia`, `ordenarPor`, `pagina`, `tamanhoPagina`.

**Response (200):**
```json
{
  "cursos": [
    {
      "id": "uuid",
      "titulo": "string",
      "areaConhecimento": "string",
      "modalidade": "string",
      "nivelProficiencia": "string",
      "instrutor": "string"
    }
  ],
  "totalRegistros": 0,
  "paginaAtual": 1,
  "totalPaginas": 1
}
```

---

#### GET /cursos/{id}

**Objetivo:** Obter detalhes de um curso.

**Response (200):**
```json
{
  "id": "uuid",
  "titulo": "string",
  "descricao": "string",
  "ementa": "string",
  "metodologia": "string",
  "corpoDocente": "string",
  "areaConhecimento": "string",
  "modalidade": "string",
  "nivelProficiencia": "string",
  "instrutor": "string",
  "cursosRelacionados": [
    {
      "id": "uuid",
      "titulo": "string"
    }
  ]
}
```

---

#### POST /cursos

**Objetivo:** Criar novo curso (somente RH/Admin).

**Request (multipart/form-data):**
```
titulo: string
descricao: string
ementa: string
metodologia: string
instrutor: string
areaConhecimento: string
modalidade: string
nivelProficiencia: string
configuracoesTurma: JSON string
materialDidatico: arquivo (opcional)
```

**Response (201):**
```json
{
  "id": "uuid",
  "mensagem": "Curso criado com sucesso"
}
```

---

#### PUT /cursos/{id}

**Objetivo:** Atualizar curso existente (somente RH/Admin).

**Request:** Mesmo schema do POST, com campos opcionais.

**Response (200):**
```json
{
  "mensagem": "Curso atualizado com sucesso"
}
```

---

#### POST /cursos/{id}/inscrever

**Objetivo:** Inscrever candidato/colaborador em curso.

**Request:**
```json
{
  "identificadorCorporativo": "string",
  "identificadorTipo": "MATRICULA ou CPF",
  "emailCorporativo": "string",
  "gestorAprovador": "string"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "codigoInscricao": "string",
  "mensagem": "Inscrição realizada com sucesso"
}
```

---

#### GET /cursos/inscricoes

**Objetivo:** Listar inscrições em cursos (visão RH/Admin).

**Query params:** `cursoId`, `status`, `busca`, `pagina`, `tamanhoPagina`.

---

#### PUT /cursos/inscricoes/{id}/presenca

**Objetivo:** Validar presença de um inscrito.

**Request:**
```json
{
  "presente": true,
  "observacao": "string (opcional)"
}
```

**Response (200):**
```json
{
  "mensagem": "Presença validada com sucesso"
}
```

---

### 3.7 Notícias

#### GET /noticias

**Objetivo:** Listar notícias/comunicados.

**Query params:** `busca`, `tipo`, `pagina`, `tamanhoPagina`.

**Response (200):**
```json
{
  "noticias": [
    {
      "id": "uuid",
      "titulo": "string",
      "tipo": "string",
      "imagemCapaUrl": "string",
      "criadoEm": "YYYY-MM-DDTHH:mm:ss"
    }
  ],
  "totalRegistros": 0,
  "paginaAtual": 1,
  "totalPaginas": 1
}
```

---

#### GET /noticias/{id}

**Objetivo:** Obter detalhes de uma notícia.

**Response (200):**
```json
{
  "id": "uuid",
  "titulo": "string",
  "corpo": "string",
  "imagemCapaUrl": "string",
  "tipo": "string",
  "tags": ["string"],
  "anexos": [
    {
      "id": "uuid",
      "topico": "string",
      "data": "YYYY-MM-DD",
      "status": "string",
      "arquivoUrl": "string"
    }
  ],
  "noticiasRelacionadas": [
    {
      "id": "uuid",
      "titulo": "string"
    }
  ]
}
```

---

#### POST /noticias

**Objetivo:** Criar nova notícia (somente RH/Admin).

**Request (multipart/form-data):**
```
titulo: string
corpo: string
tipo: string
imagemCapa: arquivo (opcional)
tags: JSON string (array de strings)
anexos: arquivo[] (opcional)
```

**Response (201):**
```json
{
  "id": "uuid",
  "mensagem": "Notícia criada com sucesso"
}
```

---

#### PUT /noticias/{id}

**Objetivo:** Atualizar notícia existente (somente RH/Admin).

**Request:** Mesmo schema do POST, com campos opcionais.

**Response (200):**
```json
{
  "mensagem": "Notícia atualizada com sucesso"
}
```

---

#### POST /noticias/{id}/feedback

**Objetivo:** Registrar feedback do leitor (útil/não útil).

**Request:**
```json
{
  "util": true
}
```

**Response (200):**
```json
{
  "mensagem": "Feedback registrado"
}
```

---

#### POST /noticias/newsletter

**Objetivo:** Inscrever e-mail na newsletter.

**Request:**
```json
{
  "email": "string"
}
```

**Response (200):**
```json
{
  "mensagem": "Inscrição na newsletter realizada com sucesso"
}
```

---

### 3.8 Contato / Ouvidoria

#### POST /contato/ouvidoria

**Objetivo:** Enviar mensagem via formulário de ouvidoria.

**Request:**
```json
{
  "nomeCompleto": "string",
  "emailInstitucional": "string",
  "setorDestino": "string",
  "matricula": "string (opcional)",
  "assunto": "string",
  "mensagem": "string",
  "aceiteTermos": true
}
```

**Response (201):**
```json
{
  "mensagem": "Mensagem enviada com sucesso"
}
```

---

### 3.9 Relatórios

#### GET /reports/hiring-volume

**Objetivo:** Obter volume de contratações por mês.

**Query params:** `periodoInicio`, `periodoFim`.

**Response (200):**
```json
{
  "dados": [
    {
      "mes": "YYYY-MM",
      "quantidade": 0
    }
  ]
}
```

---

#### GET /reports/job-distribution

**Objetivo:** Obter distribuição de vagas.

**Response (200):**
```json
{
  "dados": [
    {
      "categoria": "string",
      "quantidade": 0
    }
  ]
}
```

---

#### GET /reports/training-effectiveness

**Objetivo:** Obter eficácia dos programas de treinamento.

**Response (200):**
```json
{
  "dados": [
    {
      "curso": "string",
      "taxaConclusao": 0,
      "avaliacaoMedia": 0
    }
  ]
}
```

---

#### GET /reports/recruitment-bottlenecks

**Objetivo:** Obter principais gargalos de recrutamento por cargo.

**Response (200):**
```json
{
  "dados": [
    {
      "cargo": "string",
      "etapaGargalo": "string",
      "tempoMedioDias": 0
    }
  ]
}
```

---

### 3.10 Usuários (Gestão)

#### POST /users/invite

**Objetivo:** Convidar novo usuário.

**Request:**
```json
{
  "email": "string",
  "nome": "string",
  "perfil": "string"
}
```

**Response (201):**
```json
{
  "mensagem": "Convite enviado com sucesso"
}
```

---

#### GET /users

**Objetivo:** Listar usuários do sistema (somente Admin).

**Query params:** `busca`, `perfil`, `pagina`, `tamanhoPagina`.

---

### 3.11 Categorias e Tags

#### GET /categories

**Objetivo:** Listar categorias e tags.

**Query params:** `tipo` (VAGAS ou CURSOS).

**Response (200):**
```json
{
  "categorias": [
    {
      "id": "uuid",
      "nome": "string",
      "tipo": "string"
    }
  ]
}
```

---

#### POST /categories

**Objetivo:** Criar nova categoria/tag.

**Request:**
```json
{
  "nome": "string",
  "tipo": "VAGAS ou CURSOS"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "mensagem": "Categoria criada com sucesso"
}
```

---

### 3.12 Configurações

#### GET /config

**Objetivo:** Obter configurações do sistema.

**Response (200):**
```json
{
  "nomeEmpresa": "string",
  "logoUrl": "string",
  "notificacaoEmailImediata": true,
  "feedbackAutomatico": true,
  "conformidadeLgpd": "string"
}
```

---

#### PUT /config

**Objetivo:** Atualizar configurações do sistema (somente Admin).

**Request (multipart/form-data):**
```
nomeEmpresa: string (opcional)
logo: arquivo (opcional)
notificacaoEmailImediata: boolean (opcional)
feedbackAutomatico: boolean (opcional)
conformidadeLgpd: string (opcional)
```

**Response (200):**
```json
{
  "mensagem": "Configurações atualizadas com sucesso"
}
```

---

## 4. Autenticação

A autenticação é detalhada em [authentication.md](authentication.md).

Resumo:
- Login retorna `accessToken` e `refreshToken`
- `accessToken` é enviado via header `Authorization: Bearer {token}`
- `refreshToken` é utilizado para renovação automática
- Endpoints públicos não requerem autenticação

---

## 5. Códigos HTTP

| Código | Uso |
|---|---|
| `200` | Operação bem-sucedida |
| `201` | Recurso criado com sucesso |
| `400` | Dados inválidos ou incompletos |
| `401` — Não autenticado | Token ausente, inválido ou expirado |
| `403` — Não autorizado | Usuário sem permissão para a operação |
| `404` — Não encontrado | Recurso não encontrado |
| `409` — Conflito | Dado duplicado (ex.: CPF ou e-mail já cadastrado) |
| `500` — Erro interno | Erro inesperado no servidor |

---

## 6. Tratamento de Erros

**Proposta de padrão de resposta de erro:**

```json
{
  "erro": {
    "codigo": "VALIDATION_ERROR",
    "mensagem": "Dados inválidos",
    "detalhes": [
      {
        "campo": "cpf",
        "mensagem": "CPF inválido"
      }
    ]
  }
}
```

> Padrão proposto — ainda não definido no design atual.

---

## 7. Paginação

Recursos com listagens suportam paginação via query params:

| Param | Tipo | Default | Descrição |
|---|---|---|---|
| `pagina` | integer | 1 | Página atual |
| `tamanhoPagina` | integer | 10 | Itens por página |

**Resposta padronizada para listagens:**
```json
{
  "dados": [],
  "totalRegistros": 0,
  "paginaAtual": 1,
  "totalPaginas": 1
}
```

---

## 8. Filtros e Busca

### Filtros documentados nas telas

| Recurso | Filtros |
|---|---|
| **Vagas** | busca (texto), campus, area, tipoContrato, modalidadeTrabalho |
| **Cursos** | busca (texto), areaConhecimento, modalidade, nivelProficiencia |
| **Notícias** | busca (texto), tipo |
| **Candidaturas** | busca (edital/cargo), vagaId, status |
| **Inscrições** | busca (nome/competência), codigo, cursoId |
| **Usuários** | busca, perfil |
| **Categorias** | tipo (VAGAS/CURSOS) |

**Ordenação:** Implementada via query param `ordenarPor` quando aplicável.

---

## 9. Uploads

### Endpoints com upload

| Endpoint | Tipo de Arquivo | Obrigatório |
|---|---|---|
| `POST /candidates/talent-bank` | Currículo (PDF/DOCX) | Não |
| `POST /cursos` | Material didático | Não |
| `PUT /config` | Logo da empresa | Não |
| `POST /noticias` | Imagem de capa + anexos | Não |

**Formato:** `multipart/form-data`

**Restrições de upload:**

> Não definido no design atual (tamanho máximo, formatos aceitos, etc.).

---

## 10. Contratos Detalhados Pendentes

Os seguintes contratos possuem campos e comportamentos que precisam ser refinados:

| Endpoint | Pendência |
|---|---|
| `PUT /candidates/me/profile` | Campos exatos para atualização parcial |
| `PUT /candidates/me/curriculo` | Estrutura exata para atualização de sub-entidades |
| `POST /cursos/{id}/inscrever` | Fluxo de aprovação pelo gestor |
| `GET /reports/*` | Parâmetros de filtro e granularidade dos dados |
| `POST /users/invite` | Fluxo de aceitação do convite |
| `GET/PUT /config` | Campos exatos de conformidade LGPD |
