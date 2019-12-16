const log = false;

const parseWriteMode = (mode, param, relativeBase) => {
  return isRelative(mode) ? parseInt(param) + relativeBase : parseInt(param);
};

const parseMode = (mode, param, memory, relativeBase) => {
  if (isPosition(mode)) {
    if (log)
      console.log(
        "Parsing position mode of param",
        param,
        "to",
        parseInt(memory[param])
      );
    return parseInt(memory[param]);
  } else if (isImmediate(mode)) {
    if (log)
      console.log(
        "Parsing immediate mode of param",
        param,
        "to",
        parseInt(param)
      );
    return parseInt(param);
  } else if (isRelative(mode)) {
    if (log)
      console.log(
        "Parsing relative mode of param",
        param,
        "with base",
        relativeBase,
        "to",
        parseInt(memory[parseInt(param) + relativeBase])
      );
    return parseInt(memory[parseInt(param) + relativeBase]);
  }
};

const processAdd = (
  firstParam,
  secondParam,
  thirdParam,
  memory,
  relativeBase,
  modes
) => {
  const firstValue = parseMode(modes[0], firstParam, memory, relativeBase);
  const secondValue = parseMode(modes[1], secondParam, memory, relativeBase);
  if (log) {
    console.log("Add params:", firstParam, secondParam, thirdParam);
    console.log("Values:", firstValue, secondValue);
    console.log("Setting index", thirdParam, "to", firstValue + secondValue);
  }
  memory[parseWriteMode(modes[2], thirdParam, relativeBase)] = (
    firstValue + secondValue
  ).toString();
  return 4;
};

const processMultiply = (
  firstParam,
  secondParam,
  thirdParam,
  memory,
  relativeBase,
  modes
) => {
  const firstValue = parseMode(modes[0], firstParam, memory, relativeBase);
  const secondValue = parseMode(modes[1], secondParam, memory, relativeBase);
  if (log) {
    console.log("Multiply params:", firstParam, secondParam, thirdParam);
    console.log("Values:", firstValue, secondValue);
    console.log("Setting index", thirdParam, "to", firstValue * secondValue);
  }
  memory[parseWriteMode(modes[2], thirdParam, relativeBase)] = (
    firstValue * secondValue
  ).toString();
  return 4;
};

// takes a single integer as input and saves it to the position given by its only parameter.
const processInput = (value, index, memory, mode, relativeBase) => {
  if (log) {
    console.log("Setting index", index, "to", value);
  }
  memory[parseWriteMode(mode, index, relativeBase)] = value;
  return 2;
};

// outputs the value of its only parameter.
const processOutput = (param, memory, relativeBase, mode) => {
  const output = parseMode(mode, param, memory, relativeBase);
  if (log) {
    console.log("Output param:", param);
    console.log("Output mode:", mode);
  }
  console.log("=====");
  console.log("Output:", output);
  console.log("=====");
  return 2;
};

// if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
const processJumpIfTrue = (
  firstParam,
  secondParam,
  memory,
  relativeBase,
  mode,
  pointer
) => {
  const value = parseMode(mode[0], firstParam, memory, relativeBase);
  const newPointer = parseMode(mode[1], secondParam, memory, relativeBase);
  const returnPointer = value !== 0 ? newPointer : pointer + 3;
  if (log) {
    console.log(
      "Jump if true params:",
      firstParam,
      secondParam,
      "with pointer",
      pointer
    );
    console.log("Value:", value, "NewPointer:", newPointer);
    console.log("Jumping to", returnPointer);
  }
  return returnPointer;
};

// if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
const processJumpIfFalse = (
  firstParam,
  secondParam,
  memory,
  relativeBase,
  mode,
  pointer
) => {
  const newPointer = parseMode(mode[1], secondParam, memory, relativeBase);
  const value = parseMode(mode[0], firstParam, memory, relativeBase);
  const returnPointer = value === 0 ? newPointer : pointer + 3;
  if (log) {
    console.log(
      "Jump if false params:",
      firstParam,
      secondParam,
      "with pointer",
      pointer
    );
    console.log("Value:", value, "NewPointer:", newPointer);
    console.log("Jumping to", returnPointer);
  }
  return returnPointer;
};

// if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
const processLessThan = (
  firstParam,
  secondParam,
  thirdParam,
  memory,
  relativeBase,
  modes
) => {
  const firstValue = parseMode(modes[0], firstParam, memory, relativeBase);
  const secondValue = parseMode(modes[1], secondParam, memory, relativeBase);
  memory[parseWriteMode(modes[2], thirdParam, relativeBase)] =
    firstValue < secondValue ? 1 : 0;
  if (log) {
    console.log("Less than params:", firstParam, secondParam, thirdParam);
    console.log("Values:", firstValue, secondValue);
    console.log(
      "Setting index",
      thirdParam,
      "to",
      memory[parseWriteMode(modes[2], thirdParam, relativeBase)]
    );
  }
  return 4;
};

