const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// create table tbl_categorias(
//     id_categoria int not null primary key auto_increment,
//     nome_categoria varchar(100)
// );


const insertCategoria = async function (categoria) {
    try {
        let sql = `insert into tbl_categorias (
                                                nome_categoria
                                            )values(
                                                '${categoria.nome_categoria}'
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

const updateCategoria = async function (categoria) {
    try {
        let sql = `update tbl_categorias set nome_categoria = '${categoria.nome_categoria}'

                                             where id_categoria = '${categoria.id_categoria}';`

         let result = await prisma.$executeRawUnsafe(sql)
         if(result)
            return true
        else 
            return false                                   
    } catch (error) {
        return false 
    }
}

const deleteCategoria = async function (id) {
    try {
        let sql = `delete from tbl_categorias where id_categoria = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllCategorias = async function () {
    try {
        let sql = `select * from tbl_categorias order by id_categoria desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdCategoria = async function (id){
    try {
        let sql = `select * from tbl_categorias where id_categoria = ${id};`

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
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    selectAllCategorias,
    selectByIdCategoria
}