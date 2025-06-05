// ../js/register.js
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Store in localStorage
    const user = { name, email, password, userType };
    localStorage.setItem('servicehubUser', JSON.stringify(user));

    alert("Registration successful! Redirecting to login.");
    window.location.href = 'login.html';
});
