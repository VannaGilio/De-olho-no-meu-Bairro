const curtidaDAO = require('../model/DAO/votos.js')

const inserirComentario = async function (ocorrencia, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (ocorrencia.curtidas == "" || ocorrencia.curtidas == null || ocorrencia.curtidas == undefined || ocorrencia.curtidas.length > 600 ||
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