const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertHistoricoStatus = async function (status) {
    try {
        let sql = `insert into tbl_historico_status (
                                                data_alteracao,
                                                id_ocorrencia,
                                                id_status
                                            )values(
                                                '${status.data_alteracao}',
                                                '${status.id_ocorrencia}',
                                                '${status.id_status}'
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

const updatetHistoricoStatus = async function (status) {
    try {
        let sql = `update tbl_historico_status set  data_alteracao = '${status.data_alteracao}',
                                                    id_ocorrencia = '${status.id_ocorrencia}',
                                                    id_status = '${status.id_status}'

                                                    where id_historico = '${status.id}'`
                                                    
         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false 
    }
}

const deletetHistoricoStatus = async function (id) {
    try {
        let sql = `delete from tbl_historico_status where id_historico = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAlltHistoricoStatus = async function () {
    try {
        let sql = `select * from tbl_historico_status order by id_historico desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdtHistoricoStatus = async function (id){
    try {
        let sql = `select * from tbl_historico_status where id_historico = ${id};`

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
    insertHistoricoStatus,
    deletetHistoricoStatus,
    updatetHistoricoStatus,
    selectAlltHistoricoStatus,
    selectByIdtHistoricoStatus
}