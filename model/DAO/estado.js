const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertEstado = async function (estado) {
    try {
        let sql = `insert into tbl_estado (     nome,
                                                sigla
                                            )values(
                                                '${estado.nome}',
                                                '${estado.sigla}'
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

const updateEstado = async function (estado) {
    try {
        let sql = `update tbl_estado set    nome = '${estado.nome}',
                                            sigla = '${estado.sigla}',

                                            where id_estado = '${estado.id_estado}'`

         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false
    }
}

const deleteEstado = async function (id) {
    try {
        let sql = `delete from tbl_estado where id_estado = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllEstado = async function () {
    try {
        let sql = `select * from tbl_estado order by id_estado desc`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result){
            return result
        }else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdEstado = async function (id){
    try {
        let sql = `select * from tbl_estado where id_estado = ${id}`

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
    insertEstado,
    updateEstado,
    deleteEstado,
    selectAllEstado,
    selectByIdEstado
}