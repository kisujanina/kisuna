// Countdown Timer
function initCountdown() {
  const eventDate = new Date('November 15, 2025 09:00:00').getTime();
  
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance < 0) {
      document.getElementById('countdown').innerHTML = '<p class="event-live">Event is Live!</p>';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  };
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navbar.classList.toggle('active');
  });
}

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menuBtn.classList.contains('open')) {
      menuBtn.classList.remove('open');
      navbar.classList.remove('active');
    }
  });
});

// Smooth Scroll
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

// Segment Selection
const segmentBtns = document.querySelectorAll('.segment-btn');
segmentBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    segmentBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Teams Filter
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    // Filter logic will be implemented when teams data is loaded
    console.log('Filtering by:', filter);
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faq => faq.classList.remove('active'));
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Initialize on load - make sure all components are properly initialized
window.addEventListener('DOMContentLoaded', () => {
  // Make sure first FAQ item is open by default
  if (document.querySelector('.faq-item')) {
    document.querySelector('.faq-item').classList.add('active');
  }
  
  // Fix any structural issues via JS if needed
  const segmentCards = document.querySelectorAll('.segment-card');
  segmentCards.forEach(card => {
    // Ensure proper structure
    if (card.querySelector('.segment-details')) {
      card.querySelector('.segment-details').style.display = 'block';
    }
  });
  
  // Initialize countdown
  initCountdown();
});

// Particles.js Background - Update to refined green theme
// if (document.getElementById('particles-js')) {
//   particlesJS('particles-js', {
//     particles: {
//       number: { value: 60, density: { enable: true, value_area: 800 } },
//       color: { value: "#1ed760" },  // Updated to refined green
//       shape: { type: "circle" },
//       opacity: {
//         value: 0.3,
//         random: true,
//         anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
//       },
//       size: {
//         value: 3,
//         random: true,
//         anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
//       },
//       line_linked: {
//         enable: true,
//         distance: 150,
//         color: "#1ed760",  // Updated to refined green
//         opacity: 0.2,
//         width: 1
//       },
//       move: {
//         enable: true,
//         speed: 1,
//         direction: "none",
//         random: true,
//         straight: false,
//         out_mode: "out",
//         bounce: false
//       }
//     },
//     interactivity: {
//       detect_on: "canvas",
//       events: {
//         onhover: { enable: true, mode: "grab" },
//         onclick: { enable: true, mode: "push" },
//         resize: true
//       },
//       modes: {
//         grab: { distance: 140, line_linked: { opacity: 0.5 } },
//         push: { particles_nb: 3 }
//       }
//     },
//     retina_detect: true
//   });
// }

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Initialize on load
window.addEventListener('load', () => {
  initCountdown();
});
