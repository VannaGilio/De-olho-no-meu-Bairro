///express           npm install express --save
///cors              npm install cors --save
//body-parser        npm install body-parser--save
//prisma             npm install prisma --save 
//prisma/client      npm install @prisma/client --save
//npx prisma migrate dev -> sincronismo
//npx prisma init -> start prisma


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


app.listen(8080, function () {
    console.log('API funcionando...')
})

