/**
 * AMRITA SINHA · PORTFOLIO — script.js
 * Handles: scroll progress, navbar, theme toggle,
 *          mobile menu, typing effect, fade-in animations,
 *          smooth scroll.
 */

/* =============================================
   1. SCROLL PROGRESS BAR
============================================= */
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop    = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
}, { passive: true });


/* =============================================
   2. NAVBAR — frosted glass on scroll
============================================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* =============================================
   3. THEME TOGGLE (dark ↔ light)
      Persists preference to localStorage
============================================= */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

// Load saved theme or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});


/* =============================================
   4. MOBILE HAMBURGER MENU
============================================= */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let   menuOpen   = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
});

// Close menu when any mobile nav link is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
  });
});


/* =============================================
   5. TYPING EFFECT — hero tagline
============================================= */
const phrases = [
  'Full-Stack Developer',
  'Django & Python Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Aspiring Software Engineer',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    // Pause at end of word before deleting
    delay      = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next phrase
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay       = 400;
  }

  setTimeout(type, delay);
}

// Start after hero entrance animations settle
setTimeout(type, 1200);


/* =============================================
   6. SCROLL-TRIGGERED FADE-IN
      Uses IntersectionObserver for performance
============================================= */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));


/* =============================================
   8. CURSOR GLOW — follows mouse
============================================= */
const cursorGlow = document.getElementById('cursor-glow');
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let glowX   = cursorX;
let glowY   = cursorY;
let glowVisible = false;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  if (!glowVisible) {
    glowVisible = true;
    cursorGlow.style.opacity = '1';
  }
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
  glowVisible = false;
});

// Smooth lag follow using lerp
(function animateGlow() {
  glowX += (cursorX - glowX) * 0.08;
  glowY += (cursorY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top  = glowY + 'px';
  requestAnimationFrame(animateGlow);
})();


/* =============================================
   9. PARALLAX BG — cursor tilts the gradient
============================================= */
document.addEventListener('mousemove', (e) => {
  const xPct = (e.clientX / window.innerWidth  - 0.5) * 30;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 30;
  document.body.style.setProperty('--px', xPct + '%');
  document.body.style.setProperty('--py', yPct + '%');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    const target   = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
