const fs = require("fs");
const inputString = fs.readFileSync("inputs/13.txt").toString();
const puzzleInput = inputString.split(",");
const { run } = require("./intcode");

const findBoard = (memory, task) => {
  let currentX = 0;
  let currentY = 0;
  let tiles = [];
  let score = 0;
  let ballPositions = [];
  let paddlePosition = 0;

  const setX = input => {
    currentX = input;
  };

  const setY = input => {
    currentY = input;
  };

  const setTile = value => {
    if (currentX === -1 && currentY === 0) {
      //console.log("New score:", value);
      score = value;
    } else {
      if (value === 4) {
        //console.log("Ball on", currentX, currentY);
        ballPositions.push([currentX, currentY]);
      }
      if (value === 3) {
        paddlePosition = [currentX, currentY];
      }
      tiles.push({
        x: currentX,
        y: currentY,
        id: value
      });
    }
  };

  const getJoystick = () => {
    //drawBoard(tiles, score);
    const currentBallPosition = ballPositions[ballPositions.length - 1];
    const previousBallPosition = ballPositions[ballPositions.length - 2];
    if (currentBallPosition[0] < paddlePosition[0]) {
      return -1;
    } else if (currentBallPosition[0] > paddlePosition[0]) {
      return 1;
    } else {
      return 0;
    }
  };

  run(memory, 0, task === 1 ? null : getJoystick, 3, setX, setY, setTile);

  return [tiles, score];
};

const findLowestValue = (painted, axis) => {
  let lowest = Number.MAX_VALUE;
  for (const paint of painted) {
    if (paint[axis] < lowest) lowest = paint[axis];
  }
  return Math.abs(lowest);
};

const findHighestValue = (painted, axis) => {
  let highest = Number.MIN_VALUE;
  for (const paint of painted) {
    if (paint[axis] > highest) highest = paint[axis];
  }
  return highest;
};

const symbolFromID = id => {
  switch (id) {
    case 0:
      return " ";
    case 1:
      return "|";
    case 2:
      return "X";
    case 3:
      return "-";
    case 4:
      return "o";
    default:
      break;
  }
};

const offsetField = (board, highestX, highestY) => {
  let field = [];

  for (let y = 0; y <= highestY; y++) {
    let row = [];
    for (let x = 0; x <= highestX; x++) {
      row.push(" ");
    }
    field.push(row);
  }
  board.forEach(tile => {
    field[tile.y][tile.x] = symbolFromID(tile.id);
  });
  return field;
};

const parseAnswer = image => {
  const joined = image.map(i => i.join(""));
  const parsed = joined.join("\n");
  return parsed;
};

const drawBoard = (board, score) => {
  const lowestX = findLowestValue(board, "x");
  const highestX = findHighestValue(board, "x") + lowestX;
  const lowestY = findLowestValue(board, "y");
  const highestY = findHighestValue(board, "y") + lowestY;
  const field = offsetField(board, highestX, highestY);
  console.log(parseAnswer(field));
  console.log("Score:", score);
};

const firstTask = () => {
  const [board] = findBoard([...puzzleInput], 1);
  const ans = board.filter(b => b.id === 2).length;
  return ans;
};

const secondTask = () => {
  const memory = [...puzzleInput];
  memory[0] = "2";
  const [board, score] = findBoard(memory, 2);
  //drawBoard(board, score);
  return score;
};

const main = () => {
  console.log("DAY 13");
  console.log("===============================");
  let start = new Date();
  console.log(
    "Executing first task at",
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  );

  console.log("Answer:", firstTask());

  let end = new Date();
  console.log(
    "Finished first task at",
    `${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`,
    "in",
    end.getTime() - start.getTime(),
    "milliseconds"
  );
  console.log("-------------------");
  start = new Date();
  console.log(
    "Executing second task at",
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  );

  console.log("Answer:", secondTask());

  end = new Date();
  console.log(
    "Finished second task at",
    `${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`,
    "in",
    end.getTime() - start.getTime(),
    "milliseconds"
  );
  console.log("===============================");
  console.log();
};

main();

exports.main = main;
