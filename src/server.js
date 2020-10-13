const express = require('express')
const serveStatic = require('server-static')
const path = require('path')


const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const PORT = process.env.PORT || '8080'
app.set("port", PORT)
app.listen(PORT)

console.log('Listening on port: ' + PORT);

