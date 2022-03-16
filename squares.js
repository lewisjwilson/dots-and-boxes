import { dots } from "./game.js";

let squares = [];
let lines = [];
let gameOver = false;

export function createSquares(dotCoords) {
  //console.log(dotCoords);

  //get the coordinates of the top corner of dots
  //size of dot square = dots - 1
  for (let i = 0; i < dots ** 2 - dots; i++) {
    if ((i + 1) % dots === 0) {
      continue;
    }
    squares.push([
      { from: dotCoords[i], to: dotCoords[i + 1] },
      { from: dotCoords[i + 1], to: dotCoords[i + dots + 1] },
      { from: dotCoords[i + dots], to: dotCoords[i + dots + 1] },
      { from: dotCoords[i], to: dotCoords[i + dots] },
      false,
    ]);
  }
  //console.log(squares);
}

export function checkSquares(x1, y1, x2, y2) {
  const line = { from: { x: x1, y: y1 }, to: { x: x2, y: y2 } };

  lines.push(line);

  for (const square in squares) {
    ///squares[square][4] is true if square has been filled
    if (squares[square][4] === false) {
      if (
        lines.some(
          (el) => JSON.stringify(el) === JSON.stringify(squares[square][0])
        ) &&
        lines.some(
          (el) => JSON.stringify(el) === JSON.stringify(squares[square][1])
        ) &&
        lines.some(
          (el) => JSON.stringify(el) === JSON.stringify(squares[square][2])
        ) &&
        lines.some(
          (el) => JSON.stringify(el) === JSON.stringify(squares[square][3])
        )
      ) {
        squares[square][4] = true;
        console.log("square!");
        checkGameOver();
        break;
      }
    }
  }
}

function checkGameOver() {
  //squares array [4] shows if square has been filled or not
  gameOver = squares.every((el) => el[4] === true);
  if (gameOver) {
    alert("Game Over!");
  }
}
