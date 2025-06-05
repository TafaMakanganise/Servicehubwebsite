document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.toggle('hidden');
    });

    // Form submission
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.querySelector('input[type="text"]').value,
            email: document.querySelector('input[type="email"]').value,
            service: document.querySelector('select').value,
            date: document.querySelector('input[type="date"]').value,
            notes: document.querySelector('textarea').value
        };
        console.log('Booking submitted:', formData);
        alert('Thank you for your booking! A service professional will contact you soon.');
        this.reset();
    });
});