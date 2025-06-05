// Shared JavaScript functions across all pages

// Database simulation (in a real app, this would be server-side)
const servicesDatabase = [
    {
        id: 1,
        title: "Electrical Wiring Installation",
        category: "electrical",
        description: "Professional electrical wiring installation for homes and offices. Certified electrician with 10+ years of experience.",
        price: "$120 - $300",
        rating: 4.8,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
        location: "Downtown"
    },
    // ... (other service items from your original index.html)
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Initialize login drawer toggle
    const loginDrawerToggle = document.getElementById('loginDrawerToggle');
    const loginDrawer = document.getElementById('loginDrawer');
    const loginDrawerClose = document.getElementById('loginDrawerClose');
    
    if (loginDrawerToggle && loginDrawer) {
        loginDrawerToggle.addEventListener('click', function() {
            loginDrawer.classList.toggle('closed');
        });
    }
    
    if (loginDrawerClose && loginDrawer) {
        loginDrawerClose.addEventListener('click', function() {
            loginDrawer.classList.add('closed');
        });
    }
    
    // Initialize form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // Page-specific initializations
    if (document.getElementById('serviceListings')) {
        loadServices('all');
    }
    
    if (document.getElementById('map')) {
        initMap();
    }
});

// Shared Functions
function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function loadServices(category) {
    const serviceListings = document.getElementById('serviceListings');
    if (!serviceListings) return;
    
    serviceListings.innerHTML = '';
    
    const servicesToShow = category === 'all' 
        ? servicesDatabase 
        : servicesDatabase.filter(service => service.category === category);
    
    servicesToShow.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'bg-white rounded-lg overflow-hidden shadow-md service-card transition duration-300';
        serviceCard.innerHTML = `
            <img src="${service.image}" alt="${service.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold">${service.title}</h3>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${service.location}</span>
                </div>
                <p class="text-gray-600 text-sm mb-3">${service.description}</p>
                <div class="flex items-center mb-3">
                    <div class="text-yellow-400 mr-2">
                        ${renderStars(service.rating)}
                    </div>
                    <span class="text-gray-500 text-sm">(${service.reviews} reviews)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-blue-600">${service.price}</span>
                    <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                        Book Now
                    </button>
                </div>
            </div>
        `;
        serviceListings.appendChild(serviceCard);
    });
}

function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;
    
    mapDiv.innerHTML = '<div class="bg-gray-200 h-full w-full flex items-center justify-center"><i class="fas fa-map-marked-alt text-4xl text-blue-600"></i></div>';
}

// Form Handlers
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    console.log('Contact form submitted:', { name, email, subject, message });
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log('Login attempt:', { email, password });
    alert('Login successful! (This is a demo)');
    
    const loginDrawer = document.getElementById('loginDrawer');
    if (loginDrawer) loginDrawer.classList.add('closed');
    
    // Redirect to dashboard in a real app
    // window.location.href = '/user/dashboard.html';
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const userType = document.getElementById('userType').value;
    
    console.log('Registration:', { name, email, password, userType });
    alert(`Thank you for registering as a ${userType === 'buyer' ? 'service buyer' : 'service provider'}! (This is a demo)`);
    
    e.target.reset();
    const loginDrawer = document.getElementById('loginDrawer');
    if (loginDrawer) loginDrawer.classList.add('closed');
    
    // Redirect to appropriate dashboard in a real app
    // if (userType === 'buyer') {
    //     window.location.href = '/user/dashboard.html';
    // } else {
    //     window.location.href = '/vendor/dashboard.html';
    // }
}