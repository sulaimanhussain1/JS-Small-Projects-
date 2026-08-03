const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const copyBtn = document.getElementById("copyBtn");

function encryptRailFence(text, key) {
  if (key <= 1) return text;
  let rails = Array.from({ length: key }, () => []);
  let dirDown = false,
    row = 0;

  for (let ch of text) {
    rails[row].push(ch);
    if (row === 0 || row === key - 1) dirDown = !dirDown;
    row += dirDown ? 1 : -1;
  }

  return rails.flat().join("");
}

function decryptRailFence(text, key) {
  if (key <= 1) return text;
  let len = text.length;
  let rail = Array.from({ length: key }, () => Array(len).fill(null));
  let dirDown = false,
    row = 0;

  for (let i = 0; i < len; i++) {
    rail[row][i] = "*";
    if (row === 0 || row === key - 1) dirDown = !dirDown;
    row += dirDown ? 1 : -1;
  }

  let index = 0;
  for (let r = 0; r < key; r++) {
    for (let c = 0; c < len; c++) {
      if (rail[r][c] === "*" && index < len) {
        rail[r][c] = text[index++];
      }
    }
  }

  let result = "";
  row = 0;
  dirDown = false;
  for (let i = 0; i < len; i++) {
    result += rail[row][i];
    if (row === 0 || row === key - 1) dirDown = !dirDown;
    row += dirDown ? 1 : -1;
  }
  return result;
}

encryptBtn.addEventListener("click", function () {
  const input = document.getElementById("userInput").value;
  const key = parseInt(document.getElementById("keyInput").value);
  document.getElementById("output").value = encryptRailFence(input, key);
});

decryptBtn.addEventListener("click", function () {
  const input = document.getElementById("userInput").value;
  const key = parseInt(document.getElementById("keyInput").value);
  document.getElementById("output").value = decryptRailFence(input, key);
});

copyBtn.addEventListener("click", function () {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});
