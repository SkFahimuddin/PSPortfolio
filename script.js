/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 180) current = sec.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

/* ── SCROLL REVEAL ── */
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // stagger siblings
            const sibs = [...entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)')];
            const idx  = sibs.indexOf(entry.target);
            entry.target.style.transitionDelay = (idx * 0.1) + 's';
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

faders.forEach(el => observer.observe(el));

/* ── CONTACT FORM ── */
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn  = this.querySelector('.btn-fill');
        const msg  = document.getElementById('formMsg');
        const orig = btn.innerHTML;

        btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        btn.disabled  = true;

        setTimeout(() => {
            msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
            btn.innerHTML   = orig;
            btn.disabled    = false;
            this.reset();
            setTimeout(() => msg.textContent = '', 4000);
        }, 1400);
    });
}