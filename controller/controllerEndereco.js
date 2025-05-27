const message = require('../modulo/config.js')
const enderecoDAO = require('../model/DAO/endereco.js')

const inserirEndereco = async function (endereco, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (endereco.logradouro == "" || endereco.logradouro == null || endereco.logradouro == undefined || endereco.logradouro.length > 100 ||
                endereco.bairro     == "" || endereco.bairro     == null || endereco.bairro     == undefined || endereco.bairro.length     > 100 ||
                endereco.cidade     == "" || endereco.cidade     == null || endereco.cidade     == undefined || endereco.cidade.length     > 100 ||
                endereco.estado     == "" || endereco.estado     == null || endereco.estado     == undefined || endereco.estado.length     > 100 ||
                endereco.cep        == "" || endereco.cep        == null || endereco.cep        == undefined || endereco.cep.length        > 25
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultEndereco = await enderecoDAO.insertEndereco(endereco)

                if (resultEndereco) {
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

const atualizarEndereco = async function (id, contentType, endereco) {
    try {
        if (String(contentType) == 'application/json') {
            if (endereco.logradouro == "" || endereco.logradouro == null || endereco.logradouro == undefined || endereco.logradouro.length > 100 ||
                endereco.bairro     == "" || endereco.bairro     == null || endereco.bairro     == undefined || endereco.bairro.length     > 200 ||
                endereco.cidade     == "" || endereco.cidade     == null || endereco.cidade     == undefined || endereco.cidade.length     > 200 ||
                endereco.estado     == "" || endereco.estado     == null || endereco.estado     == undefined || endereco.estado.length     > 200 ||
                endereco.cep        == "" || endereco.cep        == null || endereco.cep        == undefined || endereco.cep.length        > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultEndereco = await enderecoDAO.selectByIdEndereco(parseInt(id))

                if (resultEndereco != false || typeof (resultEndereco) == 'object') {
                    if (resultEndereco.length > 0) {
                        endereco.id_endereco = parseInt(id)

                        let result = await enderecoDAO.updateEndereco(endereco)
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


const excluirEndereco = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultEndereco = await enderecoDAO.selectByIdEndereco(parseInt(id))

            if (resultEndereco != false || typeof (resultEndereco) == 'object') {
                if (resultEndereco.length > 0) {
                    let result = await enderecoDAO.deleteEndereco(parseInt(id))

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

const listarEndereco = async function () {
    try {
        let dadosEndereco = {}

        let result = await enderecoDAO.selectAllEnderecos()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                dadosEndereco.status = true
                dadosEndereco.status_code = 200
                dadosEndereco.itens = result.length
                dadosEndereco.enderecos = result

                return dadosEndereco
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

const buscarEndereco = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosEndereco = {}
            let result = await enderecoDAO.selectByIdEndereco(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosEndereco.status = true
                    dadosEndereco.status_code = 200
                    dadosEndereco.itens = result.length
                    dadosEndereco.enderecos = result

                    return dadosEndereco
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
    inserirEndereco,
    atualizarEndereco,
    excluirEndereco,
    listarEndereco,
    buscarEndereco
}