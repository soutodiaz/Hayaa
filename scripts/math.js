let currentNumber = null;
let score = 0;
let questionCount = 0;
const totalQuestions = 10;

function selectNumber(number) {
    currentNumber = number;
    score = 0;
    questionCount = 0;
    document.querySelector('.menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    generateQuestion();
}

function generateQuestion() {
    if (questionCount >= totalQuestions) {
        displayResult();
        return;
    }

    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option');

    const multiplier = Math.floor(Math.random() * 13);
    const correctAnswer = currentNumber * multiplier;

    questionElement.textContent = `${currentNumber} x ${multiplier}`;
    const correctOptionIndex = Math.floor(Math.random() * 4);
    options.forEach((option, index) => {
        if (index === correctOptionIndex) {
            option.textContent = correctAnswer;
        } else {
            let wrongAnswer;
            do {
                wrongAnswer = Math.floor(Math.random() * 157);
            } while (wrongAnswer === correctAnswer);
            option.textContent = wrongAnswer;
        }
    });

    questionCount++;
}

function checkAnswer(selectedIndex) {
    const options = document.querySelectorAll('.option');
    const selectedAnswer = parseInt(options[selectedIndex].textContent);
    const questionText = document.getElementById('question').textContent;
    const [number, , multiplier] = questionText.split(' ');

    if (selectedAnswer === parseInt(number) * parseInt(multiplier)) {
        score++;
    }

    generateQuestion();
}

function displayResult() {
    const resultElement = document.getElementById('result');
    const quizElement = document.getElementById('quiz');
    const finalScore = (score / totalQuestions) * 100;

    quizElement.style.display = 'none';
    resultElement.style.display = 'block';
    resultElement.innerHTML = `
        <h2>Your Score: ${finalScore}%</h2>
        <button onclick="retry()">Retry</button>
        <button onclick="chooseAnother()">Choose Another Number</button>
    `;
}

function retry() {
    selectNumber(currentNumber);
}

function chooseAnother() {
    document.querySelector('.menu').style.display = 'block';
    document.getElementById('result').style.display = 'none';
}
