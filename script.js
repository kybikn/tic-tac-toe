const game = document.querySelector(".game");
const res = document.querySelector(".res");
const btnGame = document.querySelector(".btn");
const box = document.querySelectorAll(".box");
const h = document.querySelector(".shake");
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

h.classList.remove("shake");
btnGame.addEventListener("click", newGame);
game.addEventListener("click", init);

document.write(document.img);
let flag = 1;
function changeImage() {
  if (flag == 0) {
    document.img.src = "./assets/img/happy.png";
    flag = 1;
  } else {
    document.img.src = "./assets/img/syper.png";
    flag = 0;
  }
}

// btnGame.onclick = function () {
//   h.classList.toggle("shake");
// alert("game over");
// score.classList.add("rotate");
// gif.classList.add("grow");
// };

function init(e) {
  h.classList.remove("shake");
  res.innerText = "Раунд: " + round;
  // if (e.innerHTML != "") return;
  // if (move != "") return;
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
        // score[x].classList.add("rotate");
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
        res.innerText = "Выиграли нолики!  Ходов: " + count;
        let crossAudio = new Audio("./audio/audio.mp3");
        crossAudio.play();
      }, 1000);
      game.removeEventListener("click", init);
    } else if (count == 9) {
      score.d += 1 / 8;
      res.innerText = "Ничья!  Ходов: " + count;
      let crossAudio = new Audio("./audio/gameOver.mp3");
      crossAudio.play();
      game.removeEventListener("click", init);
    }
  }
}

function newGame() {
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
  document.getElementById("sX").innerHTML = score.x;
  document.getElementById("sO").innerHTML = score.o;
  document.getElementById("sD").innerHTML = score.d;
}
