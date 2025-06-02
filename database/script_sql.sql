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
    nome_categoria varchar(100) not null
);

CREATE TABLE tbl_status (
    id_status INT NOT NULL PRIMARY KEY auto_increment,
    nome_status VARCHAR(50) not null
);

CREATE TABLE tbl_enderecos (
    id_endereco INT NOT NULL PRIMARY KEY auto_increment,
    logradouro VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    cep VARCHAR(25) NOT NULL,
    longitude DECIMAL(9,6),
    latitude DECIMAL(9,6)
);

CREATE TABLE tbl_ocorrencias (
    id_ocorrencia INT NOT NULL PRIMARY KEY auto_increment,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    data_criacao DATE NOT NULL,
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

CREATE TABLE tbl_midias (
    id_midia INT NOT NULL PRIMARY KEY auto_increment,
    nome_arquivo VARCHAR(250) NOT NULL,
    url TEXT NOT NULL,
    tamanho INT NOT NULL,
    id_ocorrencia INT NOT NULL,
    id_usuario INT NOT NULL,

    CONSTRAINT FK_OCORRENCIAS_MIDIAS
    FOREIGN KEY (id_ocorrencia)
    REFERENCES tbl_ocorrencias(id_ocorrencia),

    CONSTRAINT FK_USUARIO_MIDIAS
    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
);

