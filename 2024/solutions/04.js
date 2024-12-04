const fs = require('fs');
const log = require('./log.js');

const DAY = '04';

const XMAS = 'XMAS';

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  return inputString.split('\n').map((val) => val.split(''));
};

const check = (x, y, matrix, xDir, yDir, dir) => {
  const word =
    matrix[y][x] +
    matrix[y + 1 * yDir][x + 1 * xDir] +
    matrix[y + 2 * yDir][x + 2 * xDir] +
    matrix[y + 3 * yDir][x + 3 * xDir];
  if (word === XMAS) {
    console.log(`Found word ${dir} of (${y},${x})`);
  }
  return word === XMAS ? 1 : 0;
};

const checkEast = (x, y, matrix) => {
  return check(x, y, matrix, 1, 0, 'east');
};

const checkWest = (x, y, matrix) => {
  return check(x, y, matrix, -1, 0, 'west');
};

const checkNorth = (x, y, matrix) => {
  return check(x, y, matrix, 0, -1, 'north');
};

const checkNorthEast = (x, y, matrix) => {
  return check(x, y, matrix, 1, -1, 'northeast');
};

const checkNorthWest = (x, y, matrix) => {
  return check(x, y, matrix, -1, -1, 'northwest');
};

const checkSouth = (x, y, matrix) => {
  return check(x, y, matrix, 0, 1, 'south');
};

const checkSouthEast = (x, y, matrix) => {
  return check(x, y, matrix, 1, 1, 'south');
};

const checkSouthWest = (x, y, matrix) => {
  return check(x, y, matrix, -1, 1, 'south');
};

const findXmas = (x, y, matrix) => {
  let foundWords = 0;
  if (y >= XMAS.length - 1) {
    foundWords += checkNorth(x, y, matrix);
    foundWords += checkNorthWest(x, y, matrix);
    foundWords += checkNorthEast(x, y, matrix);
  }
  if (y <= matrix.length - XMAS.length) {
    foundWords += checkSouth(x, y, matrix);
    foundWords += checkSouthWest(x, y, matrix);
    foundWords += checkSouthEast(x, y, matrix);
  }
  if (x >= XMAS.length - 1) {
    foundWords += checkWest(x, y, matrix);
  }
  if (x <= matrix[0].length - XMAS.length) {
    foundWords += checkEast(x, y, matrix);
  }
  return foundWords;
};

const isX_mas = (x, y, matrix) => {
  if (x <= 0 || x >= matrix[0].length - 1 || y <= 0 || y >= matrix.length - 1) {
    return false;
  }
  const matchNwSe =
    (matrix[y - 1][x - 1] === 'M' && matrix[y + 1][x + 1] === 'S') ||
    (matrix[y - 1][x - 1] === 'S' && matrix[y + 1][x + 1] === 'M');

  const matchSwNe =
    (matrix[y + 1][x - 1] === 'M' && matrix[y - 1][x + 1] === 'S') ||
    (matrix[y + 1][x - 1] === 'S' && matrix[y - 1][x + 1] === 'M');
  return matchNwSe && matchSwNe;
};

const firstTask = (input) => {
  let res = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const cell = input[y][x];
      if (cell === 'X') {
        res += findXmas(x, y, input);
      }
    }
  }
  return res;
};

const secondTask = (input) => {
  let res = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const cell = input[y][x];
      if (cell === 'A') {
        res += isX_mas(x, y, input) ? 1 : 0;
      }
    }
  }
  return res;
};

const main = () => {
  const testInput = parseInput('test', DAY);
  const parsedInput = parseInput('input', DAY);
  log.start(DAY);
  log.runTask(firstTask, parsedInput, 1);
  console.log('-------------------');
  log.runTask(secondTask, parsedInput, 2);
  log.end();
};

main();

exports.main = main;
