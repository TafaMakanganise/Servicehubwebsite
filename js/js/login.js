// ../js/login.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem('servicehubUser'));

    if (!storedUser) {
        alert("No user found. Please register first.");
        return;
    }

    if (storedUser.email === email && storedUser.password === password) {
        alert("Login successful!");
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
        window.location.href = 'dashboard.html'; // Redirect to your dashboard page
    } else {
        alert("Invalid email or password.");
    }
});
