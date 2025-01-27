document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const showPopup = (message) => {
    popup.textContent = message;
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 2000);
  };

  const resultsDiv = document.getElementById("results");
  const finalScore = document.getElementById("final-score");
  const finalPercentage = document.getElementById("final-percentage");

  const answerInput = document.getElementById("answerInput");
  answerInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });

  const displayFinalResults = (score, totalQuestions) => {
    resultsDiv.style.display = "block";
    finalScore.textContent = `Score: ${score}`;
    const percentage = Math.round((score / totalQuestions) * 100);
    finalPercentage.textContent = `Percentage: ${percentage}%`;
  };

  // Initialize quiz logic here.
  // Replace alert() calls with showPopup or results display.

  let currentQuestionIndex = 0;
  let userScore = 0;
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Madrid", "Paris"],
      correct: "Paris",
    },
    // Add more questions here.
  ];

  const questionElement = document.getElementById("question");
  const submitButton = document.getElementById("submit");
  const nextButton = document.getElementById("next");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const scoreDisplay = document.getElementById("score");

  const displayQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
      displayFinalResults(userScore, questions.length);
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestion.question} \n Options: ${currentQuestion.options.join(", ")}`;
    progressBar.value = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    answerInput.value = "";
    submitButton.disabled = false;
    nextButton.disabled = true;
  };

  const checkAnswer = () => {
    const userAnswer = answerInput.value.trim();
    const currentQuestion = questions[currentQuestionIndex];
    if (userAnswer.toLowerCase() === currentQuestion.correct.toLowerCase()) {
      userScore++;
      showPopup("Correct!");
    } else {
      showPopup(`Wrong! The correct answer was: ${currentQuestion.correct}`);
    }

    scoreDisplay.textContent = `Score: ${userScore}`;
    submitButton.disabled = true;
    nextButton.disabled = false;
  };

  submitButton.addEventListener("click", checkAnswer);
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    displayQuestion();
  });

  displayQuestion();
});
