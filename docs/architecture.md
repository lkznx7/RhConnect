# Arquitetura — RH Connect

## 1. Visão Geral

O RH Connect é uma aplicação web corporativa de gestão de pessoas e recrutamento, construída com o padrão **BFF (Backend-For-Frontend)**.

O backend é o responsável por **toda a lógica de negócio, validação, regras e persistência**. O frontend é uma camada **fina** dedicada exclusivamente a **estado de UI e visualização do usuário**.

```
Next.js (Frontend — UI + Estado)
    ↓ HTTP/JSON
Spring Boot BFF (Toda a lógica de negócio)
    ↓ JDBC/JPA
PostgreSQL (Banco de Dados)
```

---

## 2. Arquitetura Geral — BFF

O padrão **Backend-For-Frontend (BFF)** define que existe um backend dedicado exclusivamente ao frontend Next.js. Este backend concentra toda a lógica de negócio, orquestra chamadas a serviços internos, valida dados e persiste no banco.

**Princípio fundamental:** O frontend **não contém regra de negócio**. Ele apenas:
- Envia dados ao backend
- Recebe dados prontos do backend
- Renderiza a UI com base nos dados recebidos
- Gerencia estado de navegação e formulários

```
┌─────────────────────────────────────────────────┐
│                   Cliente                        │
│              (Navegador Web)                     │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────┐
│              Frontend — Next.js                  │
│   React 19 · TypeScript · Tailwind CSS v4       │
│   shadcn/ui · Recharts · Axios                  │
│                                                 │
│   Responsabilidade:                             │
│   • Renderização de UI                          │
│   • Estado de formulários e navegação           │
│   • Consumo da API (Axios)                      │
│   • Armazenamento de tokens                     │
│   • Validação visual (campos obrigatórios)      │
│   • NÃO contém regras de negócio                │
└──────────────────────┬──────────────────────────┘
                       │ HTTP/REST (JSON)
                       │ localhost:3001/api
┌──────────────────────▼──────────────────────────┐
│           Backend — Spring Boot (BFF)            │
│   Java · Spring Security · Spring Data JPA      │
│   API REST                                      │
│                                                 │
│   Responsabilidade:                             │
│   • TODA a lógica de negócio                     │
│   • Validação de dados e regras                 │
│   • Autenticação e autorização                  │
│   • Persistência de dados                       │
│   • Orquestração de operações                   │
│   • Geração de protocolos, status, enums        │
│   • Notificações (e-mail, WhatsApp)             │
│   • Relatórios e métricas                       │
└──────────────────────┬──────────────────────────┘
                       │ JDBC
┌──────────────────────▼──────────────────────────┐
│              Banco de Dados                      │
│              PostgreSQL                          │
└─────────────────────────────────────────────────┘
```

---

## 3. Frontend

### 3.1 Responsabilidade

O frontend é uma camada **fina** de apresentação. Sua responsabilidade é:

- **Renderização das interfaces de usuário** — componentes React com Tailwind CSS e shadcn/ui
- **Consumo da API REST do backend** — via Axios com interceptors para autenticação
- **Gerenciamento de estado de UI** — formulários, navegação, abas, modais, toasts
- **Armazenamento de tokens** — cookies httpOnly via iron-session/cookies-next
- **Exibição de gráficos** — Recharts para relatórios e dashboards
- **Validação visual** — campos obrigatórios, formatos, confirmação de senhas (validação de negócio NÃO)

> **Importante:** O frontend NÃO contém regras de negócio. Validações como regras de senha, validação de CPF, regras de status, etc. são executadas no backend. O frontend faz apenas validação de formato para UX (ex.: campo vazio, formato de e-mail).

### 3.2 Stack Tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16.3.4 | Framework React full-stack |
| React | 19.2.8 | Biblioteca de UI |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | v4 | Estilização utility-first |
| shadcn/ui | base-vega | Biblioteca de componentes |
| Recharts | 3.10.1 | Gráficos e indicadores |
| Axios | 1.20.0 | Cliente HTTP |
| iron-session | 9.0.1 | Sessões server-side |
| cookies-next | 6.1.1 | Gerenciamento de cookies |
| lucide-react | 1.40.0 | Ícones |
| class-variance-authority | 0.7.1 | Variantes de componentes |
| clsx + tailwind-merge | — | Utilitários de classes CSS |

### 3.3 Estrutura de Componentes

