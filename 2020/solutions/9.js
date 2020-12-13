const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/9.txt').toString()
  return inputString.split('\n').map((val) => parseInt(val))
}

const getPreamble = (input, amount) => {
  const preamble = []
  for (let i = 0; i < amount; i++) {
    preamble.push(input[i])
  }
  return preamble
}

const isValidNumber = (number, preamble) => {
  for (const first of preamble) {
    if (preamble.includes(number - first) && first !== number / 2) return true
  }
  return false
}

const findFirstInvalidNumber = (input, preambleAmount) => {
  const preamble = getPreamble(input, preambleAmount)
  for (let i = preambleAmount; i < input.length; i++) {
    if (!isValidNumber(input[i], preamble)) return input[i]
    preamble.shift()
    preamble.push(input[i])
  }
}

const findContigousNumbers = (input, preambleAmount) => {
  const invalidNumber = findFirstInvalidNumber(input, preambleAmount)
  for (let i = 0; i < input.length; i++) {
    let remaining = invalidNumber - input[i]
    const contiguousNumbers = [input[i]]
    for (let j = i + 1; j < input.length; j++) {
      remaining -= input[j]
      contiguousNumbers.push(input[j])
      if (remaining === 0) return contiguousNumbers
      else if (remaining < 0) break
    }
  }
}

const firstTask = (input) => {
  const preambleAmount = 25
  return findFirstInvalidNumber(input, preambleAmount)
}

const secondTask = (input) => {
  const preambleAmount = 25
  const contiguousNumbers = findContigousNumbers(input, preambleAmount)
  return Math.min(...contiguousNumbers) + Math.max(...contiguousNumbers)
}

const main = () => {
  const parsedInput = parseInput()
  log.start(9)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
