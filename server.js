const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Главная форма
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-user.html'));
});

// Получить список пользователей
app.get('/users', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(users);
  } catch (error) {
    console.error('Ошибка чтения users:', error);
    res.status(500).json({ error: 'Ошибка чтения users' });
  }
});

// Добавить пользователя
app.post('/users', (req, res) => {
  console.log('POST /users body:', req.body); // <-- ЛОГ

  try {
    const users = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    users.push(req.body);
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
    console.log('User saved!');
    res.json({ message: 'User added!', users });
  } catch (error) {
    console.error('Ошибка записи users:', error);
    res.status(500).json({ error: 'Не удалось сохранить пользователя' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running http://localhost:${PORT}`));
