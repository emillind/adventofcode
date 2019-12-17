const fs = require("fs");
const inputString = fs.readFileSync("inputs/10.txt").toString();
const rows = inputString.split("\n");
const grid = rows.map(row => row.split("").map(a => a !== "."));

const getAngle = (x1, x2, y1, y2) => {
  const angle = Math.atan2(x1 - x2, y1 - y2);
  return angle < 0 ? angle + 2 * Math.PI : angle;
};

const distanceBetweenPoints = (x1, x2, y1, y2) => {
  const aSquared = (x2 - x1) * (x2 - x1);
  const bSquared = (y2 - y1) * (y2 - y1);
  return Math.sqrt(aSquared + bSquared);
};

const calculateVisibleAsteroids = (grid, base) => {
  let visibleAsteroids = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] && [x, y].toString() !== base.toString()) {
        const angle = getAngle(base[0], x, base[1], y);
        const currentAsteroid = visibleAsteroids.find(
          asteroid => asteroid.angle === angle
        );
        if (!currentAsteroid) {
          visibleAsteroids.push({
            angle: angle,
            x: x,
            y: y
          });
        } else {
          let currentDistance = distanceBetweenPoints(
            base[0],
            currentAsteroid.x,
            base[1],
            currentAsteroid.y
          );
          let newDistance = distanceBetweenPoints(base[0], x, base[1], y);
          if (newDistance < currentDistance) {
            currentAsteroid.x = x;
            currentAsteroid.y = y;
          }
        }
      }
    }
  }
  return visibleAsteroids;
};

const findBestBase = grid => {
  let bestBase;
  let bestVisibleAsteroids = [];
  for (let y = 1; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        const base = [x, y];
        const visibleAsteroids = calculateVisibleAsteroids(grid, base);
        if (visibleAsteroids.length > bestVisibleAsteroids.length) {
          bestVisibleAsteroids = visibleAsteroids;
          bestBase = base;
        }
      }
    }
  }
  return [bestVisibleAsteroids, bestBase];
};

const sortAsteroids = asteroids => {
  const sortFunction = (asteroid1, asteroid2) => {
    return asteroid2.angle - asteroid1.angle;
  };
  return asteroids.sort(sortFunction);
};

const findAsteroidBet = (grid, visibleAsteroids, base, bet) => {
  let i = 0;
  while (i < bet) {
    for (const asteroid of visibleAsteroids) {
      grid[asteroid.y][asteroid.x] = false;
      i++;
      if (i === bet) return asteroid;
    }
    visibleAsteroids = calculateVisibleAsteroids(grid, base);
  }
};

const firstTask = () => {
  const [visibleAsteroids] = findBestBase([...grid]);
  return visibleAsteroids.length;
};

const secondTask = () => {
  const [visibleAsteroids, base] = findBestBase([...grid]);
  let sorted = sortAsteroids(visibleAsteroids);
  // Se angle 0 first
  sorted = [sorted.slice(-1)[0], ...sorted.slice(0, sorted.length - 1)];
  const asteroidBet = findAsteroidBet([...grid], sorted, base, 200);
  const ans = asteroidBet.x * 100 + asteroidBet.y;
  return ans;
};

const main = () => {
  console.log("DAY 10");
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
