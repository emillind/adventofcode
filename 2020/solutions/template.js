const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/X.txt').toString()
  return inputString.split('\n').map((val) => val)
}

const firstTask = (input) => {
  let ans = ''
  return ans
}

const secondTask = (input) => {
  let ans = ''
  return ans
}

const main = () => {
  const parsedInput = parseInput()
  log.start('X')
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
