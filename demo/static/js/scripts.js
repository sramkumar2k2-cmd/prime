// Mobile menu toggle functionality
document.getElementById('mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    
    // Animate hamburger to X
    const spans = this.querySelectorAll('span');
    if (document.querySelector('.nav-links').classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        
        // Reset hamburger animation
        const spans = document.querySelectorAll('.menu-toggle span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navbar.contains(event.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        
        // Reset hamburger animation
        const spans = document.querySelectorAll('.menu-toggle span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to the server
            // For now, we'll just show a success message
            alert('Thanks for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// Animate elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = 1;
        observer.unobserve(entry.target);
    });
}, fadeInOptions);

fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s ease-in-out';
    fadeInObserver.observe(element);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// NEWSLETTER SUBSCRIPTION FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const messageDiv = document.getElementById('subscriptionMessage');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(response => response.json())
            .then(data => {
                // Show message
                messageDiv.style.display = 'block';
                if (data.success) {
                    messageDiv.style.backgroundColor = '#d4edda';
                    messageDiv.style.color = '#155724';
                    messageDiv.style.border = '1px solid #c3e6cb';
                    newsletterForm.reset();
                } else {
                    messageDiv.style.backgroundColor = '#f8d7da';
                    messageDiv.style.color = '#721c24';
                    messageDiv.style.border = '1px solid #f5c6cb';
                }
                messageDiv.textContent = data.message;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                messageDiv.style.display = 'block';
                messageDiv.style.backgroundColor = '#f8d7da';
                messageDiv.style.color = '#721c24';
                messageDiv.style.border = '1px solid #f5c6cb';
                messageDiv.textContent = 'An error occurred. Please try again.';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            })
            .finally(() => {
                // Restore button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
});

// Add CSS for message display if not already in your CSS
const style = document.createElement('style');
style.textContent = `
    #subscriptionMessage {
        display: none;
        margin-top: 10px;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 14px;
    }
`;
document.head.appendChild(style);

