const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertCadastro = async function (cadastro) {
    try {
        let sql = `insert into tbl_cadastro (
                                                nome,
                                                telefone,
                                                email,
                                                senha
                                            )values(
                                                '${cadastro.nome}',
                                                '${cadastro.telefone}',
                                                '${cadastro.email}',
                                                '${cadastro.senha}'
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

module.exports = {
    insertCadastro
}