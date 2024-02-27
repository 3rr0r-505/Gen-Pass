//Slider function:
window.onload = function() {
    rangeSlide(4);
};

function rangeSlide(value) {
    const sliderValue = value < 4 ? 4 : value;
    document.getElementById('rangeValue').innerHTML = value;
}

function generatePassword() {
    const passwordLength = document.getElementById("passwordLength").value;
    const lowercaseChar = document.getElementById("checkBox1").checked;
    const uppercaseChar = document.getElementById("checkBox2").checked;
    const numbers = document.getElementById("checkBox3").checked;
    const symbols = document.getElementById("checkBox4").checked;
    const passwordResult = document.getElementById("passwordResult");

    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbersChars = "1234567890";
    const symbolsChars = "!@#$%^&*()-_+=~{}[]|:;<>,.?/";

    let allowedChars = "";
    let password = "";

    allowedChars += lowercaseChar ? lowerCase : "";
    allowedChars += uppercaseChar ? upperCase : "";
    allowedChars += numbers ? numbersChars : "";
    allowedChars += symbols ? symbolsChars : "";

    if (allowedChars.length === 0) {
        passwordResult.textContent = "You have to select at least 1 set of characters.";
    } else {
        for (let i = 0; i < passwordLength; i++) {
            const randomChars = Math.floor(Math.random() * allowedChars.length);
            password += allowedChars[randomChars];
        }
        passwordResult.textContent = `Your password is: ${password}`;
        showCopyButton();
    }
}

function copyPassword() {
    const passwordResult = document.getElementById("passwordResult");
    const passwordText = passwordResult.textContent;
    const password = passwordText.split(": ")[1]; // Extracting the password part after ": "

    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    setTimeout(function() {
        popup.style.display = 'none';
    }, 2000); 
}

function showCopyButton() {
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.style.display = 'inline-block';
}

