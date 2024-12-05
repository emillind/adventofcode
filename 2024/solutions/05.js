const fs = require('fs');
const log = require('./log.js');

const DAY = '05';

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  const parts = inputString.split('\n\n');
  const rules = parts[0].split('\n').reduce((acc, curr) => {
    const [from, to] = curr.split('|').map((page) => parseInt(page));
    if (acc[from]) acc[from].push(to);
    else acc[from] = [to];
    return acc;
  }, {});
  const updates = parts[1]
    .split('\n')
    .map((update) => update.split(',').map((page) => parseInt(page)));
  return { rules, updates };
};

const checkUpdate = (update, rules) => {
  for (let i = update.length - 1; i > 0; i--) {
    const page = update[i];
    const unallowed = rules[page];
    const precedingPart = update.slice(0, i);
    if (unallowed && precedingPart.length > 0) {
      for (let j = 0; j < unallowed.length; j++) {
        if (precedingPart.includes(unallowed[j])) return false;
      }
    }
  }
  return true;
};

const getMiddleValue = (update) => {
  return update[(update.length - 1) / 2];
};

const solveInvalidUpdate = (update, rules) => {
  update.sort((a, b) => {
    if (!rules[a]) return 1;
    if (!rules[b]) return -1;
    if (rules[b].includes(a)) return 1;
    if (rules[a].includes(b)) return -1;
  });
  return getMiddleValue(update);
};

const firstTask = (input) => {
  return input.updates.reduce(
    (acc, curr) =>
      acc + (checkUpdate(curr, input.rules) ? getMiddleValue(curr) : 0),
    0
  );
};

const secondTask = (input) => {
  return input.updates.reduce(
    (acc, curr) =>
      acc +
      (checkUpdate(curr, input.rules)
        ? 0
        : solveInvalidUpdate(curr, input.rules)),
    0
  );
};

const main = () => {
  const testInput = parseInput('test', DAY);
  console.log(testInput);
  const parsedInput = parseInput('input', DAY);
  log.start(DAY);
  log.runTask(firstTask, parsedInput, 1);
  console.log('-------------------');
  log.runTask(secondTask, parsedInput, 2);
  log.end();
};

main();

exports.main = main;
