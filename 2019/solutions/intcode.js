const parseMode = (mode, param, memory) => {
  if (isPosition(mode)) {
    return parseInt(memory[param]);
  } else if (isImmediate(mode)) {
    return parseInt(param);
  } else if (isRelative(mode)) {
    return 0;
  }
};

const processAdd = (firstParam, secondParam, thirdParam, memory, modes) => {
  const firstValue = parseMode(modes[0], firstParam, memory);
  const secondValue = parseMode(modes[1], secondParam, memory);
  // console.log("Add params:", firstParam, secondParam, thirdParam);
  // console.log("Values:", firstValue, secondValue);
  // console.log("Setting index", thirdParam, "to", firstValue + secondValue);
  memory[thirdParam] = (firstValue + secondValue).toString();
  return 4;
};

const processMultiply = (
  firstParam,
  secondParam,
  thirdParam,
  memory,
  modes
) => {
  const firstValue = parseMode(modes[0], firstParam, memory);
  const secondValue = parseMode(modes[1], secondParam, memory);
  // console.log("Multiply params:", firstParam, secondParam, thirdParam);
  // console.log("Values:", firstValue, secondValue);
  // console.log("Setting index", thirdParam, "to", firstValue * secondValue);
  memory[thirdParam] = (firstValue * secondValue).toString();
  return 4;
};

// takes a single integer as input and saves it to the position given by its only parameter.
const processInput = (value, index, memory) => {
  //console.log("Setting index", index, "to", value);
  memory[index] = value;
  return 2;
};

// outputs the value of its only parameter.
const processOutput = (param, memory, mode) => {
  const output = parseMode(mode, param, memory);
  console.log("=====");
  console.log("Output:", output);
  console.log("=====");
  return 2;
};

// if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
const processJumpIfTrue = (firstParam, secondParam, memory, mode, pointer) => {
  const newPointer = parseMode(mode[1], secondParam, memory);
  const value = parseMode(mode[0], firstParam, memory);
  const returnPointer = value !== 0 ? newPointer : pointer + 3;
  // console.log(
  //   "Jump if true params:",
  //   firstParam,
  //   secondParam,
  //   "with pointer",
  //   pointer
  // );
  //console.log("Value:", value, "NewPointer:", newPointer);
  //console.log("Jumping to", returnPointer);
  return returnPointer;
};

// if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
const processJumpIfFalse = (firstParam, secondParam, memory, mode, pointer) => {
  const newPointer = parseMode(mode[1], secondParam, memory);
  const value = parseMode(mode[0], firstParam, memory);
  const returnPointer = value === 0 ? newPointer : pointer + 3;
  // console.log(
  //   "Jump if false params:",
  //   firstParam,
  //   secondParam,
  //   "with pointer",
  //   pointer
  // );
  //console.log("Value:", value, "NewPointer:", newPointer);
  //console.log("Jumping to", returnPointer);
  return returnPointer;
};

// if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
const processLessThan = (
  firstParam,
  secondParam,
  thirdParam,
  memory,
  modes
) => {
  const firstValue = parseMode(modes[0], firstParam, memory);
  const secondValue = parseMode(modes[0], secondParam, memory);
  memory[thirdParam] = firstValue < secondValue ? 1 : 0;
  //console.log("Equals params:", firstParam, secondParam, thirdParam);
  //console.log("Values:", firstValue, secondValue);
  //console.log("Setting index", thirdParam, "to", memory[thirdParam]);
  return 4;
};

// if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
const processEquals = (firstParam, secondParam, thirdParam, memory, modes) => {
  const firstValue = parseMode(modes[0], firstParam, memory);
  const secondValue = parseMode(modes[1], secondParam, memory);
  memory[thirdParam] = firstValue === secondValue ? 1 : 0;
  //console.log("Equals params:", firstParam, secondParam, thirdParam);
  //console.log("Values:", firstValue, secondValue);
  //console.log("Setting index", thirdParam, "to", memory[thirdParam]);
  return 4;
};

const isPosition = mode => mode === 0;

const isImmediate = mode => mode === 1;

const isRelative = mode => mode === 2;

const isEquals = opcode => opcode === 8;

const isLessThan = opcode => opcode === 7;

const isJumpIfFalse = opcode => opcode === 6;

const isJumpIfTrue = opcode => opcode === 5;

const isOutput = opcode => opcode === 4;

const isInput = opcode => opcode === 3;

const isAdd = opcode => opcode === 1;

const isMultiply = opcode => opcode === 2;

const parseOperation = operation => {
  const split = operation
    .split("")
    .map(o => parseInt(o))
    .reverse();
  let parsed = [];
  for (let i = 0; i < 5; i++) {
    const val = split[i] ? split[i] : 0;
    parsed.push(val);
  }
  return parsed.reverse();
};

const run = (memory, systemID) => {
  let i = 0;
  while (memory[i] != 99 || i >= memory.length) {
    unparsedOperation = memory[i];
    const operation = parseOperation(unparsedOperation);
    // console.log("---------------");
    // console.log(
    //   "Operation on index:",
    //   i,
    //   "is",
    //   `-${unparsedOperation}-`,
    //   "==>",
    //   operation
    // );
    const opcode = parseInt([operation[4], operation[5]].join(""));
    if (isAdd(opcode)) {
      i += processAdd(
        memory[i + 1],
        memory[i + 2],
        memory[i + 3],
        memory,
        operation.slice(0, 3).reverse()
      );
    } else if (isMultiply(opcode)) {
      i += processMultiply(
        memory[i + 1],
        memory[i + 2],
        memory[i + 3],
        memory,
        operation.slice(0, 3).reverse()
      );
    } else if (isInput(opcode)) {
      i += processInput(systemID, memory[i + 1], memory);
    } else if (isOutput(opcode)) {
      i += processOutput(memory[i + 1], memory, operation[2]);
    } else if (isJumpIfTrue(opcode)) {
      i = processJumpIfTrue(
        memory[i + 1],
        memory[i + 2],
        memory,
        operation.slice(0, 3).reverse(),
        i
      );
    } else if (isJumpIfFalse(opcode)) {
      i = processJumpIfFalse(
        memory[i + 1],
        memory[i + 2],
        memory,
        operation.slice(0, 3).reverse(),
        i
      );
    } else if (isLessThan(opcode)) {
      i += processLessThan(
        memory[i + 1],
        memory[i + 2],
        memory[i + 3],
        memory,
        operation.slice(0, 3).reverse()
      );
    } else if (isEquals(opcode)) {
      i += processEquals(
        memory[i + 1],
        memory[i + 2],
        memory[i + 3],
        memory,
        operation.slice(0, 3).reverse()
      );
    } else {
      console.log("Invalid OPCODE:", opcode);
      return;
    }
  }
  return memory[0];
};

exports.run = run;
