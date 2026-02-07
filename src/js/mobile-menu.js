const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const menu = document.querySelector('[data-menu]');
const links = document.querySelectorAll('.mobile-link');

openBtn?.addEventListener('click', () => {
  menu.classList.add('is-open');
  document.body.classList.add('menu-open');
});

closeBtn?.addEventListener('click', closeMenu);

links.forEach(link => {
  link.addEventListener('click', closeMenu);
});

function closeMenu() {
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}