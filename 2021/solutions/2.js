const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('../inputs/2.txt').toString()
  return inputString
    .split('\n')
    .map((it) => it)
    .map((it) => it.split(' '))
    .map((it) => ({ direction: it[0], steps: parseInt(it[1]) }))
}

const performMovement = ({ depth, horizontal }, movement) => {
  switch (movement.direction) {
    case 'forward':
      return { depth, horizontal: horizontal + movement.steps }
    case 'down':
      return { depth: depth + movement.steps, horizontal }
    case 'up':
      return { depth: depth - movement.steps, horizontal }
  }
}

const performMovementTwo = ({ depth, horizontal, aim }, movement) => {
  switch (movement.direction) {
    case 'forward':
      return {
        depth: depth + aim * movement.steps,
        horizontal: horizontal + movement.steps,
        aim,
      }
    case 'down':
      return { depth, horizontal, aim: aim + movement.steps }
    case 'up':
      return { depth, horizontal, aim: aim - movement.steps }
  }
}

const firstTask = (input) => {
  const position = input.reduce(performMovement, { depth: 0, horizontal: 0 })
  return position.depth * position.horizontal
}

const secondTask = (input) => {
  const position = input.reduce(performMovementTwo, {
    depth: 0,
    horizontal: 0,
    aim: 0,
  })
  return position.depth * position.horizontal
}

const main = () => {
  const parsedInput = parseInput()
  log.start('2')
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
