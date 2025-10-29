const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Отдаём HTML форму
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-user.html'));
});

// Получить список пользователей
app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  res.json(users);
});

// Добавить пользователя
app.post('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  users.push(req.body);

  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

  res.json({ message: 'User added!', users });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
