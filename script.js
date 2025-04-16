// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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

// Auto-scroll to The LEGIONS project section after the home page animation
setTimeout(function() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}, 6500); // Exactly 6.5 seconds to match the animation duration

// Play audio on page load with error handling
const audio = document.getElementById('background-audio');
window.addEventListener('load', () => {
    // Set audio properties
    audio.volume = 0.5; // Set volume to 50%
    
    // Try to play the audio
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Audio started playing successfully');
        }).catch(error => {
            console.log('Audio playback failed:', error);
            // Add a play button if autoplay fails
            const playButton = document.createElement('button');
            playButton.innerHTML = '▶ Play Music';
            playButton.style.position = 'fixed';
            playButton.style.bottom = '20px';
            playButton.style.right = '20px';
            playButton.style.zIndex = '1000';
            playButton.style.padding = '10px 20px';
            playButton.style.backgroundColor = '#3498db';
            playButton.style.color = 'white';
            playButton.style.border = 'none';
            playButton.style.borderRadius = '5px';
            playButton.style.cursor = 'pointer';
            
            playButton.addEventListener('click', () => {
                audio.play();
                playButton.remove();
            });
            
            document.body.appendChild(playButton);
        });
    }
}); 