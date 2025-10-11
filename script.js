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

// Auto-play carousel (optional - uncomment to enable)
// let autoPlayInterval;
// function startAutoPlay() {
//     autoPlayInterval = setInterval(() => {
//         nextSlide();
//     }, 5000); // Change slide every 5 seconds
// }

// function stopAutoPlay() {
//     clearInterval(autoPlayInterval);
// }

// Start auto-play
// startAutoPlay();

// Pause auto-play on hover
// const carouselContainer = document.querySelector('.gallery-carousel');
// if (carouselContainer) {
//     carouselContainer.addEventListener('mouseenter', stopAutoPlay);
//     carouselContainer.addEventListener('mouseleave', startAutoPlay);
// }

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
// Booking Form with EmailJS
// ===========================

// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
    serviceID: 'service_42we7vj',
    templateID: 'template_kgkgtf8',
    publicKey: 'tB3W_IO_tAM6wSXw-'
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

const bookingForm = document.querySelector('.booking-form');

// Custom file upload handling
const setupFileUpload = (inputId, displayId) => {
    const fileInput = document.getElementById(inputId);
    const fileDisplay = document.getElementById(displayId);
    
    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                fileDisplay.textContent = fileName;
                fileDisplay.classList.add('has-file');
            } else {
                fileDisplay.textContent = 'No file chosen';
                fileDisplay.classList.remove('has-file');
            }
        });
    }
};

// Initialize file uploads
setupFileUpload('id_front', 'id_front_display');
setupFileUpload('id_selfie', 'id_selfie_display');

// Detect if user is on mobile device
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
};

