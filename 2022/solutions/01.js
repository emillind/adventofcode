const fs = require('fs')
const log = require('./log.js')

const DAY = '01'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  return inputString.split('\n').map((val) => parseInt(val))
}

const caloriesPerElf = (array) => {
  return array
    .reduce(
      (calories, current) => {
        if (!isNaN(current)) {
          calories[calories.length - 1] += current
        } else {
          calories.push(0)
        }
        return calories
      },
      [0]
    )
    .sort((a, b) => b - a)
}

const firstTask = (input) => {
  return caloriesPerElf(input)[0]
}

const secondTask = (input) => {
  const calories = caloriesPerElf(input)
  return calories[0] + calories[1] + calories[2]
}

const main = () => {
  const testInput = parseInput('test', DAY)
  const parsedInput = parseInput('input', DAY)
  log.start(DAY)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
