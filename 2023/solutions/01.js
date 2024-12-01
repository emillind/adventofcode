const fs = require('fs')
const log = require('./log.js')

const DAY = '01'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  return inputString.split('\n')
}

const getNumbers = (lines) => {
  return lines.map((line) => {
    const digits = line.replaceAll(/\D/g, '').split('')
    return parseInt(digits[0] + digits[digits.length - 1])
  })
}

const firstTask = (input) => {
  return getNumbers(input).reduce((a, b) => a + b, 0)
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
