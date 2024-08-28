//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("customizationForm");
    const fontSizeInput = document.getElementById("fontsize");
    const fontColorInput = document.getElementById("fontcolor");

    // Function to set cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get cookies
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Load saved preferences from cookies
    function loadPreferences() {
        const savedFontSize = getCookie("fontsize");
        const savedFontColor = getCookie("fontcolor");

        if (savedFontSize) {
            document.documentElement.style.setProperty('--fontsize', savedFontSize + "px");
            fontSizeInput.value = parseInt(savedFontSize);
        }

        if (savedFontColor) {
            document.documentElement.style.setProperty('--fontcolor', savedFontColor);
            fontColorInput.value = savedFontColor;
        }
    }

    // Save preferences when the form is submitted
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const fontSize = fontSizeInput.value;
        const fontColor = fontColorInput.value;

        // Set CSS variables
        document.documentElement.style.setProperty('--fontsize', fontSize + "px");
        document.documentElement.style.setProperty('--fontcolor', fontColor);

        // Save preferences to cookies
        setCookie("fontsize", fontSize, 365);
        setCookie("fontcolor", fontColor, 365);
    });

    // Load preferences on page load
    loadPreferences();
});
