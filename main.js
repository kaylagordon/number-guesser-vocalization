var clearButton = document.getElementById("clear-game-button");
var game1Card = document.querySelector(".game1-card");
var game1Winner = document.querySelector(".game1-winner");
var guessCount = 0;
var guess1Error = document.querySelector(".guess1-error");
var guess2Error =document.querySelector(".guess2-error");
var maxError = document.querySelector(".max-error");
var maxRangeInput = document.getElementById("max-range-input");
var maxRangeText = document.getElementById("max-range");
var minError = document.querySelector(".min-error");
var minRangeInput = document.getElementById("min-range-input");
var minRangeText = document.getElementById("min-range");
var name1Error = document.querySelector(".name1-error");
var name2Error = document.querySelector(".name2-error");
var playerBox = document.querySelector(".player-box");
var player1Feedback = document.getElementById("player1-feedback");
var player1GuessInput = document.getElementById("player1-guess-textbox");
var player1Name = document.querySelectorAll(".player1-name");
var player1NameInput = document.getElementById("player1-name-textbox");
var player1Number = document.getElementById("player1-number");
var player2Feedback = document.getElementById("player2-feedback");
var player2GuessInput = document.getElementById("player2-guess-textbox");
var player2Name = document.querySelectorAll(".player2-name");
var player2NameInput = document.getElementById("player2-name-textbox");
var player2Number = document.getElementById("player2-number");
var randomNumber = null;
var rightSideContainer = document.querySelector(".right-side");
var resetButton = document.getElementById("reset-game-button");
var submitGuessButton = document.getElementById("submit-guess-button");
var updateButton = document.getElementById("update-button");

document.addEventListener("DOMContentLoaded", getDefaultRandomNumber);

clearButton.addEventListener("click", function() {
  window.location.reload();
});

rightSideContainer.addEventListener("click", deleteCard);
rightSideContainer.addEventListener("click", disableAllButtons);
submitGuessButton.addEventListener("click", clickSubmitButton);
updateButton.addEventListener("click", function() {
  clickUpdateButton(event);
});

function addCard(guessInput, winner) {
  var player1 = player1NameInput.value;
  var player2 = player2NameInput.value
  if (parseInt(guessInput.value) === randomNumber) {
    rightSideContainer.innerHTML += `<section class="card">
      <div class="card-header">
        <p class="player1-name">${player1}</p>
        <p> VS </p>
        <p class="player2-name">${player2}</p>
      </div>
      <div class="card-main">
        <div class="card-line"></div>
        <p class="winner-name game1-winner">${winner}</p>
        <p class="card-winner-label">WINNER</p>
        <div class="card-line"></div>
      </div>
      <div class="card-footer">
        <p><span class="guess-count" id="number-of-guesses">${countGuesses()}</span> GUESSES</p>
        <button class="close-button">X</button>
      </div>
    </section>`;
  }
};

function addFeedback(guessInput, feedback) {
  if (parseInt(guessInput.value) > randomNumber) {
    feedback.innerText = "That's too high";
  } else if (parseInt(guessInput.value) < randomNumber) {
    feedback.innerText = "That's too low";
  } else {
    feedback.innerText = "BOOM!";
  }
};

function changeRangeText() {
  minRangeText.innerText = minRangeInput.value;
  maxRangeText.innerText = maxRangeInput.value;
};

function changeCurrentGuess() {
  player1Number.innerText = player1GuessInput.value;
  player2Number.innerText = player2GuessInput.value;
  event.preventDefault();
};

function checkGuess(playerGuessInput) {
  console.log("checkGuess ran")
  if (parseInt(playerGuessInput.value) > parseInt(maxRangeInput.value) || parseInt(playerGuessInput.value) < parseInt(minRangeInput.value)) {
    return false;
  } else {
    console.log(checkGuess)
    return true;
  }
};

function checkGuessNumber(playerGuessInput) {
  if (parseInt(playerGuessInput.value)) {
    return true;
  } else {
    return false;
  }
};

function checkMinRange() {
  if (parseInt(minRangeInput.value) < parseInt(maxRangeInput.value)) {
    return true;
  } else {
    return false;
  }
};

resetButton.addEventListener("click", function() {
  guessCount = 0;
});

function clickSubmitButton() {
  event.preventDefault();
  var isValidGuess1 = checkGuess(player1GuessInput);
  var isValidGuess2 = checkGuess(player2GuessInput);
  var isGuess1Number = checkGuessNumber(player1GuessInput);
  var isGuess2Number = checkGuessNumber(player2GuessInput);

  if (isValidGuess1 === false || isGuess1Number === false) {
    guess1Error.style.display = "block";
    console.log("guess1");
    return;
  }

  guess1Error.style.display = "none";

  if (isValidGuess2 === false || isGuess2Number === false) {
    guess2Error.style.display = "block";
    console.log("guess2");
    return;
  }

  guess2Error.style.display = "none";

  changeCurrentGuess();
  addFeedback(player1GuessInput, player1Feedback);
  addFeedback(player2GuessInput, player2Feedback);
  inputPlayerName(player1Name, player1NameInput);
  inputPlayerName(player2Name, player2NameInput);
  addCard(player1GuessInput, player1NameInput.value);
  addCard(player2GuessInput, player2NameInput.value);
  countGuesses();
};

function clickUpdateButton(event) {
  event.preventDefault();
  var isMinVaild = checkMinRange();
  if (isMinVaild === false) {
    minError.style.display = "block";
    maxError.style.display = "block";
    return;
  }

  minError.style.display = "none";
  maxError.style.display = "none";

  changeRangeText();
  getRandomNumber();
};

function countGuesses() {
  guessCount += 2;
  return guessCount;
};

function disableAllButtons() {
  disableButton(resetButton);
  disableButton(clearButton);
};

function disableButton(button) {
  if (player1NameInput.value.length > 0 || player1GuessInput.value.length > 0 || player2NameInput.value.length > 0 || player2GuessInput.value.length > 0) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

function deleteCard(event) {
    if (event.target.classList.contains("close-button")) {
       event.target.closest("section").remove();
    }
};

function getDefaultRandomNumber() {
  randomNumber = Math.floor(Math.random() * (+100 - +1)) + +1;
};

function getRandomNumber() {
  var min = minRangeInput.value;
  var max = maxRangeInput.value;
  randomNumber = Math.floor(Math.random() * (+max - +min)) + +min;
};

function inputPlayerName(name, nameInput) {
  for (var i = 0; i < name.length; i++) {
  name[i].innerText = nameInput.value;
  }
};
