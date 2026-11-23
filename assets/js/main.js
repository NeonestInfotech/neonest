/**
* Template Name: eNno
* Template URL: https://bootstrapmade.com/enno-free-simple-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
<<<<<<< HEAD
   * Animate skill bars when they scroll into view
   */
  const skillBars = document.querySelectorAll('.skills .progress-value');
  if (skillBars.length && 'IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.dataset.value + '%';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => skillObserver.observe(bar));
  } else {
    skillBars.forEach(bar => bar.style.width = bar.dataset.value + '%');
  }

  /**
   * 3D tilt on cards, following the mouse
   */
  const canHover = window.matchMedia('(hover: hover)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !reduceMotion) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.setProperty('--ty', ((x - 0.5) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--tx', ((0.5 - y) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (x * 100) + '%');
        card.style.setProperty('--gy', (y * 100) + '%');
        card.classList.add('is-tilting');
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tx', '0deg');
        card.style.setProperty('--ty', '0deg');
        card.classList.remove('is-tilting');
      });
    });
  }

  /**
   * Hero 3D hub: skill chips circle the logo emblem
   */
  const orbitScene = document.querySelector('#orbit-scene');
  if (orbitScene) {
    const stage = orbitScene.querySelector('.orbit-stage');
    const items = orbitScene.querySelectorAll('.orbit-item');
    const svg = orbitScene.querySelector('#orbit-links');
    const svgNS = 'http://www.w3.org/2000/svg';
    const links = Array.from(items, () => {
      const line = document.createElementNS(svgNS, 'line');
      svg.querySelector('.links').appendChild(line);
      return line;
    });
    const pulses = Array.from(items, () => {
      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('r', 3);
      svg.querySelector('.pulses').appendChild(dot);
      return dot;
    });
    let radius = 210;
    let hubRadius = 120;
    let chipRadius = 33;
    let centerX = 0;
    let centerY = 0;

    const setCircle = (selector, r) => {
      const el = svg.querySelector(selector);
      el.setAttribute('cx', centerX);
      el.setAttribute('cy', centerY);
      el.setAttribute('r', r);
      el.setAttribute('pathLength', 1000);
    };

    const sizeOrbit = () => {
      const w = orbitScene.clientWidth;
      const h = orbitScene.clientHeight;
      radius = Math.min(215, Math.min(w, h) * 0.38);
      hubRadius = Math.min(120, radius * 0.56);
      chipRadius = w < 576 ? 23 : 33;
      centerX = w / 2;
      centerY = h / 2;
      orbitScene.style.setProperty('--hub', hubRadius * 2 + 'px');
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      setCircle('.hub-glow', radius + 60);
      setCircle('.ring-outer', radius + 46);
      setCircle('.ring-base', radius);
      setCircle('.ring-streak', radius);
      setCircle('.ring-inner', hubRadius + 22);
    };
    sizeOrbit();
    window.addEventListener('resize', sizeOrbit);

    let angle = -Math.PI / 2;
    let lastTime = null;
    const speed = reduceMotion ? 0 : 0.00012; // radians per ms

    const renderOrbit = (time) => {
      if (lastTime !== null) angle += (time - lastTime) * speed;
      lastTime = time;
      items.forEach((item, i) => {
        const a = angle + (i / items.length) * Math.PI * 2;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        item.style.transform = `translate(-50%, -50%) translate(${(cos * radius).toFixed(1)}px, ${(sin * radius).toFixed(1)}px)`;

        // Spoke from the emblem edge to the chip
        const r1 = hubRadius + 14;
        const r2 = radius - chipRadius - 8;
        const line = links[i];
        line.setAttribute('x1', centerX + cos * r1);
        line.setAttribute('y1', centerY + sin * r1);
        line.setAttribute('x2', centerX + cos * r2);
        line.setAttribute('y2', centerY + sin * r2);

        // Glowing pulse travelling outward along the spoke
        const t = ((time || 0) * 0.0004 + i * 0.125) % 1;
        const r = r1 + (r2 - r1) * t;
        const dot = pulses[i];
        dot.setAttribute('cx', centerX + cos * r);
        dot.setAttribute('cy', centerY + sin * r);
        dot.style.opacity = Math.sin(t * Math.PI).toFixed(2);
      });
      requestAnimationFrame(renderOrbit);
    };
    requestAnimationFrame(renderOrbit);

    if (canHover && !reduceMotion) {
      orbitScene.addEventListener('mousemove', (e) => {
        const rect = orbitScene.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        stage.style.setProperty('--tilt-y', (x * 18).toFixed(2) + 'deg');
        stage.style.setProperty('--tilt-x', (-y * 18).toFixed(2) + 'deg');
      });
      orbitScene.addEventListener('mouseleave', () => {
        stage.style.setProperty('--tilt-x', '0deg');
        stage.style.setProperty('--tilt-y', '0deg');
      });
    }
  }

  /**
   * Hero background: rotating 3D dot globe + rising growth arrows
   */
  const heroCanvas = document.querySelector('#hero-canvas');
  if (heroCanvas) {
    const hero = document.querySelector('#hero');
    const ctx = heroCanvas.getContext('2d');
    const globePoints = [];
    const arrows = [];
    const GLOBE_POINTS = 800;
    const ARROWS = 16;
    let width = 0;
    let height = 0;
    let globeX = 0;
    let globeY = 0;
    let globeR = 220;
    let mouseX = 0;
    let mouseY = 0;
    let running = true;

    // Evenly spread points on a sphere (Fibonacci lattice)
    for (let i = 0; i < GLOBE_POINTS; i++) {
      const y = 1 - (i / (GLOBE_POINTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      globePoints.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    const newArrow = (anywhere) => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 40,
      z: Math.random(), // 0 = far, 1 = near
      hue: Math.random() < 0.5 ? '43, 94, 168' : '34, 184, 230'
    });

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      heroCanvas.width = width * dpr;
      heroCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scene = document.querySelector('#orbit-scene');
      if (scene) {
        const heroRect = hero.getBoundingClientRect();
        const sceneRect = scene.getBoundingClientRect();
        globeX = sceneRect.left - heroRect.left + sceneRect.width / 2;
        globeY = sceneRect.top - heroRect.top + sceneRect.height / 2;
        globeR = Math.min(280, scene.clientWidth * 0.47);
      } else {
        globeX = width * 0.7;
        globeY = height * 0.5;
      }

      arrows.length = 0;
      for (let i = 0; i < ARROWS; i++) arrows.push(newArrow(true));
    };

    const drawArrow = (a) => {
      const size = 8 + a.z * 14;
      const px = a.x + mouseX * a.z * 30;
      const py = a.y + mouseY * a.z * 20;
      // Fade out over the globe so the logo scene stays clean
      const dist = Math.hypot(px - globeX, py - globeY) / (globeR * 1.25);
      const fade = Math.min(1, Math.max(0, dist - 0.6) * 2.5);
      if (fade <= 0) return;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(-Math.PI / 4); // point up-right, like a growth arrow
      ctx.strokeStyle = `rgba(${a.hue}, ${((0.08 + a.z * 0.25) * fade).toFixed(3)})`;
      ctx.lineWidth = 1.2 + a.z * 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(size * 0.35, -size * 0.6);
      ctx.lineTo(size, 0);
      ctx.lineTo(size * 0.35, size * 0.6);
      ctx.stroke();
      ctx.restore();
    };

    let spin = 0;
    const tiltX = 0.4;
    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Globe dots (faint texture behind the hub)
      const cosS = Math.cos(spin);
      const sinS = Math.sin(spin);
      const cosT = Math.cos(tiltX + mouseY * 0.2);
      const sinT = Math.sin(tiltX + mouseY * 0.2);
      const focal = 900;
      for (const p of globePoints) {
        const x1 = p.x * cosS + p.z * sinS;
        const z1 = -p.x * sinS + p.z * cosS;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        const scale = focal / (focal - z2 * globeR);
        const sx = globeX + x1 * globeR * scale;
        const sy = globeY + y2 * globeR * scale;
        const front = (z2 + 1) / 2;
        ctx.fillStyle = `rgba(43, 94, 168, ${(0.03 + front * 0.17).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.6 + front * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rising arrows, far ones slower and fainter
      for (let i = 0; i < arrows.length; i++) {
        const a = arrows[i];
        a.y -= 0.25 + a.z * 0.9;
        a.x += 0.1 + a.z * 0.3;
        if (a.y < -40 || a.x > width + 40) arrows[i] = newArrow(false);
        drawArrow(arrows[i]);
      }

      spin += 0.0025;
    };

    const loop = () => {
      if (running) drawFrame();
      requestAnimationFrame(loop);
    };

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);
    window.addEventListener('load', sizeCanvas);

    if (reduceMotion) {
      drawFrame();
    } else {
      requestAnimationFrame(loop);
      // Pause drawing while the hero is off-screen
      new IntersectionObserver(entries => {
        running = entries[0].isIntersecting;
      }).observe(hero);
    }

    if (canHover && !reduceMotion) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      });
    }
  }

  /**
   * Footer year
   */
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /**
=======
>>>>>>> d46c4f2c136a9e7861fc8b68b432fc681da96c71
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();