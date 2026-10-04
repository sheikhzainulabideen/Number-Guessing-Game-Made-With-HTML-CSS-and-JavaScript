
var targetNumber = 0;
var attempts = 0;
var minVal = 1;
var maxVal = 10;

var minNumInput = document.getElementById("min-num");
var maxNumInput = document.getElementById("max-num");
var startBtn = document.getElementById("start-btn");

var gameplaySection = document.getElementById("gameplay-section");
var displayMin = document.getElementById("display-min");
var displayMax = document.getElementById("display-max");
var attemptsCount = document.getElementById("attempts-count");
var userGuessInput = document.getElementById("user-guess");
var guessBtn = document.getElementById("guess-btn");

var modalOverlay = document.getElementById("modal-overlay");
var modalCard = document.getElementById("modal-card");
var modalTitle = document.getElementById("modal-title");
var modalMessage = document.getElementById("modal-message");
var modalCloseBtn = document.getElementById("modal-close-btn");

function startGame() {
  var parsedMin = parseInt(minNumInput.value, 10);
  var parsedMax = parseInt(maxNumInput.value, 10);

  if (isNaN(parsedMin) || isNaN(parsedMax)) {
    alert("Please enter valid numbers for the range.");
    return;
  }

  if (parsedMin >= parsedMax) {
    alert("Min number must be less than Max number.");
    return;
  }

  minVal = parsedMin;
  maxVal = parsedMax;
  attempts = 0;

  targetNumber = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;

  // Update UI Elements
  displayMin.textContent = minVal;
  displayMax.textContent = maxVal;
  attemptsCount.textContent = attempts;
  userGuessInput.value = "";

  gameplaySection.classList.remove("hidden");
  userGuessInput.focus();
}


function handleGuess() {
  var guess = parseInt(userGuessInput.value, 10);

  if (isNaN(guess)) {
    alert("Please enter a valid guess number.");
    return;
  }

  if (guess < minVal || guess > maxVal) {
    alert(`Please enter a number between ${minVal} and ${maxVal}.`);
    return;
  }

  attempts++;
  attemptsCount.textContent = attempts;

  if (guess === targetNumber) {
    // Requirement 4: Correct Guess Pop-up
    showPopup(
      true,
      "Congratulations!",
      `Congratulations User You Have Guess The Number Correctly in ${attempts} attempts.`
    );
  } else if (guess > targetNumber) {

    showPopup(
      false,
      "Incorrect Guess",
      `Better Luck Next Time User. Attempts: ${attempts}. Your guessed number (${guess}) is Greater than the number that needs to be guessed.`
    );
  } else {
    showPopup(
      false,
      "Incorrect Guess",
      `Better Luck Next Time User. Attempts: ${attempts}. Your guessed number (${guess}) is Less than the number that needs to be guessed.`
    );
  }

  userGuessInput.value = "";
}


function showPopup(isSuccess, title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;

  modalCard.className = "modal-card " + (isSuccess ? "success" : "incorrect");
  modalOverlay.classList.remove("hidden");
}

// Close Modal Popup
function closeModal() {
  modalOverlay.classList.add("hidden");
  userGuessInput.focus();
}

startBtn.addEventListener("click", startGame);
guessBtn.addEventListener("click", handleGuess);
modalCloseBtn.addEventListener("click", closeModal);

userGuessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleGuess();
  }
});

minNumInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    startGame();
  }
});

maxNumInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    startGame();
  }
});