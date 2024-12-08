const fs = require('fs');
const log = require('./log.js');

const DAY = '07';

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  return inputString.split('\n').map((val) => {
    const [target, ...rest] = val.match(/\d+/g);
    return {
      target: parseInt(target),
      numbers: rest.map((it) => parseInt(it)),
    };
  });
};

const multiply = (a, b) => a * b;
const add = (a, b) => a + b;
const pipe = (a, b) => parseInt(`${a}${b}`);

const getPossibleValues = (value, remainingNumbers, possibleValues, ops) => {
  if (remainingNumbers.length === 0) {
    possibleValues.push(value);
    return;
  }
  ops.forEach((op) => {
    getPossibleValues(
      op(value, remainingNumbers[0]),
      remainingNumbers.slice(1),
      possibleValues,
      ops
    );
  });
};

const isPossible = ({ target, numbers }, ops) => {
  const possibleValues = [];
  getPossibleValues(numbers[0], numbers.slice(1), possibleValues, ops);
  return possibleValues.includes(target);
};

const firstTask = (input) => {
  return input.reduce(
    (acc, curr) => acc + (isPossible(curr, [multiply, add]) ? curr.target : 0),
    0
  );
};

const secondTask = (input) => {
  return input.reduce(
    (acc, curr) =>
      acc + (isPossible(curr, [multiply, add, pipe]) ? curr.target : 0),
    0
  );
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
