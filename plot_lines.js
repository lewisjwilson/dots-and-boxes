import { checkSquares } from "./squares.js";

let gameBoard = document.getElementById("game-board");
let context = gameBoard.getContext("2d");
let turn = "p1";
let createdLines = [];

export function checkAvaliability(x1, y1, x2, y2) {
  //console.log(createdLines);

  //Boolean: line has already been created (and store in createdLines)
  const exists = Boolean(
    createdLines.find(
      (line) =>
        line.x1 === x1 && line.y1 === y1 && line.x2 === x2 && line.y2 === y2
    )
  );

  if (!exists) {
    drawLine(x1, y1, x2, y2);
    createdLines.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
    console.log("new line created");
    checkSquares(x1, y1, x2, y2);
  }
}

//does what it says on the tin, draws the line from point (x1, y1) to (x2, y2)
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 4;

  if (turn === "p1") {
    context.strokeStyle = "red";
    turn = "p2";
  } else {
    context.strokeStyle = "blue";
    turn = "p1";
  }
  context.stroke();
}
