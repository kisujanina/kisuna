// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1000);
  }
  
  initHeroLayout();
  initSlider();
  fixResponsiveOverflow();
});

function fixResponsiveOverflow() {
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';
  
  document.documentElement.style.boxSizing = 'border-box';
  
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.maxWidth = '100%';
    section.style.overflowX = 'hidden';
  });
  
  // Style both upcoming and previous events containers
  const eventsContainers = document.querySelectorAll('.events-container');
  eventsContainers.forEach(container => {
    container.style.maxWidth = '100%';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))';
    container.style.gap = '2rem';
    container.style.justifyItems = 'center';
  });
  
  // Add styles to subsection titles
  const subsectionTitles = document.querySelectorAll('.subsection-title');
  subsectionTitles.forEach(title => {
    title.style.fontSize = '1.8rem';
    title.style.fontWeight = '600';
    title.style.marginBottom = '2rem';
    title.style.marginTop = '3rem';
    title.style.color = 'var(--text-color, #fff)';
    title.style.display = 'flex';
    title.style.alignItems = 'center';
    title.style.gap = '0.8rem';
  });
  
  // Style indicators
  const upcomingIndicators = document.querySelectorAll('.upcoming-indicator');
  upcomingIndicators.forEach(indicator => {
    indicator.style.color = '#00f0ff';
    indicator.style.fontSize = '1.2rem';
  });
  
  const previousIndicators = document.querySelectorAll('.previous-indicator');
  previousIndicators.forEach(indicator => {
    indicator.style.color = '#888';
    indicator.style.fontSize = '1.2rem';
  });
  
  // Add spacing to subsections
  const subsections = document.querySelectorAll('.events-subsection');
  subsections.forEach(subsection => {
    subsection.style.marginBottom = '3rem';
  });
  
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    projectsGrid.style.maxWidth = '100%';
  }
  
  const main = document.querySelector('main');
  if (main) {
    main.style.maxWidth = '100%';
    main.style.overflowX = 'hidden';
  }
}

function initHeroLayout() {
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.style.display = 'flex';
    heroSection.style.flexWrap = 'wrap';
    heroSection.style.justifyContent = 'center';
    heroSection.style.alignItems = 'center';
    heroSection.style.position = 'relative';
    heroSection.style.maxWidth = '100%'; 
    heroSection.style.overflowX = 'hidden'; 
    
    const heroContent = heroSection.querySelector('.hero-content');
    const heroImage = heroSection.querySelector('.hero-image');
    
    if (heroContent) {
      heroContent.style.flex = '1 1 500px';
      heroContent.style.maxWidth = '600px';
      heroContent.style.width = '100%';
    }
    
    if (heroImage) {
      heroImage.style.flex = '1 1 500px';
      heroImage.style.maxWidth = '600px';
      heroImage.style.width = '100%'; 
    }
    
    const scrollIndicator = heroSection.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.position = 'absolute';
      scrollIndicator.style.bottom = '30px';
      scrollIndicator.style.left = '50%';
      scrollIndicator.style.transform = 'translateX(-50%)';
      scrollIndicator.style.width = 'auto';
    }
  }
}

const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
  currentYearElement.innerText = new Date().getFullYear();
}

const typed = new Typed('.multiple-text', {
  strings: ["Build Robots", "Compete", "Innovate", "Learn AI", "Create Solutions"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

if (document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#00f0ff"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00f0ff",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 3
        }
      }
    },
    retina_detect: true
  });
}

// Initialize Three.js Background - only if library is available
const initThreeBackground = () => {
  if (typeof THREE === 'undefined') return;
  
  const canvas = document.getElementById('webgl-background');
  if (!canvas) return;
  
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  
  window.threeJsCamera = camera;
  window.threeJsRenderer = renderer;
  
  const gridSize = 20;
  const gridDivisions = 20;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00f0ff, 0x004455);
  gridHelper.position.y = -5;
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);
  
  const ambientLight = new THREE.AmbientLight(0x00f0ff, 0.1);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0x00f0ff, 0.2);
  directionalLight.position.set(0, 0, 5);
  scene.add(directionalLight);
  
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;
  
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 50;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.8
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  const animate = () => {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    renderer.render(scene, camera);
  };
  
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    
    return needResize;
  }
  
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  animate();
};

if (document.getElementById('webgl-background') && typeof THREE !== 'undefined') {
  try {
    initThreeBackground();
  } catch (e) {
    console.log('Three.js background could not be initialized', e);
    if (document.getElementById('webgl-background')) {
      document.getElementById('webgl-background').style.display = 'none';
    }
  }
}

const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navbar.classList.toggle('active');
  });
}

const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length && menuBtn) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuBtn.classList.contains('open')) {
        menuBtn.classList.remove('open');
        navbar.classList.remove('active');
      }
    });
  });
}

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

const sr = ScrollReveal({
  origin: 'bottom',
  distance: '40px',
  duration: 900,
  delay: 100,
  opacity: 0,
  reset: false,
  mobile: true,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  viewFactor: 0.15
});

