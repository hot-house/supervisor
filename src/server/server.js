import express from 'express'
import socketIo from 'socket.io'
import path from 'path'
import dotenv from 'dotenv'
import winston from 'winston'
import http from 'http'
import bodyParser from 'body-parser'

// import sequelize from './config/sequelize'
import Extract from './models/extract'

if ('production' !== process.env.NODE_ENV) {
    try {
        dotenv.config()
    } catch (err) {
        winston.error('impossible to read file .env', err)
    }
}

const app = express()

const server = http.Server(app)
const io = socketIo(server)

app.use(express.static(path.join(__dirname, '../public')))

// app.get('/', (req, res) => {
//   res.send('Hello world')
//   winston.info('Hello world sent')
// })

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.post('/temperature/:value', (req, res) => {
  winston.info('temperature got', { temperature: req.params.value, typeof: typeof req.params.value })

  Extract.create({
    temperature: parseFloat(req.params.value)
  }).catch((e) => {
    res.send('ko')
    winston.error('error while saving temperature', { error: e })
  }).then((extract) => {
    winston.info('temperature saved')
    res.send('ok')
    io.to('temperature').emit('/temperature/add', {
      createdAt: extract.createdAt,
      temperature: extract.temperature
    })
  })
})

io.on('connection', (socket) => {
  winston.info('connection established')
  socket.on('/temperature/list', () => {
    Extract.findAll({
      attributes: [ 'createdAt', 'id', 'temperature' ],
      raw: true
    }).then((extracts) => {
      socket.emit('/temperature/list/response', extracts)
      socket.join('temperature')
    })
  })
})

const listener = server.listen(process.env.PORT, () => {
  winston.info('server listening on', { port: listener.address().port })
})
