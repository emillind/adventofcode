const fs = require("fs");
const inputString = fs.readFileSync("inputs/11.txt").toString();
const puzzleInput = inputString.split(",");
const { run } = require("./intcode");

const turnLeft = current => {
  switch (current) {
    case "N":
      return "W";
    case "W":
      return "S";
    case "S":
      return "E";
    case "E":
      return "N";
  }
};

const turnRight = current => {
  switch (current) {
    case "N":
      return "E";
    case "E":
      return "S";
    case "S":
      return "W";
    case "W":
      return "N";
  }
};

const move = (x, y, dir) => {
  switch (dir) {
    case "N":
      return [x, y + 1];
    case "W":
      return [x - 1, y];
    case "S":
      return [x, y - 1];
    case "E":
      return [x + 1, y];
  }
};

const calculatePaintArea = memory => {
  let currentDirection = "N";
  let currentX = 0;
  let currentY = 0;
  let painted = [{ x: 0, y: 0, color: 1 }];

  const turnAndMove = input => {
    if (input === 0) {
      currentDirection = turnLeft(currentDirection);
    } else {
      currentDirection = turnRight(currentDirection);
    }
    [currentX, currentY] = move(currentX, currentY, currentDirection);
  };

  const paint = input => {
    let previous = painted.find(p => p.x === currentX && p.y === currentY);
    if (previous) previous.color = input;
    else painted.push({ x: currentX, y: currentY, color: input });
  };

  const getColor = () => {
    let tile = painted.find(p => p.x === currentX && p.y === currentY);
    if (tile) return tile.color;
    else return 0;
  };

  run(memory, 1, turnAndMove, paint, getColor);

  return painted;
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

const setValue = (row, col, value, grid) => {
  if (grid.length <= row) {
    let newRow = [];
    newRow[col] = value;
    for (let i = 0; i < col; i++) {
      if (newRow[i] === undefined) newRow[i] = " ";
    }
    grid[row] = newRow;
    // Fill with empty rows
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === undefined) grid[i] = [];
    }
  } else {
    grid[row][col] = value;
  }
};

const offsetField = (painted, lowestX, lowestY, highestX, highestY) => {
  let field = [];

  for (let y = 0; y <= highestY; y++) {
    let row = [];
    for (let x = 0; x <= highestX; x++) {
      row.push(" ");
    }
    field.push(row);
  }
  const offset = painted.map(p => {
    return {
      x: p.x + lowestX,
      y: p.y + lowestY,
      color: p.color
    };
  });
  //let field = [];
  offset.forEach(p => {
    field[p.y][p.x] = p.color === 0 ? " " : "0";
  });
  return field;
};

const parseAnswer = image => {
  const joined = image.map(i => i.join(""));
  const parsed = joined.reverse().join("\n");
  return parsed;
};

const firstTask = () => {
  const ans = calculatePaintArea([...puzzleInput]);
  return ans.length;
};

const secondTask = () => {
  const painted = calculatePaintArea([...puzzleInput]);
  console.log(painted);
  const lowestX = findLowestValue(painted, "x");
  const highestX = findHighestValue(painted, "x") + lowestX;
  const lowestY = findLowestValue(painted, "y");
  const highestY = findHighestValue(painted, "y") + lowestY;
  const field = offsetField(painted, lowestX, lowestY, highestX, highestY);
  const ans = parseAnswer(field);
  return ans;
};

const main = () => {
  console.log("DAY 11");
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

  console.log("Answer:");
  console.log(secondTask());

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
