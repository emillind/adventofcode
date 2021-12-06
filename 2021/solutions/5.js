const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('../inputs/5.txt').toString()
  return inputString.split('\n').map((it) => {
    const coordinates = it.split('->').map((coordinate) =>
      coordinate
        .trim()
        .split(',')
        .map((val) => parseInt(val))
    )
    return {
      from: {
        x: coordinates[0][0],
        y: coordinates[0][1],
      },
      to: {
        x: coordinates[1][0],
        y: coordinates[1][1],
      },
    }
  })
}

const countRelevantPoints = (visited) => {
  const occurences = visited.map((row) =>
    row.reduce((map, x) => (map[x] ? ++map[x] : (map[x] = 1), map), {})
  )
  return occurences.reduce(
    (count, row) =>
      count +
      Object.values(row).reduce(
        (innerCount, crossingLines) => innerCount + (crossingLines > 1 ? 1 : 0),
        0
      ),
    0
  )
}

const firstTask = (input) => {
  const visited = []
  input.forEach(({ to, from }) => {
    if (to.x === from.x) {
      for (let i = Math.min(from.y, to.y); i <= Math.max(from.y, to.y); i++) {
        if (!visited[i]) visited[i] = []
        visited[i].push(from.x)
      }
    } else if (to.y === from.y) {
      if (!visited[from.y]) visited[from.y] = []
      for (let i = Math.min(from.x, to.x); i <= Math.max(from.x, to.x); i++) {
        visited[from.y].push(i)
      }
    }
  })
  return countRelevantPoints(visited)
}

const secondTask = (input) => {
  const visited = []
  input.forEach(({ to, from }) => {
    if (to.x === from.x) {
      for (let i = Math.min(from.y, to.y); i <= Math.max(from.y, to.y); i++) {
        if (!visited[i]) visited[i] = []
        visited[i].push(from.x)
      }
    } else if (to.y === from.y) {
      if (!visited[from.y]) visited[from.y] = []
      for (let i = Math.min(from.x, to.x); i <= Math.max(from.x, to.x); i++) {
        visited[from.y].push(i)
      }
    } else {
      for (let i = 0; i <= Math.abs(from.x - to.x); i++) {
        let currentY, currentX, multiplier
        if (from.y > to.y) {
          currentY = to.y + i
          multiplier = to.x > from.x ? -1 : 1
          currentX = to.x + multiplier * i
        } else {
          currentY = from.y + i
          multiplier = from.x > to.x ? -1 : 1
          currentX = from.x + multiplier * i
        }
        if (!visited[currentY]) visited[currentY] = []
        visited[currentY].push(currentX)
      }
    }
  })
  return countRelevantPoints(visited)
}

const main = () => {
  const parsedInput = parseInput()
  log.start(5)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
