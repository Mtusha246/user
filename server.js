const express = require('express')
const cors = require('cors')
const app = express()
const users = require('./data.json')

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.json({ message: 'User added!', users })
})

// ДЛЯ Railway — ОБЯЗАТЕЛЬНО!
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
