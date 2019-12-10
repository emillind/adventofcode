const fs = require("fs");
const inputString = fs.readFileSync("inputs/3.txt").toString();
const wires = inputString.split("\n").map(wire => wire.split(","));

const updatePosition = (direction, { x, y }) => {
  switch (direction) {
    case "R":
      return { x: x + 1, y: y };
    case "L":
      return { x: x - 1, y: y };
    case "U":
      return { x: x, y: y + 1 };
    case "D":
      return { x: x, y: y - 1 };
  }
};

const updateGrid = (grid, direction, stepsLeft, position, totalSteps) => {
  let currentPosition = { ...position };
  while (stepsLeft > 0) {
    let row = grid[currentPosition.x];
    if (row && !row.find(y => y.y === currentPosition.y)) {
      row.push({ y: currentPosition.y, steps: totalSteps });
    } else {
      grid[currentPosition.x] = [{ y: currentPosition.y, steps: totalSteps }];
    }
    // Update
    currentPosition = updatePosition(direction, currentPosition);
    stepsLeft--;
    totalSteps++;
  }
  return [currentPosition, totalSteps];
};

const buildGridWithWire = (grid, wire) => {
  let currentPosition = { x: 0, y: 0 };
  let totalSteps = 0;
  wire.forEach(movement => {
    const direction = movement.slice(0, 1);
    const steps = parseInt(movement.slice(1));
    [currentPosition, totalSteps] = updateGrid(
      grid,
      direction,
      steps,
      currentPosition,
      totalSteps
    );
  });
};

const walkThroughGrid = (
  grid,
  direction,
  stepsLeft,
  position,
  intersections,
  totalSteps
) => {
  let currentPosition = { ...position };
  while (stepsLeft > 0) {
    let row = grid[currentPosition.x];
    if (row) {
      let point = row.find(y => currentPosition.y === y.y);
      if (point) {
        intersections.push({
          ...currentPosition,
          steps: totalSteps + point.steps
        });
      }
    }
    // Update
    currentPosition = updatePosition(direction, currentPosition);
    stepsLeft--;
    totalSteps++;
  }
  return [currentPosition, totalSteps];
};

const findIntersectionsFromGrid = (grid, wire) => {
  let currentPosition = { x: 0, y: 0 };
  let intersections = [];
  let totalSteps = 0;
  wire.forEach(movement => {
    const direction = movement.slice(0, 1);
    const steps = parseInt(movement.slice(1));
    [currentPosition, totalSteps] = walkThroughGrid(
      grid,
      direction,
      steps,
      currentPosition,
      intersections,
      totalSteps
    );
  });
  return intersections;
};

const manhattanDistance = (point1, point2) => {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
};

const findBestIntersectionByDistance = (intersections, centralPoint) => {
  let smallestDistance = Number.MAX_SAFE_INTEGER;
  intersections.forEach(intersection => {
    const dist = manhattanDistance(centralPoint, intersection);
    if (dist < smallestDistance) smallestDistance = dist;
  });
  return smallestDistance;
};

const findBestIntersectionBySteps = intersections => {
  let leastSteps = Number.MAX_SAFE_INTEGER;
  intersections.forEach(intersection => {
    if (intersection.steps < leastSteps) leastSteps = intersection.steps;
  });
  return leastSteps;
};

const firstTask = () => {
  let grid = {};
  buildGridWithWire(grid, wires[0]);
  const intersections = findIntersectionsFromGrid(grid, wires[1]);
  const ans = findBestIntersectionByDistance(intersections.slice(1), {
    x: 0,
    y: 0
  });
  return ans;
};

const secondTask = () => {
  let grid = {};
  buildGridWithWire(grid, wires[0]);
  const intersections = findIntersectionsFromGrid(grid, wires[1]);
  const ans = findBestIntersectionBySteps(intersections.slice(1));
  return ans;
};

const main = () => {
  console.log("DAY 3");
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
