const porta = 3003
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

consign()
    .then('./config/middleware.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/router.js')
    .into(app)
app.db = db    

app.listen(porta,()=>{
    console.log(`backend rodando na porta ${porta}`)
})
