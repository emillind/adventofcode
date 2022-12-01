const fs = require('fs')
const log = require('./log.js')

const DAY = '01'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  return inputString.split('\n').map((val) => parseInt(val))
}

const sortedCaloriesPerElf = (input) => {
  return input
    .reduce(
      (calories, current) => {
        if (isNaN(current)) calories.push(0)
        else calories[calories.length - 1] += current
        return calories
      },
      [0]
    )
    .sort((a, b) => b - a)
}

const firstTask = (input) => {
  return sortedCaloriesPerElf(input)[0]
}

const secondTask = (input) => {
  const calories = sortedCaloriesPerElf(input)
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
