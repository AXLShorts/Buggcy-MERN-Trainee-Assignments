// script.js

document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".board");
  const colorButtons = document.querySelectorAll(".color");
  const checkButton = document.getElementById("check");
  const resetButton = document.getElementById("reset");
  const messageDiv = document.querySelector(".message");

  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  let secretCode = generateSecretCode();
  let currentRow = 0;
  let currentColor = null;

  // Generate a random secret code
  function generateSecretCode() {
    let code = [];
    for (let i = 0; i < 4; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      code.push(randomColor);
    }
    return code;
  }

  // Create the board dynamically
  function createBoard() {
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
  }

  // Handle color selection
  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentRow < 10) {
        if (currentColor) {
          currentColor.classList.remove("selected");
        }
        currentColor = button;
        button.classList.add("selected");
      }
    });
  });

  // Check the current row
  checkButton.addEventListener("click", () => {
    if (currentRow < 10 && currentColor) {
      const row = board.children[currentRow];
      const cells = row.children;

      for (let i = 0; i < 4; i++) {
        cells[i].style.backgroundColor = currentColor.style.backgroundColor;
      }

      if (checkWin(cells)) {
        messageDiv.textContent = "Congratulations! You guessed the code!";
        messageDiv.style.color = "green";
        disableGame();
      } else {
        currentRow++;
        currentColor = null;
        messageDiv.textContent = `Row ${currentRow + 1}: Try again.`;
      }

      if (currentRow === 10) {
        messageDiv.textContent = `Game Over! The code was ${secretCode.join(
          ", "
        )}.`;
        disableGame();
      }
    }
  });

  // Disable game interaction
  function disableGame() {
    colorButtons.forEach((button) => (button.disabled = true));
    checkButton.disabled = true;
  }

  // Check if the guess is correct
  function checkWin(cells) {
    const guess = Array.from(cells).map((cell) =>
      colors.find((color) => color === cell.style.backgroundColor)
    );
    return guess.every((color, index) => color === secretCode[index]);
  }

  // Reset the game
  resetButton.addEventListener("click", () => {
    secretCode = generateSecretCode();
    currentRow = 0;
    messageDiv.textContent = "";
    colorButtons.forEach((button) => (button.disabled = false));
    checkButton.disabled = false;
    createBoard();
  });

  // Initialize the game
  createBoard();
});
