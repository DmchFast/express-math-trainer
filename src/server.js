const express = require('express');

const app = express();

const PORT = 6767;

app.get("/", (req, res) => {
 res.send("Hello, MIREA! 67!");
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});