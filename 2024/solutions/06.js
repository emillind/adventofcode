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

const calculateGuardPath = (matrix) => {
  const obstaclesHit = [];
  const pos = getStartPosition(matrix);
  let dirs = up;
  while (
    matrix[pos.y + 1 * dirs[0]] &&
    matrix[pos.y + 1 * dirs[0]][pos.x + 1 * dirs[1]]
  ) {
    const nextPos = matrix[pos.y + 1 * dirs[0]][pos.x + 1 * dirs[1]];
    if (nextPos === OBSTACLE) {
      const next = { a: pos.y + 1 * dirs[0], b: pos.x + 1 * dirs[1] };
      if (!obstaclesHit.find((it) => it.a === next.a && next.b === it.b)) {
        obstaclesHit.push(next);
      }
      // x: 0 -> 1 -> 0 -> -1 -> 0
      // y: -1 -> 0 -> 1 -> 0 -> -1
      if (dirs == up) dirs = right;
      else if (dirs == right) dirs = down;
      else if (dirs == down) dirs = left;
      else if (dirs == left) dirs = up;
    }
    matrix[pos.y][pos.x] = VISITED;
    pos.x += 1 * dirs[1];
    pos.y += 1 * dirs[0];
  }
  matrix[pos.y][pos.x] = VISITED;
  return obstaclesHit;
};

const countVisited = (matrix) => {
  return matrix.reduce(
    (acc, curr) =>
      acc + curr.reduce((iAcc, iCurr) => iAcc + (iCurr === VISITED ? 1 : 0), 0),
    0
  );
};

// 6,3 - 7,6 - 7,7 - 8,1 - 8,3 - 9,7

// 6,3
// 7,7
// 7,6
// 8,1
// 8,3 - saknas, följer inte mönstret
// 9,7
//
// 4,9 - ska inte vara med - har ett hinder i sig

const findLoopSpots = (matrix, obstacles) => {
  const spots = [];
  obstacles.forEach(({ a, b }) => {
    for (let m = 2; m < obstacles.length; m++) {
      for (let n = 2; n < obstacles.length; n++) {
        const ne = obstacles.find((o) => o.a === a + 1 && o.b === b + n);
        const se = obstacles.find((o) => o.a === a + m && o.b === b + n - 1);
        const sw = obstacles.find((o) => o.a === a + m - 1 && o.b === b - 1);
        if ((ne && se) || (ne && sw) || (se && sw))
          console.log('(', a, b, ')', ne, se, sw);
        if (ne && se) {
          console.log('adding', { y: a + m - 1, x: b - 1 });
          spots.push({ y: a + m - 1, x: b - 1 });
        }
        if (ne && sw) {
          console.log('adding', { y: a + m, x: b + n - 1 });
          spots.push({ y: a + m, x: b + n - 1 });
        }
        if (sw && se) {
          console.log('adding', { y: a + 1, x: b + n });
          spots.push({ y: a + 1, x: b + n });
        }
      }
    }
  });
  return spots;
};

const validateLoop = () => {
  // TODO
  return true;
};

const firstTask = (matrix) => {
  return countVisited(matrix);
};

const secondTask = ({ matrix, obstaclesHit }) => {
  console.log(matrix.map((it) => it.join('')).join('\n'));
  console.log(obstaclesHit);
  const possibleLoops = findLoopSpots(matrix, obstaclesHit).filter(
    validateLoop
  );
  console.log(possibleLoops);
  return possibleLoops.length;
};

const main = () => {
  const testInput = parseInput('test', DAY);
  const parsedInput = parseInput('input', DAY);
  const obstaclesHit = calculateGuardPath(testInput);
  log.start(DAY);
  log.runTask(firstTask, parsedInput, 1);
  console.log('-------------------');
  log.runTask(secondTask, { matrix: testInput, obstaclesHit }, 2);
  log.end();
};

main();

exports.main = main;
