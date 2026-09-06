# Segurança — RH Connect

Documento de referência das medidas de segurança do **backend** do RH Connect (Spring Boot).
Status: atualizado em setembro/2026, conforme implementação atual do módulo `modules/auth`.

> **Modelo unificado de usuário:** Com a fusão dos perfis em uma única entidade `Usuario` (campos de CANDIDATO/COLABORADOR todos na mesma tabela), a proteção de dados sensíveis (`genero`, `pcd`, `cpf`, `expectativa_salarial` etc.) passa a ser responsabilidade dos **services**, aplicando controle de acesso por role e por ownership (o usuário só acessa os próprios dados; o RH acessa dados de candidatos no contexto da triagem). Consulte [entities.md](entities.md) para a definição dos campos condicionais à role.

---

## 1. Resumo

| Área | Status |
|---|---|
| Autenticação JWT com rotação de chaves (`kid`) | ✅ Implementado |
| Refresh token rotation + detecção de reuso | ✅ Implementado |
| Cookie httpOnly / Secure / SameSite | ✅ Implementado |
| Hash de senhas (BCrypt) | ✅ Implementado |
| Sem sessão de servidor (stateless) | ✅ Implementado |
| CORS restrito a origens conhecidas | ✅ Implementado |
| Validação de entrada (Bean Validation) | ✅ Implementado (parcial — ver §4.7) |
| Verificação do status `ativo` do usuário no login | ⚠️ Campo existe, **não verificado** |
| Refresh token com hash no banco | ❌ Pendente (armazenado em claro) |
| Geração de refresh token no login | ❌ Pendente (endpoint separado e público) |
| Logout com revogação real | ❌ Pendente |
| Rate limiting / bloqueio de força bruta | ❌ Pendente |
| Limpeza de refresh tokens expirados | ❌ Pendente (método pronto, sem agendador) |
| 2FA | ❌ Pendente |
| Auditoria / logging de eventos de segurança | ❌ Pendente |

---

## 2. Medidas já implementadas

### 2.1 Autenticação JWT stateless

- Spring Security configurado com `SessionCreationPolicy.STATELESS` — **nenhum estado de sessão no servidor** (`JwtConfig.java`).
- Todo request autenticado passa pelo `JwtAuthFilter`, que valida a assinatura do token e popula o `SecurityContextHolder`.
- Token de acesso com **duração curta**: `jwt.expirationMs` (default `900000` ms = 15 min; dev `3600000` = 1 h).

### 2.2 Rotação de chaves de assinatura (key rotation)

- A chave ativa é escolhida por `jwt.activeKid`; todas as chaves conhecidas ficam em `jwt.keys.<kid>` (`JwtProperties.java`).
- Ao **assinar**, o `kid` ativo é gravado no header do JWT (`TokenProviderImpl.genereteAcessToken` / `genereteRefreshToken`).
- Ao **validar**, o `keyLocator` busca a chave pelo `kid` do token; se ausente/desconhecido, usa a chave ativa como fallback (`TokenProviderImpl.getClaims`).
  - **Benefício:** trocar `jwt.activeKid` não invalida tokens já emitidos assinados com chaves anteriores que ainda estão no map.
- `application.properties` e `application-dev.properties` já contêm duas chaves (`key-2026-v1` e `key-2026-v2`), com valor injetável por variável de ambiente (`JWT_SECRET_V1`, `JWT_SECRET_V2`, `JWT_ACTIVE_KID`).

### 2.3 Refresh token com rotação e detecção de reuso

- Cada refresh token pertence a uma **família** (`familyId`), criada na emissão inicial (`RefreshToken`).
- **Rotação** (`POST /api/auth/refresh/rotacionar`): valida o token → marca o antigo como `used=true` → emite um **novo** token da mesma família (`TokenProviderImpl.rotacionarRefreshToken`).
- **Detecção de reuso:** se um token já `used` for reenviado, toda a família é revogada (`RefreshTokenRepository.revokeAllByFamilyId`) e a requisição retorna **401**.
- Refresh token revogado, expirado ou inexistente não pode refrescar a sessão.
- Duração do refresh token configurável: `jwt.refreshExpirationMs` (default `151200000` ms = 7 dias).
- Persistência em `tb_refresh_token` com `@ManyToOne` para o usuário (permite vários tokens por usuário — necessário para rotação).

### 2.4 Proteção de cookies

