// ===========================
// Age Verification
// ===========================

const ageModal = document.getElementById('age-modal');
const ageConfirm = document.getElementById('age-confirm');
const ageDecline = document.getElementById('age-decline');

// Check if user has already verified age
const hasVerifiedAge = localStorage.getItem('ageVerified');

if (hasVerifiedAge === 'true') {
    ageModal.classList.add('hidden');
} else {
    ageModal.classList.remove('hidden');
}

ageConfirm.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    ageModal.classList.add('hidden');
});

ageDecline.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
});

// ===========================
// Navigation
// ===========================

const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Reveal Animation
// ===========================

const revealElements = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
};

// Initial check on page load
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===========================
// Gallery Carousel
// ===========================

const carouselSlides = document.querySelectorAll('.gallery-slide');
const carouselPrevBtn = document.getElementById('carousel-prev');
const carouselNextBtn = document.getElementById('carousel-next');
const carouselIndicatorsContainer = document.getElementById('carousel-indicators');

let currentSlideIndex = 0;
const totalSlides = carouselSlides.length;

// Create carousel indicators
function createIndicators() {
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        carouselIndicatorsContainer.appendChild(indicator);
    }
}

// Update carousel display
function updateCarousel() {
    // Remove active class from all slides
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to current slide
    carouselSlides[currentSlideIndex].classList.add('active');
    
    // Update indicators
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Go to specific slide
function goToSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
}

// Navigate to previous slide
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Navigate to next slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateCarousel();
}

// Event listeners for carousel buttons
if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', prevSlide);
}

if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', nextSlide);
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    // Only navigate if we're in the gallery section
    const gallerySection = document.getElementById('gallery');
    if (!gallerySection) return;
    
    const rect = gallerySection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }
});

// Initialize carousel
createIndicators();
updateCarousel();

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const gallerySlides = document.querySelector('.gallery-slides');
if (gallerySlides) {
    gallerySlides.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    gallerySlides.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// ===========================
// Booking Form - Now Using JotForm
// ===========================

// JotForm handles all form functionality automatically:
// - Form validation
// - File uploads (up to 10MB per file)
// - Email notifications with attachments
// - Data storage
// - Mobile optimization

// Optional: Track form submissions for analytics
window.addEventListener('message', function(e) {
    // JotForm sends messages when form is submitted
    if (e.data && typeof e.data === 'string') {
        try {
            const data = JSON.parse(e.data);
            if (data.action === 'submission-completed') {
                console.log('Booking form submitted successfully');
                // Add analytics tracking here if needed
                // Example: gtag('event', 'booking_submitted');
            }
        } catch (err) {
            // Not a JSON message, ignore
        }
    }
});

// ===========================
// Intersection Observer for Performance
// ===========================

// Lazy load images
const images = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

images.forEach(img => imageObserver.observe(img));

// ===========================
// Parallax Effect on Hero
// ===========================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===========================
// Smooth Scroll to Top
// ===========================

// Add a scroll to top button
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top-btn';
    button.setAttribute('aria-label', 'Scroll to top');
    
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: var(--text-light);
        font-size: 1.5rem;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(45, 27, 61, 0.3);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollTopButton();

// ===========================
// Loading Animation
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Console Message
// ===========================

console.log('%c Makayla Moon Inc. ', 'background: #2d1b3d; color: #d4af37; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Website designed with ❤️ ', 'background: #f4e5d4; color: #2d1b3d; font-size: 14px; padding: 5px;');
console.log('%c Booking powered by JotForm ', 'background: #d4af37; color: #2d1b3d; font-size: 12px; padding: 5px;');
