/**
 * Mygo Kasumi LLC - Main JavaScript
 * Google-style interactions and animations
 */

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  const suffix = el.dataset.suffix || '';
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.target, 10);
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target);
        // Add suffix after animation
        setTimeout(() => {
          entry.target.textContent = target + suffix;
        }, 1900);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.service-card, .testimonial-card, .team-card, .value-card, .why-feature, .stat-item, .process-step, .service-detail-card'
  );

  if (!elements.length) return;

  // Set initial state
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.08}s, transform 0.5s ease ${(i % 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#EA4335';
        field.style.boxShadow = '0 0 0 2px rgba(234,67,53,0.2)';
        valid = false;
      } else {
        field.style.borderColor = '#34A853';
        field.style.boxShadow = '0 0 0 2px rgba(52,168,83,0.2)';
      }
    });

    // Email validation
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        emailField.style.borderColor = '#EA4335';
        emailField.style.boxShadow = '0 0 0 2px rgba(234,67,53,0.2)';
        valid = false;
      }
    }

    if (!valid) return;

    // Simulate form submission
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
      }
    }, 1200);
  });

  // Real-time validation feedback
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.required && !field.value.trim()) {
        field.style.borderColor = '#EA4335';
        field.style.boxShadow = '0 0 0 2px rgba(234,67,53,0.2)';
      } else if (field.value.trim()) {
        field.style.borderColor = '#34A853';
        field.style.boxShadow = '0 0 0 2px rgba(52,168,83,0.2)';
      }
    });

    field.addEventListener('focus', () => {
      field.style.borderColor = '#4285F4';
      field.style.boxShadow = '0 0 0 2px rgba(66,133,244,0.2)';
    });
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== HIDE MAP FOR CHINESE =====
function hideMapForChinese() {
  const mapSection = document.getElementById('mapSection');
  if (!mapSection) return;
  
  // Check current language from i18n
  const currentLang = localStorage.getItem('mkLang') || 'en';
  if (currentLang === 'zh') {
    mapSection.style.display = 'none';
  }
  
  // Listen for language changes
  const originalSetLang = window.i18n?.setLang;
  if (window.i18n) {
    window.i18n.setLang = function(lang) {
      originalSetLang?.call(this, lang);
      if (lang === 'zh') {
        mapSection.style.display = 'none';
      } else {
        mapSection.style.display = '';
      }
    };
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();
  hideMapForChinese();
});
