const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const copyBtn = document.getElementById("copyBtn");

function generateRandomBinaryKey(length) {
  let keyBin = [];
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(Math.random() * 256);
    keyBin.push(rand.toString(2).padStart(8, "0"));
  }
  return keyBin.join(" ");
}

function otpEncrypt(message) {
  const keyBinary = generateRandomBinaryKey(message.length);
  const keyParts = keyBinary.split(" ");
  let result = "";

  for (let i = 0; i < message.length; i++) {
    let msgCode = message.charCodeAt(i);
    let keyCode = parseInt(keyParts[i], 2);
    let xorCode = msgCode ^ keyCode;
    result += String.fromCharCode(xorCode);
  }

  return { cipher: result, key: keyBinary };
}

function otpDecrypt(cipher, keyBinary) {
  const keyParts = keyBinary.split(" ");
  if (cipher.length !== keyParts.length) {
    return "Error: Key length must equal message length!";
  }

  let result = "";
  for (let i = 0; i < cipher.length; i++) {
    let cipherCode = cipher.charCodeAt(i);
    let keyCode = parseInt(keyParts[i], 2);
    let xorCode = cipherCode ^ keyCode;
    result += String.fromCharCode(xorCode);
  }
  return result;
}

encryptBtn.addEventListener("click", () => {
  const input = document.getElementById("userInput").value;
  if (!input) {
    alert("Please enter a message!");
    return;
  }
  const { cipher, key } = otpEncrypt(input);
  document.getElementById("output").value = cipher;
  document.getElementById("keyOutput").value = key;
});

decryptBtn.addEventListener("click", () => {
  const cipher = document.getElementById("userInput").value;
  const key = prompt("Enter the binary key for decryption:");
  if (!key) {
    alert("Key required for decryption!");
    return;
  }
  const result = otpDecrypt(cipher, key);
  document.getElementById("output").value = result;
});

copyBtn.addEventListener("click", () => {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});
