const fs = require('fs');
const log = require('./log.js');

const DAY = '01';

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  return inputString.split('\n');
};

const extractSortedLists = (input) => {
  const first = [];
  const second = [];
  input.forEach((it) => {
    const [num1, num2] = it.match(/\d+/g);
    first.push(parseInt(num1));
    second.push(parseInt(num2));
  });
  return [first.sort(), second.sort()];
};

const firstTask = (input) => {
  const [firstList, secondList] = extractSortedLists(input);
  return firstList.reduce(
    (acc, curr, i) =>
      acc + (Math.max(curr, secondList[i]) - Math.min(curr, secondList[i])),
    0
  );
};

const secondTask = (input) => {
  const [firstList, secondList] = extractSortedLists(input);
  const counts = secondList.reduce((acc, curr) => {
    if (acc[curr]) acc[curr]++;
    else acc[curr] = 1;
    return acc;
  }, {});
  return firstList.reduce((acc, curr) => acc + curr * (counts[curr] || 0), 0);
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
