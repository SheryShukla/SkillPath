// Enhanced JavaScript with more functionality

// Header Scroll Effect
const header = document.querySelector('.head');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize all sliders
const initSliders = () => {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(container => {
        const slider = container.querySelector('.slide-track');
        const slides = Array.from(slider.children);
        const slideWidth = slides[0].offsetWidth + 20; // Include gap
        
        // Duplicate slides for infinite effect
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            slider.appendChild(clone);
        });
        
        let position = 0;
        let isDown = false;
        let startX;
        let scrollLeft;
        let animationId;
        let isPaused = false;
        
        // Auto-scroll function
        const autoScroll = () => {
            if (!isPaused && !isDown) {
                position -= 1;
                if (position <= -slideWidth * slides.length / 2) {
                    position = 0;
                }
                slider.style.transform = `translateX(${position}px)`;
            }
            animationId = requestAnimationFrame(autoScroll);
        };
        
        // Start auto-scroll
        autoScroll();
        
        // Pause on hover
        container.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        container.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        
        // Drag functionality
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = position;
            cancelAnimationFrame(animationId);
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            autoScroll();
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            autoScroll();
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            position = scrollLeft - walk;
            slider.style.transform = `translateX(${position}px)`;
        });
        
        // Touch support
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = position;
            cancelAnimationFrame(animationId);
        });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
            autoScroll();
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            position = scrollLeft - walk;
            slider.style.transform = `translateX(${position}px)`;
        });
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSliders();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animation observer
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.stat-card, .objective, .slider-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    animateOnScroll();
});

// Dynamic year in footer
document.querySelector('.footer-bottom').innerHTML = `&copy; ${new Date().getFullYear()} SkillPath. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>`;