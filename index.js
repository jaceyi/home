const express = require('express')
const app = express()
const web = require('./node/web')

app.use('/', web)

app.listen(3000)
