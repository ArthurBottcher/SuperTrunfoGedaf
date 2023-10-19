import { io } from './http'

interface RoomUser {
  socket_id: string
  username: string
  room: string
}

interface Message {
  room: string
  text: string
  createdAt: Date
  username: string
}

const users: Array<RoomUser> = []

const messages: Array<Message> = []

io.on('connection', (socket) => {
  socket.on('userInfo', (infos: RoomUser) => {
    // junta o usuário á sala
    socket.join(infos.room)

    const userInRoom = users.find(
      (user) => user.username === infos.username && user.room === infos.room,
    )

    if (userInRoom) {
      userInRoom.socket_id = socket.id
    } else {
      users.push({
        room: infos.room,
        username: infos.username,
        socket_id: socket.id,
      })
    }
  })

  socket.on('message', (data) => {
    // salvar as mensagens
    const message: Message = {
      createdAt: new Date(),
      room: data.room,
      text: data.message,
      username: data.username,
    }

    messages.push(message)

    // enviar para usuários
    io.to(data.room).emit('message', message)
  })
})
