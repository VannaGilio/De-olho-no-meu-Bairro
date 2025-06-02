const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertMidia = async function (midia) {
    try {
        let sql = `insert into tbl_midias (
                                                nome_arquivo,
                                                url,
                                                tamanho,
                                                id_ocorrencia,
                                                id_usuario
                                            )values(
                                                '${midia.nome_arquivo}',
                                                '${midia.url}',
                                                '${midia.tamanho}',
                                                '${midia.id_ocorrencia}',
                                                '${midia.id_usuario}'
                                            )`

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

const updateMidia = async function (midia) {
    try {
        let sql = `update tbl_midias set      nome_arquivo  = '${midia.nome_arquivo}',
                                              url           = '${midia.url}',
                                              tamanho       = '${midia.tamanho}',
                                              id_ocorrencia = '${midia.id_ocorrencia}',
                                              id_usuario    = '${midia.id_usuario}'

                                              where id_midia = '${midia.id_midia}';`

         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false 
    }
}

const deleteMidia = async function (id) {
    try {
        let sql = `delete from tbl_midias where id_midia = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllMidias = async function () {
    try {
        let sql = `select * from tbl_midias order by id_midia desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdMidia = async function (id){
    try {
        let sql = `select * from tbl_midias where id_midia = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectMusicaByIdOcorrencia = async function (id){
    try {
        let sql = `select * from tbl_midias where id_ocorrencia = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectlastMidia = async function (){
    try {
        let sql = `select * from tbl_midias order by id_midia desc limit 1`

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
    insertMidia,
    deleteMidia,
    updateMidia,
    selectAllMidias,
    selectByIdMidia,
    selectMusicaByIdOcorrencia,
    selectlastMidia
}