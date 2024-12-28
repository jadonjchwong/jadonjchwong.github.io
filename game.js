document.addEventListener("DOMContentLoaded", () => {
    const resultDisplay = document.getElementById("result");
    const userGuessInput = document.getElementById("userGuess");
    const submitGuessButton = document.getElementById("submitGuess");
    const restartGameButton = document.getElementById("restartGame");
    const minRangeDisplay = document.getElementById("minRange");
    const maxRangeDisplay = document.getElementById("maxRange");
    const currentPlayerDisplay = document.getElementById("currentPlayer");

    const players = ["Player 1", "Player 2"];
    let currentPlayerIndex = 0;
    let randomNumber = generateRandomNumber(1, 100);
    let minRange = 1;
    let maxRange = 100;
    let attempts = 0;

    // Function to generate a random number
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to switch to the next player
    function switchPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        currentPlayerDisplay.textContent = players[currentPlayerIndex];
    }

    // Function to check the user's guess
    function checkGuess() {
        const userGuess = parseInt(userGuessInput.value);

        if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
            resultDisplay.textContent = `Please enter a number between ${minRange} and ${maxRange}.`;
            resultDisplay.style.color = "red";
            return;
        }

        attempts++;

        if (userGuess === randomNumber) {
            resultDisplay.textContent = `${players[currentPlayerIndex]} wins! The number was ${randomNumber}. Total attempts: ${attempts}`;
            resultDisplay.style.color = "green";
            submitGuessButton.disabled = true;
            restartGameButton.style.display = "inline-block";
        } else if (userGuess < randomNumber) {
            resultDisplay.textContent = "Too low! Narrowing the range.";
            resultDisplay.style.color = "blue";
            minRange = userGuess + 1; // Update minimum range
        } else {
            resultDisplay.textContent = "Too high! Narrowing the range.";
            resultDisplay.style.color = "blue";
            maxRange = userGuess - 1; // Update maximum range
        }

        // Update the displayed range
        minRangeDisplay.textContent = minRange;
        maxRangeDisplay.textContent = maxRange;

        // Switch to the next player
        switchPlayer();

        userGuessInput.value = "";
    }

    // Restart the game
    function restartGame() {
        randomNumber = generateRandomNumber(1, 100);
        minRange = 1;
        maxRange = 100;
        attempts = 0;
        resultDisplay.textContent = "";
        userGuessInput.value = "";
        submitGuessButton.disabled = false;
        restartGameButton.style.display = "none";
        minRangeDisplay.textContent = minRange;
        maxRangeDisplay.textContent = maxRange;
        currentPlayerIndex = 0;
        currentPlayerDisplay.textContent = players[currentPlayerIndex];
    }

    // Event listeners
    submitGuessButton.addEventListener("click", checkGuess);
    restartGameButton.addEventListener("click", restartGame);
});
