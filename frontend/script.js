// Состояние приложения
let currentProblem = {};
let score = 0;
let total = 0;
let currentMax = 50;
let currentOperation = '+';

// Обновление настроек
function updateSettings() {
    currentMax = document.getElementById('maxSelect').value;
    currentOperation = document.getElementById('operationSelect').value;
    resetStats();
}

async function generateProblem() {
    const apiUrl = `/api/math/generate?max=${currentMax}&operation=${currentOperation}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    currentProblem = data;
    
    document.getElementById('num1').textContent = data.num1;
    document.getElementById('num2').textContent = data.num2;
    document.getElementById('answerInput').value = '';
}

async function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value;
    const userNum = parseInt(userAnswer);
    
    if (isNaN(userNum)) {
        alert('Введите число!');
        return;
    }

    const response = await fetch('/api/math/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userAnswer: userNum,
            correctAnswer: currentProblem.correctAnswer
        })
    });
    
    const data = await response.json();
    total++;
    
    if (data.isCorrect) {
        score++;
        document.getElementById('message').textContent = 'Правильно!';
        document.getElementById('message').style.color = 'green';
    } else {
        document.getElementById('message').textContent = `Неправильно! Ответ: ${currentProblem.correctAnswer}`;
        document.getElementById('message').style.color = 'red';
    }
    
    updateStats();
    setTimeout(generateProblem, 1500);
}

function updateStats() {
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = total;
    
    if (total > 0) {
        const percentage = Math.round((score / total) * 100);
        document.getElementById('percentage').textContent = `Процент правильных: ${percentage}%`;
    }
}

function resetStats() {
    score = 0;
    total = 0;
    updateStats();
    generateProblem();
}

window.onload = function() {
    generateProblem();
    updateStats();
};