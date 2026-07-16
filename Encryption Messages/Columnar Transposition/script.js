// Helper: get column order
function getKeyOrder(key) {
  return key.split("")
    .map((ch, i) => ({ ch, i }))
    .sort((a, b) => a.ch.localeCompare(b.ch))
    .map(obj => obj.i);
}

// Encrypt
document.getElementById("encryptBtn").addEventListener("click", () => {
  let text = document.getElementById("userInput").value.replace(/\s+/g, "").toUpperCase();
  let key = document.getElementById("keyInput").value.toUpperCase();
  if (!text || !key) {
    document.getElementById("output").value = "⚠️ Please enter both message and key!";
    return;
  }

  let cols = key.length;
  let rows = Math.ceil(text.length / cols);

  // Fill matrix
  let matrix = [];
  let k = 0;
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      if (k < text.length) row.push(text[k]);
      else row.push("X");
      k++;
    }
    matrix.push(row);
  }

  // Read columns by key order
  let order = getKeyOrder(key);
  let cipher = "";
  for (let i = 0; i < order.length; i++) {
    let col = order[i];
    for (let r = 0; r < rows; r++) {
      cipher += matrix[r][col];
    }
  }

  document.getElementById("output").value =  cipher;
});

// Decrypt
document.getElementById("decryptBtn").addEventListener("click", () => {
  let cipher = document.getElementById("userInput").value.replace(/\s+/g, "").toUpperCase();
  let key = document.getElementById("keyInput").value.toUpperCase();
  if (!cipher || !key) {
    document.getElementById("output").value = "⚠️ Please enter both cipher text and key!";
    return;
  }

  let cols = key.length;
  let rows = Math.ceil(cipher.length / cols);
  let order = getKeyOrder(key);

  // Create empty matrix
  let matrix = Array.from({ length: rows }, () => Array(cols).fill(""));

  // Fill columns
  let k = 0;
  for (let i = 0; i < order.length; i++) {
    let col = order[i];
    for (let r = 0; r < rows; r++) {
      if (k < cipher.length) {
        matrix[r][col] = cipher[k];
        k++;
      }
    }
  }

  // Read row by row
  let plain = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      plain += matrix[r][c];
    }
  }

  document.getElementById("output").value  = plain.replace(/X+$/,"");
});
