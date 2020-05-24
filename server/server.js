const express = require('express')
const tasksController = require('./controllers/tasksController')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(express.static('./server'))
app.use(cors())
app.use(bodyParser.json())

tasksController(app)

app.listen(3001)