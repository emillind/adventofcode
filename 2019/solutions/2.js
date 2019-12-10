const fs = require("fs");
const inputString = fs.readFileSync("inputs/2.txt").toString();
const puzzleInput = inputString.split(",").map(val => parseInt(val));

const processAdd = (firstIndex, secondIndex, targetIndex, memory) => {
  memory[targetIndex] = memory[firstIndex] + memory[secondIndex];
};

const processMultiply = (firstIndex, secondIndex, targetIndex, memory) => {
  memory[targetIndex] = memory[firstIndex] * memory[secondIndex];
};

const isAdd = opcode => opcode === 1;

const isMultiply = opcode => opcode === 2;

const setNounAndVerb = (noun, verb, memory) => {
  memory[1] = noun;
  memory[2] = verb;
};

const firstTask = (noun, verb) => {
  // Once you have a working computer, the first step is to restore the gravity assist program (your puzzle input) to the "1202 program alarm"
  // state it had just before the last computer caught fire. To do this, before running the program, replace position 1 with the value 12 and
  // replace position 2 with the value 2. What value is left at position 0 after the program halts?
  const memory = [...puzzleInput];
  setNounAndVerb(noun, verb, memory);
  let i = 0;
  while (memory[i] !== 99 || i >= memory.length) {
    opcode = memory[i];
    if (isAdd(opcode))
      processAdd(memory[i + 1], memory[i + 2], memory[i + 3], memory);
    else if (isMultiply(opcode))
      processMultiply(memory[i + 1], memory[i + 2], memory[i + 3], memory);
    i += 4;
  }
  return memory[0];
};

const secondTask = () => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const ans = firstTask(noun, verb);
      if (ans === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
};

const main = () => {
  console.log("DAY 2");
  console.log("===============================");

  let start = new Date();
  console.log(
    "Executing first task at",
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  );

  console.log("Answer:", firstTask(12, 1));

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
