const fs = require("fs");
const inputString = fs.readFileSync("inputs/6.txt").toString();
const lines = inputString.split("\n");
const orbits = lines.map(orbit => {
  const split = orbit.split(")");
  return {
    center: split[0],
    orbiting: split[1]
  };
});

const buildOrbitingTree = orbits => {
  let tree = {};
  orbits.forEach(orbit => {
    let currentCenter = tree[orbit.center];
    if (currentCenter) {
      tree[orbit.center] = [...currentCenter, orbit.orbiting];
    } else {
      tree[orbit.center] = [orbit.orbiting];
    }
  });
  return tree;
};

const traverseTreeAndCount = (tree, currentNode, depth) => {
  const orbiters = tree[currentNode];
  if (!orbiters) return depth;
  else {
    let depthSum = depth;
    for (const orbiter of orbiters) {
      depthSum += traverseTreeAndCount(tree, orbiter, depth + 1);
    }
    return depthSum;
  }
};

const findCenterFromNode = (tree, node) => {
  for (const center in tree) {
    if (tree[center].includes(node)) return center;
  }
  return null;
};

const findShortestPath = (tree, currentNode, target, visited, pathLength) => {
  if (currentNode === target) {
    //console.log("Found", target, "with path length", pathLength);
    return pathLength;
  }
  const orbiters = tree[currentNode];
  const center = findCenterFromNode(tree, currentNode);
  let neighbours = [];
  if (orbiters) {
    neighbours = [...orbiters];
  }
  if (center) {
    neighbours.push(center);
  }
  visited.push(currentNode);
  let shortestPath = Number.MAX_VALUE;
  for (const neighbour of neighbours) {
    if (!visited.includes(neighbour)) {
      //console.log("Traversing from", currentNode, "to", neighbour);
      const path = findShortestPath(
        tree,
        neighbour,
        target,
        visited,
        pathLength + 1
      );
      if (path < shortestPath) {
        // console.log(
        //   "Currently at",
        //   currentNode,
        //   "with path length",
        //   path,
        //   "and neighbours",
        //   neighbours
        // );
        shortestPath = path;
      }
    }
  }
  //console.log("Returning", shortestPath, "from", currentNode);
  return shortestPath;
};

const firstTask = () => {
  let ans = "";
  const orbitingTree = buildOrbitingTree([...orbits]);
  ans = traverseTreeAndCount(orbitingTree, "COM", 0);
  return ans;
};

const secondTask = () => {
  let ans = "";
  const orbitingTree = buildOrbitingTree([...orbits]);
  const startingNode = findCenterFromNode(orbitingTree, "YOU");
  const targetNode = findCenterFromNode(orbitingTree, "SAN");
  const pathLength = findShortestPath(
    orbitingTree,
    startingNode,
    targetNode,
    ["YOU"],
    0
  );
  return pathLength;
};

const main = () => {
  console.log("DAY 6");
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
