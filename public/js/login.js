const xhr = new XMLHttpRequest();

window.addEventListener("load", e => {

    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    const loginButton = document.getElementById("login-btn");

    loginButton.addEventListener("click", e => {
        console.log(usernameInput.value + "/" + passwordInput.value);
        loginInfoJsonStr = JSON.stringify({
            username: usernameInput.value,
            password: sha256(passwordInput.value)
        });
        xhr.open("post", "./login");
        xhr.send(loginInfoJsonStr);
    });

});