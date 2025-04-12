// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Screen orientation handling
const orientationMessage = document.createElement('div');
orientationMessage.className = 'orientation-message';
orientationMessage.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <path d="M12 8v8"></path>
        <path d="M8 12h8"></path>
    </svg>
    <p>Please rotate your device for a better viewing experience</p>
`;
document.body.appendChild(orientationMessage);

// Handle orientation changes
function checkOrientation() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        if (window.matchMedia("(orientation: portrait)").matches) {
            orientationMessage.style.display = 'flex';
        } else {
            orientationMessage.style.display = 'none';
        }
    } else {
        orientationMessage.style.display = 'none';
    }
}

// Create mobile version link
const mobileLink = document.createElement('a');
mobileLink.href = '#';
mobileLink.className = 'mobile-version-link';
mobileLink.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12" y2="18"></line>
    </svg>
    (for <span class="mobile-text">MOBILE</span> version)
`;
mobileLink.addEventListener('click', function(e) {
    e.preventDefault();
    checkOrientation();
});

// Add mobile link to the document after the hero section
document.querySelector('.hero').appendChild(mobileLink);

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add scroll animation for sections
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
}); 