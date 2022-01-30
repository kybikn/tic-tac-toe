const hamburger = document.querySelector(".hamburger");

const nav = document.querySelector(".nav");


hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);

function toggleMenu() {
    nav.classList.toggle("navbar");
    hamburger.classList.toggle("change");
    }

function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) {
        nav.classList.remove("navbar");
        hamburger.classList.remove("change");
    }
}
  