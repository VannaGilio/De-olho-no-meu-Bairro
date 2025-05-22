const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bodyParserJSON = bodyParser.json()
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors({
        origin: 'http://127.0.0.1:5500'
    }))
    next()
})

const controllerUsuario = require('./controller/controllerUsuario.js')
app.post('/v1/controle-usuario/usuario', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body   

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/usuario', cors(), async function(request, response){

    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-usuario/usuario/:id', cors(), async function (request, response){

    let idUsuario = request.params.id
    let result = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-usuario/usuario/:id', cors(), async function (request, response){
    let idUsuario = request.params.id
    let result = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-usuario/usuario/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']
   
    let idUsuario = request.params.id

    let dadosBody = request.body

    let result = await controllerFilme.atualizarFilme(idUsuario, dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

const controllerEstado = require('./controller/controllerEstado.js')
app.post('/v1/controle-estado/estado', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body   

    let result = await controllerEstado.inserirEstado(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-estado/estado', cors(), async function(request, response){

    let result = await controllerEstado.listarEstado()

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/controle-estado/estado/:id', cors(), async function (request, response){

    let idEstado = request.params.id
    let result = await controllerEstado.buscarEstado(idEstado)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/controle-estado/estado/:id', cors(), async function (request, response){
    let idEstado = request.params.id
    let result = await controllerEstado.excluirEstado(idEstado)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/controle-estado/estado/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']
   
    let idEstado = request.params.id

    let dadosBody = request.body

    let result = await controllerEstado.atualizarEstado(idEstado, dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.listen('3030', '0.0.0.0', function(){
    console.log('API funcionando...')
})

