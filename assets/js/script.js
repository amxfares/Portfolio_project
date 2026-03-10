/* ---- SCROLL PROGRESS BAR ---- */
const scrollLine = document.getElementById('scroll-line');

window.addEventListener('scroll', () => {
  const scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct          = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  scrollLine.style.width = pct + '%';
});

/* ---- NAVBAR: shrink on scroll ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- NAV AVATAR: apear when hero image scrolls out ---- */
const heroImg = document.querySelector('.hero-img');
const navAvatar = document.querySelector('.nav-avatar');

const heroImgObserver = new IntersectionObserver(([entry])=> {
  if (entry.isIntersecting) {
    navAvatar.classList.remove('visible');
  }
  else {
    navAvatar.classList.add('visible');
  }
  { threshold: 0.1}
});
heroImgObserver.observe(heroImg);

/* ---- NAV name: slides when hero image scrolls out ---- */
const nameNv = document.querySelector('.hero-img');
const navAvatar_name = document.querySelector('.nav-name');

const heroNameObserver = new IntersectionObserver(([entry])=> {
  if (entry.isIntersecting) {
    navAvatar_name.classList.remove('visible');
  }
  else {
    navAvatar_name.classList.add('visible');
  }
  { threshold: 0.1}
});
heroNameObserver.observe(nameNv);

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // toggle aria
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// close menu when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ---- MOBILE: tap to open dropdown ---- */
document.querySelectorAll('.has-dropdown > a').forEach(toggle => {
  toggle.addEventListener('click', e => {
    // only intercept on small screens
    if (window.innerWidth <= 900) {
      e.preventDefault();
      toggle.closest('.has-dropdown').classList.toggle('open');
    }
  });
});

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * i);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- ACTIVE NAV LINK (highlight current section) ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.background = '';
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.background = 'rgba(184,142,35,0.25)';
            a.style.color = '#fcdc8b';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ---- HERO IMAGE FALLBACK ----
   If profile image is missing, show initials placeholder
   so the layout doesn't break during development.
*/
document.querySelectorAll('.hero-img, .nav-avatar').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';

    // only add placeholder to hero-img, nav-avatar is tiny
    if (this.classList.contains('hero-img')) {
      const wrap = this.parentElement;
      if (!wrap.querySelector('.img-placeholder')) {
        const ph = document.createElement('div');
        ph.className = 'img-placeholder';
        ph.textContent = 'FH';
        ph.style.cssText = `
          width: ${this.style.width || '280px'};
          height: ${this.style.height || '340px'};
          background: linear-gradient(135deg,#6b5217,#3d2e0e);
          border-radius: 28px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display',serif;
          font-size: 4rem; color: #fcdc8b;
          position: relative; z-index: 1;
        `;
        wrap.insertBefore(ph, this.nextSibling);
      }
    }
  });
});
