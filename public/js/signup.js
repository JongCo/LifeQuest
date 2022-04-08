const xhr = new XMLHttpRequest();

xhr.addEventListener("load", e => {
    if(xhr.status == 200){
        alert("회원가입을 축하드립니다 !!");
        window.location.href = './login';
    } else {
        alert("회원가입 실패하였습니다..");    
    }
});

window.addEventListener("load", e => {

    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    const signupButton = document.getElementById("signup-btn");

    
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
