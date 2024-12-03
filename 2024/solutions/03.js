const fs = require('fs');
const log = require('./log.js');

const DAY = '03';

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  return inputString;
};

const multiply = (op) => {
  const [first, second] = op.match(/\d+/g);
  return first * second;
};

const firstTask = (input) => {
  return input
    .match(/mul\(\d+,\d+\)/g)
    .reduce((acc, curr) => acc + multiply(curr), 0);
};

const secondTask = (input) => {
  let shouldAdd = true;
  let res = 0;
  input.match(/(mul\(\d+,\d+\))|(do\(\))|(don\'t\(\))/g).forEach((op) => {
    if (op.includes('mul') && shouldAdd) res += multiply(op);
    if (op.includes('do()')) shouldAdd = true;
    if (op.includes("don't()")) shouldAdd = false;
  });
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
