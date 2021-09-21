var guessCount = 0;
var winningNumber;

var cardContainer = document.getElementById("cardContainer");
var guess1Error = document.getElementById("guess1Error");
var guess2Error = document.getElementById("guess2Error");
var maxError = document.getElementById("maxError");
var maxRangeInput = document.getElementById("maxRangeInput");
var maxRangeText = document.getElementById("maxRange");
var minError = document.getElementById("minError");
var minRangeInput = document.getElementById("minRangeInput");
var minRangeText = document.getElementById("minRange");
var name1Error = document.getElementById("name1Error");
var name2Error = document.getElementById("name2Error");
var player1Feedback = document.getElementById("player1Feedback");
var player1GuessInput = document.getElementById("player1GuessTextbox");
var player1Name = document.getElementById("player1Name");
var player1NameInput = document.getElementById("player1NameTextbox");
var player1Number = document.getElementById("player1Number");
var player2Feedback = document.getElementById("player2Feedback");
var player2GuessInput = document.getElementById("player2GuessTextbox");
var player2Name = document.getElementById("player2Name");
var player2NameInput = document.getElementById("player2NameTextbox");
var player2Number = document.getElementById("player2Number");
var submitGuessButton = document.getElementById("submitGuessButton");
var updateButton = document.getElementById("updateButton");

window.addEventListener("load", function() {
  randomizeWinningNumber(1, 100);
});

updateButton.addEventListener("click", function(event) {
  updateRange(event);
});

submitGuessButton.addEventListener("click", submitGuess);

cardContainer.addEventListener("click", function(event) {
  deleteCard(event);
});

function randomizeWinningNumber(min, max) {
  winningNumber = Math.floor(Math.random() * (max - min) + min);
  console.log(winningNumber)
};

function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
}

function updateRange(event) {
  event.preventDefault();

  if (!checkValidRange()) {
    show(minError);
    show(maxError);
    return;
  }

  hide(minError);
  hide(maxError);

  changeRangeText();
  randomizeWinningNumber(minRangeInput.value, maxRangeInput.value);
};

function checkValidRange() {
  if (parseInt(minRangeInput.value) < parseInt(maxRangeInput.value)) {
    return true;
  } else {
    return false;
  }
};

function changeRangeText() {
  minRangeText.innerText = minRangeInput.value;
  maxRangeText.innerText = maxRangeInput.value;
};

function submitGuess() {
  event.preventDefault();
  if (checkInputs()) {
    increaseGuesses();
    updatePlayerName(player1Name, player1NameInput);
    updatePlayerName(player2Name, player2NameInput);
    changeCurrentGuess();
    updateFeedback(player1GuessInput, player1Feedback);
    updateFeedback(player2GuessInput, player2Feedback);
    checkWinner();
  }
};

function checkInputs() {
  if (!player1NameInput.value) {
    show(name1Error);
    return false;
  }

  hide(name1Error);

  if (!checkGuess(player1GuessInput)) {
    show(guess1Error);
    return false;
  }

  hide(guess1Error);

  if (!player2NameInput.value) {
    show(name2Error);
    return false;
  }

  hide(name2Error);

  if (!checkGuess(player2GuessInput)){
    show(guess2Error);
    return false;
  }

  hide(guess2Error);

  return true;
}

function checkGuess(playerGuessInput) {
  if (!parseInt(playerGuessInput.value) || parseInt(playerGuessInput.value) > parseInt(maxRangeText.innerText) || parseInt(playerGuessInput.value) < parseInt(minRangeText.innerText)) {
    return false;
  } else {
    return true;
  }
};

function increaseGuesses() {
  guessCount += 1;
};

function updatePlayerName(name, nameInput) {
  name.innerText = nameInput.value;
};

function changeCurrentGuess() {
  player1Number.innerText = player1GuessInput.value;
  player2Number.innerText = player2GuessInput.value;
  event.preventDefault();
};

function updateFeedback(guessInput, feedback) {
  if (parseInt(guessInput.value) > winningNumber) {
    feedback.innerText = "That's too high";
  } else if (parseInt(guessInput.value) < winningNumber) {
    feedback.innerText = "That's too low";
  } else {
    feedback.innerText = "BOOM!";
  }
};

function checkWinner() {
  if (player1Feedback.innerText === 'BOOM!') {
    addCard(player1NameInput.value);
    guessCount = 0;
  } else if (player2Feedback.innerText === 'BOOM!') {
    addCard(player2NameInput.value);
    guessCount = 0;
  }
}

function addCard(winner) {
  cardContainer.innerHTML +=
    `<section class="card">
      <div class="card-header">
        <p class="player1-name">${player1NameInput.value}</p>
        <p> VS </p>
        <p class="player2-name">${player2NameInput.value}</p>
      </div>
      <div class="card-main">
        <div class="card-line"></div>
        <p class="winner-name game1-winner">${winner}</p>
        <p class="card-winner-label">WINNER</p>
        <div class="card-line"></div>
      </div>
      <div class="card-footer">
        <p><span class="guess-count" id="number-of-guesses">${guessCount}</span> GUESSES</p>
        <button class="close-button">X</button>
      </div>
    </section>`;
};

function deleteCard(event) {
  if (event.target.classList.contains("close-button")) {
    event.target.closest("section").remove();
  }
};
