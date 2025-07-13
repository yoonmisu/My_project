const board = document.getElementById("board");
const start = document.getElementById("start");
start.addEventListener("click", startGame);
const result = document.getElementById("result");

const totalCells = 64;
const targetCount = 3;
let activeCells = [];
let correctClicks = 0;
let gameStarted = false;
let startTime = null;

for (let i = 0; i < totalCells; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  board.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");

function startGame() {
  result.textContent = "";
  correctClicks = 0;
  activeCells = [];
  startTime = null;
  gameStarted = true;

  cells.forEach(cell => {
    cell.classList.remove("active", "pressed");
    cell.style.pointerEvents = "auto";
    cell.style.backgroundColor = "#fff";
  });

  while (activeCells.length < targetCount) {
    const index = Math.floor(Math.random() * totalCells);
    if (!activeCells.includes(index)) {
      activeCells.push(index);
      cells[index].classList.add("active");
    }
  }
}


cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameStarted) return;

    const index = parseInt(cell.dataset.index);

    if (activeCells.includes(index)) {
      if (correctClicks === 0 && !startTime) {
        startTime = Date.now();
      }
    
      cell.classList.add("pressed");
      cell.style.pointerEvents = "none";
      correctClicks++;
    
      if (correctClicks === targetCount) {
        const endTime = Date.now();
        const time = ((endTime - startTime) / 1000).toFixed(2);
        result.textContent = `🎉 성공! 걸린 시간: ${time}초`;
        gameStarted = false;
        saveRecordStage1(time);
      }
    } else {
      cell.style.backgroundColor = "#999";
      result.textContent = "❌ 틀린 좌석입니다!";
    }
    
  });
});

function updateTop3Graph() {
  const records = JSON.parse(localStorage.getItem("records")) || [];

  document.getElementById("firstTime").textContent =
    records[0] !== undefined ? `${records[0].toFixed(2)}s` : "-";
  document.getElementById("secondTime").textContent =
    records[1] !== undefined ? `${records[1].toFixed(2)}s` : "-";
  document.getElementById("thirdTime").textContent =
    records[2] !== undefined ? `${records[2].toFixed(2)}s` : "-";
}
window.addEventListener("DOMContentLoaded", updateTop3Graph);

function saveRecord(time) {
  const record = parseFloat(time);
  let records = JSON.parse(localStorage.getItem("records")) || [];

  records.push(record);             
  records.sort((a, b) => a - b);         
  records = records.slice(0, 10);            

  localStorage.setItem("records", JSON.stringify(records));
  updateTop3Graph();                
}

cells.forEach(cell => {
  cell.classList.remove("active", "pressed");
  cell.style.pointerEvents = "auto";
  cell.style.backgroundColor = "#fff";
});

