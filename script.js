let game = document.querySelector(".game");
let res = document.querySelector(".res");
let btnGame = document.querySelector(".btn");
let box = document.querySelectorAll(".box");

let move = 0;
let count = 0;

btnGame.addEventListener("click", newGame);
game.addEventListener("click", init);

function init(e) {
  if ((e.target.className = "box")) {
    move % 2 === 0 ? (e.target.innerHTML = "X") : (e.target.innerHTML = "O");
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
      box[comb[i][0]].innerHTML == "X" &&
      box[comb[i][1]].innerHTML == "X" &&
      box[comb[i][2]].innerHTML == "X"
    ) {
      setTimeout(() => {
        box[comb[i][0]].classList.add("active");
        box[comb[i][1]].classList.add("active");
        box[comb[i][2]].classList.add("active");
        res.innerText = "Выиграли крестики!  Ходов: " + count;
        let crossAudio = new Audio("./audio/audio.mp3");
        crossAudio.play();
      }, 1000);
      game.removeEventListener("click", init);
    } else if (
      box[comb[i][0]].innerHTML == "O" &&
      box[comb[i][1]].innerHTML == "O" &&
      box[comb[i][2]].innerHTML == "O"
    ) {
      setTimeout(() => {
        box[comb[i][0]].classList.add("active");
        box[comb[i][1]].classList.add("active");
        box[comb[i][2]].classList.add("active");
        res.innerText = "Выиграли нолики!  Ходов: " + count;
        let crossAudio = new Audio("./audio/audio.mp3");
        crossAudio.play();
      }, 1000);
      game.removeEventListener("click", init);
    } else if (count == 9) {
      res.innerText = "Ничья!  Ходов: " + count;
      let crossAudio = new Audio("./audio/gameOver.mp3");
      crossAudio.play();
      game.removeEventListener("click", init);
    }
  }
}

function newGame() {
  count = 0;
  move = 0;
  res.innerText = "";
  box.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("X", "O", "active");
    let crossAudio = new Audio("./audio/start.mp3");
    crossAudio.play();
  });

  game.addEventListener("click", init);
}

// let p1Counter = 1;
// let p2Counter = 1;
// const player1 = new Player();
// const player2 = new Player();