```
src/
├── app/                  # Rotas e páginas (App Router)
├── components/
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   ├── dashboard/        # Componentes do dashboard
│   └── login/            # Componentes de autenticação
├── hooks/                # Hooks customizados
├── lib/                  # Utilitários e configurações
│   ├── auth.ts           # Gerenciamento de tokens (cookies)
│   └── utils.ts          # cn() helper
├── services/
│   └── api.ts            # Instância Axios com interceptors
└── types/
    └── api.ts            # Tipos de API (DashboardSummary, DepartmentStats)
```

### 3.4 Consumo da API

O frontend consome a API backend via instância Axios configurada em `src/services/api.ts`, que inclui:
- Interceptor de requisição: inserção automática de token de autenticação
- Interceptor de resposta: renovação automática de token em caso de erro 401

A URL base da API é configurada via variável de ambiente `NEXT_PUBLIC_API_URL` (atualmente `http://localhost:3001/api`).

### 3.5 Gerenciamento de Estado

O frontend gerencia **apenas estado de UI**:

- **Estado local de componentes** — `useState` para formulários, toggles, modais
- **Estado de navegação** — rotas do Next.js App Router
- **Estado de autenticação** — tokens em cookies (via `@/lib/auth`)
- **Estado de carregamento** — loading/error states em componentes

Não é utilizado gerenciamento de estado global (Redux, Zustand, etc.). Cada componente consome seus dados diretamente da API e mantém seu estado local.

### 3.6 Autenticação no Frontend

A autenticação no frontend utiliza:
- `iron-session` para gerenciamento de sessões server-side
- `cookies-next` para acesso a cookies
- Módulo `@/lib/auth` para operações com tokens (set/get/clear)

O frontend **apenas armazena e envia tokens**. A validação de credenciais, geração de tokens e controle de acesso são responsabilidade do backend BFF.

Detalhes em [authentication.md](authentication.md).

---

## 4. Backend — Monolito Modular

### 4.1 Padrão Arquitetural

O backend é um **Monolito Modular**: uma única aplicação Spring Boot desdobrada em **módulos de domínio autônomos**. Cada módulo encapsula sua lógica de negócio, controllers, services, repositories e entidades, comunicando-se com outros módulos apenas por **interfaces de serviço públicas**.

**Princípios:**
- **Um módulo = um contexto de negócio** (ex.: `vagas`, `candidaturas`, `cursos`)
- **Acoplamento baixo entre módulos** — módulos NÃO acessam repositories de outros módulos diretamente
- **Comunicação por interface** — módulo A chama `VagaService` do módulo B, não `VagaRepository`
- **Execução única** — todos os módulos rodam no mesmo processo Spring Boot
- **Banco compartilhado** — todos os módulos escrevem no mesmo PostgreSQL

### 4.2 Responsabilidade

O backend BFF é o **coração do sistema**. Ele é responsável por:

- **Toda a lógica de negócio** — regras de candidatura, triagem, inscrição, etc.
- **Expor API REST** para comunicação com o frontend
- **Autenticação e autorização** — login, tokens, controle de acesso por perfil
- **Persistência de dados** — operações CRUD no PostgreSQL
- **Validação de dados** — regras de negócio, integridade, unicidade
- **Orquestração** — coordenação de múltiplas operações em uma única requisição
- **Notificações** — envio de e-mails e mensagens
- **Relatórios e métricas** — agregação de dados para dashboards
- **Geração de protocolos** — números únicos para rastreamento de candidaturas
- **Integrações externas** — serviços de e-mail, WhatsApp, etc.

### 4.3 Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| Java | Linguagem de programação |
| Spring Boot | Framework de aplicação |
| Spring Security | Autenticação e autorização |
| Spring Data JPA | Persistência de dados |
| PostgreSQL | Banco de dados relacional |

> **Nota:** O diretório `Backend/` encontra-se vazio no repositório atual. A stack foi definida no escopo do projeto.

### 4.4 Estrutura de Módulos

Cada módulo segue a estrutura interna de camadas:

