import express from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'
import { Server } from 'socket.io'

const app = express()

app.use(cors())

// app.use(express.static(path.join(__dirname, '..', 'public')))

const serverHttp = http.createServer(app)

const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
})

export { serverHttp, io }
