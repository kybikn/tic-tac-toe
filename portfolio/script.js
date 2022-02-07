import i18Obj from "./translate.js";

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const portfolioBtns = document.querySelectorAll(".button-transparent");
const portfolioImages = document.querySelectorAll(".portfolio-image");
const portfolioBtnsBox = document.querySelector(".button-box");
const switchlngBox = document.querySelector(".switch-lng");
const translateElems = document.querySelectorAll("[data-i18]");
const langButtons = document.querySelectorAll(".switchlng");
const themeArray = [
  "body",
  ".nav",
  ".nav-link",
  ".nav-li",
  ".theme-button",
  ".hamburger",
  ".section-title",
  ".section-title-wrapper",
  ".item-title",
  ".item-text",
  ".button-transparent",
  ".button-gold",
  ".price-title",
  ".price-text",
  ".footer-container",
  ".footer-text",
];
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
    return;
  }
  const language = event.target.dataset.language;
  const translation = i18Obj[language];

  translateElems.forEach((element) => {
    // ключ data-i18
    const translationKey = element.dataset.i18;
    // проверка
    if (translation[translationKey]) {
      if (element.placeholder) {
        element.placeholder = translation[translationKey];
      } else {
        element.textContent = translation[translationKey];
      }
    }
  });

  langButtons.forEach((element) => element.classList.remove("active"));
  event.target.classList.add("active");
}

themeButton.addEventListener("click", onLightTheme);

function onLightTheme() {
  themeArray.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.toggle("light");
    });
  });
}

const button = document.querySelector("button");

const audio = document.querySelector("audio");
const video = document.querySelector(".viewer");

const playBtn = document.querySelector(".play");

const videoContainer = document.querySelector(".video-container");

// const button = document.querySelector("button");
// const audio = document.querySelector("audio");
// const playBtn = document.querySelector(".play");
// const videoContainer = document.querySelector(".video-container");

// function playAudio() {
//   audio.currentTime = 0;
//   audio.play();
// }

// function pauseAudio() {
//   audio.pause();
// }

// function toggleBtn() {
//   if (audio.paused) {
//     playBtn.classList.add("pause");
//     audio.play();
//   } else {
//     playBtn.classList.remove("pause");
//     audio.pause();
//   }
// }

// playBtn.addEventListener("click", toggleBtn);

// const linkItems = document.querySelectorAll(".nav-link");
// const linkItemsBox = document.querySelector(".nav");
// const linkImages = document.querySelectorAll(".portfolio-image");

// linkItemsBox.addEventListener("click", changeAudio);

// function changeAudio(event) {
//   if (event.target.classList.contains("nav-link")) {
//     let bird = event.target.dataset.bird;

//     videoContainer.style.backgroundImage = `url('./assets/img/${bird}.jpg')`;

//     linkItems.forEach((element) => element.classList.remove("active"));

//     event.target.classList.add("active");

//     audio.src = `./assets/audio/${bird}.mp3`;
//     playBtn.classList.add("pause");
//     audio.play();
//   }
// }
