const message = require('../modulo/config.js')
const usuarioDAO = require('../model/DAO/usuario')

const inserirUsuario = async function (usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (usuario.nome == "" || usuario.nome == null || usuario.nome == undefined || usuario.nome.length > 200 ||
                usuario.email == "" || usuario.email == null || usuario.email == undefined || usuario.email.length > 200 ||
                usuario.senha == "" || usuario.senha == null || usuario.senha == undefined || usuario.senha.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if (resultUsuario) {
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

const atualizarUsuario = async function (id, contentType, usuario) {
    try {
        if (String(contentType) == 'application/json') {
            if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id) ||
                usuario.nome == "" || usuario.nome == null || usuario.nome == undefined || usuario.nome.length > 200 ||
                usuario.email == "" || usuario.email == null || usuario.email == undefined || usuario.email.length > 200 ||
                usuario.senha == "" || usuario.senha == null || usuario.senha == undefined || usuario.senha.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

                if (resultUsuario != false || typeof (resultUsuario) == 'object') {
                    if (resultUsuario.length > 0) {
                        usuario.id_usuario = parseInt(id)

                        let result = await usuarioDAO.updateUsuario(usuario)
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


const excluirUsuario = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

            if (resultUsuario != false || typeof (resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    let result = await usuarioDAO.deleteUsuario(parseInt(id))

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

const listarUsuario = async function () {
    try {
        let dadosUsuario = {}

        let result = await usuarioDAO.selectAllUsuario()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.itens = result.length
                dadosUsuario.users = result

                return dadosUsuario
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

const buscarUsuario = async function (id) {
    try {
        if (id == "" || id == null || id == undefined || id.length <= 0 || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosUsuario = {}
            let result = await usuarioDAO.selectByIdUsuario(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200
                    dadosUsuario.itens = result.length
                    dadosUsuario.users = result

                    return dadosUsuario
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

const autenticarUsuario = async function (usuario) {
    try {
        if (usuario.email == "" || usuario.email == undefined || usuario.email == null || usuario.email.length >= 200 ||
            usuario.senha == "" || usuario.senha == undefined || usuario.senha == null || usuario.senha.length >= 200
        ) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dados = {}
            let result = await usuarioDAO.selectUsuarioByEmailAndSenha(usuario)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dados.status = true
                    dados.status_code = 200
                    dados.itens = result.length
                    dados.users = result
                    
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


const busucarUsuarioPorEmail = async function (usuario) {
    try {
        if (usuario.email == "" || usuario.email == undefined || usuario.email == null || usuario.email.length >= 200 
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dados = {}
            let result = await usuarioDAO.selectUsuarioByEmail(usuario)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {

                    dados.status = true
                    dados.status_code = 200
                    dados.itens = result.length
                    dados.users = result
                    
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario,
    autenticarUsuario,
    busucarUsuarioPorEmail
}