import { dots, sizeX, player, updatePlayer } from "./game.js";

let gameBoard = document.getElementById("game-board");
let context = gameBoard.getContext("2d");

export let squares = [];
let lines = [];
export let [p1Score, p2Score] = [0, 0];

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

  var squaresToFinalise = [];

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

        let subset = squares[square].slice(0, -1);

        let smallestCoord = {
          x: Number.MAX_SAFE_INTEGER,
          y: Number.MAX_SAFE_INTEGER,
        };

        //determining the smallest coordinate pair (top left for rect drawing)
        for (const coord in subset) {
          const from = subset[coord].from.x + subset[coord].from.y;
          const to = subset[coord].to.x + subset[coord].to.y;
          if (smallestCoord.x + smallestCoord.y > from) {
            if (from < to) {
              smallestCoord = subset[coord].from;
            } else {
              smallestCoord = subset[coord].to;
            }
          }
        }
        squaresToFinalise.push({ x: smallestCoord.x, y: smallestCoord.y });
      }
    }
  }
  finaliseSquares(squaresToFinalise);
  squaresToFinalise = [];
}

function finaliseSquares(squaresToFinalise) {
  for (const square in squaresToFinalise) {
    const upLeftX = squaresToFinalise[square].x;
    const upLeftY = squaresToFinalise[square].y;
    //call update player to give the square collecting player another turn
    if (player === 1) {
      document.getElementById("p1").innerHTML = "Player 1: " + ++p1Score;
      context.fillStyle = "rgba(255, 0, 0, 0.5)"; //red
    } else {
      document.getElementById("p2").innerHTML = "Player 2: " + ++p2Score;
      context.fillStyle = "rgba(0, 0, 255, 0.5)"; //blue
    }
    context.fillRect(upLeftX, upLeftY, sizeX, sizeX);
  }
  if (squaresToFinalise % 2 === 0) {
    updatePlayer();
  }
}
