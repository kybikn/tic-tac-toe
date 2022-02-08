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

const video = document.querySelector(".viewer");
const playBtn = document.querySelector(".play");
const button = document.querySelector(".video-button");
const sound = document.querySelector(".volume-icon");
const controlSound = document.querySelector(".volume");
const controlPlay = document.querySelector(".progress");
// const control = document.querySelector(".control-box");

playBtn.addEventListener("click", togglePlay);
button.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
sound.addEventListener("click", toggleSound);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("volumechange", updateAudioButton);
controlSound.addEventListener("change", updateVolume);
controlPlay.addEventListener("change", updatePlay);

// function playVideo() {
//   video.currentTime = 0;
//   video.play();
// }

// function pauseVideo() {
//   video.pause();
// }

function togglePlay() {
  if (video.paused) {
    //   video.currentTime = 0;
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
  volume.style.background = linear-gradient(
    to right,
    #bdae82 0%,
    #bdae82 40%,
    #c8c8c8 40%,
    #c8c8c8 100%
  );
}

// function updatePlay() {
//   let rate = this.value;
//   video.progress = rate;
// }

function updatePlay() {
  video.progress = controlPlay.value / 100;
  volume.style.background = linear-gradient(
    to right,
    #bdae82 0%,
    #bdae82 40%,
    #c8c8c8 40%,
    #c8c8c8 100%
  );
}
