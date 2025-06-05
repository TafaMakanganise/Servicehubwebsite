document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.toggle('hidden');
    });

    // Form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log('Login attempt:', { email, password });
        alert('Login successful! Redirecting to dashboard...');
        window.location.href = '../user/dashboard.html';
    });
});