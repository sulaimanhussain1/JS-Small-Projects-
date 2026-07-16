const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const copyBtn = document.getElementById("copyBtn");

function encryptMessage(message, shift) {
    let result = "";
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (char >= 'A' && char <= 'Z') {
            result += String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
        }
        else if (char >= 'a' && char <= 'z') {
            result += String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
        }
        else {
            result += char;
        }
    }
    return result;
}

function decryptMessage(message, shift) {
    let result = "";
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (char >= 'A' && char <= 'Z') {
            result += String.fromCharCode((char.charCodeAt(0) - 65 + shift + 26) % 26 + 65);
        }
        else if (char >= 'a' && char <= 'z') {
            result += String.fromCharCode((char.charCodeAt(0) - 97 + shift + 26) % 26 + 97);
        }
        else {
            result += char;
        }
    }
    return result;
}

encryptBtn.addEventListener("click", function() {
    const input = document.getElementById("userInput").value;
    const encryptedMessage = encryptMessage(input, 3);
    document.getElementById("output").value = encryptedMessage;
});

decryptBtn.addEventListener("click", function() {
    const input = document.getElementById("userInput").value;
    const decryptedMessage = decryptMessage(input, -3);
    document.getElementById("output").value = decryptedMessage;
});

copyBtn.addEventListener("click", function() {
    const output = document.getElementById("output");
    output.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
});
