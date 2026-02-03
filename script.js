// ================================
// TITAN PORTFOLIO - INTERACTIONS
// ================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initLoadingScreen();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initParallaxEffect();
});

// ========== LOADING SCREEN ==========
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after animation
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 3000);
}

// ========== NAVIGATION ==========
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
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
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    const sections = document.querySelectorAll('.section');
    const skillCategories = document.querySelectorAll('.skill-category');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const educationCards = document.querySelectorAll('.education-card');
    const contactCards = document.querySelectorAll('.contact-card');

    // Add reveal class and observe
    const elementsToAnimate = [
        ...sections,
        ...skillCategories,
        ...timelineItems,
        ...projectCards,
        ...educationCards,
        ...contactCards
    ];

    elementsToAnimate.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Stagger animations for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// ========== PARALLAX EFFECT ==========
function initParallaxEffect() {
    const fogLayers = document.querySelectorAll('.fog-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        fogLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.3;
            layer.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========== HERO TITLE EFFECT ==========
function initHeroEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    // Add subtle glitch effect on hover
    heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.textShadow = '0 0 50px rgba(139, 30, 30, 0.5)';
    });

    heroTitle.addEventListener('mouseleave', () => {
        heroTitle.style.textShadow = '0 0 30px rgba(139, 30, 30, 0.3)';
    });
}

// ========== CURSOR TRAIL EFFECT ==========
function initCursorEffect() {
    // Only on desktop
    if (window.innerWidth < 968) return;

    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.circle');

    if (circles.length === 0) {
        // Create cursor trail circles
        for (let i = 0; i < 12; i++) {
            const circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgba(139, 30, 30, 0.3);
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(circle);
        }
    }

    const circles2 = document.querySelectorAll('.circle');

    // Update coordinates on mouse move
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    // Animate circles
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles2.forEach((circle, index) => {
            circle.style.left = x - 4 + 'px';
            circle.style.top = y - 4 + 'px';
            circle.style.transform = `scale(${(circles2.length - index) / circles2.length})`;

            const nextCircle = circles2[index + 1] || circles2[0];
            x += (nextCircle.offsetLeft - x) * 0.3;
            y += (nextCircle.offsetTop - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// ========== PROJECT CARD INTERACTIONS ==========
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });

        // Subtle 3D effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// ========== SKILL TAGS INTERACTION ==========
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// ========== TYPING EFFECT ==========
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';

    let index = 0;
    const speed = 100;

    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing after hero loads
    setTimeout(type, 2000);
}

// ========== CONTACT CARDS EFFECT ==========
function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'all 0.5s ease';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ========== SCROLL PROGRESS INDICATOR ==========
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #8b1e1e, #9d7e5f);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ========== TIMELINE ANIMATION ==========
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
}

// ========== EASTER EGG ==========
function initEasterEgg() {
    let konami = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konami.push(e.key);
        konami.splice(-konamiCode.length - 1, konami.length - konamiCode.length);

        if (konami.join('') === konamiCode.join('')) {
            activateScoutMode();
        }
    });
}

function activateScoutMode() {
    // Add special effect
    document.body.style.animation = 'scoutActivation 2s ease';
    
    const message = document.createElement('div');
    message.textContent = '🔥 SCOUT MODE ACTIVATED 🔥';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Cinzel', serif;
        font-size: 3rem;
        color: #8b1e1e;
        text-shadow: 0 0 30px rgba(139, 30, 30, 0.8);
        z-index: 10002;
        animation: fadeInOut 3s ease;
        pointer-events: none;
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add animation for scout mode
const style = document.createElement('style');
style.textContent = `
    @keyframes scoutActivation {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(180deg); }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    }
`;
document.head.appendChild(style);

// ========== INITIALIZE ADDITIONAL FEATURES ==========
setTimeout(() => {
    initHeroEffect();
    initCursorEffect();
    initProjectCards();
    initSkillTags();
    initContactCards();
    initScrollProgress();
    initTimelineAnimation();
    initEasterEgg();
}, 1000);

// ========== PERFORMANCE OPTIMIZATION ==========
// Throttle scroll events for better performance
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Optimized scroll handling
}, 100));

// ========== LOG WELCOME MESSAGE ==========
console.log('%c⚔️ TITAN PORTFOLIO', 'font-size: 24px; font-weight: bold; color: #8b1e1e;');
console.log('%cScout Regiment Archives', 'font-size: 14px; color: #9d7e5f;');
console.log('%cThose who see data clearly control the battlefield.', 'font-style: italic; color: #f4f1ea;');
