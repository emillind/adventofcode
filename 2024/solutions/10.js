const fs = require('fs');
const log = require('./log.js');

const DAY = '10';

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  return inputString
    .split('\n')
    .map((it) => it.split('').map((val) => parseInt(val)));
};

const countTrailheads = (y, x, value, matrix, tops, unique) => {
  if (value === 9) {
    const id = `${y},${x}`;
    if (unique) {
      if (!tops.includes(id)) {
        tops.push(id);
        return 1;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  }

  let count = 0;
  if (matrix[y - 1] && matrix[y - 1][x] === value + 1) {
    count += countTrailheads(y - 1, x, value + 1, matrix, tops, unique);
  }
  if (matrix[y + 1] && matrix[y + 1][x] === value + 1) {
    count += countTrailheads(y + 1, x, value + 1, matrix, tops, unique);
  }
  if (matrix[y][x - 1] === value + 1) {
    count += countTrailheads(y, x - 1, value + 1, matrix, tops, unique);
  }
  if (matrix[y][x + 1] === value + 1) {
    count += countTrailheads(y, x + 1, value + 1, matrix, tops, unique);
  }
  return count;
};

const firstTask = (input) => {
  let res = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const cell = input[y][x];
      if (cell === 0) {
        const tops = [];
        res += countTrailheads(y, x, cell, input, tops, true);
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
      if (cell === 0) {
        res += countTrailheads(y, x, cell, input, [], false);
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
