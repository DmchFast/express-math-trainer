// Состояние приложения
let currentProblem = {};
let score = 0;
let total = 0;
let currentMax = 50;
let currentOperation = '+';

// DOM элементы
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const percentageEl = document.getElementById('percentage');
const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const operatorEl = document.getElementById('operator');
const answerInput = document.getElementById('answerInput');
const messageEl = document.getElementById('message');
const apiUrlEl = document.getElementById('apiUrl');
const maxSelect = document.getElementById('maxSelect');
const operationSelect = document.getElementById('operationSelect');

// Обновление настроек
function updateSettings() {
    currentMax = parseInt(maxSelect.value);
    currentOperation = operationSelect.value;
    resetStats();
}

// Генерация новой задачи через API с query-параметрами
async function generateProblem() {
    try {
        // ФОРМИРУЕМ URL С QUERY-ПАРАМЕТРАМИ (требование контрольной)
        const apiUrl = `/api/math/generate?max=${currentMax}&operation=${currentOperation}`;
        apiUrlEl.textContent = apiUrl;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Ошибка сервера');
        
        const data = await response.json();
        currentProblem = data;
        
        // Обновляем отображение
        num1El.textContent = data.num1;
        num2El.textContent = data.num2;
        operatorEl.textContent = data.operatorSymbol || ' + ';
        
        answerInput.value = '';
        answerInput.focus();
        clearMessage();
        
    } catch (error) {
        showMessage('Ошибка загрузки задачи', 'warning');
        console.error('API Error:', error);
    }
}

// Проверка ответа через API
async function checkAnswer() {
    const userAnswer = answerInput.value.trim();
    
    if (!userAnswer) {
        showMessage('Введите ответ!', 'warning');
        answerInput.focus();
        return;
    }
    
    const userNum = parseFloat(userAnswer);
    if (isNaN(userNum)) {
        showMessage('Введите число!', 'warning');
        answerInput.focus();
        return;
    }

    try {
        const response = await fetch('/api/math/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userAnswer: userNum,
                correctAnswer: currentProblem.correctAnswer
            })
        });
        
        if (!response.ok) throw new Error('Ошибка проверки');
        
        const data = await response.json();
        total++;
        
        if (data.isCorrect) {
            score++;
            showMessage(`Правильно! Ответ: ${currentProblem.correctAnswer}`, 'correct');
        } else {
            showMessage(`Неправильно! Ответ: ${currentProblem.correctAnswer}`, 'incorrect');
        }
        
        updateStats();
        
        // Новая задача через 1.5 секунды
        setTimeout(generateProblem, 1500);
        
    } catch (error) {
        showMessage('Ошибка проверки ответа', 'warning');
        console.error('Check Error:', error);
    }
}

// Обновление статистики
function updateStats() {
    scoreEl.textContent = score;
    totalEl.textContent = total;
    
    if (total > 0) {
        const percentage = Math.round((score / total) * 100);
        percentageEl.textContent = `Процент правильных: ${percentage}%`;
    } else {
        percentageEl.textContent = 'Процент правильных: 0%';
    }
}

// Сброс статистики
function resetStats() {
    score = 0;
    total = 0;
    updateStats();
    generateProblem();
}

// Показать сообщение
function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = 'message ' + type;
}

// Очистить сообщение
function clearMessage() {
    messageEl.textContent = '';
    messageEl.className = 'message';
}

// Инициализация при загрузке
window.onload = function() {
    // Устанавливаем текущие настройки из select
    currentMax = parseInt(maxSelect.value);
    currentOperation = operationSelect.value;
    
    generateProblem();
    updateStats();
};