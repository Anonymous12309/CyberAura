let questions = [
    {
        question: "You receive an email from an unknown sender with a link that looks suspicious. What should you do?",
        options: ["Click on the link to see where it leads.", "Ignore the email and delete it immediately.", "Reply to the sender asking if the email is legitimate.", "Forward the email to your colleagues."],
        correctAnswer: "Ignore the email and delete it immediately."
    },
    {
        question: "You find a USB drive lying in the office parking lot. What is the safest thing to do?",
        options: ["Plug the USB into your computer to check its contents.", "Throw it away to avoid potential security issues.", "Inform the IT department or security team and hand it over to them.", "Use the USB on a guest computer."],
        correctAnswer: "Inform the IT department or security team and hand it over to them."
    },
    {
        question: "While browsing a website, you are prompted to download a file with a .exe extension. What should you do?",
        options: ["Download the file and open it to see what it is.", "Ignore the prompt and continue browsing.", "Download the file but scan it with antivirus software first.", "Click on the file and trust that it is safe."],
        correctAnswer: "Download the file but scan it with antivirus software first."
    },
    {
        question: "You receive a phone call from someone claiming to be from your bank, asking for your account number and password. How do you handle this situation?",
        options: ["Give them the requested information to resolve the issue.", "Hang up the call immediately and contact your bank directly using their official contact details.", "Provide only the account number but not the password.", "Ask the caller to call back later."],
        correctAnswer: "Hang up the call immediately and contact your bank directly using their official contact details."
    },
    {
        question: "You notice a colleague leaving their computer unlocked and unattended. What should you do?",
        options: ["Do nothing because it's not your responsibility.", "Close the computer screen to prevent anyone from accessing it.", "Access the computer to see if you can help with their work.", "Report the incident to the IT department or manager."],
        correctAnswer: "Report the incident to the IT department or manager."
    },
    {
        question: "You use the same password for multiple accounts, and one of those accounts gets hacked. What should you do next?",
        options: ["Change the password on the hacked account only.", "Change the password for all accounts that use the same password.", "Ignore it since your other accounts are likely safe.", "Notify your friends and family to avoid similar incidents."],
        correctAnswer: "Change the password for all accounts that use the same password."
    }
];

// Shuffle the questions and their options
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
}

function shuffleQuestionOptions(question) {
    let correctAnswer = question.correctAnswer;
    // Shuffle the options
    for (let i = question.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question.options[i], question.options[j]] = [question.options[j], question.options[i]]; // Swap elements
    }
    return {
        question: question.question,
        options: question.options,
        correctAnswer: correctAnswer
    };
}

// Shuffle the questions and their options
shuffleArray(questions);
questions = questions.map(shuffleQuestionOptions);

let currentQuestionIndex = 0;
let score = 0;
let timer;
let isQuizStarted = false;

function startQuiz() {
    isQuizStarted = true;
    document.getElementById('start-btn').style.display = 'none'; // Hide the start button
    document.getElementById('quiz-container').style.display = 'block'; // Show the quiz container
    document.getElementById('score-container').style.display = 'block'; // Show the aura score
    document.getElementById('timer-container').style.display = 'block'; // Show the timer
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    showQuestion();
    startTimer();
}

function showQuestion() {
    let question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('answer1').textContent = question.options[0];
    document.getElementById('answer2').textContent = question.options[1];
    document.getElementById('answer3').textContent = question.options[2];
    document.getElementById('answer4').textContent = question.options[3];

    // Add event listeners to each answer button
    document.getElementById('answer1').onclick = function() { checkAnswer(question.options[0]); };
    document.getElementById('answer2').onclick = function() { checkAnswer(question.options[1]); };
    document.getElementById('answer3').onclick = function() { checkAnswer(question.options[2]); };
    document.getElementById('answer4').onclick = function() { checkAnswer(question.options[3]); };
}

function checkAnswer(selectedAnswer) {
    let correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        score += 100; // Increase the score by 100 for every correct answer
        document.getElementById('score').textContent = score;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        clearInterval(timer);
        setTimeout(function() {
            alert("Quiz Over! Your Aura score is: " + score);
            location.reload(); // Refresh the page to restart the quiz
        }, 1000);
    }
}

function startTimer() {
    let timeLeft = 150;
    document.getElementById('timer').textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up! Your Aura score is: " + score);
            location.reload(); // Refresh the page to restart the quiz
        }
    }, 1000);
}
