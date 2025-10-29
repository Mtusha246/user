const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const users = require('./data.json')

app.use(cors())
app.use(express.json())

// Отдаём HTML файл
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-user.html'))
})

// Вернуть всех юзеров
app.get('/users', (req, res) => {
  res.json(users)
})

// Добавить нового юзера
app.post('/users', (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.json({ message: 'User added!', users })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
