const fs = require('fs');
const log = require('./log.js');

const DAY = '02';

const lowerBound = 1;
const upperBound = 3;

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  return inputString
    .split('\n')
    .map((val) => val.split(' ').map((it) => parseInt(it)));
};

const isSafe = (report) => {
  const diff = report[0] - report[1];
  if (diff === 0) return false;
  const lower = diff > 0 ? true : false;
  for (let i = 1; i < report.length; i++) {
    const level = report[i];
    const prevLevel = report[i - 1];
    const currentDiff = lower ? prevLevel - level : level - prevLevel;

    if (currentDiff < 1 || currentDiff > 3) return false;
  }
  return true;
};

const isSafeTwo = (report) => {
  if (isSafe(report)) return true;
  for (let i = 0; i < report.length; i++) {
    const copy = [...report];
    copy.splice(i, 1);
    if (isSafe(copy)) return true;
  }
  return false;
};

const firstTask = (reports) => {
  return reports.reduce((acc, curr) => acc + (isSafe(curr) ? 1 : 0), 0);
};

const secondTask = (reports) => {
  return reports.reduce((acc, curr) => acc + (isSafeTwo(curr) ? 1 : 0), 0);
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