// Compress image file to reduce size for email attachment
const compressImage = async (file) => {
    const isMobile = isMobileDevice();
    
    // More aggressive compression settings for mobile devices
    const options = {
        maxSizeMB: isMobile ? 0.25 : 0.35,         // Smaller size for mobile (250KB vs 350KB)
        maxWidthOrHeight: isMobile ? 1280 : 1920,  // Lower resolution for mobile
        useWebWorker: !isMobile,                   // Disable web workers on mobile for better compatibility
        fileType: 'image/jpeg',                    // Convert to JPEG for better compression
        initialQuality: isMobile ? 0.7 : 0.75,     // Lower quality on mobile for better compression
        alwaysKeepResolution: false                // Allow resolution reduction if needed
    };
    
    try {
        console.log(`Device type: ${isMobile ? 'Mobile' : 'Desktop'}`);
        console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
        
        // Multi-pass compression for very large files
        let compressedFile = file;
        let compressionAttempts = 0;
        const maxAttempts = 3;
        
        while (compressedFile.size > options.maxSizeMB * 1024 * 1024 && compressionAttempts < maxAttempts) {
            compressionAttempts++;
            
            // Reduce quality further with each attempt
            const adjustedOptions = {
                ...options,
                initialQuality: options.initialQuality * (0.85 ** compressionAttempts)
            };
            
            console.log(`Compression attempt ${compressionAttempts} with quality ${adjustedOptions.initialQuality.toFixed(2)}`);
            compressedFile = await imageCompression(compressedFile, adjustedOptions);
        }
        
        console.log(`Final compressed size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
        console.log(`Compression ratio: ${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`);
        
        return compressedFile;
    } catch (error) {
        console.error('Compression error:', error);
        throw error;
    }
};

// Convert file to Base64 for email attachment
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

// Format datetime for display
const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Collect all form data
        const formData = new FormData(bookingForm);
        const bookingData = {};
        
        formData.forEach((value, key) => {
            if (key !== 'id_front' && key !== 'id_selfie') {
                bookingData[key] = value;
            }
        });

        // Basic validation
        const requiredFields = ['name', 'email', 'phone', 'pronouns', 'contact_method', 'city', 'date_length', 'preferred_datetime', 'location_preference'];
        let isValid = true;

        requiredFields.forEach(field => {
            if (!bookingData[field]) {
                isValid = false;
            }
        });

        // Check if file uploads are present
        const idFrontFile = formData.get('id_front');
        const idSelfieFile = formData.get('id_selfie');
        
        if (!idFrontFile || !idSelfieFile || idFrontFile.size === 0 || idSelfieFile.size === 0) {
            isValid = false;
            alert('Please upload both required ID images.');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        
        // Pre-validation: Warn if files are extremely large
        const maxRecommendedSize = 20 * 1024 * 1024; // 20MB
        if (idFrontFile.size > maxRecommendedSize || idSelfieFile.size > maxRecommendedSize) {
            const shouldContinue = confirm(
                'Warning: One or both of your images are very large.\n\n' +
                'For best results, please take photos at a lower resolution or use an image editor to reduce the file size before uploading.\n\n' +
                'Click OK to continue anyway (may take longer), or Cancel to go back and optimize your images.'
            );
            
            if (!shouldContinue) {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                return;
            }
        }

        if (!isValid) {
            alert('Please fill out all required fields before submitting.');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        // Compress images before sending (keeps them under 500KB for email)
        submitButton.textContent = 'Compressing images...';
        
        let compressedIdFront, compressedIdSelfie;
        let idFrontBase64 = '';
        let idSelfieBase64 = '';
        
        try {
            // Compress both ID images
            compressedIdFront = await compressImage(idFrontFile);
            compressedIdSelfie = await compressImage(idSelfieFile);
            
            // Convert compressed images to Base64
            submitButton.textContent = 'Preparing email...';
            idFrontBase64 = await fileToBase64(compressedIdFront);
            idSelfieBase64 = await fileToBase64(compressedIdSelfie);
            
        } catch (error) {
            console.error('Error processing images:', error);
            
            let errorMsg = '❌ Error processing ID images.\n\n';
            
            if (error.message && error.message.includes('memory')) {
                errorMsg += 'Your device may not have enough memory to process these large images.\n\n';
                errorMsg += 'Please try:\n';
                errorMsg += '• Taking new photos at a lower resolution\n';
                errorMsg += '• Using a photo editor app to reduce image size\n';
                errorMsg += '• Trying on a different device';
            } else {
                errorMsg += 'Please try with smaller image files.\n\n';
                errorMsg += 'Tips:\n';
                errorMsg += '• Lower your camera resolution in settings\n';
                errorMsg += '• Use an image compression app first\n';
                errorMsg += '• Take photos in good lighting (smaller file sizes)';
            }
            
            alert(errorMsg);
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        // Format the email content
        const emailParams = {
            to_email: 'casperigram@gmail.com',
            from_name: bookingData.name,
            from_email: bookingData.email,
            subject: `New Booking Request from ${bookingData.name}`,
            
            // Personal Information
            client_name: bookingData.name,
            client_email: bookingData.email,
            client_phone: bookingData.phone,
            client_pronouns: bookingData.pronouns,
            preferred_contact: bookingData.contact_method,
            
            // Booking Details
            desired_city: bookingData.city,
            date_length: bookingData.date_length,
            preferred_datetime: formatDateTime(bookingData.preferred_datetime),
            location_type: bookingData.location_preference.charAt(0).toUpperCase() + bookingData.location_preference.slice(1),
            
            // File information with attachments
            id_front_name: idFrontFile.name,
            id_front_original_size: (idFrontFile.size / 1024).toFixed(2) + ' KB',
            id_front_compressed_size: (compressedIdFront.size / 1024).toFixed(2) + ' KB',
            id_selfie_name: idSelfieFile.name,
            id_selfie_original_size: (idSelfieFile.size / 1024).toFixed(2) + ' KB',
            id_selfie_compressed_size: (compressedIdSelfie.size / 1024).toFixed(2) + ' KB',
            
            // Attachments (Base64 encoded compressed images)
            id_front_attachment: idFrontBase64,
            id_selfie_attachment: idSelfieBase64,
            
            // Formatted message body
            message: `
═══════════════════════════════════════
         NEW BOOKING REQUEST
═══════════════════════════════════════

CLIENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Pronouns: ${bookingData.pronouns}
Preferred Contact: ${bookingData.contact_method}

BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Desired City: ${bookingData.city}
Date Length: ${bookingData.date_length}
Preferred Date/Time: ${formatDateTime(bookingData.preferred_datetime)}
Location Preference: ${bookingData.location_preference.charAt(0).toUpperCase() + bookingData.location_preference.slice(1)}

VERIFICATION DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID Front: ${idFrontFile.name}
  Original: ${(idFrontFile.size / 1024).toFixed(2)} KB
  Compressed: ${(compressedIdFront.size / 1024).toFixed(2)} KB
  
ID Selfie: ${idSelfieFile.name}
  Original: ${(idSelfieFile.size / 1024).toFixed(2)} KB
  Compressed: ${(compressedIdSelfie.size / 1024).toFixed(2)} KB

✅ ID documents are attached to this email (automatically compressed).

═══════════════════════════════════════
Submitted: ${new Date().toLocaleString('en-US')}
═══════════════════════════════════════
            `
        };

        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            emailParams
        );

        if (response.status === 200) {
            alert('✅ Thank you for your booking request! \n\nYour information has been received and we will review it shortly. You will receive a response within 24 hours via your preferred contact method.');
            bookingForm.reset();
            
            // Reset file upload displays
            document.getElementById('id_front_display').textContent = 'No file chosen';
            document.getElementById('id_front_display').classList.remove('has-file');
            document.getElementById('id_selfie_display').textContent = 'No file chosen';
            document.getElementById('id_selfie_display').classList.remove('has-file');
        }

    } catch (error) {
        console.error('EmailJS Error:', error);
        
        // User-friendly error messages
        let errorMessage = '❌ Sorry, there was an error sending your booking request.\n\n';
        
        if (error.text && error.text.includes('size')) {
            errorMessage += 'The images are too large even after compression.\n\n';
            errorMessage += 'Please try:\n';
            errorMessage += '• Take photos with your camera set to "Low" or "Medium" quality\n';
            errorMessage += '• Compress images using an app before uploading\n';
            errorMessage += '• Try on a desktop/laptop computer\n\n';
            errorMessage += 'Or contact us directly at casperigram@gmail.com with your ID photos attached.';
        } else if (error.status === 412) {
            errorMessage += 'Configuration error. Please contact support at casperigram@gmail.com.';
        } else if (error.status === 422) {
            errorMessage += 'The email service rejected the request.\n\n';
            errorMessage += 'This usually means the attachments are still too large.\n\n';
            errorMessage += 'Please email your booking request directly to:\ncasperigram@gmail.com';
        } else {
            errorMessage += 'Network or service error.\n\n';
            errorMessage += 'Please check your internet connection and try again, or contact us directly at:\ncasperigram@gmail.com';
        }
        
        alert(errorMessage);
    } finally {
        // Restore button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// ===========================
// Platform Links Click Tracking (Optional)
// ===========================

// Uncomment below if you want to add analytics tracking
// const platformLinks = document.querySelectorAll('.platform-link');
// platformLinks.forEach(link => {
//     link.addEventListener('click', () => {
//         const platformName = link.closest('.platform-card').querySelector('h3').textContent;
//         console.log(`Clicked: ${platformName}`);
//         // Add analytics tracking here
//         // Example: gtag('event', 'platform_click', { platform_name: platformName });
//     });
// });

// ===========================
// Intersection Observer for Performance
// ===========================

// Lazy load images
const images = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Image is already loaded with src, but you can add data-src for lazy loading
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

// Add a scroll to top button (optional enhancement)
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
