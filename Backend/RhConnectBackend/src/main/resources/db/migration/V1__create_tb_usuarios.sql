create table tb_usuarios (
    id            uuid                     not null,
    ativo         boolean                  not null,
    atualizad_em  timestamp(6) with time zone not null,
    cpfs          varchar(255)             not null,
    criado_em     timestamp(6) with time zone not null,
    emails        varchar(255)             not null,
    nome_completo varchar(255),
    role          smallint                 not null check (role between 0 and 2),
    senha_hash    varchar(255),
    telefone      varchar(255),
    primary key (id),
    constraint uk_tb_usuarios_emails unique (emails),
    constraint uk_tb_usuarios_cpfs unique (cpfs)
);