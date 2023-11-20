import { io } from './http'
import { Attributes, Card, CommonCards, HeroCards, TrunfoCards } from './cards'
const N_HERO_CARDS_QTY = 5
const N_COMMOM_CARDS_QTY = 11
interface Room {
  text: string
  id: string
  value: string
  users: { userName: string; socketId: string }[]
}

type ResultCard = 'player1' | 'player2' | 'draw'

const rooms: Room[] = [
  {
    text: 'Cérnia',
    id: 'cernia',
    value: 'cernia',
    users: [],
  },
  {
    text: 'Kainga',
    id: 'kainga',
    value: 'kainga',
    users: [],
  },
  {
    text: 'Fartoy',
    id: 'fartoy',
    value: 'fartoy',
    users: [],
  },
]

function createDeck() {
  // Função para criar um deck de cartas com base nas regras especificadas
  const deck: Card[] = []
  // Adicione 1 carta Trunfo
  const trunfoCard = TrunfoCards[Math.floor(Math.random() * TrunfoCards.length)]
  deck.push(trunfoCard)
  // Adicione 5 cartas Hero
  const heroCards = shuffle(HeroCards).slice(0, N_HERO_CARDS_QTY)
  deck.push(...heroCards)
  // Adicione 11 cartas Common
  const commonCards = shuffle(CommonCards).slice(0, N_COMMOM_CARDS_QTY)
  deck.push(...commonCards)
  return shuffle(deck) // Embaralhe o deck
}

function shuffle(array: Array<Card>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function dealCards(
  deck: Card[],
  users: { userName: string; socketId: string }[],
) {
  const cardsPerPlayer = Math.floor(deck.length / users.length)

  const players = users.map((user) => {
    return {
      username: user.userName,
      socketId: user.socketId,
      cards: [] as Card[],
    }
  })

  let cardIndex = 0

  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < cardsPerPlayer; j++) {
      players[i].cards.push(deck[cardIndex])
      cardIndex++
    }
  }

  // Se houver cartas restantes, distribua igualmente entre os jogadores
  while (cardIndex < deck.length) {
    players[cardIndex % users.length].cards.push(deck[cardIndex])
    cardIndex++
  }

  return players
}

function compareCards(
  player1Card: Card,
  player2Card: Card,
  attribute: Attributes,
): ResultCard {
  if (player1Card.type === 'trunfo') {
    if (player2Card.type === 'hero') {
      return 'player2'
    }
    return 'player1'
  }
  if (player2Card.type === 'trunfo') {
    if (player1Card.type === 'hero') {
      return 'player1'
    }
    return 'player2'
  } else {
    if (
      player1Card.attributes[attribute] === player2Card.attributes[attribute]
    ) {
      return 'draw'
    } else {
      if (
        player1Card.attributes[attribute] > player2Card.attributes[attribute]
      ) {
        return 'player1'
      } else {
        return 'player2'
      }
    }
  }
}