- Cookie `accessToken` configurado com:
  - `httpOnly=true` — **imune a XSS** via JavaScript (`AuthController.adicionarCookie`).
  - `secure=true` — só trafega em HTTPS.
  - `sameSite=Strict` — **mitigação de CSRF**.
- Como o filtro lê o token do cookie **ou** do header `Authorization: Bearer`, os dois caminhos funcionam.

### 2.5 Hash de senhas

- `BCryptPasswordEncoder` como `PasswordEncoder` (`JwtConfig.passwordEncoder`).
- A senha nunca é armazenada em claro (`senhaHash` em `Usuario`, marcada `@JsonIgnore`).

### 2.6 Controle de acesso por endpoints

- `JwtConfig.securityFilterChain`:
  - **Públicos:** `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh*`, `/error`.
  - **Protegidos:** tudo o mais exige JWT válido (autenticado).
- CSRF desabilitado — aceitável por ser API estateless sem cookies de autenticação (o cookie é lido como *bearer*, não para CSRF); combinado com `SameSite=Strict`.
- `AuthenticationEntryPoint` retorna **401** com mensagem genérica para requests não autenticados.

### 2.7 CORS restrito

- `CorsConfig.java` limita origens a `http://localhost:3000` e `https://rhconnect.com.br`, com `allowCredentials=true` e métodos/headers necessários.
- **Nota:** origens estão hardcoded — devem vir de variável de ambiente no futuro (já comentado no código).

### 2.8 Validação de entrada (parcial)

- DTOs de autenticação usam Bean Validation: `@NotBlank`, `@Size(min=6)` em senha, `@Email` onde aplicável (`LoginRequest`, `RegisterRequest`, `RefreshTokenRequest`).
- Resposta padrão de validação (400) para DTOs inválidos.

---

## 3. Medidas que precisam ser **habilitadas / concluídas**

### 3.1 ALTA prioridade

#### 3.1.1 Verificar `ativo` do usuário no login  ⚠️

O campo `Usuario.ativo` existe, mas **não é verificado** — `TokenProviderImpl.loadUserByUsername` só busca por e-mail. Um usuário desativado continua logando.

**Ação:** em `loadUserByUsername` (ou no `AuthServiceImpl.login`), lançar `DisabledException` quando `!usuario.isAtivo()`.

#### 3.1.2 Gerenciar refresh token no login (não expor emissão pública)  ⚠️

`POST /api/auth/refresh` (gerar refresh por username) está em `permitAll` e **emite refresh token sem autenticação** — basta saber o e-mail.

**Ação:** emitir access + refresh **no `login()` e `register()`** (retornando ambos), e remover `permitAll` do `/refresh` (ou exigir autenticação). Manter `/refresh/rotacionar`, `/validar`, `/revogar`, `/usado` (esses recebem o token no corpo).

#### 3.1.3 Armazenar hash do refresh token no banco  ⚠️

`tb_refresh_token.token` guarda o JWT **em claro**. Se o banco vazar, o atacante tem sessões válidas.

**Ação:** armazenar `SHA-256(token)` e buscar/validar pelo hash. O token real só existe no header/corpo da requisição.

#### 3.1.4 Logout com revogação  ⚠️

Não existe `POST /api/auth/logout`. Hoje "sair" só descarta o cookie do browser — o refresh token continua válido.

**Ação:** endpoint que marca `revoked=true` no refresh token (aceito no corpo) e limpa o cookie `accessToken` (`ResponseCookie` com `maxAge(0)`).

#### 3.1.5 Segredos JWT fora do repositório

Defaults de chave existem em `.properties` (fallback de dev). Em produção, **todas** as chaves devem vir de environment/secret manager (`JWT_SECRET_V1`, `JWT_SECRET_V2`, `JWT_ACTIVE_KID`), sem defaults embutidos.

---

### 3.2 MÉDIA prioridade

#### 3.2.1 Rate limiting / bloqueio de força bruta

`login()` não tem limite de tentativas.

**Ação:** contador de falhas por e-mail/IP com bloqueio temporário (ex.: Spring + Bucket4j, ou `spring-boot-starter-security` + persistência de falhas) e tempo de espera progressivo (backoff).

#### 3.2.2 Aposentadoria de chaves antigas

A `key-2026-v1` permanece válida enquanto estiver no map — chave comprometida fica utilizável indefinidamente.

