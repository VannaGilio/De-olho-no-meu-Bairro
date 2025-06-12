const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertCurtidas = async function (curtida) {
    try {
        let sql = `insert into tbl_curtidas (
                                                curtidas,
                                                id_ocorrencia,
                                                id_usuario
                                            )values(
                                                '${curtida.curtidas}',
                                                '${curtida.id_ocorrencia}',
                                                '${curtida.id_usuario}'
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

module.exports = {
    insertCurtidas
}