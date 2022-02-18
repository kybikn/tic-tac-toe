let game = document.querySelector(".game");
let res = document.querySelector(".res");
let btnGame = document.querySelector(".btn");
let box = document.querySelectorAll(".box");
let h = document.querySelector(".shake");
h.classList.remove("shake");
// let p1 = document.querySelector(".p1");
// let gif = document.querySelector(".grow");
// let gifNon = document.querySelector(".growNon");
// let A = document.getElementById("hider");
// let B = document.getElementById("text");
// var currentPlayer = document.getElementById("curPlyr");

let move = 0;
let count = 0;
let round = 1;
let player1 = "X";
let player2 = "O";
// let player = "X";
let score = {
  x: 0,
  o: 0,
  d: 0,
};
// let p1 = 0;
// p1.addEventListener("click", win);
btnGame.addEventListener("click", newGame);
game.addEventListener("click", init);

btnGame.onclick = function () {
  h.classList.toggle("shake");
  // score.classList.add("rotate");
  // gif.classList.remove(".grow");
};

function init(e) {
  h.classList.remove("shake");
  // gif.classList.remove(".grow");
  res.innerText = "Раунд: " + round;
  // if (e.innerHTML != "") return;
  // if (move != "") return;
  if ((e.target.className = "box")) {
    move % 2 === 0
      ? (e.target.innerHTML = player1)
      : (e.target.innerHTML = player2);
    // currentPlayer.innerHTML = player1.toUpperCase();
    // currentPlayer.innerHTML = `Сейчас ходят: ${player1}`;
    // currentPlayer.innerHTML = "Сейчас ходят: " + player1;
    move++;
    count++;
    win();

    // document.getElementById("hider").onclick = function () {
    //   if (document.getElementById("text").hidden == true) {
    //     document.getElementById("text").hidden = false;
    //   }
    //   document.getElementById("text").hidden = true;
    // };
    // A.onclick = function () {
    //   B.hidden = true;
    // };
    // return;
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
        let img = new Image("./gameOver.gif");
        // img.src = "./gameOver.gif";
      }, 1000);
      // document.write."<img src="./gameOver.gif">";
      game.removeEventListener("click", init);
      // gif.classList.add(".grow");
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

      // gif.classList.add(".growNon");
      let crossAudio = new Audio("./audio/gameOver.mp3");
      crossAudio.play();
      // gif.classList.add(".growNon");
      game.removeEventListener("click", init);
    }
  }
}

function newGame() {
  count = 0;
  // console.log(stat);
  move = 0;
  round++;
  res.innerText = "";
  box.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("X", "O", "active");
    let crossAudio = new Audio("./audio/pobeda.mp3");
    crossAudio.play();
    getScore();
  });
  // document.getElementById("hider").onclick = function () {
  //   document.getElementById("text").hidden = true;
  // };
  game.addEventListener("click", init);
}

function getScore() {
  document.getElementById("sX").innerHTML = score.x;
  document.getElementById("sO").innerHTML = score.o;
  document.getElementById("sD").innerHTML = score.d;
}

// let p1Counter = 1;
// let p2Counter = 1;
// const player1 = new Player();
// const player2 = new Player();
// (chars = { p: "x", com: "o" }),
//   (scores = { p: 0, ties: 0, com: 0 }),
//   (turn = "p"),
//   (isComputer = false);
// if (winner.name === "p") {
//   winAction(winner.row, "You win!!");
//   scores.p++;
//   updateScores();
// } else if (winner.name === "com") {
//   winAction(winner.row, "Computer wins!");
//   scores.com++;
//   updateScores();
// }
// function tie() {
//   action("tie");
//   scores.ties++;
//   updateScores();
// }

// score = {
//   ties: 0,
//   player: 0,
//   computer: 0
// },

// var x = "x"
// var o = "o"
// var count = 0;
// var o_win = 0;
// var x_win = 0;
// if ($("#one").hasClass('o') )
// {
// alert('O wins')
// count = 0
// o_win++
// $('#o_win').text(o_win)
//   }

// else
// {
// count++
// $(this).text(x)

// const btn = document.querySelector(".btn");
// const content = document.querySelector(".content");

// btn.addEventListener("click", btnClick);

// function btnClick() {
//   console.log(content.classList);

//   if (content.classList.contains("hidden")) {
//     btn.textContent = "Скрыть элемент";
//   } else {
//     btn.textContent = "Показать элемент";
//   }

//   content.classList.toggle("hidden");
// }
