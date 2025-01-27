
const quizQuestions = [
  {
    question: "What is the capital of France?",
    correctAnswer: "Paris",
    options: ["London", "Berlin", "Madrid", "Paris"]
  },
  {
    question: "What is the capital of Italy?",
    correctAnswer: "Rome",
    options: ["Florence", "Venice", "Rome", "Naples"]
  },
  {
    question: "Who lives in a pineapple under the sea?",
    correctAnswer: "Spongebob",
    options: ["Titanic", "Spongebob", "Harry Potter", "Patrick"]
  },
  {
    question: "How long is a marathon?",
    correctAnswer: "42195",
    options: ["22195 km", "32195 km", "42195 km", "52195 km"]
  },
  {
    question: "Where did the Olympics originally start?",
    correctAnswer: "Greece",
    options: ["Rome", "China", "Norway", "Greece"]
  },
  {
    question: "Which land animal is the fastest?",
    correctAnswer: "Cheetah",
    options: ["Cheetah", "Ostrich", "Lynx", "Giraffe"]
  },
  {
    question: "Which animal is the biggest?",
    correctAnswer: "Blue whale",
    options: ["Cockroach", "Elephant", "Panda", "Blue whale"]
  },
  {
    question: "What is the hardest natural substance on Earth?",
    correctAnswer: "Diamond",
    options: ["Gold", "Iron", "Diamond", "Platinum"]
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    correctAnswer: "Oxygen",
    options: ["Oxygen", "Osmium", "Ozone", "Oxygenium"]
  },
  {
    question: "Which continent is the Sahara Desert located on?",
    correctAnswer: "Africa",
    options: ["Africa", "Asia", "Australia", "Europe"]
  },
  {
    question: "Which planet is closest to the Sun?",
    correctAnswer: "Mercury",
    options: ["Venus", "Earth", "Mercury", "Mars"]
  },
  {
    question: "Which country gifted the Statue of Liberty to the USA?",
    correctAnswer: "Paris",
    options: ["Spanish", "Spanish", "Paris", "Mexico"]
  },
  {
    question: "Which is the smallest planet in our solar system?",
    correctAnswer: "Mercury",
    options: ["Venus", "Earth", "Mars", "Mercury"]
  },
  {
    question: "What is the square root of 64?",
    correctAnswer: "8",
    options: ["6", "8", "10", "12"]
  },
  {
    question: "Which year did World War II end?",
    correctAnswer: "1945",
    options: ["1918", "1939", "1945", "1950"]
  },
  {
    question: "What is the national flower of Japan?",
    correctAnswer: "Cherry blossom",
    options: ["Rose", "Cherry blossom", "Lily", "Orchid"]
  },
  {
    question: "Which country invented tea?",
    correctAnswer: "China",
    options: ["India", "China", "England", "Japan"]
  },
  {
    question: "What is the capital of Australia?",
    correctAnswer: "Canberra",
    options: ["Sydney", "Melbourne", "Brisbane", "Canberra"]
  },
  {
    question: "Which organ pumps blood throughout the body?",
    correctAnswer: "Heart",
    options: ["Liver", "Heart", "Lungs", "Brain"]
  },
  {
    question: "What is the currency of Japan?",
    correctAnswer: "Yen",
    options: ["Yuan", "Yen", "Won", "Rupee"]
  },
  {
    question: "Which part of the plant conducts photosynthesis?",
    correctAnswer: "Leaf",
    options: ["Root", "Stem", "Leaf", "Flower"]
  },
  {
    question: "Which planet has the most moons?",
    correctAnswer: "Saturn",
    options: ["Jupiter", "Mars", "Earth", "Saturn"]
  },
  {
    question: "Which planet has the most moons?",
    correctAnswer: "Saturn",
    options: ["Jupiter", "Mars", "Earth", "Saturn"]
  },
  {
    question: "What is 7*6*3?",
    correctAnswer: "126",
    options: ["138", "126", "89", "113"]
  },
  {
    question: "What is 7+(9*2*2*2)/6?",
    correctAnswer: "19",
    options: ["12", "33", "21", "19"]
  },
];

let currentQuestionIndex = 0;
let userScore = 0;

// DOM Elements
const questionText = document.getElementById("question");
const inputField = document.getElementById("answerInput");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const timerDisplay = document.getElementById("timer");
const popup = document.getElementById("popup");
const resultsDiv = document.getElementById("results");
const finalScore = document.getElementById("final-score");
const finalPercentage = document.getElementById("final-percentage");

// Timer Variables
let timeLeft;
let timerInterval;

// Display Question
function displayQuestion() {
  clearInterval(timerInterval);
  inputField.value = "";
  inputField.disabled = false;

  // Get current question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = `${currentQuestion.question} \n Options: ${currentQuestion.options.join(", ")}`;

  // Update progress
  const totalQuestions = quizQuestions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.value = progressPercentage;
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

  // Start timer
  startTimer();
}

// Start Timer
function startTimer() {
  timeLeft = 25;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showPopup("Time's up! Moving to the next question.");
      moveToNextQuestion();
    }
  }, 1000);
}

// Show Popup
function showPopup(message) {
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
}

// Check Answer
function checkAnswer() {
  clearInterval(timerInterval);
  const userAnswer = inputField.value.trim();
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
    userScore++;
    showPopup("Correct!");
  } else {
    showPopup(`Wrong! The correct answer was: ${currentQuestion.correctAnswer}`);
  }

  // Update score display
  scoreDisplay.textContent = `Score: ${userScore}`;

  // Disable input and enable "Next" button
  inputField.disabled = true;
  nextButton.disabled = false;
  submitButton.disabled = true;
}


function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
    submitButton.disabled = false;
    nextButton.disabled = true;
  } else {
    clearInterval(timerInterval);
    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((userScore / totalQuestions) * 100);
    resultsDiv.style.display = "block";
    finalScore.textContent = `Score: ${userScore}`;
    finalPercentage.textContent = `Percentage: ${percentage}%`;
  }
}
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", moveToNextQuestion);
inputField.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    submitButton.click();
  }
});
displayQuestion();
