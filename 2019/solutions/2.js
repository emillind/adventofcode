const fs = require("fs");
const inputString = fs.readFileSync("inputs/2.txt").toString();
const puzzleInput = inputString.split(",").map(val => parseInt(val));

const process1 = (firstIndex, secondIndex, targetIndex, memory) => {
  //   console.log(firstIndex, memory[firstIndex]);
  //   console.log(secondIndex, memory[secondIndex]);
  //   console.log(
  //     "adding up to",
  //     memory[firstIndex] + memory[secondIndex],
  //     "in index",
  //     targetIndex
  //   );
  memory[targetIndex] = memory[firstIndex] + memory[secondIndex];
};

const process2 = (firstIndex, secondIndex, targetIndex, memory) => {
  //   console.log(firstIndex, memory[firstIndex]);
  //   console.log(secondIndex, memory[secondIndex]);
  //   console.log(
  //     "multiplying up to",
  //     memory[firstIndex] * memory[secondIndex],
  //     "in index",
  //     targetIndex
  //   );
  memory[targetIndex] = memory[firstIndex] * memory[secondIndex];
};

setNounAndVerb = (noun, verb, memory) => {
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
    if (opcode === 1)
      process1(memory[i + 1], memory[i + 2], memory[i + 3], memory);
    else process2(memory[i + 1], memory[i + 2], memory[i + 3], memory);
    i += 4;
  }
  return memory[0];
};

const secondTask = () => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const ans = firstTask(noun, verb);
      //console.log(noun, verb, ans);
      if (ans === 19690720) {
        console.log(100 * noun + verb);
        return;
      }
    }
  }
};

console.log("Executing first task");
console.log(firstTask(12, 1));
console.log("Executing second task");
secondTask();
