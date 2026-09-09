/* ================================================================
   A. Saravanan - Portfolio JavaScript
   ================================================================ */

// ─── LOADER ───────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initAnimations();
  }, 2500);
});
document.body.style.overflow = 'hidden';

// ─── CUSTOM CURSOR ────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .software-card, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    follower.style.transform = 'translate(-50%,-50%) scale(0.5)';
    follower.style.background = 'rgba(14,165,233,0.15)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.background = 'transparent';
  });
});

// ─── TYPED TEXT ───────────────────────────────────────────────
const titles = [
  'Mechanical Engineer',
  'CAD Designer',
  'SolidWorks Expert',
  'ANSYS Simulator',
  'CATIA Specialist',
  'GD&T Professional'
];
let titleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const current = titles[titleIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  typedEl.textContent = current.substring(0, charIndex);

  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    speed = 400;
  }
  setTimeout(typeLoop, speed);
}
setTimeout(typeLoop, 3000);

// ─── NAVBAR ───────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky navbar
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Back to top
  const backTop = document.getElementById('backTop');
  backTop.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ─── BACK TO TOP ──────────────────────────────────────────────
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── SCROLL INDICATOR ─────────────────────────────────────────
document.getElementById('scrollIndicator').addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// ─── PARTICLES ───────────────────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    container.appendChild(p);
  }
}
createParticles();

// ─── COUNTER ANIMATION ────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { count = target; clearInterval(timer); }
      el.textContent = Math.floor(count) + (target >= 10 ? '+' : '');
    }, 50);
  });
}

// ─── SKILL BAR ANIMATION ──────────────────────────────────────
function animateSkillBars() {
  document.querySelectorAll('.sw-bar').forEach(bar => {
    const width = bar.dataset.width;
    const fill = bar.querySelector('.sw-bar-fill');
    setTimeout(() => { fill.style.width = width + '%'; }, 300);
  });
}

// ─── AOS-LIKE SCROLL ANIMATIONS ──────────────────────────────
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        // Trigger counters & bars when hero is in view
        if (entry.target.classList.contains('hero')) {
          animateCounters();
        }
        if (entry.target.closest('.skills')) {
          animateSkillBars();
        }
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

  // Trigger hero counters immediately
  animateCounters();
  // Small delay for skill bars if already visible
  setTimeout(animateSkillBars, 500);
}

// Also observe skills section specifically
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.1 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ─── CONTACT FORM ─────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const btnText = document.getElementById('submitBtnText');
  const btnIcon = document.getElementById('submitBtnIcon');
  const success = document.getElementById('formSuccess');

  // Loading state
  btn.disabled = true;
  btnText.textContent = 'Sending...';
  btnIcon.className = 'fas fa-spinner fa-spin';

  // Simulate sending
  setTimeout(() => {
    btn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon.className = 'fas fa-paper-plane';
    success.style.display = 'flex';
    document.getElementById('contactForm').reset();

    // Build mailto link and open
    const name    = document.getElementById('fname').value || '';
    const email   = document.getElementById('femail').value || '';
    const subject = document.getElementById('fsubject').value || 'Portfolio Contact';
    const message = document.getElementById('fmessage').value || '';
    const mailTo = `mailto:2006a.saravanan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
    window.location.href = mailTo;

    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1500);
}

// ─── DOWNLOAD CV ──────────────────────────────────────────────
function downloadCV(e) {
  e.preventDefault();
  // Since no CV file exists, show informational alert
  const btn = e.currentTarget;
  const originalText = btn.querySelector('span').textContent;
  btn.querySelector('span').textContent = 'CV Coming Soon!';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.querySelector('span').textContent = originalText;
    btn.style.opacity = '';
  }, 2000);
}

// ─── PROFILE IMAGE FALLBACK ───────────────────────────────────
document.querySelectorAll('.profile-img, .about-img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const parent = this.parentElement;
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width:100%; height:100%;
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      display: flex; flex-direction:column; align-items:center; justify-content:center;
      color:#fff; font-size:3rem; font-weight:900; font-family:'Outfit',sans-serif;
      border-radius: inherit;
    `;
    placeholder.innerHTML = '<i class="fas fa-user-tie" style="font-size:4rem;margin-bottom:0.5rem;"></i><div style="font-size:1.2rem;font-weight:700;">A. Saravanan</div>';
    parent.appendChild(placeholder);
  });
});

// ─── SMOOTH SECTION REVEAL ────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-aos]').forEach((el, i) => {
        setTimeout(() => el.classList.add('aos-animate'), i * 120);
      });
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section').forEach(sec => revealObserver.observe(sec));

// ─── NAV LINK SMOOTH SCROLL ───────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── CARD TILT EFFECT ─────────────────────────────────────────
document.querySelectorAll('.project-card, .software-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c SARAVANAN A | Portfolio ', 
  'background: #0ea5e9; color: white; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: bold;');
console.log('%c BE Mechanical Engineering | Anna University | 2023-2027', 
  'color: #94a3b8; font-size: 12px;');