```
src/main/java/br/com/rhconnect/
│
├── modules/
│   ├── auth/                          # Módulo de Autenticação
│   │   ├── controller/
│   │   │   └── AuthController.java
│   │   ├── service/
│   │   │   ├── AuthService.java       # Interface pública do módulo
│   │   │   └── AuthServiceImpl.java
│   │   ├── dto/
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   └── TokenResponse.java
│   │   └── config/
│   │       └── SecurityConfig.java
│   │
│   ├── candidato/                     # Módulo de Candidatos
│   │   ├── controller/
│   │   │   ├── CandidatoController.java
│   │   │   └── CurriculoController.java
│   │   ├── service/
│   │   │   ├── CandidatoService.java      # Interface pública
│   │   │   ├── CandidatoServiceImpl.java
│   │   │   ├── CurriculoService.java
│   │   │   └── CurriculoServiceImpl.java
│   │   ├── repository/
│   │   │   ├── CandidatoRepository.java
│   │   │   └── CurriculoRepository.java
│   │   ├── entity/
│   │   │   ├── Candidato.java
│   │   │   ├── Curriculo.java
│   │   │   ├── ExperienciaProfissional.java
│   │   │   ├── FormacaoAcademica.java
│   │   │   └── ...
│   │   └── dto/
│   │       ├── CandidatoResponse.java
│   │       └── CurriculoRequest.java
│   │
│   ├── vagas/                         # Módulo de Vagas
│   │   ├── controller/
│   │   │   ├── VagaController.java
│   │   │   └── CandidaturaController.java
│   │   ├── service/
│   │   │   ├── VagaService.java           # Interface pública
│   │   │   ├── VagaServiceImpl.java
│   │   │   ├── CandidaturaService.java
│   │   │   └── CandidaturaServiceImpl.java
│   │   ├── repository/
│   │   │   ├── VagaRepository.java
│   │   │   └── CandidaturaRepository.java
│   │   ├── entity/
│   │   │   ├── Vaga.java
│   │   │   └── Candidatura.java
│   │   └── dto/
│   │       ├── VagaRequest.java
│   │       ├── VagaResponse.java
│   │       └── CandidaturaResponse.java
│   │
│   ├── cursos/                        # Módulo de Cursos
│   │   ├── controller/
│   │   ├── service/
│   │   │   ├── CursoService.java          # Interface pública
│   │   │   └── InscricaoService.java      # Interface pública
│   │   ├── repository/
│   │   ├── entity/
│   │   └── dto/
│   │
│   ├── noticias/                      # Módulo de Notícias
│   │   ├── controller/
│   │   ├── service/
│   │   │   ├── NoticiaService.java        # Interface pública
│   │   ├── repository/
│   │   ├── entity/
│   │   └── dto/
│   │
│   ├── relatorios/                    # Módulo de Relatórios
│   │   ├── controller/
│   │   ├── service/
│   │   │   └── RelatorioService.java
│   │   └── dto/
│   │
│   ├── usuarios/                      # Módulo de Usuários
│   │   ├── controller/
│   │   ├── service/
│   │   │   └── UsuarioService.java
│   │   ├── repository/
│   │   ├── entity/
│   │   └── dto/
│   │
│   ├── categorias/                    # Módulo de Categorias/Tags
│   │   ├── controller/
│   │   ├── service/
│   │   │   └── CategoriaService.java
│   │   ├── repository/
│   │   ├── entity/
│   │   └── dto/
│   │
│   └── configuracoes/                 # Módulo de Configurações
│       ├── controller/
│       ├── service/
│       │   └── ConfiguracaoService.java
│       ├── repository/
│       ├── entity/
│       └── dto/
│
├── shared/                            # Código compartilhado
│   ├── config/
│   │   └── GlobalConfig.java
│   ├── exception/
│   │   ├── ResourceNotFoundException.java
│   │   ├── BusinessRuleException.java
│   │   └── GlobalExceptionHandler.java
│   ├── security/
│   │   ├── JwtTokenProvider.java
│   │   └── JwtAuthenticationFilter.java
│   ├── dto/
│   │   ├── ApiResponse.java
│   │   ├── PagedResponse.java
│   │   └── ErrorResponse.java
│   └── util/
│       └── ProtocolGenerator.java
│
└── RhConnectApplication.java          # Classe principal
```

### 4.5 Regras de Comunicação entre Módulos

** permitido:**

```
// Módulo Vagas chama Módulo Candidato via interface
@Service
public class CandidaturaServiceImpl implements CandidaturaService {

    private final CandidatoService candidatoService; // ← injeta interface pública

    public void criar(CandidaturaRequest req) {
        CandidatoDTO candidato = candidatoService.obterPorId(req.getCandidatoId());
        // usa dados do candidato, mas NÃO acessa CandidatoRepository
    }
}
```

**Não permitido:**

