// eslint-disable-next-line no-undef
const socket = io()

const urlSearch = new URLSearchParams(window.location.search)
const username = urlSearch.get('username')
const room = urlSearch.get('select_room')

const usernameDiv = document.getElementById('username')
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room} `

socket.emit('userInfo', {
  username,
  room,
})

document
  .getElementById('message_input')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value
      const data = {
        room,
        message,
        username,
      }

      socket.emit('message', data)

      event.target.value = ''
    }
  })

socket.on('message', (data) => {
  const messageDiv = document.getElementById('messages')
  messageDiv.innerHTML += `
  <div class="new_message">
  <label class="form-label">
    <strong>${data.username}</strong>
    <span>${data.text} - ${data.createdAt.toLocaleString()}</span>
  </label>
</div>
  `
})
