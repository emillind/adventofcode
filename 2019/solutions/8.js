const fs = require("fs");
const inputString = fs.readFileSync("inputs/8.txt").toString();
const pixels = inputString.split("").map(s => parseInt(s));

const arrayToChunks = (array, chunksSize) => {
  let chunks = [];
  for (let i = 0; i < array.length / chunksSize; i++) {
    chunks.push(array.slice(chunksSize * i, chunksSize * (i + 1)));
  }
  return chunks;
};

const chunksToLayers = (chunks, width, height) => {
  return chunks.map(chunk => {
    return arrayToChunks(chunk, width);
  });
};

const countDigits = (layer, digit) => {
  let count = 0;
  for (const row of layer) {
    for (const pixel of row) {
      if (pixel === digit) count++;
    }
  }
  return count;
};

const findLayerWithFewestZeros = layers => {
  let noOfZeros = Number.MAX_VALUE;
  let lowest = [];
  for (const layer of layers) {
    let count = countDigits(layer, 0);
    if (count < noOfZeros) {
      noOfZeros = count;
      lowest = [...layer];
    }
  }
  return lowest;
};

const multiplyOnesWithTwos = layer => {
  const ones = countDigits(layer, 1);
  const twos = countDigits(layer, 2);
  return ones * twos;
};

const decodeLayers = (layers, height, width) => {
  let decoded = [];
  for (let index = 0; index < height; index++) {
    decoded.push([]);
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
        const layer = layers[layerIndex];
        const pixel = layer[i][j];
        if (pixel !== 2) {
          decoded[i][j] = pixel === 1 ? "X" : " ";
          break;
        }
      }
    }
  }
  return decoded;
};

const parseAnswer = image => {
  const joined = image.map(i => i.join(""));
  const parsed = joined.join("\n");
  return parsed;
};

const firstTask = () => {
  const width = 25;
  const height = 6;
  const chunks = arrayToChunks(pixels, width * height);
  const layers = chunksToLayers(chunks, width, height);
  const bestLayer = findLayerWithFewestZeros(layers);
  const ans = multiplyOnesWithTwos(bestLayer);
  return ans;
};

const secondTask = () => {
  const width = 25;
  const height = 6;
  const chunks = arrayToChunks(pixels, width * height);
  const layers = chunksToLayers(chunks, width, height);
  const decoded = decodeLayers(layers, height, width);
  const ans = parseAnswer(decoded);
  return ans;
};

const main = () => {
  console.log("DAY 8");
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

  console.log("Answer:");
  console.log(secondTask());

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
