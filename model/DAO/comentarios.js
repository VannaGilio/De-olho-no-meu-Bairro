const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertComentario = async function (ocorrencia) {
    try {
        let sql = `insert into tbl_comentarios (
                                                comentario,
                                                data_criacao,
                                                id_ocorrencia,
                                                id_usuario
                                            )values(
                                                '${ocorrencia.comentario}',
                                                '${ocorrencia.data_criacao}',
                                                '${ocorrencia.id_ocorrencia}',
                                                '${ocorrencia.id_usuario}'
                                            )`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


const updateComentario = async function (ocorrencia) {
    try {
        let sql = `update tbl_comentarios set           comentario = '${ocorrencia.comentario}',
                                                        data_criacao = '${ocorrencia.data_criacao}',
                                                        id_ocorrencia = '${ocorrencia.id_ocorrencia}',
                                                        id_usuario = '${ocorrencia.id_usuario}'

                                            where id_comentario = '${ocorrencia.id}';`

         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false 
    }
}

const deleteComentario = async function (id) {
    try {
        let sql = `delete from tbl_comentarios where id_comentario = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllComentario = async function () {
    try {
        let sql = `select * from tbl_comentarios order by id_comentario desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdComentario = async function (id){
    try {
        let sql = `select * from tbl_comentarios where id_comentario = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

selectComentarioByIdOcorrencia = async function (id){
    try {
        let sql = `select * from tbl_comentarios where id_ocorrencia = ${id};`

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
    insertComentario,
    updateComentario,
    deleteComentario,
    selectAllComentario,
    selectByIdComentario,
    selectComentarioByIdOcorrencia
}