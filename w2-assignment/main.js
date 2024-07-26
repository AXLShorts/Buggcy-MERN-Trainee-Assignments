// Generate Guess Boxes

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

// Generate Overlay Over Guess Boxes

for (let i = 0; i < 10; i++) {
  const row = document.querySelectorAll(".guess-row");

  if (row) {
    const overlay = document.createElement("div");
    overlay.id = `overlay-${i}`;
    overlay.style.position = "absolute";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "10";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    row[i].appendChild(overlay);
  }
}

// Generate Result Boxes

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

// Changing Cursor and Keep Track of Current Color

let currentcolor = "";

const colorButtons = document.querySelectorAll(".color");
colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentcolor = button.classList[1];
    document.body.style.cursor = `url("Images/curser-${currentcolor}.png")20 20, auto`;
  });
});

// Change Color of Guess Boxes

const buttons = document.querySelectorAll(".guess-box");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.backgroundColor = currentcolor;
  });
});

// Generate Secret Code

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "black",
  "white",
];

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

// Game Logic

const startButton = document.getElementById("start-game");

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  const overlay = document.getElementById("overlay-9");
  if (overlay) {
    overlay.style.zIndex = "-1";
  }
  const allowduplicates = document.getElementById("duplicates").checked;
  secretCode = generateSecretCode(!allowduplicates);
  console.log(secretCode);
});

let currentRow = 10;

const checkButton = document.getElementById("check-guess");

checkButton.addEventListener("click", () => {
  const guessRow = document.querySelectorAll(
    `.guess-row-${currentRow - 1} .guess-box`
  );
  if (
    guessRow[0].style.backgroundColor === "" ||
    guessRow[1].style.backgroundColor === "" ||
    guessRow[2].style.backgroundColor === "" ||
    guessRow[3].style.backgroundColor === ""
  ) {
    console.log("Hi");
    alert("Please fill all the boxes before checking your guess");
    return;
  } else {
    const guess = [];
    guessRow.forEach((box) => {
      guess.push(box.style.backgroundColor);
    });

    const resultRow = document.querySelectorAll(
      `.result-row-${currentRow - 1} .result-box`
    );
    const result = checkGuess(guess, secretCode);
    resultRow.forEach((box, index) => {
      box.style.backgroundColor = result[index];
    });

    if (result.every((color) => color === "red")) {
      alert("You won!");
      checkButton.disabled = true;

      document.body.style.cursor = "auto";
      const actualcode = document.getElementById("code");
      const divs = actualcode.querySelectorAll("div");

      divs.forEach((div, index) => {
        div.innerHTML = "";

        if (index < secretCode.length) {
          div.style.backgroundColor = secretCode[index];
          div.style.border = "1px solid black";
        }
        const overlay = document.getElementById(`overlay-${currentRow - 1}`);
        if (overlay) {
          overlay.style.zIndex = "10";
        }
      });
    } else {
      currentRow--;

      if (currentRow - 1 < 0) {
        checkButton.disabled = true;
        alert("You lost!");
        document.body.style.cursor = "auto";
        const actualcode = document.getElementById("code");
        const divs = actualcode.querySelectorAll("div");

        divs.forEach((div, index) => {
          div.innerHTML = "";

          if (index < secretCode.length) {
            div.style.backgroundColor = secretCode[index];
            div.style.border = "1px solid black";
          }
        });
      }

      const overlay = document.getElementById(`overlay-${currentRow - 1}`);
      if (overlay) {
        overlay.style.zIndex = "-1";
      }
      const previousOverlay = document.getElementById(`overlay-${currentRow}`);
      if (previousOverlay) {
        previousOverlay.style.zIndex = "10";
      }
    }
  }
});

function checkGuess(guess, secretCode) {
  const result = [];

  const unmatchedGuess = [];
  const unmatchedSecretCode = [];

  guess.forEach((color, index) => {
    if (color === secretCode[index]) {
      result.push("red");
    } else {
      unmatchedGuess.push(color);
      unmatchedSecretCode.push(secretCode[index]);
    }
  });

  unmatchedGuess.forEach((color) => {
    const index = unmatchedSecretCode.indexOf(color);
    if (index !== -1) {
      result.push("white");
      unmatchedSecretCode.splice(index, 1);
    } else {
      result.push("black");
    }
  });

  return result;
}