```
// ❌ Módulo Vagas acessando repository de outro módulo
@Service
public class CandidaturaServiceImpl implements CandidaturaService {

    private final CandidatoRepository candidatoRepository; // ← VIOLAÇÃO
}
```

**Exceções:**
- Entidades JPA de um módulo podem ser referenciadas por FK de outro módulo (banco compartilhado)
- DTOs e services públicos são as únicas formas de troca de dados entre módulos

### 4.6 Camadas Internas de Cada Módulo

```
Controller (REST)
  │  Recebe requisição HTTP
  │  Valida formato ( Bean Validation )
  │  Delega ao Service
  ↓
Service (Regras de Negócio)
  │  Contém TODA a lógica de negócio do módulo
  │  Pode chamar services de outros módulos (via interface)
  │  Coordena operações
  ↓
Repository (Acesso a Dados)
  │  Consultas e persistência no PostgreSQL
  │  Spring Data JPA
  ↓
Entity (Modelo de Domínio)
  │  Mapeamento das tabelas (JPA/Hibernate)
  │  Validações de integridade (constraints)
```

**Princípio:** O `Controller` é fino — recebe, valida formato e delega. Toda lógica fica no `Service`.

### 4.7 Regras de Negócio

Detalhadas em [business-rules.md](business-rules.md).

### 4.8 Persistência

O acesso ao banco de dados é feito via Spring Data JPA com PostgreSQL. Detalhes do modelo de dados em [database.md](database.md).

> Todos os módulos compartilham o mesmo banco. Cada módulo possui seus próprios repositories, mas o schema é único.

### 4.9 Segurança

O backend utiliza Spring Security para proteção de endpoints. Detalhes em [authentication.md](authentication.md).

---

## 5. Banco de Dados

O PostgreSQL é o banco de dados relacional escolhido para o projeto. É responsável por:
- Armazenamento persistente de todos os dados do sistema
- Integridade referencial entre entidades
- Suporte a consultas complexas para relatórios
- Conformidade com LGPD (dados pessoais)

Detalhes completos em [database.md](database.md).

---

## 6. Fluxo de Comunicação

No padrão BFF com monolito modular, **toda a lógica** passa pelo backend. O frontend é um consumidor passivo da API. Dentro do backend, módulos se comunicam via interfaces de serviço.

### 6.1 Fluxo Autenticado

```
Usuário
  → Next.js (formulário de login)
    → POST /api/auth/login { identifier, senha, perfil }
      → AuthController (valida formato)
        → AuthService (busca usuário, valida credenciais, gera tokens)
          → UsuarioRepository (consulta ao banco)
            → PostgreSQL
      ← { accessToken, refreshToken, usuario }
    ← Armazena tokens em cookies
  ← Redireciona para dashboard
```

### 6.2 Fluxo de CRUD (Exemplo: Criar Vaga)

```
RH (usuário)
  → Next.js (preenche formulário, clica "Criar")
    → POST /api/vagas { titulo, descricao, responsabilidades, ... }
      → VagaController (valida formato)
        → VagaService (valida regras: campos obrigatórios, permissão, gera numero_edital)
          → VagaRepository (insere no banco)
            → PostgreSQL
      ← { id, mensagem: "Vaga criada com sucesso" }
    ← Exibe toast de sucesso
  ← Atualiza listagem de vagas
```

### 6.3 Fluxo entre Módulos (Exemplo: Criar Candidatura)

```
RH (usuário) ou Candidato
  → Next.js (confirma candidatura)
    → POST /api/candidatures { candidatoId, vagaId }
      → CandidaturaController (valida formato)
        → CandidaturaService
          → CandidatoService.obterPorId(candidatoId)  ← chamada ao módulo candidato
          → VagaService.obterPorId(vagaId)            ← chamada ao módulo vagas
          → Valida regras (vaga aberta? candidato completo?)
          → CandidaturaRepository (insere no banco)
            → PostgreSQL
      ← { protocolo: "RH-2026-00123", mensagem: "..." }
```

### 6.4 Fluxo de Triagem (Exemplo: Mover Candidato no Pipeline)

```
RH (usuário)
  → Next.js (arrasta candidato para próxima coluna no Kanban)
    → PUT /api/candidatures/{id}/status { novoStatus: "TRIAGEM" }
      → CandidaturaController (valida formato)
        → CandidaturaService (valida: transição permitida?, permissão?, atualiza status)
          → CandidaturaRepository (atualiza no banco)
            → PostgreSQL
      ← { mensagem: "Status atualizado com sucesso" }
    ← Move candidato na UI para nova coluna
```

