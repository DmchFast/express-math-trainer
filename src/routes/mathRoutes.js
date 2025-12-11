const express = require('express');
const router = express.Router();
const mathController = require('../controllers/mathLogic');
const logger = require('../middleware/logger');

// Применяем middleware для логирования
router.use(logger);

// GET /api/math/generate (генерация задачи)
router.get('/generate', mathController.generateProblem);

// POST /api/math/check (проверка ответа)
router.post('/check', mathController.checkAnswer);

module.exports = router;