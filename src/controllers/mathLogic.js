const generateProblem = (req, res) => {
    // QUERY-ПАРАМЕТРЫ
    const max = parseInt(req.query.max) || 50;
    const operation = req.query.operation || '+';
    
    // Генерация чисел в диапазоне
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    
    let answer;
    let problem;
    let operatorSymbol;
    
    switch(operation) {
        case '+':
            answer = a + b;
            problem = `${a} + ${b}`;
            operatorSymbol = '+';
            break;
        case '-':
            answer = a - b;
            problem = `${a} - ${b}`;
            operatorSymbol = '-';
            break;
        case '*':
            answer = a * b;
            problem = `${a} × ${b}`;
            operatorSymbol = '×';
            break;
        case '/':
            // Для деления генерируем пример (делится нацело)
            const divisor = Math.floor(Math.random() * 10) + 1;
            const dividend = divisor * (Math.floor(Math.random() * 10) + 1);
            answer = dividend / divisor;
            problem = `${dividend} ÷ ${divisor}`;
            operatorSymbol = '÷';
            res.json({
                num1: dividend,
                num2: divisor,
                problem: problem,
                correctAnswer: answer,
                max: max,
                operation: operation,
                operatorSymbol: operatorSymbol
            });
            return;
        default:
            answer = a + b;
            problem = `${a} + ${b}`;
            operatorSymbol = '+';
    }
    
    res.json({
        num1: a,
        num2: b,
        problem: problem,
        correctAnswer: answer,
        max: max,
        operation: operation,
        operatorSymbol: operatorSymbol
    });
};

const checkAnswer = (req, res) => {
    const { userAnswer, correctAnswer } = req.body;
    
    // Для дробных ответов (при делении) используем parseFloat
    const isCorrect = parseFloat(userAnswer) === parseFloat(correctAnswer);
    
    res.json({
        isCorrect,
        correctAnswer: parseFloat(correctAnswer),
        userAnswer: parseFloat(userAnswer),
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    generateProblem,
    checkAnswer,
};