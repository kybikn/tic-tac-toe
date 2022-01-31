const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", toggleMenu);
nav.addEventListener("click", closeMenu);

function toggleMenu() {
  nav.classList.toggle("navbar");
  hamburger.classList.toggle("change");
}

function closeMenu(event) {
  if (event.target.classList.contains("nav-link")) {
    nav.classList.remove("navbar");
    hamburger.classList.remove("change");
  }
}

const portfolioBtns = document.querySelectorAll(".button-transparent");
const portfolioImages = document.querySelectorAll(".portfolio-image");
const portfolioBtnsBox = document.querySelector(".button-box");

function changeImage(event) {
  if (event.target.classList.contains("button-transparent")) {
    //берем название сезона для отображение фотографий из атрибута кнопки "data-season" в html файле index.html
    let season = event.target.dataset.season;

    // Меняем источник фотографий портфолио
    portfolioImages.forEach(
      (img, index) => (img.src = `./assets/img/${season}/${index + 1}.jpg`)
    );

    //убираем класс active у всех кнопок
    portfolioBtns.forEach((button) => button.classList.remove("active"));

    //добавляем класс active кнопке куда случился event.target
    event.target.classList.add("active");
  }
}

portfolioBtnsBox.addEventListener("click", changeImage);
