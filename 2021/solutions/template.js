const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('../inputs/X.txt').toString()
  return inputString.split('\n').map((it) => it)
}

const firstTask = (input) => {
  const ans = ''
  return ans
}

const secondTask = (input) => {
  const ans = ''
  return ans
}

const main = () => {
  const parsedInput = parseInput()
  log.start('X')
  log.runTask(firstTask, parsedInput.slice(), 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput.slice(), 2)
  log.end()
}

main()

exports.main = main
