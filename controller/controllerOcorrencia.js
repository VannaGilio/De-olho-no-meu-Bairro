const message = require('../modulo/config.js')
const ocorrenciaDAO = require('../model/DAO//ocorrencias.js')

const controllerUsuario    = require('../controller/controllerUsuario.js')
const controllerStatus     = require('../controller/controllerStatus.js')
const controllerCategoria  = require('../controller/controllerCategoria.js')
const controllerEndereco   = require('../controller/controllerEndereco.js')
const controllerMidia      = require('../controller/controllerMidia.js')
const controllerComentario = require('../controller/controllerComentarios.js')

const inserirOcorrencia = async function (ocorrencia, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (ocorrencia.titulo == "" || ocorrencia.titulo == null || ocorrencia.titulo == undefined || ocorrencia.titulo.length > 100 ||
                ocorrencia.descricao == "" || ocorrencia.descricao == null || ocorrencia.descricao == undefined || ocorrencia.descricao.length > 500 ||
                ocorrencia.data_criacao == "" || ocorrencia.data_criacao == null || ocorrencia.data_criacao == undefined || 
                ocorrencia.id_usuario == "" || ocorrencia.id_usuario == null || ocorrencia.id_usuario == undefined || ocorrencia.id_usuario <=0 ||
                ocorrencia.id_endereco == "" || ocorrencia.id_endereco == null || ocorrencia.id_endereco == undefined || ocorrencia.id_endereco <=0 ||
                ocorrencia.id_categoria == "" || ocorrencia.id_categoria == null || ocorrencia.id_categoria == undefined || ocorrencia.id_categoria <=0 ||
                ocorrencia.id_status == "" || ocorrencia.id_status == null || ocorrencia.id_status == undefined || ocorrencia.id_status <=0 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultOcorrencia = await ocorrenciaDAO.insertOcorrencia(ocorrencia)

                if (resultOcorrencia) {

                    let selectLastId = await ocorrenciaDAO.selectLastOcorrencia()

                    let lastOcorrencia = await ocorrenciaDAO.selectByIdOcorrencia(selectLastId[0].id_ocorrencia)

                    if(lastOcorrencia.length > 0){
                        let dadosOcorrencia = {
                            status: true,
                            status_code: 201,
                            message: "Item criado com sucesso!!!",
                            result: lastOcorrencia
                        }

                        return dadosOcorrencia
                    }else {
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

const atualizarOcorrencia = async function (id, contentType, ocorrencia) {
    try {
        if (String(contentType) == 'application/json') {
            if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id) ||
                ocorrencia.titulo == "" || ocorrencia.titulo == null || ocorrencia.titulo == undefined || ocorrencia.titulo.length > 100 ||
                ocorrencia.descriacao == "" || ocorrencia.descriacao == null || ocorrencia.descriacao == undefined || ocorrencia.descriacao.length > 500 ||
                ocorrencia.data_criacao == "" || ocorrencia.data_criacao == null || ocorrencia.data_criacao == undefined || 
                ocorrencia.id_usuario == "" || ocorrencia.id_usuario == null || ocorrencia.id_usuario == undefined || ocorrencia.id_usuario.length <=0 ||
                ocorrencia.id_endereco == "" || ocorrencia.id_endereco == null || ocorrencia.id_endereco == undefined || ocorrencia.id_endereco.length <=0 ||
                ocorrencia.id_categoria == "" || ocorrencia.id_categoria == null || ocorrencia.id_categoria == undefined || ocorrencia.id_categoria.length <=0 ||
                ocorrencia.id_status == "" || ocorrencia.id_status == null || ocorrencia.id_status == undefined || ocorrencia.id_status.length <=0 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultOcorrencia = await ocorrenciaDAO.selectByIdOcorrencia(parseInt(id))

                if (resultOcorrencia != false || typeof (resultOcorrencia) == 'object') {
                    if (resultOcorrencia.length > 0) {

                        ocorrencia.id = parseInt(id)

                        let result = await ocorrenciaDAO.updateOcorrencia(ocorrencia)
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


const excluirOcorrencia = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultOcorrencia = await ocorrenciaDAO.selectByIdOcorrencia(parseInt(id))

            if (resultOcorrencia != false || typeof (resultOcorrencia) == 'object') {
                if (resultOcorrencia.length > 0) {
                    let result = await ocorrenciaDAO.deleteOcorrencia(parseInt(id))

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

const listarOcorrencia = async function () {
    try {
        let arrayOcorrencia = []
        let dadosOcorrencia = {}

        let result = await ocorrenciaDAO.selectAllOcorrencia()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                dadosOcorrencia.status = true
                dadosOcorrencia.status_code = 200
                dadosOcorrencia.itens = result.length

                for (const itemOcorrencia of result) {
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemOcorrencia.id_usuario)
                    itemOcorrencia.usuario = dadosUsuario.users
                    delete itemOcorrencia.id_usuario

                    let dadosStatus = await controllerStatus.buscarStatus(itemOcorrencia.id_status)
                    itemOcorrencia.stat = dadosStatus.stats
                    delete itemOcorrencia.id_status

                    let dadosCategoria = await controllerCategoria.buscarCategoria(itemOcorrencia.id_categoria)
                    itemOcorrencia.categoria = dadosCategoria.categoria
                    delete itemOcorrencia.id_categoria

                    let dadosEndereco = await controllerEndereco.buscarEndereco(itemOcorrencia.id_endereco)
                    itemOcorrencia.endereco = dadosEndereco.enderecos
                    delete itemOcorrencia.id_endereco

                    let dadosMidia = await controllerMidia.buscarMidiaPorOcorrencia(itemOcorrencia.id_ocorrencia)
                    itemOcorrencia.midia = dadosMidia.midia

                    let dadosComentario = await controllerComentario.buscarComentariosByIdOcorrencia(itemOcorrencia.id_ocorrencia)
                    itemOcorrencia.comentarios = dadosComentario.comments

                    arrayOcorrencia.push(itemOcorrencia)
                }

                dadosOcorrencia.ocorrencias = arrayOcorrencia
                return dadosOcorrencia
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

const buscarOcorrencia = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let arrayOcorrencia = []
            let dadosOcorrencia = {}
            let result = await ocorrenciaDAO.selectByIdOcorrencia(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosOcorrencia.status = true
                    dadosOcorrencia.status_code = 200
                    dadosOcorrencia.itens = result.length

                    for (const itemOcorrencia of result) {
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemOcorrencia.id_usuario)
                        itemOcorrencia.usuario = dadosUsuario.users
                        delete itemOcorrencia.id_usuario

                        let dadosStatus = await controllerStatus.buscarStatus(itemOcorrencia.id_status)
                        itemOcorrencia.stat = dadosStatus.stats
                        delete itemOcorrencia.id_status

                        let dadosCategoria = await controllerCategoria.buscarCategoria(itemOcorrencia.id_categoria)
                        itemOcorrencia.categoria = dadosCategoria.categoria
                        delete itemOcorrencia.id_categoria

                        let dadosEndereco = await controllerEndereco.buscarEndereco(itemOcorrencia.id_endereco)
                        itemOcorrencia.endereco = dadosEndereco.enderecos
                        delete itemOcorrencia.id_endereco

                        let dadosMidia = await controllerMidia.buscarMidiaPorOcorrencia(itemOcorrencia.id_ocorrencia)
                        itemOcorrencia.midia = dadosMidia.midia
    
                        let dadosComentario = await controllerComentario.buscarComentariosByIdOcorrencia(itemOcorrencia.id_ocorrencia)
                        itemOcorrencia.comentarios = dadosComentario.comments

                        arrayOcorrencia.push(itemOcorrencia)
                    }

                    dadosOcorrencia.ocorrencias = arrayOcorrencia
                    return dadosOcorrencia
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
    inserirOcorrencia,
    atualizarOcorrencia,
    excluirOcorrencia,
    listarOcorrencia,
    buscarOcorrencia
}