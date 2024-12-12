const fs = require('fs');
const log = require('./log.js');

const DAY = '06';

const OBSTACLE = '#';
const VISITED = 'X';

const up = [-1, 0];
const down = [1, 0];
const left = [0, -1];
const right = [0, 1];

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  return inputString.split('\n').map((val) => val.split(''));
};

const getStartPosition = (matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === '^') return { x, y };
    }
  }
};

const turn = (dirs) => {
  if (dirs == up) return right;
  else if (dirs == right) return down;
  else if (dirs == down) return left;
  else if (dirs == left) return up;
};

const calculateGuardPath = (matrix) => {
  const pos = getStartPosition(matrix);
  const startPos = { x: pos.x, y: pos.y };
  const visited = {};
  const obstacles = new Set();
  let dirs = up;
  while (
    matrix[pos.y + 1 * dirs[0]] &&
    matrix[pos.y + 1 * dirs[0]][pos.x + 1 * dirs[1]]
  ) {
    const nextPos = { x: pos.x + 1 * dirs[1], y: pos.y + 1 * dirs[0] };
    const visitedKey = `${pos.y},${pos.x}`;
    if (matrix[nextPos.y][nextPos.x] === OBSTACLE) {
      if (visited[visitedKey]) visited[visitedKey].push(dirs);
      else visited[visitedKey] = [dirs];
      dirs = turn(dirs);
    } else {
      const simulatedTurn = turn(dirs);
      const simulatedPos = {
        y: pos.y + 1 * simulatedTurn[0],
        x: pos.x + 1 * simulatedTurn[1],
      };
      while (
        matrix[simulatedPos.y] &&
        matrix[simulatedPos.y][simulatedPos.x] &&
        matrix[simulatedPos.y][simulatedPos.x] !== OBSTACLE
      ) {
        const simulatedKey = `${simulatedPos.y},${simulatedPos.x}`;
        if (
          visited[simulatedKey] &&
          visited[simulatedKey].includes(simulatedTurn)
        ) {
          obstacles.add(nextPos);
        }
        simulatedPos.x += 1 * simulatedTurn[1];
        simulatedPos.y += 1 * simulatedTurn[0];
      }
    }
    matrix[pos.y][pos.x] = VISITED;
    if (visited[visitedKey]) visited[visitedKey].push(dirs);
    else visited[visitedKey] = [dirs];
    pos.x += 1 * dirs[1];
    pos.y += 1 * dirs[0];
  }
  matrix[pos.y][pos.x] = VISITED;
  return obstacles;
};

const countVisited = (matrix) => {
  return matrix.reduce(
    (acc, curr) =>
      acc + curr.reduce((iAcc, iCurr) => iAcc + (iCurr === VISITED ? 1 : 0), 0),
    0
  );
};

const firstTask = (matrix) => {
  return countVisited(matrix);
};

const secondTask = (obstacles) => {
  console.log(obstacles);
  return obstacles.size;
};

const main = () => {
  const testInput = parseInput('test', DAY);
  const parsedInput = parseInput('input', DAY);
  const testRes = calculateGuardPath(testInput);
  const res = calculateGuardPath(parsedInput);
  log.start(DAY);
  log.runTask(firstTask, testInput, 1);
  console.log('-------------------');
  log.runTask(secondTask, res, 2);
  log.end();
};

main();

exports.main = main;