### 6.5 Fluxo de Relatórios

```
RH (usuário)
  → Next.js (abre página de relatórios)
    → GET /api/reports/hiring-volume?periodoInicio=2026-01&periodoFim=2026-08
      → RelatorioController
        → RelatorioService (agrega dados, calcula métricas)
          → VagaRepository (consultas complexas)
          → CandidaturaRepository (consultas complexas)
            → PostgreSQL
      ← { dados: [{ mes: "2026-01", quantidade: 12 }, ...] }
    ← Recharts renderiza gráfico de barras
```

---

## 7. Organização de Módulos

Cada módulo do backend corresponde a um contexto de negócio. O frontend consome os endpoints de cada módulo via API REST.

### 7.1 Módulos do Backend

| Módulo | Pacote Java | Endpoints | Responsável por |
|---|---|---|---|
| **auth** | `modules.auth` | `/auth/*` | Login, registro, recuperação de senha, tokens |
| **candidato** | `modules.candidato` | `/candidates/*` | Perfil, currículo, dados pessoais |
| **vagas** | `modules.vagas` | `/vagas/*`, `/candidatures/*` | Vagas, candidaturas, pipeline de triagem |
| **cursos** | `modules.cursos` | `/cursos/*`, `/cursos/inscricoes/*` | Cursos, inscrições, presença |
| **noticias** | `modules.noticias` | `/noticias/*`, `/noticias/newsletter` | Notícias, anexos, tags, newsletter |
| **relatorios** | `modules.relatorios` | `/reports/*` | Métricas, indicadores, dashboards |
| **usuarios** | `modules.usuarios` | `/users/*` | Gestão de usuários e acessos |
| **categorias** | `modules.categorias` | `/categories/*` | Taxonomia, tags |
| **configuracoes** | `modules.configuracoes` | `/config/*` | Configurações do sistema, LGPD |

### 7.2 Módulos do Frontend

O frontend organiza suas páginas por contexto de negócio, consumindo os endpoints do módulo correspondente:

| Páginas | Módulo Backend consumido |
|---|---|
| Página inicial, Sobre, Detalhes (01-08) | `vagas`, `cursos`, `noticias` (público) |
| Envio de currículo, Confirmação (09-10) | `candidato` (Banco de Talentos) |
| Login, Registro, Senha (11-15) | `auth` |
| Dashboard candidato, Perfil, Currículo, Candidaturas, Inscrições (16-20) | `candidato`, `vagas`, `cursos` |
| Dashboard RH, Vagas, Triagem, Currículos (21-26) | `vagas`, `candidato` |
| Notícias CRUD, Categorias (27-30) | `noticias`, `categorias` |
| Cursos CRUD, Inscrições (31-33) | `cursos` |
| Relatórios (34) | `relatorios` |
| Usuários (35) | `usuarios` |
| Configurações (36) | `configuracoes` |

---

## 8. Segurança

A segurança do sistema é implementada em múltiplas camadas:

- **Frontend:** Armazenamento seguro de tokens em cookies httpOnly, interceptors HTTP para renovação automática, verificação de autenticação antes de renderizar páginas protegidas.
- **Backend BFF:** Spring Security para autenticação (JWT) e autorização (perfis), proteção de endpoints, validação de entrada em cada endpoint, rate limiting.
- **Comunicação:** HTTPS recomendado para produção.
- **Dados:** Conformidade LGPD (seção dedicada nas configurações do sistema).

Detalhes completos em [authentication.md](authentication.md).

---

## 9. Decisões Arquiteturais Pendentes

| Decisão | Status |
|---|---|
| Estratégia de cache (frontend e backend) | Não definido no design atual |
| Serviço de envio de e-mails (recuperação de senha, notificações) | Não definido no design atual |
| Serviço de upload e armazenamento de arquivos (currículos, materiais, logos) | Não definido no design atual |
| Estratégia de deploy (Docker, CI/CD) | Não definido no design atual (não necessário no momento) |
| Estratégia de testes de integração e E2E | Não definido no design atual |
| Documentação da API (OpenAPI/Swagger) | Não definido no design atual |
| Logging e monitoramento | Não definido no design atual |
| Internacionalização (i18n) | Interface atual é apenas pt-BR |
| Suporte a PWA / Offline | Não definido no design atual |
