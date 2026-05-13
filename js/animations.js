/* ============================================
   ANIMATIONS — GSAP Scroll & Motion Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // --- Loading Sequence ---
  const loader = document.getElementById('loader');
  const loaderLine = document.querySelector('.loader__line');

  // Expand loader line
  requestAnimationFrame(() => {
    if (loaderLine) loaderLine.classList.add('loader__line--active');
  });

  // After fonts + initial paint, dismiss loader and animate hero
  window.addEventListener('load', () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (loader) loader.classList.add('loader--hidden');
        document.body.style.overflow = '';
        initScrollAnimations();
      }
    });

    // Wait a beat, then dismiss
    tl.to({}, { duration: 0.8 })
      .to(loader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          animateHero();
        }
      });

    // Hero title size is controlled by CSS.
  });

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';

  // Hero title size is controlled by CSS.

  // --- Hero Animation ---
  function animateHero() {
    const heroWords = document.querySelectorAll('.hero__title-word');
    const heroSubtitles = document.querySelectorAll('.hero__subtitle');
    const heroStatus = document.querySelector('.hero__status');
    const heroScroll = document.querySelector('.hero__scroll');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Stagger word reveals
    tl.to(heroWords, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
    })
    .to(heroSubtitles, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
    }, '-=0.3')
    .to(heroStatus, {
      opacity: 1,
      y: 0,
      duration: 0.5,
    }, '-=0.3')
    .to(heroScroll, {
      opacity: 0.5,
      duration: 0.5,
    }, '-=0.1');
  }

  // --- Scroll-Triggered Reveals ---
  function initScrollAnimations() {
    // Reveal elements
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((el, i) => {
      gsap.fromTo(el,
        {
          y: 30,
          opacity: 0,
          filter: 'blur(4px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 60%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Section labels — slide in from left
    const labels = document.querySelectorAll('.section__label');
    labels.forEach(label => {
      gsap.fromTo(label,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: label,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Section titles
    const titles = document.querySelectorAll('.section__title');
    titles.forEach(title => {
      gsap.fromTo(title,
        { y: 20, opacity: 0, filter: 'blur(3px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Project cards — stagger
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Timeline items — stagger reveal
    const timelineItems = document.querySelectorAll('.timeline__item');
    timelineItems.forEach((item, i) => {
      gsap.fromTo(item,
        { x: -15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Skill groups
    const skillGroups = document.querySelectorAll('.skill-group');
    skillGroups.forEach((group, i) => {
      gsap.fromTo(group,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Vision block
    const visionText = document.querySelector('.vision-block__text');
    if (visionText) {
      gsap.fromTo(visionText,
        { y: 30, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: visionText,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    // Dividers
    const dividers = document.querySelectorAll('.section__divider');
    dividers.forEach(div => {
      gsap.fromTo(div,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: div,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Parallax on ambient orbs
    const orbs = document.querySelectorAll('.env-ambient__orb');
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: () => (i + 1) * -60,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      });
    });
  }
});
