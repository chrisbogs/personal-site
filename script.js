// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title (optional enhancement)
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Form handling (if you add a contact form later)
function handleFormSubmit(event) {
    event.preventDefault();
    // Add your form handling logic here
    alert('Thank you for your message! I\'ll get back to you soon.');
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated!
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s';
        setTimeout(() => {
            document.body.style.transform = 'none';
            alert('🎉 You found the easter egg! 🎉');
        }, 2000);
        konamiCode = [];
    }
});

// Performance optimization: Lazy loading for project images
document.addEventListener('DOMContentLoaded', () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Console message for developers
console.log(`
🚀 Welcome to my portfolio!
    
If you're checking out the console, you might be interested in the code.
Feel free to explore the repository and don't hesitate to reach out!
    
Built with vanilla HTML, CSS, and JavaScript.
No frameworks needed for this clean, responsive design.
`);

// Analytics placeholder (replace with your analytics code)
function trackEvent(category, action, label) {
    // Example: Google Analytics event tracking
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track clicks on important elements
document.addEventListener('DOMContentLoaded', () => {
    // Track social link clicks
    document.querySelectorAll('.social-link, .social-btn').forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.href.includes('github') ? 'GitHub' : 
                           link.href.includes('linkedin') ? 'LinkedIn' : 'Email';
            trackEvent('Social', 'Click', platform);
        });
    });

    // Track project link clicks
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', () => {
            const type = link.textContent.includes('Code') ? 'Code' : 'Demo';
            trackEvent('Project', 'Click', type);
        });
    });

    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('Button', 'Click', button.textContent.trim());
        });
    });
});