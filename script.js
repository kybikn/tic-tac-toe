const game = document.querySelector(".game");
const res = document.querySelector(".res");
const btnGame = document.querySelector(".btn");
const box = document.querySelectorAll(".box");
const h = document.querySelector(".shake");
let flag = 1;
// let move = 0;
let count = 0;
let round = 1;
let player1 = "X";
let player2 = "O";
let results;
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
btnGame.addEventListener("click", newGame);
game.addEventListener("click", init);

function changeImage() {
  if (flag == 0) {
    document.img.src = "./assets/img/happy.png";
    flag = 1;
  } else {
    document.img.src = "./assets/img/syper.png";
    flag = 0;
  }
}

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
  getLocalScore();
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
