// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    function toggleMobileMenu() {
        document.getElementById('mobileMenu').classList.toggle('hidden');
    }
    document.querySelector('[onclick="toggleMobileMenu()"]').addEventListener('click', toggleMobileMenu);

    // Login drawer toggle
    function toggleLoginDrawer() {
        document.getElementById('loginDrawer').classList.toggle('closed');
    }
    document.querySelector('[onclick="toggleLoginDrawer()"]').addEventListener('click', toggleLoginDrawer);

    // Load services
    loadServices('all');

    // Initialize map
    initMap();
    
    // Form submission handlers
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
    document.getElementById('registerForm').addEventListener('submit', handleRegisterSubmit);
});

// Database simulation
const servicesDatabase = [
    // ... (same as in your original index.html)
];

const nearbyServicesDatabase = [
    // ... (same as in your original index.html)
];

// Load services function
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
                    <button onclick="window.location.href='booking.html'" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                        Book Now
                    </button>
                </div>
            </div>
        `;
        serviceListings.appendChild(serviceCard);
    });
}

// Filter services
function filterServices(category) {
    loadServices(category);
}

// Render stars
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

// Geolocation functions
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showPosition,
            showError,
            { enableHighAccuracy: true }
        );
    } else {
        document.getElementById('locationText').textContent = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    document.getElementById('locationText').innerHTML = `<i class="fas fa-check-circle text-green-400 mr-1"></i> Your location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    updateMap(lat, lng);
    loadNearbyServices();
}

function showError(error) {
    const locationText = document.getElementById('locationText');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            locationText.textContent = "You denied the request for geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationText.textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            locationText.textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            locationText.textContent = "An unknown error occurred.";
            break;
    }
    updateMap(40.7128, -74.0060); // Default to New York
}

function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;
    mapDiv.innerHTML = '<div class="bg-gray-200 h-full w-full flex items-center justify-center"><i class="fas fa-map-marked-alt text-4xl text-blue-600"></i></div>';
}

function updateMap(lat, lng) {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = `
        <div class="bg-gray-200 h-full w-full flex items-center justify-center relative">
            <i class="fas fa-map-marked-alt text-4xl text-blue-600"></i>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <i class="fas fa-map-pin text-3xl text-red-500"></i>
            </div>
            <div class="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs shadow">
                Approx. location: ${lat.toFixed(4)}, ${lng.toFixed(4)}
            </div>
        </div>
    `;
}

function loadNearbyServices() {
    const nearbyServices = document.getElementById('nearbyServices');
    if (!nearbyServices) return;
    
    nearbyServices.innerHTML = '';
    
    nearbyServicesDatabase.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'bg-white p-3 rounded shadow-sm';
        serviceItem.innerHTML = `
            <h4 class="font-semibold mb-1">${service.title}</h4>
            <div class="flex items-center text-sm text-gray-600 mb-1">
                <i class="fas fa-map-marker-alt mr-1 text-blue-500"></i>
                ${service.distance} away
            </div>
            <div class="flex justify-between items-center">
                <div class="text-yellow-400 text-sm">
                    ${renderStars(service.rating)}
                </div>
                <span class="text-blue-600 font-medium">${service.price}</span>
            </div>
        `;
        nearbyServices.appendChild(serviceItem);
    });
}

// Audio player functions
function playAudio() {
    document.getElementById('audioPlayer').classList.remove('hidden');
    document.getElementById('serviceAudio').play();
}

function closeAudioPlayer() {
    document.getElementById('audioPlayer').classList.add('hidden');
    document.getElementById('serviceAudio').pause();
}

// Form handlers
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
    document.getElementById('loginDrawer').classList.add('closed');
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
    document.getElementById('loginDrawer').classList.add('closed');
}