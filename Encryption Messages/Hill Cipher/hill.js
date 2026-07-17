const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const copyBtn = document.getElementById("copyBtn");

function modInverse(a) {
  a = ((a % 26) + 26) % 26;
  for (let i = 1; i < 26; i++) {
    if ((a * i) % 26 === 1) return i;
  }
  return -1;
}

function encryptHill(text, key) {
  text = text.toUpperCase().replace(/[^A-Z]/g, "");
  if (text.length % 2 !== 0) text += "X";

  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    let x = text.charCodeAt(i) - 65;
    let y = text.charCodeAt(i + 1) - 65;

    let c1 = (key[0] * x + key[1] * y) % 26;
    let c2 = (key[2] * x + key[3] * y) % 26;

    result += String.fromCharCode(c1 + 65);
    result += String.fromCharCode(c2 + 65);
  }
  return result;
}

function decryptHill(text, key) {
  let det = (key[0] * key[3] - key[1] * key[2]) % 26;
  let invDet = modInverse(det);
  if (invDet === -1) return "Invalid key matrix";

  let invKey = [
    ( key[3] * invDet) % 26,
    (-key[1] * invDet) % 26,
    (-key[2] * invDet) % 26,
    ( key[0] * invDet) % 26
  ];

  invKey = invKey.map(v => (v + 26) % 26);
  return encryptHill(text, invKey);
}

encryptBtn.addEventListener("click", function () {
  const text = document.getElementById("userInput").value;
  const key = [
    parseInt(k1.value),
    parseInt(k2.value),
    parseInt(k3.value),
    parseInt(k4.value)
  ];
  output.value = encryptHill(text, key);
});

decryptBtn.addEventListener("click", function () {
  const text = document.getElementById("userInput").value;
  const key = [
    parseInt(k1.value),
    parseInt(k2.value),
    parseInt(k3.value),
    parseInt(k4.value)
  ];
  output.value = decryptHill(text, key);
});

copyBtn.addEventListener("click", function () {
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});