if (document.querySelector('.hero-content')) sr.reveal('.hero-content', { origin: 'left', delay: 100 });
if (document.querySelector('.hero-image')) sr.reveal('.hero-image', { origin: 'right', delay: 300 });
if (document.querySelector('.section-header')) sr.reveal('.section-header', { distance: '40px' });
if (document.querySelector('.about-image')) sr.reveal('.about-image', { origin: 'left', delay: 100 });
if (document.querySelector('.about-content')) sr.reveal('.about-content', { origin: 'right', delay: 300 });
if (document.querySelector('.event-card')) sr.reveal('.event-card', { interval: 200 });
if (document.querySelector('.project-card')) sr.reveal('.project-card', { interval: 200 });
if (document.querySelector('.achievement-slider')) sr.reveal('.achievement-slider', { delay: 200 });
if (document.querySelector('.team-members > *')) sr.reveal('.team-members > *', { interval: 100 });
if (document.querySelector('.footer-content > *')) sr.reveal('.footer-content > *', { interval: 100, distance: '20px' });

if (document.querySelector('.home-content')) sr.reveal('.home-content', { origin: 'left' });
if (document.querySelector('.home-img')) sr.reveal('.home-img', { origin: 'right', delay: 200 });
if (document.querySelector('.about-img')) sr.reveal('.about-img', { origin: 'left', delay: 100 });
if (document.querySelector('.heading')) sr.reveal('.heading', { origin: 'top', interval: 80 });
if (document.querySelector('.blogs-box')) sr.reveal('.blogs-box', { origin: 'bottom', interval: 120 });
if (document.querySelector('.project-box')) sr.reveal('.project-box', { origin: 'bottom', interval: 120 });
if (document.querySelector('.slider-wrapper')) sr.reveal('.slider-wrapper', { origin: 'bottom', delay: 100 });
if (document.querySelector('.members')) sr.reveal('.members', { origin: 'bottom', delay: 100 });

const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCount = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target;
      }
    };
    
    updateCount();
  });
};

const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(aboutSection);
}

if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('.tilt-element'), {
    max: 10,
    speed: 400,
    glare: true,
    'max-glare': 0.3
  });
}

const initSlider = () => {
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  
  if (!sliderTrack || !slides.length) return;
  
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  
  const updateSlider = (index) => {
    sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  };
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      updateSlider(i);
    });
  });
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const index = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider(index);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const index = (currentIndex + 1) % slides.length;
      updateSlider(index);
    });
  }
  
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
  }
  
  const handleSwipe = () => {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      const index = (currentIndex + 1) % slides.length;
      updateSlider(index);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      const index = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider(index);
    }
  };
  
  let interval = setInterval(() => {
    const index = (currentIndex + 1) % slides.length;
    updateSlider(index);
  }, 5000);
  
  if (sliderContainer) {
    const pauseAutoSlide = () => {
      clearInterval(interval);
    };
    
    const resumeAutoSlide = () => {
      interval = setInterval(() => {
        const index = (currentIndex + 1) % slides.length;
        updateSlider(index);
      }, 5000);
    };
    
    sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
    sliderContainer.addEventListener('mouseleave', resumeAutoSlide);
    sliderContainer.addEventListener('touchstart', pauseAutoSlide, {passive: true});
    sliderContainer.addEventListener('touchend', resumeAutoSlide, {passive: true});
  }
  
  updateSlider(0);
  
  console.log('Slider initialized successfully');
};

if (document.readyState === 'complete') {
  initSlider();
}

if (typeof VanillaTilt !== 'undefined') {
  const width = window.innerWidth;
  const tiltElements = document.querySelectorAll('.tilt-element');
  
  if (width >= 768) {
    VanillaTilt.init(tiltElements, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.3
    });
  }
}

window.addEventListener('resize', () => {
  fixResponsiveOverflow();
  
  // Handle Three.js background if it exists
  if (typeof THREE !== 'undefined' && document.getElementById('webgl-background')) {
    const camera = window.threeJsCamera;
    const renderer = window.threeJsRenderer;
    
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  
  // Reinitialize tilt effects on resize for better mobile experience
  if (typeof VanillaTilt !== 'undefined') {
    const width = window.innerWidth;
    const tiltElements = document.querySelectorAll('.tilt-element');
    
    if (width < 768) {
      tiltElements.forEach(element => {
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy();
        }
      });
    } else {
      tiltElements.forEach(element => {
        if (!element.vanillaTilt) {
          VanillaTilt.init(element, {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.3
          });
        }
      });
    }
  }
});

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    
    if (email && email.includes('@')) {
      alert('Thank you for subscribing!');
      e.target.reset();
    } else {
      alert('Please enter a valid email address');
    }
  });
}
sr.reveal('.slider-wrapper', { origin: 'bottom', delay: 100 });
sr.reveal('.members', { origin: 'bottom', delay: 100 });
