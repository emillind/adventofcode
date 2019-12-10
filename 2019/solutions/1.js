const fs = require("fs");
const inputString = fs.readFileSync("inputs/1.txt").toString();
const arr = inputString.split("\n").map(val => parseInt(val));

const fuelByMass = mass => {
  return Math.floor(mass / 3) - 2;
};

const calculate = mass => {
  let rest = mass;
  let sum = 0;
  while ((rest = fuelByMass(rest)) >= 0) {
    sum += rest;
  }
  return sum;
};

const firstTask = arr => {
  const ans = arr.reduce((acc, curr) => {
    const val = fuelByMass(curr);
    return acc + val;
  }, 0);
  return ans;
};

const secondTask = arr => {
  const ans = arr.reduce((acc, curr) => {
    const val = calculate(curr);
    return acc + val;
  }, 0);
  return ans;
};

const main = () => {
  console.log("DAY 1");
  console.log("===============================");
  let start = new Date();
  console.log(
    "Executing first task at",
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  );

  console.log("Answer:", firstTask([...arr]));

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

  console.log("Answer:", secondTask([...arr]));

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
