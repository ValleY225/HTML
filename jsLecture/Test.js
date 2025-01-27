    function calculateGrade(score) {
    console.log("Function calculateGrade started.");
    if (score >= 90) {
    console.log("Score is A.");
    return "A";
  } else if (score >= 80) {
    console.log("Score is B.");
    return "B";
  } else if (score >= 70) {
    console.log("Score is C.");
    return "C";
  } else if (score >= 60) {
    console.warn("Score is D. Needs improvement.");
    return "D";
  } else {
    console.error("Score is F. Fail.");
    return "F";
  }
    console.log("Function calculateGrade ended.");
  }5

    let grade = calculateGrade(67);
    console.log("Final grade: " + grade);
