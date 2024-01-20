const { addListener } = require('nodemon')

const app = require('./config/server')()
app.listen(3000, function () {
    console.log('Servidor funcionando')
})
