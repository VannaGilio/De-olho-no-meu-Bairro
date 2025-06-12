///express           npm install express --save
///cors              npm install cors --save
//body-parser        npm install body-parser --save
//prisma             npm install prisma --save 
//prisma/client      npm install @prisma/client --save
//npx prisma migrate dev -> sincronismo
//npx prisma initnpx prisma init -> start prisma


const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const bodyParserJSON = bodyParser.json()
const app = express()

app.use(cors({
    origin: 'http://127.0.0.1:5501',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.use(bodyParser.json())

//Import das controllers
const controllerUsuario = require('./controller/controllerUsuario.js')
const controllerEndereco = require('./controller/controllerEndereco.js')
const controllerCategoria = require('./controller/controllerCategoria.js')
const controllerStatus = require('./controller/controllerStatus.js')
const controllerOcorrencias = require('./controller/controllerOcorrencia.js')
const controllerMidias = require('./controller/controllerMidia.js')
const controllerComentarios = require('./controller/controllerComentarios.js')

//---------------------------------------------USUARIO-------------------------------------------------------

app.post('/v1/controle-usuario/usuario', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/usuario', cors(), async function (request, response) {

    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/usuario/:id', cors(), async function (request, response) {

    let idUsuario = request.params.id
    let result = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-usuario/usuario/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id
    let result = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-usuario/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let idUsuario = request.params.id

    let dadosBody = request.body

    let result = await controllerUsuario.atualizarUsuario(idUsuario, contentType, dadosBody)

    response.status(result.status_code)
    response.json(result)
})
app.post('/v1/controle-usuario/login', cors(), async function (request, response) {
    let usuario = request.body

    let result = await controllerUsuario.autenticarUsuario(usuario)

    response.status(result.status_code)
    response.json(result)
})
app.post('/v1/controle-usuario/usuario/email', cors(), async function (request, response) {
    let usuario = request.body

    let result = await controllerUsuario.busucarUsuarioPorEmail(usuario)

    response.status(result.status_code)
    response.json(result)
})

//-------------------------------------------ENDERECO-------------------------------------------------------

app.post('/v1/controle-usuario/endereco', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerEndereco.inserirEndereco(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/endereco', cors(), async function (request, response) {

    let result = await controllerEndereco.listarEndereco()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/endereco/:id', cors(), async function (request, response) {

    let idEndereco = request.params.id
    let result = await controllerEndereco.buscarEndereco(idEndereco)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-usuario/endereco/:id', cors(), async function (request, response) {
    let idEndereco = request.params.id
    let result = await controllerEndereco.excluirEndereco(idEndereco)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-usuario/endereco/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let idEndereco = request.params.id

    let dadosBody = request.body

    let result = await controllerEndereco.atualizarEndereco(idEndereco, contentType, dadosBody)

    response.status(result.status_code)
    response.json(result)
})

//---------------------------------------------CATEGORIA-------------------------------------------------------

app.post('/v1/controle-usuario/categoria', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerCategoria.inserirCategoria(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/categoria', cors(), async function (request, response) {

    let result = await controllerCategoria.listarCategoria()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/categoria/:id', cors(), async function (request, response) {

    let idCategoria = request.params.id
    let result = await controllerCategoria.buscarCategoria(idCategoria)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-usuario/categoria/:id', cors(), async function (request, response) {
    let idCategoria = request.params.id
    let result = await controllerCategoria.excluirCategoria(idCategoria)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-usuario/categoria/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let idCategoria = request.params.id

    let dadosBody = request.body

    let result = await controllerCategoria.atualizarCategoria(idCategoria, contentType, dadosBody)

    response.status(result.status_code)
    response.json(result)
})

//---------------------------------------------STATUS-------------------------------------------------------

app.post('/v1/controle-usuario/status', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerStatus.inserirStatus(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/status', cors(), async function (request, response) {

    let result = await controllerStatus.listarStatus()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/status/:id', cors(), async function (request, response) {

    let idStatus = request.params.id
    let result = await controllerStatus.buscarStatus(idStatus)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-usuario/status/:id', cors(), async function (request, response) {
    let idStatus = request.params.id
    let result = await controllerStatus.excluirStatus(idStatus)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-usuario/status/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let idStatus = request.params.id

    let dadosBody = request.body

    let result = await controllerStatus.atualizarStatus(idStatus, contentType, dadosBody)

    response.status(result.status_code)
    response.json(result)
})

//---------------------------------------------OCORRENCIAS-------------------------------------------------------

app.post('/v1/controle-usuario/ocorrencias', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerOcorrencias.inserirOcorrencia(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/ocorrencias', cors(), async function (request, response) {

    let result = await controllerOcorrencias.listarOcorrencia()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/ocorrencias/:id', cors(), async function (request, response) {

    let idOcorrencia = request.params.id
    let result = await controllerOcorrencias.buscarOcorrencia(idOcorrencia)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-usuario/ocorrencias/:id', cors(), async function (request, response) {
    let idOcorrencia = request.params.id
    let result = await controllerOcorrencias.excluirOcorrencia(idOcorrencia)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-usuario/ocorrencias/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let idOcorrencia = request.params.id

    let dadosBody = request.body

    let result = await controllerOcorrencias.atualizarOcorrencia(idOcorrencia, contentType, dadosBody)

    response.status(result.status_code)
    response.json(result)
})

//---------------------------------------------MIDIAS-------------------------------------------------------

app.post('/v1/controle-usuario/midias', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerMidias.inserirMidia(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/midias', cors(), async function (request, response) {

    let result = await controllerMidias.listarMidia()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/midias/:id', cors(), async function (request, response) {

    let idMidia = request.params.id
    let result = await controllerMidias.buscarMidia(idMidia)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/midias-ocorrencias/:id', cors(), async function (request, response) {

    let idMidia = request.params.id
    let result = await controllerMidias.buscarMidiaPorOcorrencia(idMidia)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-usuario/midias/:id', cors(), async function (request, response) {
    let idMidia = request.params.id
    let result = await controllerMidias.excluirMidia(idMidia)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-usuario/midias/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let idMidia = request.params.id

    let dadosBody = request.body

    let result = await controllerMidias.atualizarMidia(idMidia, contentType, dadosBody)

    response.status(result.status_code)
    response.json(result)
})

//---------------------------------------------COMENTARIOS-------------------------------------------------------

app.post('/v1/controle-usuario/comentario-ocorrencias', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerComentarios.inserirComentario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/comentario-ocorrencias', cors(), async function (request, response) {

    let result = await controllerComentarios.listarComentario()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/comentario-ocorrencias/:id', cors(), async function (request, response) {

    let idComentario = request.params.id
    let result = await controllerComentarios.buscarComentario(idComentario)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-usuario/comentario-ocorrencias/:id', cors(), async function (request, response) {
    let idComentario = request.params.id
    let result = await controllerComentarios.excluirComentario(idComentario)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-usuario/comentario-ocorrencias/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let idComentario = request.params.id

    let dadosBody = request.body

    let result = await controllerComentarios.atualizarComentario(idComentario, contentType, dadosBody)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/controle-usuario/comentario-por-ocorrencia/:id', cors(), async function (request, response) {

    let idComentario = request.params.id
    let result = await controllerComentarios.buscarComentariosByIdOcorrencia(idComentario)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function () {
    console.log('API funcionando...')
})

