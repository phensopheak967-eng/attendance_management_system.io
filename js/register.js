document.getElementById("registerForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const fullName =
    document.getElementById("fullName").value.trim();

    const username =
    document.getElementById("username").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const phone =
    document.getElementById("phone").value.trim();

    if(password !== confirmPassword){

        alert("Passwords do not match.");

        return;

    }

    const users =
    JSON.parse(localStorage.getItem("users")) || [];

    if(users.some(user => user.username === username)){

        alert("Username already exists.");

        return;

    }

    users.push({

        fullName,

        username,

        email,

        password,

        phone

    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registration successful!");

    window.location.href = "index.html";

});