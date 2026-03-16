/* ================================================================
   main.js — Amantes de los Gatos
   Funciones: menú hamburguesa · scroll fade-in · newsletter
   ================================================================ */

/* ─── MENÚ HAMBURGUESA (móvil) ───────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Cierra el menú al hacer clic en cualquier enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Cierra el menú si se hace clic fuera de él
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});

/* ─── ANIMACIÓN FADE-UP AL HACER SCROLL ─────────────────────── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Una vez visible ya no necesita observarse
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ─── FORMULARIO NEWSLETTER ──────────────────────────────────── */
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn   = newsletterForm.querySelector('button[type="submit"]');
    const input = document.getElementById('emailInput');

    // Estado de éxito
    btn.textContent          = '¡Bienvenido/a! 😻';
    btn.style.background     = '#4caf50';
    btn.style.color          = '#fff';
    input.value              = '';
    input.disabled           = true;
    btn.disabled             = true;

    // Restaurar el formulario después de 4 segundos
    setTimeout(() => {
      btn.textContent      = '¡Me uno! 🐾';
      btn.style.background = '';
      btn.style.color      = '';
      input.disabled       = false;
      btn.disabled         = false;
    }, 4000);
  });
}