**Ação:** após o prazo máximo de expiração dos tokens assinados com uma chave retirada, **removê-la de `jwt.keys.*`** (definir janela de graça e automação de troca do `activeKid`).

#### 3.2.3 Limpeza de tokens expirados

`RefreshTokenRepository.deleteAllExpired` já existe, mas **não tem chamada**.

**Ação:** `@Scheduled(cron=...)` diário para deletar tokens `expiryDate < now`, evitando acúmulo.

#### 3.2.4 Auditoria de eventos de segurança

Não há log estruturado de login, falhas de login, rotação de refresh token ou reuso detectado.

**Ação:** criar serviço de auditoria (evento, usuário, IP, timestamp) — útil também para LGPD.

---

### 3.3 BAIXA prioridade / boa prática

#### 3.3.1 Vínculo do refresh token ao dispositivo

Armazenar `userAgent` / `IP` / `platform` no `RefreshToken` e rejeitar rotação em dispositivo diferente — dificulta uso do token roubado.

#### 3.3.2 Endpoints oráculo

`/refresh/validar` e `/refresh/usado` retornam true/false — permitem ao atacante confirmar validade de um token roubado. Restringir a uso interno/autenticado.

#### 3.3.3 Correções pontuais no código

- `TokenProvider.getRole` lê `.get("roles", String.class)`, mas o claim `roles` é uma **lista** — vai lançar `ClassCastException` se chamado. Corrigir com leitura tipada ou remover.
- `CorsConfig` com origens hardcoded → variável de ambiente.

#### 3.3.4 Rotação de algoritmo / federado

Quando houver múltiplos serviços validando tokens, migrar de **HS256** (secret compartilhada) para **RS256/ES256** com `JWKSet` e rotacionar via `kid`.

#### 3.3.5 HTTPS / headers aplicação

Garantir **HSTS** e considerar **CSP** quando o frontend estiver em produção sob HTTPS (o cookie `secure=true` só funciona em HTTPS).

---

## 4. Checklist de implementação sugerida

| # | Tarefa | Arquivo(s) principal(is) | Prioridade |
|---|---|---|---|
| 1 | Verificar `ativo` no login | `TokenProviderImpl.java`, `AuthServiceImpl.java` | Alta |
| 2 | Emitir refresh no login/register; restringir `/refresh` | `AuthServiceImpl.java`, `JwtConfig.java` | Alta |
| 3 | Hash de refresh token no banco | `RefreshToken.java`, `TokenProviderImpl.java`, `JwtAuthFilter.java` | Alta |
| 4 | Endpoint de logout | `AuthController.java`, `AuthServiceImpl.java` | Alta |
| 5 | Segredos via env sem default | `application*.properties` | Alta |
| 6 | Rate limiting de login | `AuthServiceImpl.java`, `JwtConfig.java` | Média |
| 7 | Aposentadoria de chaves antigas | `JwtProperties.java`, docs de ops | Média |
| 8 | `@Scheduled` de limpeza | `RefreshTokenRepository.deleteAllExpired` | Média |
| 9 | Auditoria de eventos | novo serviço `AuditService` | Média |
| 10 | Vincular refresh a dispositivo | `RefreshToken.java`, `TokenProviderImpl.java` | Baixa |
| 11 | Restringir oráculos `/validar` e `/usado` | `JwtConfig.java`, `AuthController.java` | Baixa |
| 12 | Corrigir `getRole` (lista de roles) | `TokenProviderImpl.java` | Baixa |
| 13 | CORS via env | `CorsConfig.java` | Baixa |
| 14 | RS256/JWKSet (multi-serviço) | `TokenProviderImpl.java` | Baixa |
| 15 | HSTS/CSP em produção | config / CDN | Baixa |

---

## 5. Notas operacionais

- **Rotacionar a chave ativa** sem derrubar sessões: adicionar o novo segredo em `jwt.keys.<novo-kid>` → ajustar `jwt.activeKid` → (opcional) remover a chave antiga após o prazo máximo de `expirationMs`.
- **Reuso detectado** = provável roubo: a família inteira é revogada (401), mas **não** desloca o usuário. Avaliar notificar o usuário (e-mail) e logar em auditoria.
- O `ddl-auto=create` em dev recria as tabelas a cada boot; em ambiente real usar Flyway (já presente no `pom.xml`, desabilitado) e nunca `create`.