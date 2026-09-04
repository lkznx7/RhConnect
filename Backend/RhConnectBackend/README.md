# RH Connect — Backend

Backend do **RH Connect**, aplicação web corporativa de gestão de pessoas e recrutamento, construída como **BFF (Backend-For-Frontend)** no padrão **Monolito Modular**.

## 🏗️ Arquitetura

```
Next.js (Frontend — UI + Estado)
    ↓ HTTP/REST (JSON)
Spring Boot BFF (Toda a lógica de negócio)
    ↓ JDBC/JPA
PostgreSQL (Banco de Dados)
```

- **Maven** — gerenciamento de dependências e build
- **Java 21**
- **Spring Boot 4.1.1**
- **Spring Security** — autenticação e autorização
- **Spring Data JPA** — persistência
- **Flyway** — migrações de banco de dados
- **PostgreSQL** — banco de dados relacional

## 📦 Estrutura de Módulos

O backend é um monolito modular: cada módulo encapsula seu contexto de negócio e se comunica com os demais apenas via interfaces de serviço públicas.

```
src/main/java/br/com/rhconnect/
│
├── modules/
│   ├── auth/             # Autenticação (login, tokens)
│   ├── candidato/        # Candidatos, currículos
│   ├── categorias/       # Categorias / tags
│   ├── configuracoes/    # Configurações do sistema, LGPD
│   ├── cursos/           # Cursos e inscrições
│   ├── noticias/         # Notícias, anexos, newsletter
│   ├── relatorios/       # Relatórios e métricas
│   ├── usuarios/         # Gestão de usuários
│   └── vagas/            # Vagas, candidaturas, triagem
│
├── shared/               # Código compartilhado
│   ├── config/
│   ├── exception/
│   ├── security/
│   ├── dto/
│   └── util/
│
└── RhConnectApplication.java
```

Cada módulo segue as camadas internas: `controller` → `service` → `repository` → `entity` (+ `dto`).

## 🚀 Como executar

### Pré-requisitos

- JDK 21
- Maven 3.9+
- PostgreSQL em execução

### Configuração

As configurações de banco são lidas de variáveis de ambiente (com valores padrão):

| Variável       | Padrão                          |
|----------------|---------------------------------|
| `DB_URL`       | `jdbc:postgresql://localhost:5432/rhconnect` |
| `DB_USERNAME`  | `postgres`                      |
| `DB_PASSWORD`  | `postgres`                      |

Crie o banco de dados:

```sql
CREATE DATABASE rhconnect;
```

### Build e execução

```bash
# Compilar
mvn compile

# Rodar os testes
mvn test

# Executar a aplicação
mvn spring-boot:run
```

A aplicação sobe em `http://localhost:8080`.

## 🗄️ Banco de Dados

- Migrações Flyway: `src/main/resources/db/migration/`
- Modelo de dados (DBML): `src/main/resources/database.dbml`

## 🛠️ Dependências

| Escopo      | Dependências |
|-------------|--------------|
| Compile     | Spring Data JPA, Spring Security, OAuth2 Client, Thymeleaf, Validation, Web MVC, Flyway, Mail |
| Runtime     | H2 (dev), PostgreSQL |
| Test        | Starters `*-test` do Spring Boot, JUnit Platform |

> **Nota:** Este repositório contém apenas a base/estrutura essencial do backend. A lógica de negócio é adicionada incrementalmente por módulo.
