const message = require('../modulo/config.js')
const midiaDAO = require('../model/DAO/midia.js')

const inserirMidia = async function (midia, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (midia.nome_arquivo  == "" || midia.nome_arquivo  == null || midia.nome_arquivo  == undefined || midia.nome_arquivo.length   >250 ||
                midia.url           == "" || midia.url           == null || midia.url           == undefined ||
                midia.tamanho       == "" || midia.tamanho       == null || midia.tamanho       == undefined ||
                midia.id_ocorrencia == "" || midia.id_ocorrencia == null || midia.id_ocorrencia == undefined || midia.id_ocorrencia         <=0  ||
                midia.id_usuario    == "" || midia.id_usuario    == null || midia.id_usuario    == undefined || midia.id_usuario            <=0 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultMidia = await midiaDAO.insertMidia(midia)

                if (resultMidia) {

                    let lastMidia = await midiaDAO.selectlastMidia()

                    let dados = {}
                    
                    dados.status = true
                    dados.status_code = 200
                    dados.result = lastMidia

                    return dados
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

const atualizarMidia = async function (id, contentType, midia) {
    try {
        if (String(contentType) == 'application/json') {
            if (midia.nome_arquivo  == "" || midia.nome_arquivo  == null || midia.nome_arquivo  == undefined || midia.nome_arquivo.length   >250 ||
                midia.url           == "" || midia.url           == null || midia.url           == undefined ||
                midia.tamanho       == "" || midia.tamanho       == null || midia.tamanho       == undefined ||
                midia.id_ocorrencia == "" || midia.id_ocorrencia == null || midia.id_ocorrencia == undefined || midia.id_ocorrencia         <=0  ||
                midia.id_usuario    == "" || midia.id_usuario    == null || midia.id_usuario    == undefined || midia.id_usuario            <=0 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultMidia = await midiaDAO.selectByIdMidia(parseInt(id))

                if (resultMidia != false || typeof (resultMidia) == 'object') {
                    if (resultMidia.length > 0) {
                        midia.id_midia = parseInt(id)

                        let result = await midiaDAO.updateMidia(midia)
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


const excluirMidia = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultMidia = await midiaDAO.selectByIdMidia(parseInt(id))

            if (resultMidia != false || typeof (resultMidia) == 'object') {
                if (resultMidia.length > 0) {
                    let result = await midiaDAO.deleteMidia(parseInt(id))

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

const listarMidia = async function () {
    try {
        let dadosMidia = {}

        let result = await midiaDAO.selectAllMidias()
        
        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                dadosMidia.status = true
                dadosMidia.status_code = 200
                dadosMidia.itens = result.length
                dadosMidia.midias = result

                return dadosMidia
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

const buscarMidia = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosMidia = {}
            let result = await midiaDAO.selectByIdMidia(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosMidia.status = true
                    dadosMidia.status_code = 200
                    dadosMidia.itens = result.length
                    dadosMidia.midia = result

                    return dadosMidia
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

const buscarMidiaPorOcorrencia = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosMidia = {}
            let result = await midiaDAO.selectMusicaByIdOcorrencia(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosMidia.status = true
                    dadosMidia.status_code = 200
                    dadosMidia.itens = result.length
                    dadosMidia.midia = result

                    return dadosMidia
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
    inserirMidia,
    atualizarMidia,
    excluirMidia,
    listarMidia,
    buscarMidia,
    buscarMidiaPorOcorrencia
}