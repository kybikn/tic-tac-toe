import i18Obj from './translate.js';

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const portfolioBtns = document.querySelectorAll(".button-transparent");
const portfolioImages = document.querySelectorAll(".portfolio-image");
const portfolioBtnsBox = document.querySelector(".button-box");
const switchlngBox = document.querySelector(".switch-lng");
const translateElems = document.querySelectorAll('[data-i18]');
const langButtons = document.querySelectorAll('.switchlng');
const themeArray = ['body', '.nav', '.nav-link', '.nav-li', '.theme-button', '.hamburger', '.section-title', '.section-title-wrapper', '.item-title', '.item-text', '.button-transparent', '.button-gold', '.price-title', '.price-text', '.footer-container', '.footer-text' ];
const themeButton = document.querySelector(".theme-button");



hamburger.addEventListener("click", toggleMenu);
nav.addEventListener("click", closeMenu);
portfolioBtnsBox.addEventListener("click", changeImage);
switchlngBox.addEventListener("click", getTranslate);


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


function changeImage(event) {
  if (event.target.classList.contains("button-transparent")) {
    //берем название сезона для отображение фотографий из атрибута кнопки "data-season" в html файле index.html
    let season = event.target.dataset.season;

    // Меняем источник фотографий портфолио
    portfolioImages.forEach(
      (img, index) => (img.src = `./assets/img/${season}/${index + 1}.jpg`)
    );

    //убираем класс active у всех кнопок
    portfolioBtns.forEach((element) => element.classList.remove("active"));

    //добавляем класс active кнопке куда случился event.target
    event.target.classList.add("active");
  }
}


function getTranslate(event) {
  if (!event.target.dataset.language) {
    console.log("Нет попал в кнопку языка!");
    return
  };
  const language = event.target.dataset.language;
  const translation = i18Obj[language];

  translateElems.forEach((element) => {
    // ключ data-i18
    const translationKey = element.dataset.i18;
    // проверка
    if (translation[translationKey]) {
      if (element.placeholder) {
        element.placeholder = translation[translationKey]
      } else {
        element.textContent = translation[translationKey]
      }
    }
  }
  );

  langButtons.forEach((element) => element.classList.remove("active"));
  event.target.classList.add("active");
}


themeButton.addEventListener('click', onLightTheme);

function onLightTheme() {
  themeArray.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.toggle('light')
    })
  })
}
