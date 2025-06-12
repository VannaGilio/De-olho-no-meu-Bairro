const message = require('../modulo/config.js')
const statusDAO = require('../model/DAO/status.js')

const inserirStatus = async function (status, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (status.nome_status == "" || status.nome_status == null || status.nome_status == undefined || status.nome_status.length > 50 ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultStatus = await statusDAO.insertStatus(status)

                if (resultStatus) {
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

const atualizarStatus = async function (id, contentType, status) {
    try {
        if (String(contentType) == 'application/json') {
            if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id) ||
                status.nome_status == "" || status.nome_status == null || status.nome_status == undefined || status.nome_status.length > 50) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultStatus = await statusDAO.selectByIdStatus(parseInt(id))

                if (resultStatus != false || typeof (resultStatus) == 'object') {
                    if (resultStatus.length > 0) {
                        status.id_status = parseInt(id)

                        let result = await statusDAO.updateStatus(status)
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


const excluirStatus = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultStatus = await statusDAO.selectByIdStatus(parseInt(id))

            if (resultStatus != false || typeof (resultStatus) == 'object') {
                if (resultStatus.length > 0) {
                    let result = await statusDAO.deleteStatus(parseInt(id))

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

const listarStatus = async function () {
    try {
        let dadosStatus = {}

        let result = await statusDAO.selectAllStatus()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                dadosStatus.status = true
                dadosStatus.status_code = 200
                dadosStatus.itens = result.length
                dadosStatus.stats = result

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

const buscarStatus = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosStatus = {}
            let result = await statusDAO.selectByIdStatus(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosStatus.status = true
                    dadosStatus.status_code = 200
                    dadosStatus.itens = result.length
                    dadosStatus.stats = result

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
    inserirStatus,
    excluirStatus,
    atualizarStatus,
    listarStatus,
    buscarStatus
}