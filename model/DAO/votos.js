const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertVoto = async function (voto) {
    try {
        let sql = `insert into tbl_votos (
                                                data_voto,
                                                id_usuario,
                                                id_ocorrencia
                                            )values(
                                                '${voto.data_voto}',
                                                '${voto.id_usuario}',
                                                '${voto.id_ocorrencia}'
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

const deleteVoto = async function (id) {
    try {
        let sql = `delete from tbl_votos where id_voto = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectVotoById = async function (id) {
    try {
        let sql = `select * from tbl_votos where id_voto = '${id}'`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        console.error(error)
        return false
    }
}

const selectVotoByUsuarioAndOcorrencia = async function (voto) {
    try {
        let sql = `select * from tbl_votos where id_usuario = '${voto.id_usuario}' and id_ocorrencia = '${voto.id_ocorrencia}'`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        console.error(error)
        return false
    }
}


const selectVotoByOcorrencia = async function (id) {
    try {
        let sql = `select * from tbl_votos where id_ocorrencia = '${id}'`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        console.error(error)
        return false
    }
}


module.exports = {
    insertVoto,
    deleteVoto,
    selectVotoById,
    selectVotoByUsuarioAndOcorrencia,
    selectVotoByOcorrencia
}