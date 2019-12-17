const fs = require("fs");
const inputString = fs.readFileSync("inputs/12.txt").toString();
const lines = inputString.split("\n");

const linesToMoons = () => {
  return lines.map(moon => {
    let trimmed = moon
      .replace("<", "")
      .replace(">", "")
      .replace(" ", "");
    let split = trimmed.split(",").map(s => parseInt(s.split("=")[1]));
    return {
      pos: { x: split[0], y: split[1], z: split[2] },
      vel: { x: 0, y: 0, z: 0 }
    };
  });
};

const applyVelocity = (moon, axis) => {
  moon.pos[axis] += moon.vel[axis];
};

const applyGravity = (moon1, moon2, axis) => {
  moon1.vel[axis] +=
    moon1.pos[axis] > moon2.pos[axis]
      ? -1
      : moon1.pos[axis] < moon2.pos[axis]
      ? 1
      : 0;
};

const performTimeStep = (moons, axis) => {
  // Apply gravity
  for (let i = 0; i < moons.length; i++) {
    const moon1 = moons[i];
    for (let j = i + 1; j < moons.length; j++) {
      const moon2 = moons[j];
      applyGravity(moon1, moon2, axis);
      applyGravity(moon2, moon1, axis);
    }
  }
  // Apply velocity
  for (const moon of moons) {
    applyVelocity(moon, axis);
  }
};

const performAllTimeSteps = (moons, steps) => {
  for (let step = 0; step < steps; step++) {
    performTimeStep(moons, "x");
    performTimeStep(moons, "y");
    performTimeStep(moons, "z");
  }
  return moons;
};

const calculatePotentialEnergyForMoon = ({ pos }) => {
  return Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(pos.z);
};

const calculateKineticEnergyForMoon = ({ vel }) => {
  return Math.abs(vel.x) + Math.abs(vel.y) + Math.abs(vel.z);
};

const calculateMotion = moons => {
  let motion = 0;
  for (const moon of moons) {
    const potential = calculatePotentialEnergyForMoon(moon);
    const kinetic = calculateKineticEnergyForMoon(moon);
    motion += potential * kinetic;
  }
  return motion;
};

const compareMoons = (moons1, moons2) => {
  for (let i = 0; i < moons1.length; i++) {
    const moon1 = moons1[i];
    const moon2 = moons2[i];
    if (moon1.pos.x !== moon2.pos.x) return false;
    if (moon1.vel.x !== moon2.vel.x) return false;
    if (moon1.pos.y !== moon2.pos.y) return false;
    if (moon1.vel.y !== moon2.vel.y) return false;
    if (moon1.pos.z !== moon2.pos.z) return false;
    if (moon1.vel.z !== moon2.vel.z) return false;
  }
  return true;
};

const findFullCircleForAxis = (initialState, axis) => {
  const moons = JSON.parse(JSON.stringify(initialState));
  let fullCircle = false;
  let steps = 0;
  while (!fullCircle) {
    performTimeStep(moons, axis);
    steps++;
    if (compareMoons(moons, initialState)) fullCircle = true;
  }
  return steps;
};

const gcd2 = (a, b) => {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
};

const lcm2 = (a, b) => {
  // Least common multiple of 2 integers
  return (a * b) / gcd2(a, b);
};

const lcm = array => {
  // Least common multiple of a list of integers
  let n = 1;
  for (let i = 0; i < array.length; ++i) n = lcm2(array[i], n);
  return n;
};

const firstTask = () => {
  const moons = linesToMoons();
  const afterSteps = performAllTimeSteps([...moons], 1000);
  const ans = calculateMotion(afterSteps);
  return ans;
};

const secondTask = () => {
  const moons = linesToMoons();
  const x = findFullCircleForAxis([...moons], "x");
  const y = findFullCircleForAxis([...moons], "y");
  const z = findFullCircleForAxis([...moons], "z");
  const ans = lcm([x, y, z]);
  return ans;
};

const main = () => {
  console.log("DAY 12");
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
