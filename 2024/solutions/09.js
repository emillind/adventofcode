const fs = require('fs');
const log = require('./log.js');

const DAY = '09';

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  return inputString.split('').map((val) => parseInt(val));
};

const createDiskRepresentation = (input) => {
  const representation = [];
  const flatRepresentation = [];
  let nextId = 0;
  let isFile = true;
  for (let i = 0; i < input.length; i++) {
    const spaces = input[i];
    if (isFile) {
      representation.push({ free: false, id: nextId, spaces });
      flatRepresentation.push(...Array(spaces).fill(nextId));
      nextId++;
    } else {
      if (spaces > 0) representation.push({ free: true, id: -1, spaces });
      flatRepresentation.push(...Array(spaces).fill(-1));
    }
    isFile = !isFile;
  }
  return { representation, flatRepresentation };
};

const reorganizeFiles = (representation) => {
  for (let i = representation.length - 1; i >= 0; i--) {
    const fileToMove = representation[i];
    if (!fileToMove.free) {
      for (let j = 0; j < i; j++) {
        const fileToEdit = representation[j];
        if (fileToEdit.free && fileToEdit.spaces >= fileToMove.spaces) {
          if (fileToEdit.spaces > fileToMove.spaces) {
            representation.splice(j + 1, 0, {
              free: true,
              id: -1,
              spaces: fileToEdit.spaces - fileToMove.spaces,
            });
            i++;
          }
          fileToEdit.free = false;
          fileToEdit.id = fileToMove.id;
          fileToEdit.spaces = fileToMove.spaces;

          fileToMove.free = true;
          fileToMove.id = -1;
          break;
        }
      }
    }
  }
};

const sumOfIndexes = (index, spaces) => {
  return (spaces * (2 * index + (spaces - 1))) / 2;
};

const firstTask = (input) => {
  let checkSum = 0;
  const { flatRepresentation } = createDiskRepresentation(input);
  for (let i = 0; i < flatRepresentation.length; i++) {
    if (flatRepresentation[i] === -1) {
      let value;
      while ((value = flatRepresentation.pop()) === -1);
      flatRepresentation[i] = value;
    }
    checkSum += i * flatRepresentation[i];
  }
  return checkSum;
};

const secondTask = (input) => {
  const { representation } = createDiskRepresentation(input);
  reorganizeFiles(representation);
  let checkSum = 0;
  let index = 0;
  for (let i = 0; i < representation.length; i++) {
    const file = representation[i];
    if (!file.free) {
      checkSum += file.id * sumOfIndexes(index, file.spaces);
    }
    index += file.spaces;
  }
  return checkSum;
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
