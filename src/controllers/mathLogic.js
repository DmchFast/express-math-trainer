const generateProblem = (req, res) => {
	    // QUERY-ПАРАМЕТРЫ
    const max = parseInt(req.query.max) || 50;
	const operation = req.query.operation || '+';
	
    // Генерация чисел в диапазоне
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
	
	let answer;
    switch(operation) {
        case '+': answer = a + b; break;
        case '-': answer = a - b; break;
        default: answer = a + b;
    }

    res.json({
        num1: a,
        num2: b,
        problem: `${a} ${operation} ${b}`,
        correctAnswer: answer,
        max: max,
        operation: operation
    });
};

const checkAnswer = (req, res) => {
    const { userAnswer, correctAnswer } = req.body;
    
    // Для дробных ответов (при делении) используем parseFloat
    const isCorrect = parseFloat(userAnswer) === parseFloat(correctAnswer);
    
    res.json({
        isCorrect,
        correctAnswer: parseFloat(correctAnswer),
        userAnswer: parseFloat(userAnswer)
    });
};

module.exports = {
    generateProblem,
    checkAnswer,
};