const express = require('express')
const cors = require('cors')
const app = express()
const users = require('./data.json')

app.use(cors())            // ← добавили это
app.use(express.json())


// Чтобы Express понимал JSON в запросах
app.use(express.json())

// Hello world
app.get('/', (req, res) => {
  res.send('Hello from Express with JSON example!')
})

// Вернуть всех юзеров (JSON)
app.get('/users', (req, res) => {
  res.json(users)
})

// Добавить нового юзера
app.post('/users', (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.json({ message: 'User added!', users })
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
