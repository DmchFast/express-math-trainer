const express = require('express');
const path = require('path');
const mathRoutes = require('./routes/mathRoutes');

const app = express();
const PORT = 6767;

// Middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Раздача статических файлов
app.use(express.static(path.join(__dirname, '../frontend')));

// Маршруты
app.use('/api/math', mathRoutes);

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});