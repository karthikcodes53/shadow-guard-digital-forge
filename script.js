
// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            // Simulate form submission
            showNotification('Message transmitted successfully! Our team will respond within 24 hours.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Scroll animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Terminal typing effect for error page
    if (document.querySelector('.error-page')) {
        typewriterEffect();
    }
});

// Helper function to scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: var(--secondary-dark);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: var(--text-primary);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'var(--accent-green)';
        notification.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--accent-amber)';
        notification.style.boxShadow = '0 10px 30px rgba(217, 119, 6, 0.3)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'warning': return '⚠️';
        default: return 'ℹ️';
    }
}

// Typewriter effect for error page terminal
function typewriterEffect() {
    const lines = document.querySelectorAll('.terminal-line');
    let currentLine = 0;
    
    function typeLine() {
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            line.style.opacity = '0';
            
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.animation = 'fadeIn 0.5s ease-in';
                currentLine++;
                typeLine();
            }, 500);
        }
    }
    
    typeLine();
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add glow effect on hover for buttons
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('btn-primary')) {
        e.target.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.6)';
    } else if (e.target.classList.contains('btn-secondary')) {
        e.target.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('btn-primary')) {
        e.target.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
    } else if (e.target.classList.contains('btn-secondary')) {
        e.target.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.3)';
    }
});

// Add loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
});

// Console easter egg
console.log(`
███████╗██╗     ██╗████████╗███████╗    ████████╗ █████╗  ██████╗████████╗██╗ ██████╗ █████╗ ██╗     
██╔════╝██║     ██║╚══██╔══╝██╔════╝    ╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝██║██╔════╝██╔══██╗██║     
█████╗  ██║     ██║   ██║   █████╗         ██║   ███████║██║        ██║   ██║██║     ███████║██║     
██╔══╝  ██║     ██║   ██║   ██╔══╝         ██║   ██╔══██║██║        ██║   ██║██║     ██╔══██║██║     
███████╗███████╗██║   ██║   ███████╗       ██║   ██║  ██║╚██████╗   ██║   ██║╚██████╗██║  ██║███████╗
╚══════╝╚══════╝╚═╝   ╚═╝   ╚══════╝       ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝

Mission Status: OPERATIONAL
Security Level: CLASSIFIED
Access Level: AUTHORIZED PERSONNEL ONLY

Welcome to Elite Tactical Operations.
`);
