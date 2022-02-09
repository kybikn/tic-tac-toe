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
switchlngBox.addEventListener("click", setLanguage);

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

//функция установки нужного языка
function setLanguage(event) {
  //проверяем что попали в кнопку и у нее есть значение атрибута data-kanguage
  if (!event.target.dataset.language) {
    return;
  }
  //сохраняем значение нового языка в local storage
  localStorage.setItem("lang", event.target.dataset.language);
  // меняем вид кнопок (выделение цветом)
  langButtons.forEach((element) => element.classList.remove("active"));
  event.target.classList.add("active");
  // вызываем функцию перевода
  getTranslate();
}

// функция перевода
function getTranslate() {
  // берет язык из local storage
  const language = localStorage.getItem("lang");
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
}

//переключение языка без локал сторадж
// function getTranslate(event) {
//   if (!event.target.dataset.language) {
//     return;
//   }
//   const language = event.target.dataset.language;
//   const translation = i18Obj[language];

//   translateElems.forEach((element) => {
//     // ключ data-i18
//     const translationKey = element.dataset.i18;
//     // проверка
//     if (translation[translationKey]) {
//       if (element.placeholder) {
//         element.placeholder = translation[translationKey];
//       } else {
//         element.textContent = translation[translationKey];
//       }
//     }
//   });

//   langButtons.forEach((element) => element.classList.remove("active"));
//   event.target.classList.add("active");
// }

themeButton.addEventListener("click", toggleTheme);
// функция переключения темы
//она в локальное хранилище записывает новое значение темы и вызывает функцию установки темы
function toggleTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  setTheme();
}

//функция переключения темы без использования local storage
/* function toggleTheme() {
  themeArray.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.toggle("light");
    });
  });
} */

// функция установки темы. берет значение темы из local storage и применяет эту тему.
function setTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    themeArray.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.classList.add("light");
      });
    });
  } else {
    themeArray.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.classList.remove("light");
      });
    });
  }
}

//слушатель при загрузке страницы, запускает функцию start
window.addEventListener("load", start);
//действия при загрузке страницы
function start() {
  console.log("start");
  // если нет записи в хранилище по поводу темы, то создадим эту запись (дефолтное значение light) и вызовем функцию установки темы
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
  }
  setTheme();
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "en");
  }
  getTranslate();
}

// установка видео
const video = document.querySelector(".viewer");
const playBtn = document.querySelector(".play");
const button = document.querySelector(".video-button");
const sound = document.querySelector(".volume-icon");
const controlSound = document.querySelector(".volume");
const controlPlay = document.querySelector(".progress");

playBtn.addEventListener("click", togglePlay);
button.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
sound.addEventListener("click", toggleSound);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("volumechange", updateAudioButton);
video.addEventListener("timeupdate", updatePlayProgress);
controlSound.addEventListener("change", updateVolume);
controlPlay.addEventListener("change", updatePlay);

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  if (video.paused) {
    playBtn.classList.remove("pause");
    button.style.display = "block";
  } else {
    playBtn.classList.add("pause");
    button.style.display = "none";
  }
}

function updateAudioButton() {
  if (video.muted || video.volume === 0) {
    sound.classList.add("mute");
  } else {
    sound.classList.remove("mute");
  }
}

function toggleSound() {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
}

function updateVolume() {
  video.volume = controlSound.value / 100;
  controlSound.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${controlSound.value}%, #c8c8c8 ${controlSound.value}%, #c8c8c8 100%)`;
}

function updatePlayProgress() {
  let progressPercent = (video.currentTime / video.duration) * 100;
  // изменение золотой полоски
  controlPlay.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progressPercent}%, #c8c8c8 ${progressPercent}%, #c8c8c8 100%)`;
  // изменение положения кругляшка
  controlPlay.value = progressPercent;
}

function updatePlay() {
  // изменение текущего времени проигрывания в зависимости от положения точки на полоске input
  video.currentTime = (controlPlay.value / 100) * video.duration;
}
