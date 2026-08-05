const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const copyBtn = document.getElementById("copyBtn");

function formatKey(text, key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, "");
  let newKey = "";
  let index = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i].match(/[A-Z]/)) {
      newKey += key[index % key.length];
      index++;
    } else {
      newKey += text[i];
    }
  }
  return newKey;
}

function encryptVigenere(text, key) {
  text = text.toUpperCase();
  let formattedKey = formatKey(text, key);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let ch = text[i];
    if (ch >= 'A' && ch <= 'Z') {
      let t = ch.charCodeAt(0) - 65;
      let k = formattedKey[i].charCodeAt(0) - 65;
      result += String.fromCharCode((t + k) % 26 + 65);
    } else {
      result += ch;
    }
  }
  return result;
}

function decryptVigenere(text, key) {
  text = text.toUpperCase();
  let formattedKey = formatKey(text, key);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let ch = text[i];
    if (ch >= 'A' && ch <= 'Z') {
      let t = ch.charCodeAt(0) - 65;
      let k = formattedKey[i].charCodeAt(0) - 65;
      result += String.fromCharCode((t - k + 26) % 26 + 65);
    } else {
      result += ch;
    }
  }
  return result;
}

encryptBtn.addEventListener("click", function () {
  const text = userInput.value;
  const key = keyInput.value;
  output.value = encryptVigenere(text, key);
});

decryptBtn.addEventListener("click", function () {
  const text = userInput.value;
  const key = keyInput.value;
  output.value = decryptVigenere(text, key);
});

copyBtn.addEventListener("click", function () {
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});
