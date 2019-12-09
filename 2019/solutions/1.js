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
  console.log(ans);
};

const secondTask = arr => {
  const ans = arr.reduce((acc, curr) => {
    const val = calculate(curr);
    return acc + val;
  }, 0);
  console.log(ans);
};
console.log("Executing first task");
firstTask([...arr]);
console.log("Executing second task");
secondTask([...arr]);
