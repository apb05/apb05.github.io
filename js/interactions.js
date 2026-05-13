/* ============================================
   INTERACTIONS — Cursor, Nav & UI Behaviors
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Disable browser restoring previous scroll position on reload/navigation.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // If URL contains a section hash (e.g. #about), clear it so refresh starts at hero.
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // Force first paint at top of page so hero starts on the profile image.
  window.scrollTo(0, 0);
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });

  // --- Cursor-Reactive Gradient ---
  const cursorGradient = document.getElementById('cursor-gradient');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  const lerpFactor = 0.08;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorGradient) cursorGradient.classList.add('env-cursor--visible');
  });

  document.addEventListener('mouseleave', () => {
    if (cursorGradient) cursorGradient.classList.remove('env-cursor--visible');
  });

  function updateCursorGradient() {
    cursorX += (mouseX - cursorX) * lerpFactor;
    cursorY += (mouseY - cursorY) * lerpFactor;

    if (cursorGradient) {
      cursorGradient.style.transform = `translate(${cursorX - 300}px, ${cursorY - 300}px)`;
    }

    requestAnimationFrame(updateCursorGradient);
  }

  // Only enable cursor gradient on non-touch devices
  if (window.matchMedia('(hover: hover)').matches) {
    updateCursorGradient();
  }


  // --- Project Card Mouse Tracking ---
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set CSS custom properties for glow position
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Subtle tilt (very restrained)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -1.5;
      const rotateY = ((x - centerX) / centerX) * 1.5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // --- Navigation Scroll Behavior ---
  const nav = document.getElementById('nav');
  let lastScrollY = window.scrollY;
  let scrollDirection = 'up';
  let ticking = false;

  function updateNav() {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    if (currentScroll > lastScrollY && currentScroll > 300) {
      // Scrolling down
      if (scrollDirection !== 'down') {
        nav.classList.add('nav--hidden');
        scrollDirection = 'down';
      }
    } else {
      // Scrolling up
      if (scrollDirection !== 'up') {
        nav.classList.remove('nav--hidden');
        scrollDirection = 'up';
      }
    }

    lastScrollY = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });


  // --- Active Section Tracking ---
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  const heroSection = document.getElementById('hero');
  function updateLandscapeFade() {}

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('nav__link--active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveLink);
    requestAnimationFrame(updateLandscapeFade);
  }, { passive: true });

  window.addEventListener('resize', updateLandscapeFade);
  updateLandscapeFade();


  // --- Smooth Anchor Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      // Close mobile menu if open
      const mobileMenu = document.querySelector('.nav__mobile');
      const menuBtn = document.querySelector('.nav__menu-btn');
      if (mobileMenu) mobileMenu.classList.remove('nav__mobile--open');
      if (menuBtn) menuBtn.classList.remove('nav__menu-btn--open');

      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });


  // --- Mobile Menu Toggle ---
  const menuBtn = document.querySelector('.nav__menu-btn');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('nav__menu-btn--open');
      mobileMenu.classList.toggle('nav__mobile--open');
    });
  }


  // --- Skill Item Hover Interaction ---
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-1px)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

});
