document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.toggle('hidden');
    });

    // User dropdown toggle
    const userDropdown = document.querySelector('.relative.group');
    if (userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            this.querySelector('div').classList.toggle('hidden');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.group-hover\\:block');
        if (dropdown) dropdown.classList.add('hidden');
    });

    // Profile form submission
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const newPassword = this.querySelector('input[type="password"]').value;
        console.log('Profile updated with new password:', newPassword);
        alert('Profile changes saved successfully!');
    });
});