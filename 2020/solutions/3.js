const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/3.txt').toString()
  return inputString.split('\n').map((val) => val.split(''))
}

const move = (x, y, down, right, input) => {
  newY = y + down
  newX = (x + right) % input[newY].length
  return [newX, newY, input[newY][newX] === '#' ? 1 : 0]
}

const checkTreeCountInSlope = (downMove, rightMove, input) => {
  let x = 0,
    y = 0,
    treeCount = 0
  while (y + downMove < input.length) {
    const result = move(x, y, downMove, rightMove, input)
    x = result[0]
    y = result[1]
    treeCount += result[2]
  }
  return treeCount
}

const firstTask = (input) => {
  return checkTreeCountInSlope(1, 3, input)
}

const secondTask = (input) => {
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]
  return slopes.reduce(
    (ans, current) => ans * checkTreeCountInSlope(current.down, current.right, input),
    1
  )
}

const main = () => {
  const parsedInput = parseInput()
  log.start(3)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
