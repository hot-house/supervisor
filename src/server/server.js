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
app.post('/data', (req, res) => {
  winston.info('got extract', { temperature: req.body.temperature, luminosity: req.body.luminosity })

  Extract.create({
    temperature: parseFloat(req.body.temperature),
    luminosity: parseInt(req.body.luminosity)
  }).catch((e) => {
    res.send('ko')
    winston.error('error while saving extract', { error: e })
  }).then((extract) => {
    winston.info('extract saved')
    res.send('ok')
    io.to('extract').emit('/extract/add', {
      createdAt: extract.createdAt,
      temperature: extract.temperature,
      luminosity: extract.luminosity
    })
  })
})

io.on('connection', (socket) => {
  winston.info('connection established')
  socket.on('/extract/list', () => {
    Extract.findAll({
      attributes: [ 'createdAt', 'id', 'temperature', 'luminosity' ],
      raw: true
    }).then((extracts) => {
      socket.emit('/extract/list/response', extracts)
      socket.join('extract')
    })
  })
})

const listener = server.listen(process.env.PORT, () => {
  winston.info('server listening on', { port: listener.address().port })
})
