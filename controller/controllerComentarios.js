const message = require('../modulo/config.js')
const comentarioDAO = require('../model/DAO//comentarios.js')

const controllerUsuario    = require('../controller/controllerUsuario.js')
const controllerOcorrencia     = require('../controller/controllerOcorrencia.js')



const inserirComentario = async function (ocorrencia, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (ocorrencia.comentario == "" || ocorrencia.comentario == null || ocorrencia.comentario == undefined || ocorrencia.comentario.length > 600 ||
                ocorrencia.data_criacao == "" || ocorrencia.data_criacao == null || ocorrencia.data_criacao == undefined || 
                ocorrencia.id_ocorrencia == "" || ocorrencia.id_ocorrencia == null || ocorrencia.id_ocorrencia == undefined || ocorrencia.id_ocorrencia <=0 ||
                ocorrencia.id_usuario == "" || ocorrencia.id_usuario == null || ocorrencia.id_usuario == undefined || ocorrencia.id_usuario <=0) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultComentario = await comentarioDAO.insertComentario(ocorrencia)

                if (resultComentario) {
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

const atualizarComentario = async function (id, contentType, ocorrencia) {
    try {
        if (String(contentType) == 'application/json') {
            if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id) ||
            ocorrencia.comentario == "" || ocorrencia.comentario == null || ocorrencia.comentario == undefined || ocorrencia.comentario.length > 100 ||
            ocorrencia.data_criacao == "" || ocorrencia.data_criacao == null || ocorrencia.data_criacao == undefined || 
            ocorrencia.id_ocorrencia == "" || ocorrencia.id_ocorrencia == null || ocorrencia.id_ocorrencia == undefined || ocorrencia.id_ocorrencia <=0 ||
            ocorrencia.id_usuario == "" || ocorrencia.id_usuario == null || ocorrencia.id_usuario == undefined || ocorrencia.id_usuario <=0
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultComentario = await comentarioDAO.selectByIdComentario(parseInt(id))

                if (resultComentario != false || typeof (resultComentario) == 'object') {
                    if (resultComentario.length > 0) {

                        ocorrencia.id = parseInt(id)

                        let result = await comentarioDAO.updateComentario(ocorrencia)
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


const excluirComentario = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultComentario = await comentarioDAO.selectByIdComentario(parseInt(id))

            if (resultComentario != false || typeof (resultComentario) == 'object') {
                if (resultComentario.length > 0) {
                    let result = await comentarioDAO.deleteComentario(parseInt(id))

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

const listarComentario = async function () {
    try {
        let arrayComentario = []
        let dadosComentario = {}

        let result = await comentarioDAO.selectAllComentario()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                dadosComentario.status = true
                dadosComentario.status_code = 200
                dadosComentario.itens = result.length

                for (const itemComentario of result) {
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemComentario.id_usuario)
                    itemComentario.usuario = dadosUsuario.users
                    delete itemComentario.id_usuario

                    let dadosOcorrencia = await controllerOcorrencia.buscarOcorrencia(itemComentario.id_ocorrencia)
                    itemComentario.ocorrencia = dadosOcorrencia.ocorrencia
                    delete itemComentario.id_ocorrencia

                    arrayComentario.push(itemComentario)
                }

                dadosComentario.comentario = arrayComentario
                return dadosComentario
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

const buscarComentario = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let arrayComentario = []
            let dadosComentario = {}
            let result = await comentarioDAO.selectByIdComentario(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosComentario.status = true
                    dadosComentario.status_code = 200
                    dadosComentario.itens = result.length

                    for (const itemComentario of result) {

                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemComentario.id_usuario)
                    itemComentario.usuario = dadosUsuario.users
                    delete itemComentario.id_usuario

                    let dadosOcorrencia = await controllerOcorrencia.buscarOcorrencia(itemComentario.id_ocorrencia)
                    itemComentario.ocorrencia = dadosOcorrencia.ocorrencia
                    delete itemComentario.id_ocorrencia

                        arrayComentario.push(itemComentario)
                    }

                    dadosComentario.comentario = arrayComentario
                    return dadosComentario
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

const buscarComentariosByIdOcorrencia = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let result = await comentarioDAO.selectComentarioByIdOcorrencia(id)

            let dadosComentario = {}
            if (result && Array.isArray(result)) {
                if (result.length > 0) {
                    dadosComentario.status = true
                    dadosComentario.status_code = 200
                    dadosComentario.itens = result.length
                    dadosComentario.comments = result

                    return dadosComentario
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


module.exports = {
    inserirComentario,
    atualizarComentario,
    excluirComentario,
    listarComentario,
    buscarComentario,
    buscarComentariosByIdOcorrencia
}