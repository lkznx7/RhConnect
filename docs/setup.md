# Setup — RH Connect

## 1. Pré-requisitos

### Frontend

| Tecnologia | Versão | Observação |
|---|---|---|
| Node.js | Não definido | Recomendação: ≥18.x (compatível com Next.js 16) |
| npm | Não definido | Gerenciador de pacotes (alternativas: pnpm, yarn — não definido) |
| TypeScript | 5.x | Configurado no projeto |

### Backend

| Tecnologia | Versão | Observação |
|---|---|---|
| Java | Não definido | Recomendação: ≥17 (compatível com Spring Boot 3.x) |
| Maven/Gradle | Não definido | Ferramenta de build a definir |

> **Nota:** O diretório `Backend/` encontra-se vazio no repositório atual.

### Banco de Dados

| Tecnologia | Versão | Observação |
|---|---|---|
| PostgreSQL | Não definido | Recomendação: ≥14 |

---

## 2. Estrutura do Projeto

```
/home/lk/RhConnect/
├── .git/                          # Repositório Git
├── Backend/                       # Backend Spring Boot (vazio — pendente)
├── docs/                          # Documentação do projeto
│   ├── requirements.md
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   ├── business-rules.md
│   ├── authentication.md
│   └── setup.md
└── Frontend/
    └── rh-connect/                # Aplicação Next.js
        ├── package.json
        ├── next.config.ts
        ├── tsconfig.json
        ├── eslint.config.mjs
        ├── postcss.config.mjs
        ├── jest.config.ts
        ├── jest.setup.ts
        ├── components.json        # Configuração shadcn/ui
        ├── .env.local             # Variáveis de ambiente
        ├── src/
        │   ├── app/               # Páginas e layouts (App Router)
        │   ├── components/        # Componentes React
        │   │   ├── ui/            # Componentes base (shadcn/ui)
        │   │   ├── dashboard/     # Componentes do dashboard
        │   │   └── login/         # Componentes de autenticação
        │   ├── hooks/             # Hooks customizados (vazio)
        │   ├── lib/               # Utilitários
        │   │   ├── utils.ts       # cn() helper
        │   │   └── auth.ts        # (pendente)
        │   ├── services/
        │   │   └── api.ts         # Instância Axios
        │   ├── types/             # Tipos TypeScript
        │   │   └── api.ts         # (pendente)
        │   └── __tests__/         # Testes
        └── public/
            └── telas/             # Telas de design (HTML + imagens)
```

---

## 3. Frontend

### 3.1 Instalação

```bash
cd /home/lk/RhConnect/Frontend/rh-connect
npm install
```

> Os `node_modules` já estão instalados no repositório atual.

### 3.2 Execução em Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento Next.js (porta padrão: 3000).

### 3.3 Build de Produção

```bash
npm run build
npm start
```

### 3.4 Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `dev` | `next dev` | Servidor de desenvolvimento |
| `build` | `next build` | Build de produção |
| `start` | `next start` | Servidor de produção |
| `lint` | `eslint` | Verificação de código |
| `test` | `jest` | Execução de testes |
| `test:coverage` | `jest --coverage` | Testes com cobertura |
| `test:watch` | `jest --watch` | Testes em modo observador |
| `typecheck` | `tsc --noEmit` | Verificação de tipos |

### 3.5 Testes

```bash
npm test           # Executa todos os testes
npm run test:watch  # Executa em modo watch
npm run test:coverage  # Executa com cobertura
```

Os testes utilizam **Jest** com **Testing Library React** e ambiente **jsdom**.

Testes existentes:
- `src/__tests__/auth.test.ts` — Testes para módulo `@/lib/auth` (pendente)
- `src/__tests__/button.test.tsx` — Testes do componente Button
- `src/__tests__/card.test.tsx` — Testes do componente Card
- `src/__tests__/utils.test.ts` — Testes da função `cn()`

---

## 4. Backend

O diretório `Backend/` encontra-se **vazio**. O backend ainda não foi implementado.

### Stack definida (a ser implementada)

| Tecnologia | Uso |
|---|---|
| Java | Linguagem |
| Spring Boot | Framework |
| Spring Security | Autenticação/Autorização |
| Spring Data JPA | Persistência |
| PostgreSQL | Banco de dados |

A URL base da API esperada pelo frontend é `http://localhost:3001/api`.

---

## 5. Banco de Dados

### 5.1 Configuração

O PostgreSQL deverá ser instalado e configurado com:

- **Host:** Não definido (padrão: `localhost`)
- **Porta:** Não definido (padrão: `5432`)
- **Banco de dados:** Não definido
- **Usuário:** Não definido
- **Senha:** Não definida

> Detalhes de conexão deverão ser definidos nas variáveis de ambiente do backend.

### 5.2 Inicialização

O banco de dados deverá ser criado antes da primeira execução do backend. Script de criação do banco e tabelas **pendente de implementação**.

---

## 6. Variáveis de Ambiente

### Frontend

| Variável | Arquivo | Valor Atual | Descrição |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | `.env.local` | `http://localhost:3001/api` | URL base da API backend |

### Backend

> Variáveis de ambiente do backend não definidas (diretório vazio).

Variáveis esperadas (pendentes):
- `DATABASE_URL` — Conexão com PostgreSQL
- `JWT_SECRET` — Segredo para assinatura de JWT
- `JWT_EXPIRATION` — Duração do access token
- `SERVER_PORT` — Porta do servidor (esperado: 3001)

---

## 7. Ordem de Inicialização

```
1. PostgreSQL        — Banco de dados deve estar rodando
2. Backend           — API Spring Boot deve estar rodando (porta 3001)
3. Frontend          — Next.js deve estar rodando (porta 3000)
```

### Verificação

1. Verificar se o PostgreSQL está ativo.
2. Verificar se o backend está respondendo em `http://localhost:3001/api`.
3. Verificar se o frontend está acessível em `http://localhost:3000`.

---

## 8. Troubleshooting

### Problemas identificados no projeto atual

| Problema | Descrição | Solução |
|---|---|---|
| `@/lib/auth` não existe | O módulo `src/lib/auth.ts` é importado em vários arquivos mas não foi implementado | Implementar o módulo conforme especificação em [authentication.md](authentication.md) |
| `@/types/api` não existe | O módulo `src/types/api.ts` é importado em componentes do dashboard mas não foi implementado | Implementar com os tipos `DashboardSummary` e `DepartmentStats` |
| `src/hooks/` vazio | Diretório existe mas não contém hooks | Implementar hooks conforme necessidade |
| Fontes incorretas | O layout usa fontes Geist/Inter, mas o design system especifica DM Sans + Hanken Grotesk | Atualizar `src/app/layout.tsx` para usar as fontes do design system |
| Cores incorretas | Paleta padrão do shadcn/ui, não a paleta teal (#006769) do design system | Atualizar `src/app/globals.css` com os tokens de cor do design system |
| Backend inexistente | O frontend espera API em `localhost:3001` mas o backend não foi implementado | Implementar o backend Spring Boot conforme documentação |

### Erros de build/teste

O comando `npm run lint` ou `npm run typecheck` pode retornar erros devido aos módulos faltantes (`@/lib/auth`, `@/types/api`). Esses erros serão resolvidos com a implementação dos módulos.
