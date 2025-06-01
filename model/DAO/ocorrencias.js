const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertOcorrencia = async function (ocorrencia) {
    try {
        let sql = `insert into tbl_ocorrencias (
                                                titulo,
                                                descricao,
                                                data_criacao,
                                                id_usuario,
                                                id_endereco,
                                                id_categoria,
                                                id_status
                                            )values(
                                                '${ocorrencia.titulo}',
                                                '${ocorrencia.descricao}',
                                                '${ocorrencia.data_criacao}',
                                                '${ocorrencia.id_usuario}',
                                                '${ocorrencia.id_endereco}',
                                                '${ocorrencia.id_categoria}',
                                                '${ocorrencia.id_status}'
                                            );`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const updateOcorrencia = async function (ocorrencia) {
    try {
        let sql = `update tbl_ocorrencias set           titulo = '${ocorrencia.titulo}',
                                                        descricao = '${ocorrencia.descricao}',
                                                        data_criacao = '${ocorrencia.data_criacao}',
                                                        id_usuario = '${ocorrencia.id_usuario}',
                                                        id_endereco = '${ocorrencia.id_endereco}',
                                                        id_categoria = '${ocorrencia.id_categoria}',
                                                        id_status = '${ocorrencia.id_status}'

                                            where id_ocorrencia = '${ocorrencia.id}';`

         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false 
    }
}

const deleteOcorrencia = async function (id) {
    try {
        let sql = `delete from tbl_ocorrencias where id_ocorrencia = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllOcorrencia = async function () {
    try {
        let sql = `select * from tbl_ocorrencias order by id_ocorrencia desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdOcorrencia = async function (id){
    try {
        let sql = `select * from tbl_ocorrencias where id_ocorrencia = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectLastOcorrencia = async function (){
    try {
        let sql = `select id_ocorrencia from tbl_ocorrencias order by id_ocorrencia desc limit 1`

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
    insertOcorrencia,
    updateOcorrencia,
    deleteOcorrencia,
    selectByIdOcorrencia,
    selectAllOcorrencia,
    selectLastOcorrencia
}