// if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
const processEquals = (
  firstParam,
  secondParam,
  thirdParam,
  memory,
  relativeBase,
  modes
) => {
  const firstValue = parseMode(modes[0], firstParam, memory, relativeBase);
  const secondValue = parseMode(modes[1], secondParam, memory, relativeBase);
  memory[parseWriteMode(modes[2], thirdParam, relativeBase)] =
    firstValue === secondValue ? 1 : 0;
  if (log) {
    console.log("Equals params:", firstParam, secondParam, thirdParam);
    console.log("Values:", firstValue, secondValue);
    console.log(
      "Setting index",
      thirdParam,
      "to",
      memory[parseWriteMode(modes[2], thirdParam, relativeBase)]
    );
  }
  return 4;
};

// adjusts the relative base by the value of its only parameter.
const processBaseChange = (param, memory, relativeBase, mode, pointer) => {
  const value = parseMode(mode, param, memory, relativeBase);
  if (log) {
    console.log("Base change param:", param);
    console.log("Current base:", relativeBase);
    console.log("Base change mode:", mode);
    console.log("Value:", value + relativeBase);
  }
  return [pointer + 2, relativeBase + value];
};

const isPosition = mode => mode === 0;

const isImmediate = mode => mode === 1;

const isRelative = mode => mode === 2;

const isBaseChange = opcode => opcode === 9;

const isEquals = opcode => opcode === 8;

const isLessThan = opcode => opcode === 7;

const isJumpIfFalse = opcode => opcode === 6;

const isJumpIfTrue = opcode => opcode === 5;

const isOutput = opcode => opcode === 4;

const isInput = opcode => opcode === 3;

const isAdd = opcode => opcode === 1;

const isMultiply = opcode => opcode === 2;

const parseOperation = operation => {
  if (log) console.log(operation);
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

const allocateMemory = array => {
  let memory = [...array];
  for (let i = 0; i < 34463338; i++) {
    memory.push(0);
  }
  return memory;
};

const run = (input, systemID) => {
  let memory = allocateMemory(input);
  let i = 0;
  let relativeBase = 0;
  while (memory[i] != 99) {
    unparsedOperation = memory[i];
    const operation = parseOperation(unparsedOperation);
    if (log) {
      console.log("---------------");
      console.log(
        "Operation on index:",
        i,
        "is",
        `-${unparsedOperation}-`,
        "==>",
        operation
      );
    }
    const opcode = parseInt([operation[4], operation[5]].join(""));
    if (isAdd(opcode)) {
      i += processAdd(
        memory[i + 1],
        memory[i + 2],
        memory[i + 3],
        memory,
        relativeBase,
        operation.slice(0, 3).reverse()
      );
    } else if (isMultiply(opcode)) {
      i += processMultiply(
        memory[i + 1],
        memory[i + 2],
        memory[i + 3],
        memory,
        relativeBase,
        operation.slice(0, 3).reverse()
      );
    } else if (isInput(opcode)) {
      i += processInput(
        systemID,
        memory[i + 1],
        memory,
        operation[2],
        relativeBase
      );
    } else if (isOutput(opcode)) {
      i += processOutput(memory[i + 1], memory, relativeBase, operation[2]);
    } else if (isJumpIfTrue(opcode)) {
      i = processJumpIfTrue(
        memory[i + 1],
        memory[i + 2],
        memory,
        relativeBase,
        operation.slice(0, 3).reverse(),
        i
      );
    } else if (isJumpIfFalse(opcode)) {
      i = processJumpIfFalse(
        memory[i + 1],
        memory[i + 2],
        memory,
        relativeBase,
        operation.slice(0, 3).reverse(),
        i
      );
    } else if (isLessThan(opcode)) {
      i += processLessThan(
        memory[i + 1],
        memory[i + 2],
        memory[i + 3],
        memory,
        relativeBase,
        operation.slice(0, 3).reverse()
      );
    } else if (isEquals(opcode)) {
      i += processEquals(
        memory[i + 1],
        memory[i + 2],
        memory[i + 3],
        memory,
        relativeBase,
        operation.slice(0, 3).reverse()
      );
    } else if (isBaseChange(opcode)) {
      [i, relativeBase] = processBaseChange(
        memory[i + 1],
        memory,
        relativeBase,
        operation[2],
        i
      );
    } else {
      console.log("Invalid OPCODE:", opcode);
      return;
    }
  }
};

exports.run = run;
