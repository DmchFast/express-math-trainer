const express = require('express');
const path = require('path');

const app = express();
const PORT = 6767;

// Middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Раздача статических файлов
app.use(express.static(path.join(__dirname, '../frontend')));

// Маршруты логируются ВСЕ запросы
app.use(logger);

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});