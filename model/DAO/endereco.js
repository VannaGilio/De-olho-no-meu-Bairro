const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CREATE TABLE tbl_enderecos (
//     id_endereco INT NOT NULL PRIMARY KEY,
//     logradouro VARCHAR(100),
//     bairro VARCHAR(100),
//     cidade VARCHAR(100),
//     estado VARCHAR(100),
//     cep VARCHAR(25)
// );



const insertEndereco = async function (endereco) {
    try {
        let sql = `insert into tbl_enderecos (
                                                logradouro,
                                                bairro,
                                                cidade,
                                                estado,
                                                cep,
                                                longitude,
                                                latitude
                                            )values(
                                                '${endereco.logradouro}',
                                                '${endereco.bairro}',
                                                '${endereco.cidade}',
                                                '${endereco.estado}',
                                                '${endereco.cep}',
                                                '${endereco.longitude}',
                                                '${endereco.latitude}'
                                            );`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        console.error(error)
        return false
    }
}

const updateEndereco = async function (endereco) {
    try {
        let sql = `update tbl_enderecos set   logradouro = '${endereco.logradouro}',
                                              bairro     = '${endereco.bairro}',
                                              cidade     = '${endereco.cidade}',
                                              estado     = '${endereco.estado}',
                                              cep        = '${endereco.cep}',
                                              longitude  = '${endereco.longitude}',
                                              latitude   = '${endereco.latitude}'

                                              where id_endereco = '${endereco.id_endereco}';`

         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false 
    }
}

const deleteEndereco = async function (id) {
    try {
        let sql = `delete from tbl_enderecos where id_endereco = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllEnderecos = async function () {
    try {
        let sql = `select * from tbl_enderecos order by id_endereco desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdEndereco = async function (id){
    try {
        let sql = `select * from tbl_enderecos where id_endereco = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertEndereco,
    updateEndereco,
    deleteEndereco,
    selectAllEnderecos,
    selectByIdEndereco
}