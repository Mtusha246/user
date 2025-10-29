const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Путь к файлу с данными
const dataFilePath = path.join(__dirname, 'data.json');

// Функция для чтения users
function readUsers() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]'); // если файл не существует — создаём
  }
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf8') || '[]');
}

// Отдаём HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-user.html'));
});

// Получить список пользователей
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// Добавить пользователя
app.post('/users', (req, res) => {
  console.log('✅ POST /users body:', req.body); // лог на Railway
  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: 'User must have a name' });
  }

  const users = readUsers();
  users.push(req.body);

  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2)); // записываем
  res.json({ message: '✅ User added!', users });
});

// Порт для Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
