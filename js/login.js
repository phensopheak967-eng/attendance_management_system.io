// Show / Hide Password
function togglePassword(){

    const password=document.getElementById("password");

    if(password.type==="password"){
        password.type="text";
    }else{
        password.type="password";
    }

}

// Login Validation

document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value;

    const users =
    JSON.parse(localStorage.getItem("users")) || [];

    const user =
    users.find(u =>
        u.username === username &&
        u.password === password
    );

    if(user){

        localStorage.setItem(
            "loginUser",
            user.fullName
        );

        window.location.href = "dashboard.html";

    }
    else{

        alert("Invalid username or password.");

    }

});