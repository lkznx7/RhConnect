# Autenticação e Segurança — RH Connect

## 1. Visão Geral

O RH Connect utiliza autenticação baseada em token para proteger o acesso às áreas autenticadas do sistema. O fluxo envolve:

- **Frontend (Next.js):** Gerencia tokens, cookies de sessão e interceptação de requisições.
- **Backend (Spring Boot):** Valida tokens, controla acesso a endpoints e aplica políticas de segurança via Spring Security.

---

## 2. Login

### 2.1 Fluxo Visual

A tela de login (Tela 11) apresenta:

- **Layout:** Tela dividida — lado esquerdo com branding e mensagens de marketing, lado direito com formulário.
- **Abas:** Candidato / Colaborador — dois fluxos de login distintos.
- **Campos:**
  - Identificador: aceita **e-mail** ou **CPF** (formato `000.000.000-00`).
  - Senha: com toggle de visibilidade (mostrar/ocultar).
- **Links auxiliares:**
  - "Esqueci minha senha" → redireciona para recuperação.
  - "Criar conta" → redireciona para registro.

### 2.2 Comportamento Esperado

- Validação dos campos obrigatórios antes do envio.
- Mensagem de erro em caso de credenciais inválidas.
- Redirecionamento para a área apropriada após login bem-sucedido:
  - Candidato → Dashboard do Candidato (Tela 16).
  - Colaborador → Dashboard do RH (Tela 21).

---

## 3. Criação de Conta

### 3.1 Fluxo Visual

A tela de criação de conta (Tela 12) apresenta:

- **Layout:** Tela dividida — lado esquerdo com branding, lado direito com formulário.
- **Campos:**
  - Nome Completo (obrigatório)
  - E-mail institucional ou pessoal (obrigatório)
  - CPF (obrigatório, com validação em tempo real — indicador `#cpfStatus`)
  - Celular/WhatsApp (obrigatório)
  - Senha (obrigatório, com indicador de força)
  - Confirmação de Senha (obrigatório)
  - Objetivo no RH Connect (radio buttons)

### 3.2 Regras de Senha

A senha deve atender aos seguintes requisitos (validados em tempo real):

| Requisito | Elemento |
|---|---|
| Comprimento mínimo | `#reqMin` |
| Pelo menos uma letra maiúscula | `#reqMaiusc` |
| Pelo menos um número | `#reqNum` |
| Pelo menos um caractere especial | `#reqEsp` |

**Indicador de força:** Barra visual com label (`#forcaLabel`) que indica fraca/média/forte.

### 3.3 Validação de CPF

O CPF é validado em tempo real durante o preenchimento. O indicador `#cpfStatus` mostra se o CPF é válido ou inválido antes do envio.

---

## 4. Recuperação de Senha

### 4.1 Solicitação (Tela 13)

- Campo único: identificador (e-mail ou CPF).
- Formulário `#recoveryForm` com botão `#submitBtn`.
- Texto auxiliar em `#helperText`.

### 4.2 Confirmação de Envio (Tela 14)

- Mensagem informando que o e-mail de recuperação foi enviado.
- **Timer regressivo** (`#countdownTimer`) antes de permitir reenvio.
- **Botão de reenvio** (`#resendBtn`) habilitado apenas após o timer.

### 4.3 Definição de Nova Senha (Tela 15)

- Campos: Nova Senha, Confirmar Nova Senha.
- **Indicador de força visual:** Barras (`#bar-weak`, `#bar-medium`, `#bar-strong`) com label (`#strength-label`).
- **Checklist de requisitos:** `#req-length`, `#req-cases`, `#req-number`, `#req-special`.
- **Dica de correspondência:** `#match-hint` — valida se as senhas conferem.
- Formulário `#password-reset-form` com botão `#submit-btn`.

---

## 5. Sessão

### 5.1 Comportamento Esperado

- A sessão do usuário é mantida via token de acesso (JWT) armazenado em cookie httpOnly.
- O `iron-session` (v9) é utilizado para gerenciamento de sessões server-side no Next.js.
- A biblioteca `cookies-next` (v6) é utilizada para acesso programático a cookies.