let players: { username: string; socketId: string; cards: Card[] }[] = []
let targetRoom: Room
// SOCKETS => COMUNICAÇÃO COM OS CLIENTS
io.on('connection', (socket) => {
  // Emitir a lista de salas para a Home quando um cliente se conecta
  socket.emit('rooms', rooms)

  socket.on('userJoin', (data) => {
    const { room, username } = data
    targetRoom = rooms.find((r) => r.id === room) as Room

    if (targetRoom) {
      targetRoom.users.push({ userName: username, socketId: socket.id })
      io.emit('rooms', rooms)

      const opponent = targetRoom.users.find(
        (user) => user.userName !== username,
      )
      socket.emit('opponentInfo', opponent)
    }
  })

  // Emitir informações da sala para o cliente que acabou de entrar na Room
  socket.on('joinRoom', (room: string) => {
    socket.join(room)
    socket.emit('rooms', rooms)

    // Emitir evento para atualizar oponentes na Room
    io.to(room).emit('updateOpponents', rooms.find((r) => r.id === room)?.users)
  })

  socket.on('startGame', (room) => {
    targetRoom = rooms.find((r) => r.id === room) as Room
    if (targetRoom && targetRoom.users.length === 2) {
      const usernames = targetRoom.users
      const deck = createDeck()
      players = dealCards(deck, usernames)

      // Defina o jogador inicial (por exemplo, o primeiro jogador)
      const activePlayer = usernames[0]

      const player1 = players.find(
        (player) => player.username === usernames[0].userName,
      ) as { username: string; socketId: string; cards: Card[] }
      const player2 = players.find(
        (player) => player.username === usernames[1].userName,
      ) as { username: string; socketId: string; cards: Card[] }

      // Emita as cartas dos jogadores para que possam ser exibidas
      io.to(player1.socketId).emit('currentCard', player1.cards[0])
      io.to(player2.socketId).emit('currentCard', player2.cards[0])

      // Emita o jogador ativo (turno inicial)
      io.to(room).emit('turnBy', activePlayer)
    } else {
      socket.emit('startGameResult', 'error')
    }
  })

  socket.on('endTurn', (data) => {
    const { room, player, attribute } = data
    let nextActivePlayer
    const activePlayer = targetRoom?.users.find(
      (user) => user.userName === player,
    )

    if (activePlayer) {
      const player1 = players.find(
        (p) => p.username === targetRoom.users[0].userName,
      ) as { username: string; socketId: string; cards: Card[] }
      const player2 = players.find(
        (p) => p.username === targetRoom.users[1].userName,
      ) as { username: string; socketId: string; cards: Card[] }

      // Comparar as cartas e determinar o vencedor
      const winner = compareCards(player1.cards[0], player2.cards[0], attribute)
      console.log('winner', winner)
      if (winner === 'player1') {
        console.log(
          'Antes do resultado: ',
          player1.cards.map((c) => c.name).join('-'),
        )
        player1.cards.push(player1.cards[0])
        player1.cards.push(player2.cards[0])
        player1.cards.shift()
        nextActivePlayer = targetRoom.users.find(
          (u) => u.socketId === player1.socketId,
        )
        console.log(
          'Depois do resultado: ',
          player1.cards.map((c) => c.name).join('-'),
        )
        // Player 1 vence e adiciona as cartas ao seu deck
      } else if (winner === 'player2') {
        console.log(
          'Antes do resultado: ',
          player2.cards.map((c) => c.name).join('-'),
        )
        player2.cards.push(player1.cards[0])
        player2.cards.push(player2.cards[0])
        player2.cards.shift()
        nextActivePlayer = targetRoom.users.find(
          (u) => u.socketId === player2.socketId,
        )
        console.log(
          'Depois do resultado: ',
          player2.cards.map((c) => c.name).join('-'),
        )
        // Player 2 vence e adiciona as cartas ao seu deck
      } else {
        console.log(
          'Antes do resultado: ',
          player1.cards.map((c) => c.name).join('-'),
          '2:',
          player2.cards.map((c) => c.name).join('-'),
        )
        player1.cards.push(player2.cards[0])
        player2.cards.push(player1.cards[0])
        player1.cards.shift()
        player2.cards.shift()
        // troca de usuário do turno
        nextActivePlayer =
          activePlayer === targetRoom.users[0]
            ? targetRoom.users[1]
            : targetRoom.users[0]
        console.log(
          'Depois do resultado: ',
          player1.cards.map((c) => c.name).join('-'),
          '2:',
          player2.cards.map((c) => c.name).join('-'),
        )
        // Empate, trocar as cartas entre os jogadores
      }

      // Emitir as cartas atualizadas dos jogadores
      io.to(player1.socketId).emit('currentCard', player1.cards[0])
      io.to(player2.socketId).emit('currentCard', player2.cards[0])

      // Definir o próximo jogador ativo
      nextActivePlayer =
        activePlayer === targetRoom.users[0]
          ? targetRoom.users[1]
          : targetRoom.users[0]
      io.to(room).emit('turnBy', nextActivePlayer)
    }
  })
})
