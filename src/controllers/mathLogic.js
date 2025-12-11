const generateProblem = (req, res) => {
    // Генерация чисел в диапазоне
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
	const answer = a + b;
	
    res.json({
        num1: a,
        num2: b,
        problem: `${a} + ${b}`,
        correctAnswer: answer
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