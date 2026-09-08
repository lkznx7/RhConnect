alter table tb_usuarios
    add column data_nascimento date,
    add column genero varchar(50),
    add column pcd boolean default false,
    add column cidade varchar(100),
    add column uf char(2),
    add column email_profissional varchar(255),
    add column area_interesse varchar(255),
    add column nivel_senioridade varchar(50),
    add column expectativa_salarial numeric(12, 2),
    add column modalidade_trabalho_preferida varchar(50),
    add column resumo_carreira text,
    add column linkedin_url varchar(500),
    add column portfolio_url varchar(500),
    add column curriculo_arquivo_url varchar(500),
    add column matricula varchar(50),
    add column cargo varchar(150),
    add column departamento varchar(150),
    add column gestor_imediato_id uuid,
    add column email_corporativo varchar(255),
    add column data_admissao date;

alter table tb_usuarios
    add constraint uk_tb_usuarios_matricula unique (matricula),
    add constraint uk_tb_usuarios_email_corporativo unique (email_corporativo);

alter table tb_usuarios
    add constraint fk_tb_usuarios_gestor_imediato
        foreign key (gestor_imediato_id) references tb_usuarios (id);
