
// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Service selection handler
function selectService(serviceType) {
    console.log(`Selected service: ${serviceType}`);
    
    // Add visual feedback
    const serviceButtons = document.querySelectorAll('.service-button');
    serviceButtons.forEach(button => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '';
    });
    
    // Highlight selected service
    event.target.closest('.service-button').style.transform = 'translateY(-8px)';
    event.target.closest('.service-button').style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.4)';
    
    // Auto-fill contact form
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceType;
    }
    
    // Scroll to contact section after a short delay
    setTimeout(() => {
        scrollToSection('contact');
    }, 800);
    
    // Show tactical feedback
    showTacticalMessage(`Service Module ${serviceType.toUpperCase()} Selected - Stand By...`);
}

// Operator selection handler
function selectOperator(operatorType) {
    console.log(`Selected operator: ${operatorType}`);
    
    // Add visual feedback
    const teamButtons = document.querySelectorAll('.team-button');
    teamButtons.forEach(button => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '';
    });
    
    // Highlight selected operator
    event.target.closest('.team-button').style.transform = 'translateY(-8px)';
    event.target.closest('.team-button').style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
    
    // Show operator info
    const operatorInfo = {
        'parasf': 'Para SF - India\'s premier special forces unit specializing in counter-terrorism and unconventional warfare.',
        'marcos': 'MARCOS - Elite naval special forces trained for maritime operations and amphibious warfare.',
        'garud': 'Garud - Air Force special forces specialized in airfield security and combat search & rescue.'
    };
    
    showTacticalMessage(`Operator Profile: ${operatorInfo[operatorType]}`);
}

// Tactical message display
function showTacticalMessage(message) {
    // Create or update tactical message overlay
    let messageOverlay = document.getElementById('tactical-message');
    
    if (!messageOverlay) {
        messageOverlay = document.createElement('div');
        messageOverlay.id = 'tactical-message';
        messageOverlay.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(26, 26, 26, 0.95);
            border: 1px solid #374151;
            border-radius: 10px;
            padding: 1rem 1.5rem;
            color: #10b981;
            font-family: 'Orbitron', monospace;
            font-size: 0.9rem;
            max-width: 300px;
            z-index: 1000;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(messageOverlay);
    }
    
    messageOverlay.textContent = message;
    
    // Show message
    setTimeout(() => {
        messageOverlay.style.opacity = '1';
        messageOverlay.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide message after delay
    setTimeout(() => {
        messageOverlay.style.opacity = '0';
        messageOverlay.style.transform = 'translateX(100%)';
    }, 4000);
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Simulate form submission
            showTacticalMessage('Message Transmitted - Awaiting Response...');
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                showTacticalMessage('Transmission Complete - Stand By for Contact');
            }, 2000);
            
            console.log('Form submitted:', { name, email, service, message });
        });
    }
    
    // Add navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
    
    // Add loading animation to page elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    // Observe service and team buttons
    document.querySelectorAll('.service-button, .team-button').forEach(button => {
        observer.observe(button);
    });
    
    // Add click sound effect simulation
    document.querySelectorAll('.service-button, .team-button').forEach(button => {
        button.addEventListener('click', function() {
            // Visual click feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        showTacticalMessage('CLASSIFIED ACCESS GRANTED - WELCOME OPERATIVE');
        
        // Add special effect
        document.body.style.animation = 'tacticalFlash 0.5s ease-in-out 3';
        
        // Reset after effect
        setTimeout(() => {
            document.body.style.animation = '';
            konamiCode = [];
        }, 2000);
    }
});

// Add tactical flash animation
const style = document.createElement('style');
style.textContent = `
    @keyframes tacticalFlash {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2) hue-rotate(90deg); }
    }
`;
document.head.appendChild(style);
