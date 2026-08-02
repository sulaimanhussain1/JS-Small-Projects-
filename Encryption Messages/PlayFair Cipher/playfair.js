const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const copyBtn = document.getElementById("copyBtn");

function generateMatrix(key) {
  key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  let matrix = [];
  let used = {};

  for (let ch of key) {
    if (!used[ch]) {
      matrix.push(ch);
      used[ch] = true;
    }
  }

  for (let i = 65; i <= 90; i++) {
    let ch = String.fromCharCode(i);
    if (ch === "J") continue;
    if (!used[ch]) {
      matrix.push(ch);
      used[ch] = true;
    }
  }

  return matrix;
}

function findPosition(matrix, ch) {
  let index = matrix.indexOf(ch);
  return { row: Math.floor(index / 5), col: index % 5 };
}

function processText(text) {
  text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    let a = text[i];
    let b = text[i + 1] || "X";
    if (a === b) {
      result += a + "X";
      i--;
    } else {
      result += a + b;
    }
  }
  return result;
}

function playfair(text, key, encrypt = true) {
  let matrix = generateMatrix(key);
  text = processText(text);
  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    let p1 = findPosition(matrix, text[i]);
    let p2 = findPosition(matrix, text[i + 1]);

    if (p1.row === p2.row) {
      let shift = encrypt ? 1 : 4;
      result += matrix[p1.row * 5 + (p1.col + shift) % 5];
      result += matrix[p2.row * 5 + (p2.col + shift) % 5];
    }
    else if (p1.col === p2.col) {
      let shift = encrypt ? 1 : 4;
      result += matrix[((p1.row + shift) % 5) * 5 + p1.col];
      result += matrix[((p2.row + shift) % 5) * 5 + p2.col];
    }
    else {
      result += matrix[p1.row * 5 + p2.col];
      result += matrix[p2.row * 5 + p1.col];
    }
  }
  return result;
}

encryptBtn.addEventListener("click", function () {
  const text = userInput.value;
  const key = keyInput.value;
  output.value = playfair(text, key, true);
});

decryptBtn.addEventListener("click", function () {
  const text = userInput.value;
  const key = keyInput.value;
  output.value = playfair(text, key, false);
});

copyBtn.addEventListener("click", function () {
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});
