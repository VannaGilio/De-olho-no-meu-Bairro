const message = require('../modulo/config.js')
const votoDAO = require('../model/DAO/votos.js')

const inserirVoto = async function (voto, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (voto.data_voto == "" || voto.data_voto == null || voto.data_voto == undefined || 
                voto.id_usuario == "" || voto.id_usuario == null || voto.id_usuario == undefined || voto.id_usuario.length <= 0 || isNaN(voto.id_usuario) ||
                voto.id_ocorrencia == "" || voto.id_ocorrencia == null || voto.id_ocorrencia == undefined || voto.id_ocorrencia.length <= 0 || isNaN(voto.id_ocorrencia)
            ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultVoto = await votoDAO.insertVoto(voto)

                if (resultVoto) {
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

const excluirVoto = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultVoto = await votoDAO.selectVotoById(parseInt(id))

            if (resultVoto != false || typeof (resultVoto) == 'object') {
                if (resultVoto.length > 0) {
                    let result = await votoDAO.deleteVoto(parseInt(id))

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

const buscarVoto = async function (voto) {
    try {
        if (voto.id_usuario == "" || voto.id_usuario == null || voto.id_usuario == undefined || voto.id_usuario.length <= 0 || isNaN(voto.id_usuario) ||
            voto.id_ocorrencia == "" || voto.id_ocorrencia == null || voto.id_ocorrencia == undefined || voto.id_ocorrencia.length <= 0 || isNaN(voto.id_ocorrencia)
        ) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dados = {}
            let result = await votoDAO.selectVotoByUsuarioAndOcorrencia(voto)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dados.status = true
                    dados.status_code = 200
                    dados.itens = result.length
                    dados.votes = result
                    
                    return dados
                } else {
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

const buscarVotoPorOcorrencia = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)
        ) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dados = {}
            let result = await votoDAO.selectVotoByOcorrencia(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dados.status = true
                    dados.status_code = 200
                    dados.itens = result.length
                    dados.votes = result
                    
                    return dados
                } else {
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
    inserirVoto,
    excluirVoto,
    buscarVoto,
    buscarVotoPorOcorrencia
}