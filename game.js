let gameBoard = document.getElementById("game-board");
let context = gameBoard.getContext("2d");
let sizeX = gameBoard.width / 5;
let sizeY = gameBoard.height / 5;

let dotCoords = [];

//create the dots and put the coordinates into an array
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    dotCoords.push({ x: sizeX * (j + 0.5), y: sizeY * (i + 0.5) });
    context.beginPath();
    context.arc(sizeX * (j + 0.5), sizeY * (i + 0.5), 6, 0, 2 * Math.PI, false);
    context.fill();
  }
}
//console.log(dotCoords);

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
  for (let i = 0; i < 5; i++) {
    if (mouseCursorX > dotCoords[i].x && mouseCursorX < dotCoords[i + 1].x) {
      for (let j = 0; j < 25; j += 5) {
        if (
          mouseCursorY > dotCoords[j].y &&
          mouseCursorY < dotCoords[j + 5].y
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
              Math.pow(mouseCursorY - dotCoords[j + 5].y, 2)
          );
          const deltaBottomRight = Math.sqrt(
            Math.pow(mouseCursorX - dotCoords[i + 1].x, 2) +
              Math.pow(mouseCursorY - dotCoords[j + 5].y, 2)
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
              y: dotCoords[j + 5].y,
            },
            {
              coord: "bottomright",
              delta: deltaBottomRight,
              x: dotCoords[i + 1].x,
              y: dotCoords[j + 5].y,
            },
          ];

          //uses a sort function to rearrange array from smallest to biggest delta
          const smallestDeltas = localCoordsData.sort(function (a, b) {
            return a.delta - b.delta;
          });

          drawLine(
            smallestDeltas[0].x,
            smallestDeltas[0].y,
            smallestDeltas[1].x,
            smallestDeltas[1].y
          );
          break;
        }
      }
    }
  }
}

//does what it says on the tin, draws the line from point (x1, y1) to (x2, y2)
function drawLine(x1, y1, x2, y2) {
  console.log("from: (" + x1 + " " + y1 + "), to: (" + x2 + " " + y2 + ")");
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 2;
  context.stroke();
}