### 5.2 Renovação Automática

O frontend implementa interceptor Axios (`src/services/api.ts`) que:
1. Intercepta respostas com status **401**.
2. Tenta renovar o token usando o `refreshToken`.
3. Se a renovação for bem-sucedida, refaz a requisição original.
4. Se a renovação falhar, redireciona para o login.

### 5.3 Gerenciamento de Sessões (Tela 17)

Na seção "Segurança e Acessos" do perfil:
- Lista de sessões ativas em dispositivos.
- Opção de remover sessões individuais.

---

## 6. Autorização

### 6.1 Perfis de Usuário

| Perfil | Área | Acessos |
|---|---|---|
| **Candidato** | Área pública + Dashboard do Candidato | Vagas, cursos, notícias (leitura); perfil, currículo, candidaturas, inscrições (gestão própria) |
| **Colaborador / RH** | Painel administrativo | Tudo o que o Candidato possui + CRUD em vagas, notícias, cursos; triagem de candidaturas; currículos; inscrições; relatórios |
| **Administrador** | Painel administrativo + Configurações | Tudo o que o Colaborador RH possui + gestão de usuários, configurações do sistema |

### 6.2 Áreas Protegidas

| Área | Perfis Permitidos |
|---|---|
| Dashboard do Candidato (Tela 16) | Candidato |
| Meu Perfil (Tela 17) | Candidato, Colaborador |
| Meu Currículo (Tela 18) | Candidato |
| Minhas Candidaturas (Tela 19) | Candidato |
| Minhas Inscrições (Tela 20) | Candidato, Colaborador |
| Dashboard do RH (Tela 21) | Colaborador, Administrador |
| Gerenciamento de Vagas (Tela 22) | Colaborador, Administrador |
| Detalhes do Currículo — RH (Tela 23) | Colaborador, Administrador |
| Triagem de Candidaturas (Tela 24) | Colaborador, Administrador |
| Criar/Editar Vaga (Tela 25/26) | Colaborador, Administrador |
| Gerenciamento de Notícias (Tela 27) | Colaborador, Administrador |
| Criar/Editar Notícia (Tela 28/29) | Colaborador, Administrador |
| Categorias e Tags (Tela 30) | Colaborador, Administrador |
| Criar/Editar Curso (Tela 31/32) | Colaborador, Administrador |
| Inscrições em Cursos (Tela 33) | Colaborador, Administrador |
| Relatórios e Indicadores (Tela 34) | Colaborador, Administrador |
| Gestão de Usuários (Tela 35) | Administrador |
| Configurações (Tela 36) | Administrador |

---

## 7. Frontend

### 7.1 Autenticação no Next.js

O frontend gerencia autenticação através de:

1. **Armazenamento de tokens:** Cookies httpOnly via `iron-session`.
2. **Envio automático:** Interceptor Axios adiciona header `Authorization: Bearer {token}` em cada requisição.
3. **Renovação automática:** Interceptor de resposta detecta 401 e tenta refresh.
4. **Proteção de rotas:** Não definido no design atual (pode ser via middleware do Next.js ou verificações server-side).

### 7.2 Módulo `@/lib/auth`

O módulo `src/lib/auth.ts` é referenciado em várias partes do código mas ainda **não foi implementado**. Deverá conter funções para:

- `getAccessToken()` — obter token de acesso
- `getRefreshToken()` — obter token de renovação
- `setAccessToken(token)` — armazenar token
- `setRefreshToken(token)` — armazenar refresh token
- `setAuthTokens(accessToken, refreshToken)` — armazenar ambos
- `clearAuthTokens()` — limpar tokens
- `isAuthenticated()` — verificar autenticação
- `getAuthHeaders()` — obter headers de autenticação (client-side)
- `getAuthHeadersServer()` — obter headers (server-side)
- `AUTH_COOKIE_KEYS` — constantes dos nomes dos cookies

---

## 8. Backend

### 8.1 Spring Security

O backend deverá utilizar **Spring Security** para:

- Validação de JWT em cada requisição autenticada.
- Controle de acesso baseado em perfil (roles).
- Proteção de endpoints por perfil.
- Hash de senhas (algoritmo a definir).

