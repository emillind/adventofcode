const fs = require('fs')
const log = require('./log.js')
const inputString = fs.readFileSync('inputs/3.txt').toString()
const arr = inputString.split('\n').map((val) => val.split(''))

const move = (x, y, down, right) => {
  newY = y + down
  newX = (x + right) % arr[newY].length
  return [newX, newY, arr[newY][newX] === '#' ? 1 : 0]
}

const checkTreeCountInSlope = (downMove, rightMove) => {
  let x = 0,
    y = 0,
    treeCount = 0
  while (y + downMove < arr.length) {
    const result = move(x, y, downMove, rightMove)
    x = result[0]
    y = result[1]
    treeCount += result[2]
  }
  return treeCount
}

const firstTask = () => {
  return checkTreeCountInSlope(1, 3)
}

const secondTask = () => {
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]
  return slopes.reduce(
    (ans, current) => ans * checkTreeCountInSlope(current.down, current.right),
    1
  )
}

const main = () => {
  log.start(3)
  log.runTask(firstTask, 1)
  console.log('-------------------')
  log.runTask(secondTask, 2)
  log.end()
}

main()

exports.main = main
