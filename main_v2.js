// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === id) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', setActiveLink);

// ===== Scroll Reveal Animation =====
const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.dataset.count);
            animateCount(target, count);
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

function animateCount(el, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 1500;
    const stepTime = duration / 60;

    function step() {
        current += increment;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            return;
        }
        el.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// ===== Menu Tab Filtering =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.dataset.category;

        // Filter items with animation
        menuItems.forEach(item => {
            if (item.dataset.category === category) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Initialize menu: show only popular category + build flip card faces
document.addEventListener('DOMContentLoaded', () => {
    menuItems.forEach(item => {
        // Hide non-popular items initially
        if (item.dataset.category !== 'popular') {
            item.classList.add('hidden');
        }

        // Build flip card structure from existing content
        const content = item.querySelector('.menu-item-content');
        if (!content) return;

        const name = content.querySelector('h3')?.textContent || '';
        const desc = content.querySelector('.menu-item-desc')?.textContent || '';
        const price = content.querySelector('.menu-price')?.textContent || '';

        // Create front face
        const front = document.createElement('div');
        front.className = 'menu-item-front';
        front.innerHTML = `<h3>${name}</h3><p class="menu-item-desc">${desc}</p>`;

        // Create back face
        const back = document.createElement('div');
        back.className = 'menu-item-back';
        back.innerHTML = `
            <span class="back-name">${name}</span>
            <span class="back-price">${price}</span>
            <span class="back-cta">點擊訂購 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        `;

        // Replace content
        content.innerHTML = '';
        content.appendChild(front);
        content.appendChild(back);
    });
});

// ===== Smooth Parallax for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-bg img');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.15}px)`;
    }
});
