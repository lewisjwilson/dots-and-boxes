import { checkAvaliability } from "./plot_lines.js";
import { createSquares } from "./squares.js";

let gameBoard = document.getElementById("game-board");
let context = gameBoard.getContext("2d");

export const dots = 4;
export let dotCoords = [];

export let player = 1;

export const sizeX = gameBoard.width / dots;
const sizeY = gameBoard.height / dots;

//create the dots and put the coordinates into an array
for (let i = 0; i < dots; i++) {
  for (let j = 0; j < dots; j++) {
    dotCoords.push({ x: sizeX * (j + 0.5), y: sizeY * (i + 0.5) });
    context.beginPath();
    context.arc(sizeX * (j + 0.5), sizeY * (i + 0.5), 6, 0, 2 * Math.PI, false);
    context.fill();
  }
}
//console.log(dotCoords);

//create the array of squares
createSquares(dotCoords);

//get position of click
function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  getLineLocation(x, y);
}

const canvasSelect = document.querySelector("canvas");
gameBoard.addEventListener("mousedown", function (e) {
  getCursorPosition(canvasSelect, e);
});

//a bit of maths to find the two closest dot coordinates to the most recent mouse click
function getLineLocation(mouseCursorX, mouseCursorY) {
  for (let i = 0; i < dots; i++) {
    if (mouseCursorX > dotCoords[i].x && mouseCursorX < dotCoords[i + 1].x) {
      for (let j = 0; j < dots ** 2; j += dots) {
        if (
          mouseCursorY > dotCoords[j].y &&
          mouseCursorY < dotCoords[j + dots].y
        ) {
          const deltaTopLeft = Math.sqrt(
            Math.pow(mouseCursorX - dotCoords[i].x, 2) +
              Math.pow(mouseCursorY - dotCoords[j].y, 2)
          );
          const deltaTopRight = Math.sqrt(
            Math.pow(mouseCursorX - dotCoords[i + 1].x, 2) +
              Math.pow(mouseCursorY - dotCoords[j].y, 2)
          );
          const deltaBottomLeft = Math.sqrt(
            Math.pow(mouseCursorX - dotCoords[i].x, 2) +
              Math.pow(mouseCursorY - dotCoords[j + dots].y, 2)
          );
          const deltaBottomRight = Math.sqrt(
            Math.pow(mouseCursorX - dotCoords[i + 1].x, 2) +
              Math.pow(mouseCursorY - dotCoords[j + dots].y, 2)
          );

          const localCoordsData = [
            {
              coord: "topleft",
              delta: deltaTopLeft,
              x: dotCoords[i].x,
              y: dotCoords[j].y,
            },
            {
              coord: "topright",
              delta: deltaTopRight,
              x: dotCoords[i + 1].x,
              y: dotCoords[j].y,
            },
            {
              coord: "bottomleft",
              delta: deltaBottomLeft,
              x: dotCoords[i].x,
              y: dotCoords[j + dots].y,
            },
            {
              coord: "bottomright",
              delta: deltaBottomRight,
              x: dotCoords[i + 1].x,
              y: dotCoords[j + dots].y,
            },
          ];

          //uses a sort function to rearrange array from smallest to biggest delta
          const smallestDeltas = localCoordsData.sort(function (a, b) {
            return a.delta - b.delta;
          });

          let [x1, y1, x2, y2] = [
            smallestDeltas[0].x,
            smallestDeltas[0].y,
            smallestDeltas[1].x,
            smallestDeltas[1].y,
          ];

          //console.log("before x1, y1: " + x1 + " " + y1);
          //console.log("before x2, y2: " + x2 + " " + y2);
          //this makes sure lines are created from smallest coord to largest coord
          if (x2 < x1) {
            const temp = x2;
            x2 = x1;
            x1 = temp;
          }

          if (y2 < y1) {
            const temp = y2;
            y2 = y1;
            y1 = temp;
          }
          //console.log("after x1, y1: " + x1 + " " + y1);
          //console.log("after x2, y2: " + x2 + " " + y2);

          checkAvaliability(x1, y1, x2, y2);
          break;
        }
      }
    }
  }
}

export function updatePlayer() {
  if (player === 1) {
    player = 2;
    return "red";
  } else {
    player = 1;
    return "blue";
  }
}
