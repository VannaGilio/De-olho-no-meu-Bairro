const message = require('../modulo/config.js')
const categoriaDAO = require('../model/DAO/categoria.js')

const inserirCategoria = async function (status, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (status.nome_categoria == "" || status.nome_categoria == null || status.nome_categoria == undefined || status.nome_categoria.length > 50 ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultCategoria = await categoriaDAO.insertCategoria(status)

                if (resultCategoria) {
                    return message.SUCCESS_CREATED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarCategoria = async function (id, contentType, status) {
    try {
        if (String(contentType) == 'application/json') {
            if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id) ||
                status.nome_status == "" || status.nome_status == null || status.nome_status == undefined || status.nome_status.length > 50) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultCategoria = await categoriaDAO.selectByIdCategoria(parseInt(id))

                if (resultCategoria != false || typeof (resultCategoria) == 'object') {
                    if (resultCategoria.length > 0) {
                        status.id_status = parseInt(id)

                        let result = await categoriaDAO.updateCategoria(status)
                        if (result) {
                            return message.SUCCESS_UPDATED_ITEM
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const excluirCategoria = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultCategoria = await categoriaDAO.selectByIdCategoria(parseInt(id))

            if (resultCategoria != false || typeof (resultCategoria) == 'object') {
                if (resultCategoria.length > 0) {
                    let result = await categoriaDAO.deleteCategoria(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarCategoria = async function () {
    try {
        let dadosStatus = {}

        let result = await categoriaDAO.selectAllCategorias()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                dadosStatus.status = true
                dadosStatus.status_code = 200
                dadosStatus.itens = result.length
                dadosStatus.categorias = result

                return dadosStatus
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarCategoria = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosStatus = {}
            let result = await categoriaDAO.selectByIdCategoria(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosStatus.status = true
                    dadosStatus.status_code = 200
                    dadosStatus.itens = result.length
                    dadosStatus.categoria = result

                    return dadosStatus
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


module.exports = {
    inserirCategoria,
    atualizarCategoria,
    excluirCategoria,
    listarCategoria,
    buscarCategoria
}