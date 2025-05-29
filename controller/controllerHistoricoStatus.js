const message = require('../modulo/config.js')
const historicoStatusDAO = require('../model/DAO/historico_status')
const controllerOcorrencia = require('../controller/controllerOcorrencia.js')
const controllerStatus = require('../controller/controllerStatus.js')

const inserirHistoricoStatus = async function (status, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (status.data_alteracao == "" || status.data_alteracao == null || status.data_alteracao == undefined ||
                status.id_ocorrencia == "" || status.id_ocorrencia == null || status.id_ocorrencia == undefined || status.id_ocorrencia.length <=0 ||
                status.id_status == "" || status.id_status == null || status.id_status == undefined || status.id_status.length <= 0) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultStatus = await historicoStatusDAO.insertHistoricoStatus(status)

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

const atualizarHistoricoStatus = async function (id, contentType, status) {
    try {
        if (String(contentType) == 'application/json') {
            if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id) ||
                status.data_alteracao == "" || status.data_alteracao == null || status.data_alteracao == undefined ||
                status.id_ocorrencia == "" || status.id_ocorrencia == null || status.id_ocorrencia == undefined || status.id_ocorrencia.length <=0 ||
                status.id_status == "" || status.id_status == null || status.id_status == undefined || status.id_status.length <= 0) {

                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultStatus = await historicoStatusDAO.selectByIdtHistoricoStatus(parseInt(id))

                if (resultStatus != false || typeof (resultStatus) == 'object') {
                    if (resultStatus.length > 0) {
                        status.id_status = parseInt(id)

                        let result = await historicoStatusDAO.updatetHistoricoStatus(status)
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


const excluirHistoricoStatus = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultStatus = await historicoStatusDAO.selectByIdtHistoricoStatus(parseInt(id))

            if (resultStatus != false || typeof (resultStatus) == 'object') {
                if (resultStatus.length > 0) {
                    let result = await historicoStatusDAO.deletetHistoricoStatus(parseInt(id))

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

const listarHistoricoStatus = async function () {
    try {
        let dadosStatus = {}

        let result = await historicoStatusDAO.selectAlltHistoricoStatus()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                dadosStatus.status = true
                dadosStatus.status_code = 200
                dadosStatus.itens = result.length
                dadosStatus.status = result

                for (const itemHistorico of resultHistorico) {
                    let dadosOcorrencia = await controllerOcorrencia.buscarOcorrencia(itemHistorico.id_ocorrencia)
                    itemHistorico.ocorrencia = dadosOcorrencia.id_ocorrencia

                    let dadosStatus = await controllerStatus.buscarStatus(itemHistorico.id_status)
                    itemHistorico.status = dadosStatus.id_status
                }

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

const buscarHistoricoStatus = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosStatus = {}
            let result = await historicoStatusDAO.selectByIdtHistoricoStatus(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosStatus.status = true
                    dadosStatus.status_code = 200
                    dadosStatus.itens = result.length
                    dadosStatus.status = result

                    for (const itemHistorico of resultHistorico) {
                        let dadosOcorrencia = await controllerOcorrencia.buscarOcorrencia(itemHistorico.id_ocorrencia)
                        itemHistorico.ocorrencia = dadosOcorrencia.id_ocorrencia

                        let dadosStatus = await controllerStatus.buscarStatus(itemHistorico.id_status)
                        itemHistorico.status = dadosStatus.id_status
                    }

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
    inserirHistoricoStatus,
    atualizarHistoricoStatus,
    excluirHistoricoStatus,
    listarHistoricoStatus,
    buscarHistoricoStatus
}