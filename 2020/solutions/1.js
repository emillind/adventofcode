const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/1.txt').toString()
  return inputString.split('\n').map((val) => parseInt(val))
}

const firstTask = (input) => {
  for (let i = 0; i < input.length; i++) {
    const remaining = 2020 - input[i]
    const found = input.find((v) => remaining === v)
    if (found) {
      return input[i] * found
    }
  }
}

const secondTask = (input) => {
  for (let i = 0; i < input.length; i++) {
    const first = input[i]
    for (let j = i + 1; j < input.length; j++) {
      const second = input[j]
      const remaining = 2020 - first - second
      const found = input.find((v) => remaining === v)
      if (found) {
        return first * second * found
      }
    }
  }
}

const main = () => {
  const parsedInput = parseInput()
  log.start(1)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
