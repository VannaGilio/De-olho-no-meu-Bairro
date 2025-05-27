create database bd_olho_no_bairro;

use bd_olho_no_bairro;

create table tbl_usuario(
    id_usuario int not null primary key auto_increment,
    nome varchar(200) not null,
    email varchar(200) not null,
    senha varchar(50) not null
);

create table tbl_categorias(
    id_categoria int not null primary key auto_increment,
    nome_categoria varchar(100)
);

CREATE TABLE tbl_status (
    id_status INT NOT NULL KEY,
    nome_status VARCHAR(50)
);

CREATE TABLE tbl_enderecos (
    id_endereco INT NOT NULL PRIMARY KEY,
    logradouro VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    cep VARCHAR(25)
);

CREATE TABLE tbl_ocorrencias (
    id_ocorrencia INT NOT NULL PRIMARY KEY,
    titulo VARCHAR(100),
    descricao VARCHAR(500),
    data_criacao DATE,
    id_usuario INT NOT NULL,
    id_categoria INT NOT NULL,
    id_status INT NOT NULL,
    id_endereco INT NOT NULL,

    CONSTRAINT FK_STATUS_OCORRENCIAS
    FOREIGN KEY (id_status) 
    REFERENCES tbl_status(id_status),

    CONSTRAINT FK_ENDERECO_OCORRENCIAS
    FOREIGN KEY (id_endereco) 
    REFERENCES tbl_enderecos(id_endereco),

    CONSTRAINT FK_USUARIO_OCORRENCIAS
    FOREIGN KEY (id_usuario) 
    REFERENCES tbl_usuario(id_usuario),

    CONSTRAINT FK_CATEGORIA_OCORRENCIAS
    FOREIGN KEY (id_categoria) 
    REFERENCES tbl_categorias(id_categoria)
);

CREATE TABLE tbl_historico_status (
    id_historico INT NOT NULL PRIMARY KEY,
    data_alteracao DATE NOT NULL,
    id_ocorrencia INT NOT NULL,
    id_status INT NOT NULL,

    CONSTRAINT FK_OCORRENCIA_HISTORICO_STATUS
    FOREIGN KEY (id_ocorrencia) 
    REFERENCES tbl_ocorrencias(id_ocorrencia),

    CONSTRAINT FK_STATUS_HISTORICO_STATUS
    FOREIGN KEY (id_status) 
    REFERENCES tbl_status(id_status)
);

