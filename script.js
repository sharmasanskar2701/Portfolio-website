/* ============================================
   Portfolio Website - JavaScript
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================
       Smooth Scrolling for Navigation Links
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ============================================
       Navbar Scroll Effect
       ============================================ */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ============================================
       Mobile Menu Toggle
       ============================================ */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    /* ============================================
       Scroll Animations using Intersection Observer
       ============================================ */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.grid > *, .skills-grid > *, .about-highlights > *');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('fade-in-up');
                });
                
                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Observe individual cards and boxes
    document.querySelectorAll('.card, .box, .skill-item, .highlight-item').forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
    });

    /* ============================================
       Skill Items Animation on Scroll
       ============================================ */
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    /* ============================================
       Hero Section Animation
       ============================================ */
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.classList.add('animate-in');
    }
    if (heroImage) {
        heroImage.classList.add('animate-in');
    }

    /* ============================================
       Project Cards - More Interactive
       ============================================ */
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '';
        });
    });

    /* ============================================
       Education Boxes - Tilt Effect
       ============================================ */
    const educationBoxes = document.querySelectorAll('.education-box');
    
    educationBoxes.forEach(box => {
        box.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    });

    /* ============================================
       Contact Links - Hover Animation
       ============================================ */
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    /* ============================================
       Active Navigation Link Highlighting
       ============================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ============================================
       Typing Effect for Hero Text
       ============================================ */
    const taglineElement = document.querySelector('.tagline');
    if (taglineElement) {
        const text = taglineElement.textContent;
        taglineElement.textContent = '';
        taglineElement.style.borderRight = '3px solid var(--secondary-color)';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                taglineElement.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                taglineElement.style.borderRight = 'none';
            }
        }, 50);
    }

    /* ============================================
       Back to Top Button
       ============================================ */
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 999;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ============================================
       Preloader (Optional)
       ============================================ */
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--white);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    preloader.innerHTML = '<div class="spinner"></div>';
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid var(--light-bg);
            border-top-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    /* ============================================
       Year Auto-Update in Footer
       ============================================ */
    const footerYear = document.querySelector('footer p:first-child');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Sanskar Sharma. All Rights Reserved.`;
    }

    /* ============================================
       Lazy Loading for Images
       ============================================ */
    const images = document.querySelectorAll('img[src]');
    
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    /* ============================================
       Add CSS for Animations
       ============================================ */
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        /* Fade In Up Animation */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Hero Animation */
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .hero-text.animate-in {
            animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .hero-image.animate-in {
            animation: slideInRight 0.8s ease-out forwards;
        }
        
        /* Nav Active Link */
        .nav-links a.active {
            color: var(--primary-color);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
        
        /* Back to Top Hover */
        .back-to-top:hover {
            background: var(--primary-dark);
            transform: translateY(-5px);
        }
        
        /* Contact Item Hover */
        .contact-item:hover {
            transform: translateX(10px);
        }
        
        /* Button Hover Effects */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .btn:hover::before {
            left: 100%;
        }
        
        /* Skill Item Pulse on Hover */
        .skill-item:hover i {
            animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        /* Project Card Glow */
        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: var(--border-radius);
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }
        
        .project-card:hover::before {
            opacity: 0.05;
        }
    `;
    document.head.appendChild(animationStyles);

    /* ============================================
       Console Welcome Message
       ============================================ */
    console.log('%c🎨 Portfolio Website', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cWelcome to my portfolio! Feel free to explore.', 'color: #64748b;');

});
