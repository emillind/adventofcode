const fs = require('fs')
const log = require('./log.js')

const DAY = '00'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  return inputString.split('\n').map((val) => parseInt(val))
}

const firstTask = (input) => {
  return 0
}

const secondTask = (input) => {
  return 0
}

const main = () => {
  const testInput = parseInput('test', DAY)
  const parsedInput = parseInput('input', DAY)
  log.start(DAY)
  log.runTask(firstTask, testInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, testInput, 2)
  log.end()
}

main()

exports.main = main
