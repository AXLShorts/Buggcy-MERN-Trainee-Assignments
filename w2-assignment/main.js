const guessContainer = document.getElementById("guess");

for (let i = 0; i < 10; i++) {
  const row = document.createElement("div");
  row.className = `guess-row guess-row-${i}`;

  for (let j = 0; j < 4; j++) {
    const box = document.createElement("div");

    box.className = "guess-box";

    row.appendChild(box);
  }

  guessContainer.appendChild(row);
}

for (let i = 0; i < 9; i++) {
  const row = document.querySelectorAll(".guess-row"); // Get the first element of the class

  if (row) {
    const overlay = document.createElement("div");
    overlay.id = `overlay-${i}`;
    overlay.style.position = "absolute";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "10";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    row[i].appendChild(overlay);
  }
}

const resultContainer = document.getElementById("result");

for (let i = 0; i < 10; i++) {
  const row = document.createElement("div");
  row.className = `result-row result-row-${i}`;

  for (let j = 0; j < 4; j++) {
    const box = document.createElement("div");
    box.className = "result-box";

    row.appendChild(box);
  }

  resultContainer.appendChild(row);
}

let currentcolor = "";

const colorButtons = document.querySelectorAll(".color");
colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentcolor = button.classList[1];
    console.log(currentcolor);
    document.body.style.cursor = `url("images/curser-${currentcolor}.png")20 20, auto`;
  });
});

const buttons = document.querySelectorAll(".guess-box");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.backgroundColor = currentcolor;
  });
});

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

function generateSecretCode(withoutDuplicates) {
  let secretCode = [];

  if (withoutDuplicates) {
    let shuffledColors = [...colors];
    for (let i = shuffledColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledColors[i], shuffledColors[j]] = [
        shuffledColors[j],
        shuffledColors[i],
      ];
    }
    secretCode = shuffledColors.slice(0, 4);
  } else {
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      secretCode.push(colors[randomIndex]);
    }
  }

  return secretCode;
}

const secretCode = generateSecretCode(true);
console.log(secretCode);

let currentRow = 9;

const checkButton = document.getElementById("check-guess");

checkButton.addEventListener("click", () => {
  const guessRow = document.querySelectorAll(
    `.guess-row-${currentRow} .guess-box`
  );
  const guess = [];
  guessRow.forEach((box) => {
    guess.push(box.style.backgroundColor);
  });

  const resultRow = document.querySelectorAll(
    `.result-row-${currentRow} .result-box`
  );
  const result = checkGuess(guess, secretCode);
  resultRow.forEach((box, index) => {
    box.style.backgroundColor = result[index];
  });

  currentRow--;

  if (currentRow < 0) {
    checkButton.disabled = true;
  }

  const overlay = document.getElementById(`overlay-${currentRow}`);
  if (overlay) {
    overlay.remove();
  }
});

function checkGuess(guess, secretCode) {
  const result = [];

  const unmatchedGuess = [];
  const unmatchedSecretCode = [];

  // Check for correct colors in the correct place
  guess.forEach((color, index) => {
    if (color === secretCode[index]) {
      result.push("red"); // Correct color in the correct place
    } else {
      unmatchedGuess.push(color);
      unmatchedSecretCode.push(secretCode[index]);
    }
  });

  // Check for correct colors in the wrong place
  unmatchedGuess.forEach((color) => {
    const index = unmatchedSecretCode.indexOf(color);
    if (index !== -1) {
      result.push("white"); // Correct color in the wrong place
      unmatchedSecretCode.splice(index, 1);
    } else {
      result.push("black"); // Incorrect color
    }
  });

  console.log(result);

  return result;
}
