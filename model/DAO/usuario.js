const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertUsuario = async function (usuario) {
    try {
        let sql = `insert into tbl_usuario (
                                                nome,
                                                email,
                                                senha
                                            )values(
                                                '${usuario.nome}',
                                                '${usuario.email}',
                                                '${usuario.senha}'
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

const updateUsuario = async function (usuario) {
    try {
        let sql = `update tbl_usuario set   nome = '${usuario.nome}',
                                            email = '${usuario.email}',
                                            senha = '${usuario.senha}'

                                            where id_usuario = '${usuario.id_usuario}';`

         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false 
    }
}

const deleteUsuario = async function (id) {
    try {
        let sql = `delete from tbl_usuario where id_usuario = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllUsuario = async function () {
    try {
        let sql = `select * from tbl_usuario order by id_usuario desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function (id){
    try {
        let sql = `select * from tbl_usuario where id_usuario = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectUsuarioByEmailAndSenha = async function (usuario) {
    try {
        let sql = `select * from tbl_usuario where email = '${usuario.email}' and senha = '${usuario.senha}'`

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

const selectUsuarioByEmail = async function (usuario) {
    try {
        let sql = `select * from tbl_usuario where email = '${usuario.email}'`

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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario,
    selectUsuarioByEmailAndSenha,
    selectUsuarioByEmail
}