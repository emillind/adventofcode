const fs = require("fs");
const { run } = require("./intcode");
const inputString = fs.readFileSync("inputs/5.txt").toString();
const puzzleInput = inputString.split(",");

const firstTask = () => {
  let ans = "Last output";
  const memory = [...puzzleInput];
  run(memory, 1);
  return ans;
};

const secondTask = () => {
  let ans = "Last output";
  const memory = [...puzzleInput];
  run(memory, 5);
  return ans;
};

const main = () => {
  console.log("DAY 5");
  console.log("===============================");
  let start = new Date();
  console.log(
    "Executing first task at",
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  );

  console.log("Answer:", firstTask());

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

  console.log("Answer:", secondTask());

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
