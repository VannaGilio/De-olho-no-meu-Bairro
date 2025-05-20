create database bd_olho_no_bairro;

use bd_olho_no_bairro;

create table tbl_cadastro(
    id_cadastro int not null primary key auto_increment,
    nome varchar(200) not null,
    email varchar(200) not null,
    telefone varchar(20) not null,
    senha varchar(50) not null
);