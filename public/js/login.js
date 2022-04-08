const xhr = new XMLHttpRequest();

xhr.addEventListener("load", e => {
    console.log("login.js:17 " + xhr.responseText)
    if(xhr.responseText == "success"){
        window.location.href = './app'
    };
});

window.addEventListener("load", e => {

    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    const loginButton = document.getElementById("login-btn");

    loginButton.addEventListener("click", e => {
        loginInfoJsonStr = JSON.stringify({
            username: usernameInput.value,
            password: sha256(passwordInput.value)
        });
        xhr.open("post", "./login");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(loginInfoJsonStr);
    });

});
