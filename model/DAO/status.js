const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertStatus = async function (status) {
    try {
        let sql = `insert into tbl_status (
                                                nome_status
                                            )values(
                                                '${status.nome_status}'
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

const updateStatus = async function (status) {
    try {
        let sql = `update tbl_status set    nome_status = '${status.nome_status}'

                                            where id_status = '${status.id_status}';`

         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false 
    }
}

const deleteStatus = async function (id) {
    try {
        let sql = `delete from tbl_status where id_status = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllStatus = async function () {
    try {
        let sql = `select * from tbl_status order by id_status desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdStatus = async function (id){
    try {
        let sql = `select * from tbl_status where id_status = ${id};`

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
    insertStatus,
    deleteStatus,
    updateStatus,
    selectAllStatus,
    selectByIdStatus
}