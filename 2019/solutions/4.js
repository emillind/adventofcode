const fs = require("fs");
const inputString = fs.readFileSync("inputs/4.txt").toString();
const [min, max] = inputString.split("-").map(i => parseInt(i));

const validatePassword = (password, validator) => {
  if (password.length !== 6) return false;
  let previous = 0;
  let counts = {};
  for (let i = 0; i < password.length; i++) {
    const current = password[i];
    // Count number of occurences of each number
    if (counts[current] !== undefined) counts[current]++;
    else counts[current] = 1;
    // Make sure its sorted
    if (current < previous) return false;
    previous = current;
  }
  // Check the occurences
  return validator(counts);
};

// There must be at least one occurence of two or more of the same number
const firstValidator = counts => {
  return Object.values(counts).filter(v => v >= 2).length > 0;
};

// There must be at least one occurence of an exact pair
const secondValidator = counts => {
  return Object.values(counts).filter(v => v === 2).length > 0;
};

const task = (min, max, validator) => {
  let amountOfPasswords = 0;
  for (let password = min; password <= max; password++) {
    if (
      validatePassword(
        password
          .toString()
          .split("")
          .map(p => parseInt(p)),
        validator
      )
    )
      amountOfPasswords++;
  }
  return amountOfPasswords;
};

const main = () => {
  console.log("DAY 4");
  console.log("===============================");
  let start = new Date();
  console.log(
    "Executing first task at",
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  );

  console.log("Answer:", task(min, max, firstValidator));

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

  console.log("Answer:", task(min, max, secondValidator));

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
