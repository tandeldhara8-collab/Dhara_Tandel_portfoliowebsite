// Mobile menu
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  })
);

// Animate skill bars when they scroll into view
const bars = document.querySelectorAll('.bar i');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => observer.observe(b));

// Contact form: validate, then open the visitor's email app
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');
const MY_EMAIL = 'you@example.com'; // change this to your email

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const text = form.message.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !validEmail || !text) {
    msg.className = 'error';
    msg.textContent = 'Please enter your name, a valid email and a message.';
    return;
  }
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(text + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  msg.className = 'ok';
  msg.textContent = 'Opening your email app...';
  form.reset();
});