### 8.2 Endpoints Públicos vs. Protegidos

| Tipo | Endpoints |
|---|---|
| **Públicos** | Login, Registro, Recuperação de senha, Listagem de vagas (detalhes), Listagem de cursos (detalhes), Listagem de notícias (detalhes), Envio de currículo (Banco de Talentos), Contato/Ouvidoria, Newsletter |
| **Candidato** | Perfil, Currículo, Candidaturas, Inscrições |
| **RH/Admin** | Dashboard RH, Gerenciamento de vagas, Triagem, Currículos (visão RH), Notícias (CRUD), Cursos (CRUD), Inscrições (gestão), Relatórios |
| **Admin** | Gestão de usuários, Configurações do sistema |

---

## 9. Tokens

### 9.1 JWT (JSON Web Tokens)

O sistema utiliza **JWT** para autenticação:

- **Access Token:** Token de curta duração para acesso a endpoints protegidos.
- **Refresh Token:** Token de longa duração para renovação do access token.

> **Nota:** Duração exata dos tokens não definida no design atual.

### 9.2 Fluxo de Token

```
1. Login → Backend gera accessToken + refreshToken
2. Frontend armazena em cookies httpOnly (iron-session)
3. Cada requisição inclui header: Authorization: Bearer {accessToken}
4. Se 401 → Frontend tenta POST /auth/refresh com refreshToken
5. Se refresh bem-sucedido → Requisição original é reenviada
6. Se refresh falhar → Redirecionamento para login
```

---

## 10. Senhas

### 10.1 Requisitos de Senha

| Requisito | Descrição |
|---|---|
| Comprimento mínimo | Não definido no design atual (inferido como ≥8 caracteres) |
| Maiúsculas | Pelo menos uma letra maiúscula |
| Números | Pelo menos um número |
| Caracteres especiais | Pelo menos um caractere especial |

### 10.2 Armazenamento

As senhas devem ser armazenadas com hash seguro. Algoritmo de hash **não definido no design atual**.

> Recomendação: bcrypt ou Argon2 (decisão pendente de implementação).

### 10.3 Indicador de Força

O sistema apresenta indicador visual de força da senha em:
- Criação de conta (Tela 12): barra com label (`#forcaLabel`, `#forcaBarra`).
- Nova senha (Tela 15): barras segmentadas (`#bar-weak`, `#bar-medium`, `#bar-strong`) com label.

---

## 11. Autenticação de Dois Fatores (2FA)

### 11.1 Configuração

O usuário pode ativar/desativar 2FA nas configurações de segurança do perfil (Tela 17).

- Toggle `#toggle-2fa` com checkbox associado.
- Quando ativado, o login requer segunda forma de verificação.

### 11.2 Implementação

> Método de 2FA (SMS, e-mail, TOTP, app autenticador) não definido no design atual.

---

## 12. Segurança Adicional

### 12.1 LGPD

A Tela 36 (Configurações) apresenta seção dedicada a "Conformidade LGPD & Governança de Dados". Medidas de segurança específicas não definidas nas telas.

### 12.2 Cookies httpOnly

O uso de `iron-session` implica armazenamento de tokens em cookies httpOnly, que não são acessíveis via JavaScript no cliente. Isso previne ataques XSS.

### 12.3 Validação de Entrada

- Validação de CPF em tempo real no frontend.
- Validação de senhas com requisitos no frontend.
- Validação de e-mail no frontend.

> Validação de entrada no backend (sanitização, limites) não definida no design atual.

---

## 13. Decisões Pendentes

| Decisão | Status |
|---|---|
| Algoritmo de hash de senhas | Não definido (recomendação: bcrypt/Argon2) |
| Duração dos tokens (access/refresh) | Não definido |
| Método de 2FA | Não definido |
| Estratégia de proteção de rotas no Next.js (middleware vs. server-side) | Não definido |
| Estratégia de invalidação de tokens no logout | Não definido |
| Política de bloqueio de conta após tentativas | Não definido |
| CORS configuration | Não definido |
| Rate limiting | Não definido |
| Content Security Policy (CSP) | Não definido |
| HSTS | Não definido |
