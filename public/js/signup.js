const xhr = new XMLHttpRequest();

window.addEventListener("load", e => {

    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    const signupButton = document.getElementById("signup-btn");

    xhr.addEventListener("load", e => {
        console.log("signup.js:17 " + xhr.responseText);
    });
    
    signupButton.addEventListener("click", e => {
        signupInfoJson = {
            username: usernameInput.value,
            password: sha256(passwordInput.value)
        }
        signupInfoJsonStr = JSON.stringify(signupInfoJson);
        xhr.open("post", "./signup");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(signupInfoJsonStr);
    });

});