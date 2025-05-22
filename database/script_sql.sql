create database bd_olho_no_bairro;

use bd_olho_no_bairro;

create table tbl_usuario(
    id_usuario int not null primary key auto_increment,
    nome varchar(200) not null,
    email varchar(200) not null,
    senha varchar(50) not null,
    id_estado int not null,

    constraint FK_ESTADO_USUARIO
    foreign key (id_estado)
    references tbl_estado(id_estado)
);

create table tbl_estado(
    id_estado int not null primary key auto_increment,
    nome varchar(40) not null,
    sigla varchar (5) not null
);
