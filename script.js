const game = document.querySelector(".game");
const res = document.querySelector(".res");
const btnGame = document.querySelector(".btn");
const box = document.querySelectorAll(".box");
const h = document.querySelector(".shake");
let flag = 1;
let move = 0;
let count = 0;
let round = 1;
let player1 = "X";
let player2 = "O";
let score = {
  x: 0,
  o: 0,
  d: 0,
};
var player = "x";
var playerO = "o";

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
    move % 2 === 0
      ? (e.target.innerHTML = player1)
      : (e.target.innerHTML = player2);
    move++;
    count++;
    win();
  }
}

function win() {
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
        score.x++;
        // if (round < 3) {
        //   score.x++;
        // } else if (round == 3) {
        // return;
        //   score = {
        //     x: 0,
        //     o: 0,
        //     d: 0,
        //   };
        // } else {
        //   score.x++;
        // }
        setLocalStorage();
        res.innerText = "Выиграли крестики!  Ходов: " + count;
        let crossAudio = new Audio("./audio/audio.mp3");
        crossAudio.play();
      }, 1000);
      game.removeEventListener("click", init);
    } else if (
      box[comb[i][0]].innerHTML == player2 &&
      box[comb[i][1]].innerHTML == player2 &&
      box[comb[i][2]].innerHTML == player2
    ) {
      setTimeout(() => {
        box[comb[i][0]].classList.add("active");
        box[comb[i][1]].classList.add("active");
        box[comb[i][2]].classList.add("active");
        score.o++;
        setLocalStorage();
        res.innerText = "Выиграли нолики!  Ходов: " + count;
        let crossAudio = new Audio("./audio/audio.mp3");
        crossAudio.play();
      }, 1000);
      game.removeEventListener("click", init);
    } else if (count == 9) {
      score.d += 1 / 8;
      setLocalStorage();
      res.innerText = "Ничья!  Ходов: " + count;
      let crossAudio = new Audio("./audio/gameOver.mp3");
      crossAudio.play();
      game.removeEventListener("click", init);
    }
  }
}

function newGame() {
  // if (let round = 1; round <= 2; round++)
  h.classList.toggle("shake");
  count = 0;
  move = 0;
  round++;
  res.innerText = "";
  box.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("X", "O", "active");
    let crossAudio = new Audio("./audio/pobeda.mp3");
    crossAudio.play();
    getScore();
    changeImage();
  });
  game.addEventListener("click", init);
}

function getScore() {
  document.getElementById("X").innerHTML = score.x;
  document.getElementById("O").innerHTML = score.o;
  document.getElementById("D").innerHTML = score.d;
}

function setLocalStorage() {
  if (round <= 10) {
    localStorage.setItem("score", JSON.stringify(score));
  } else if (round > 10) {
    // xxx = score;
    // newGame();
  }
}
window.addEventListener("load", setLocalStorage);

function getLocalStorage() {
  let xxx = JSON.parse(localStorage.getItem("score"));
  // xxx = 0;
}

// window.addEventListener('beforeunload', setLocalStorage);
