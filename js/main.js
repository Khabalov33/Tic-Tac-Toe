const boxes = document.querySelectorAll('.box');
const turnBox1 = document.getElementById('turnBox1');
const turnBox2 = document.getElementById('turnBox2');
const whoTurn = document.getElementById('whoTurn');
const restartBtn = document.getElementById('restart-btn');
const openDialog = document.getElementById('openDialog');
const modalBg = document.querySelector('.modal-bg');
const modalInput1Player = document.getElementById('modalInput1Player');
const modalInput2Player = document.getElementById('modalInput2Player');
const modalBtn = document.getElementById('modalBtn');
const simpleModal = document.querySelector('.simple-modal');
const player1Name = document.querySelector('.player1Name');
const player2Name = document.querySelector('.player2Name');
const trashBtn = document.getElementById('trash-btn');

const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let isGameOver = false;
let turn = 'X';
let count1 = 0;
let count2 = 0;

whoTurn.textContent = "Ходит";
player1Name.textContent = 'Игрок 1';
player2Name.textContent = 'Игрок 2';

modalBtn.addEventListener('click', () => {
  player1Name.textContent = modalInput1Player.value;
  player2Name.textContent = modalInput2Player.value;
});

openDialog.addEventListener('click', () => {
  modalBg.style.display = 'block';
  simpleModal.style.display = 'flex';
});

modalBtn.addEventListener('click', () => {
  modalBg.style.display = 'none';
  simpleModal.style.display = 'none';
});

boxes.forEach(box => {
  box.innerHTML = "";
  box.addEventListener('click', () => {
    if (!isGameOver && box.innerHTML === "") {
      box.innerHTML = turn;
      checkWin();
      changeTurn();
    }
  });
});

trashBtn.addEventListener('click', () => {
  document.getElementById('player1Score').textContent = '0';
  document.getElementById('player2Score').textContent = '0';
});

restartBtn.addEventListener('click', () => {
  restartBtn.classList.add('animation-restart-btn');
  setTimeout(() => {
    restartBtn.classList.remove('animation-restart-btn');
  }, 1000);

  const restartGame = new Audio('./audio/restartGame.mp3');
  restartGame.play();

  isGameOver = false;
  turn = 'X';
  boxes.forEach(box => {
    box.innerHTML = "";
    box.classList.remove('winCombination');
  });
  turnBox1.classList.remove('turn-win');
  turnBox2.classList.remove('turn-win');

  whoTurn.textContent = "Ходят";
});

function checkWin() {
  let isDraw = true;

  for (let i = 0; i < winCombination.length; i++) {
    let v0 = boxes[winCombination[i][0]].innerHTML;
    let v1 = boxes[winCombination[i][1]].innerHTML;
    let v2 = boxes[winCombination[i][2]].innerHTML;

    if (v0 !== '' && v1 === v2 && v0 === v2) {
      isGameOver = true;
      whoTurn.innerHTML = turn + ' Выиграли';

      if (turn === 'X') {
        turnBox1.classList.add('turn-win');
        count1++;
        document.getElementById('player1Score').textContent = count1;
        const winKrestik = new Audio('./audio/winKrestik.mp3');
        winKrestik.play();
      } else {
        turnBox2.classList.add('turn-win');
        count2++;
        document.getElementById('player2Score').textContent = count2;
        const winNoliki = new Audio('./audio/winNoliki.mp3');
        winNoliki.play();
      }

      for (let j = 0; j < 3; j++) {
        boxes[winCombination[i][j]].classList.add('winCombination');
      }

      return;
    }

    if (v0 === '' || v1 === '' || v2 === '') {
      isDraw = false;
    }
  }

  if (isDraw) {
    isGameOver = true;
    whoTurn.innerHTML = 'Ничья';
  }
}

function changeTurn() {
  if (!isGameOver) {
    if (turn === 'X') {
      turn = "O";
      turnBox1.classList.remove('turn-bg');
      turnBox2.classList.add('turn-bg');
      const clickKrestiki = new Audio('./audio/clickKrestiki.mp3');
      clickKrestiki.play();
    } else if (turn === "O") {
      turn = "X";
      turnBox2.classList.remove('turn-bg');
      turnBox1.classList.add('turn-bg');
      const clickNoliki = new Audio('./audio/clickNoliki.mp3');
      clickNoliki.play();
    }
  }
}