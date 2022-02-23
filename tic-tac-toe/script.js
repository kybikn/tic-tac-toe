const sound = document.querySelector(".sound-button");
const audioMusic = document.querySelector(".audio-music");
const game = document.querySelector(".game");
const res = document.querySelector(".res");
const box = document.querySelectorAll(".box");
const h = document.querySelector(".shake");
const emoje = document.querySelector(".emoje");
const btnGame = document.querySelector(".btn");
const themeButton = document.querySelector(".theme-button");
const themeArray = ["body", ".theme-button"];

let flag = 1;
// let move = 0;
let count = 0;
let round = 1;
let player1 = "X";
let player2 = "O";
let results;
isSoundOn = false;
let comb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// let score;

h.classList.remove("shake");
sound.addEventListener("click", changeSound);
btnGame.addEventListener("click", newGame);
game.addEventListener("click", init);
themeButton.addEventListener("click", toggleTheme);

function init(e) {
  h.classList.remove("shake");
  res.innerText = "РАУНД: " + round;
  if (e.target.innerHTML != "") return;
  if ((e.target.className = "box")) {
    count % 2 === 0
      ? (e.target.innerHTML = player1)
      : (e.target.innerHTML = player2);
    // move++;
    count++;
    win();
  }
}

function win() {
  for (let i = 0; i < comb.length; i++) {
    if (
      box[comb[i][0]].innerHTML == player1 &&
      box[comb[i][1]].innerHTML == player1 &&
      box[comb[i][2]].innerHTML == player1
    ) {
      setTimeout(() => {
        box[comb[i][0]].classList.add("active");
        box[comb[i][1]].classList.add("active");
        box[comb[i][2]].classList.add("active");
        results.push("x");
        setLocalResults();
        // score.x++;
        // setLocalStorage();
        res.innerText = "Выиграли крестики!  Ходов: " + count;
        let crossAudio = new Audio("./audio/audio.mp3");
        crossAudio.play();
      }, 1000);
      game.removeEventListener("click", init);
      return;
    } else if (
      box[comb[i][0]].innerHTML == player2 &&
      box[comb[i][1]].innerHTML == player2 &&
      box[comb[i][2]].innerHTML == player2
    ) {
      setTimeout(() => {
        box[comb[i][0]].classList.add("active");
        box[comb[i][1]].classList.add("active");
        box[comb[i][2]].classList.add("active");
        results.push("o");
        setLocalResults();
        // score.o++;
        // setLocalStorage();
        res.innerText = "Выиграли нолики!  Ходов: " + count;
        let crossAudio = new Audio("./audio/audio.mp3");
        crossAudio.play();
        crossAudio.volume = 0.1;
      }, 1000);
      game.removeEventListener("click", init);
      return;
    }
  }
  if (count === 9) {
    results.push("-");
    setLocalResults();
    // score.d += 1;
    // setLocalStorage();
    res.innerText = "Ничья!  Ходов: " + count;
    let crossAudio = new Audio("./audio/gameOver.mp3");
    crossAudio.play();
    game.removeEventListener("click", init);
  }
}

function changeImage() {
  if (flag == 0) {
    emoje.src = "./assets/img/happy.png";
    flag = 1;
  } else {
    emoje.src = "./assets/img/syper.png";
    flag = 0;
  }
}

function newGame() {
  h.classList.toggle("shake");
  count = 0;
  // move = 0;
  round++;
  res.innerText = "";
  box.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("X", "O", "active");
    let crossAudio = new Audio("./audio/pobeda.mp3");
    crossAudio.play();
    crossAudio.volume = 0.1;
    drawScore();
    changeImage();
  });
  game.addEventListener("click", init);
}

function calculateScores() {
  let scores = { x: 0, o: 0, d: 0 };
  results.forEach((result) => {
    if (result === "x") {
      scores.x++;
    } else if (result === "o") {
      scores.o++;
    } else if (result === "-") {
      scores.d++;
    }
  });
  return scores;
}

function drawScore() {
  let score = calculateScores();
  document.getElementById("X").innerHTML = score.x;
  document.getElementById("O").innerHTML = score.o;
  document.getElementById("D").innerHTML = score.d;
}

function start() {
  getLocalResults();
  // getLocalScore();
  drawScore();
}

window.addEventListener("load", start);

function getLocalResults() {
  results = JSON.parse(localStorage.getItem("results"));
  if (!results) {
    results = [];
    setLocalResults();
  }
  return results;
}

function setLocalResults() {
  if (results.length > 10) {
    results = results.slice(-10);
  }
  localStorage.setItem("results", JSON.stringify(results));
}

// function getLocalScore() {
//   score = JSON.parse(localStorage.getItem("score"));
//   if (!score) {
//     score = {
//       x: 0,
//       o: 0,
//       d: 0,
//     };
//     setLocalStorage();
//   }
//   return score;
// }
// function setLocalStorage() {
//   localStorage.setItem("score", JSON.stringify(score));
// }
// window.addEventListener('beforeunload', setLocalStorage);

function toggleTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  setTheme();
}

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
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}
setTheme();

function changeSound() {
  isSoundOn = !isSoundOn;
  sound.style.backgroundImage = isSoundOn
    ? 'url("./assets/svg/sound-on.svg")'
    : 'url("./assets/svg/sound-off.svg")';
  if (isSoundOn) {
    sound.src = "./assets/svg/sound-on.svg";
    audioMusic.play();
    audioMusic.volume = 0.1;
  } else {
    sound.src = "./assets/svg/sound-off.svg";
    audioMusic.pause();
    audioMusic.volume = 0.1;
  }
}
