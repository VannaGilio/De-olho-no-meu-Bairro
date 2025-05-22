const message = require('../modulo/config.js')
const estadoDAO = require('../model/DAO/estado.js')

const inserirEstado = async function (estado, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (estado.nome == "" || estado.nome == null || estado.nome == undefined || estado.nome.length > 40 ||
                estado.sigla == "" || estado.sigla == null || estado.sigla == undefined || estado.sigla.length > 5
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultEstado = await estadoDAO.insertEstado(estado)

                if (resultEstado) {
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

const atualizarEstado = async function (id, contentType, estado) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id) ||
                estado.nome == "" || estado.nome == null || estado.nome == undefined || estado.nome.length > 40 ||
                estado.sigla == "" || estado.sigla == null || estado.sigla == undefined || estado.sigla.length > 5
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultEstado = await estadoDAO.selectByIdEstado(parseInt(id))

                if (resultEstado != false || typeof (resultEstado) == 'object') {
                    if (resultEstado.length > 0) {
                        estado.id_estado = parseInt(id)

                        let result = await estadoDAO.updateEstado(estado)
                        if (result) {
                            return message.SUCCESS_UPDATED_ITEM
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
                    } else {
                        message.ERROR_NOT_FOUND
                    }
                } else {
                    message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirEstado = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultEstado = await estadoDAO.selectByIdEstado(parseInt(id))

            if (resultEstado != false || typeof (resultEstado) == 'object') {
                if (resultEstado > 0) {
                    let result = await estadoDAO.deleteEstado(parseInt(id))

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

const listarEstado = async function () {
    try {
        let dadosEstado = {}
        let result = await estadoDAO.selectAllEstado()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                console.log(result)
                dadosEstado.status = true
                dadosEstado.status_code = 200
                dadosEstado.itens = result.length
                dadosEstado.estado = result

                return dadosEstado
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

const buscarEstado = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosEstado = {}
            let result = await estadoDAO.selectByIdEstado(id)

            if (result != false || typeof (result) == 'object') {
                if (result > 0) {
                    dadosEstado.status = true
                    dadosEstado.status_code = 200
                    dadosEstado.itens = result.length
                    dadosEstado.estado = result

                    return dadosEstado
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
    inserirEstado,
    atualizarEstado,
    excluirEstado,
    listarEstado,
    buscarEstado
}