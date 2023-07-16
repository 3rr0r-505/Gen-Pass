document.addEventListener("DOMContentLoaded", function () {
    var lengthSlider = document.getElementById("lengthSlider");
    var lengthOutput = document.getElementById("lengthOutput");

    lengthSlider.value = 8;
    lengthOutput.textContent = lengthSlider.value;
    lengthSlider.setAttribute("data-length", lengthSlider.value);

    lengthSlider.addEventListener("input", function () {
        lengthOutput.textContent = lengthSlider.value;
        lengthSlider.setAttribute("data-length", lengthSlider.value);
    });
});

document
    .getElementById("generateButton")
    .addEventListener("click", function () {
        var length = document.getElementById("lengthSlider").value;
        var passwordOutput = document.getElementById("passwordOutput");

        // Clear previous password
        passwordOutput.textContent = "";

        // Get selected options
        var includeLetters = document.getElementById("lettersCheckbox").checked;
        var includeNumbers = document.getElementById("numbersCheckbox").checked;
        var includePunctuation = document.getElementById("punctuationCheckbox")
        .checked;

        // Generate new password
        var password = generatePassword(
            length,
            includeLetters,
            includeNumbers,
            includePunctuation
        );

        // Display new password
        passwordOutput.textContent = "Generated password: " + password;

        // Enable copy functionality
        enableCopy(password);
    });

    document.getElementById("copyButton").addEventListener("click", function () {
        var passwordOutput = document.getElementById("passwordOutput");

        // Copy password to clipboard
        copyToClipboard(
            passwordOutput.textContent.replace("Generated password: ", "")
        );
        //alert("Password copied to clipboard!");
    });

function generatePassword(
    length,
    includeLetters,
    includeNumbers,
    includePunctuation
)   {
        var charset = "";
        if (includeLetters) {
            charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        if (includeNumbers) {
            charset += "0123456789";
        }
        if (includePunctuation) {
            charset += "!@#$%^&*()-_+=~`[]{}|:;\"'<>,.?/";
        }

        var password = "";
        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }

        return password;
    }

function enableCopy(password) {
    var copyButton = document.getElementById("copyButton");

    copyButton.style.display = "block";
    copyButton.addEventListener("click", function () {
        copyToClipboard(password);
        //alert("Password copied to clipboard!");
    });
}

function copyToClipboard(text) {
    var tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

// Copy Button
copyButton.addEventListener('click', () => {
    // Select the password text
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(passwordOutput);
    selection.removeAllRanges();
    selection.addRange(range);

    // Prompt the user to copy the text
    document.execCommand('copy');

    // Clear the selection
    selection.removeAllRanges();

    // Change the copy button text
    copyButton.textContent = 'Copied!';
});
