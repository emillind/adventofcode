const fs = require('fs');
const log = require('./log.js');

const DAY = '08';

const createMap = (matrix) => {
  const positionsByType = {};
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y][x];
      if (cell !== '.') {
        if (positionsByType[cell]) positionsByType[cell].push({ y, x });
        else positionsByType[cell] = [{ y, x }];
      }
    }
  }
  return positionsByType;
};

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString();
  const matrix = inputString.split('\n').map((val) => val.split(''));
  return { matrix, positionsMap: createMap(matrix) };
};

const findAntiNodesOne = (point1, point2, matrix) => {
  const antiNodes = [];
  const xDiff = point1.x - point2.x;
  const yDiff = point1.y - point2.y;
  const node1 = { x: point1.x + xDiff, y: point1.y + yDiff };
  const node2 = { x: point2.x - xDiff, y: point2.y - yDiff };

  if (
    node1.y >= 0 &&
    node1.x >= 0 &&
    node1.y < matrix.length &&
    node1.x < matrix[0].length
  ) {
    antiNodes.push(node1);
  }
  if (
    node2.y >= 0 &&
    node2.x >= 0 &&
    node2.y < matrix.length &&
    node2.x < matrix[0].length
  ) {
    antiNodes.push(node2);
  }

  return antiNodes;
};

const findAntiNodesTwo = (point1, point2, matrix) => {
  const antiNodes = [];
  const xDiff = point1.x - point2.x;
  const yDiff = point1.y - point2.y;

  while (
    point1.y >= 0 &&
    point1.x >= 0 &&
    point1.y < matrix.length &&
    point1.x < matrix[0].length
  ) {
    antiNodes.push({ x: point1.x, y: point1.y });
    point1.x += xDiff;
    point1.y += yDiff;
  }

  while (
    point2.y >= 0 &&
    point2.x >= 0 &&
    point2.y < matrix.length &&
    point2.x < matrix[0].length
  ) {
    antiNodes.push({ x: point2.x, y: point2.y });
    point2.x -= xDiff;
    point2.y -= yDiff;
  }
  return antiNodes;
};

const findAllAntiNodes = (positionsMap, matrix, findFunction) => {
  const allAntiNodes = [];
  Object.values(positionsMap).forEach((list) => {
    for (let i = 0; i < list.length - 1; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const point1 = list[i];
        const point2 = list[j];
        const antiNodes = findFunction(
          { x: point1.x, y: point1.y },
          { x: point2.x, y: point2.y },
          matrix
        );
        antiNodes.forEach((an) => {
          if (!allAntiNodes.find((it) => it.x === an.x && it.y === an.y))
            allAntiNodes.push(an);
        });
      }
    }
  });
  return allAntiNodes;
};

const firstTask = ({ matrix, positionsMap }) => {
  return findAllAntiNodes(positionsMap, matrix, findAntiNodesOne).length;
};

const secondTask = ({ matrix, positionsMap }) => {
  return findAllAntiNodes(positionsMap, matrix, findAntiNodesTwo).length;
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
