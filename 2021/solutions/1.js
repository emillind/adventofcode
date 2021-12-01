const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('../inputs/1.txt').toString()
  return inputString.split('\n').map((val) => parseInt(val))
}

const countIncreases = (array) => {
  return array.reduce(
    ({ count, previousValue }, value) => ({
      count: count + (value > previousValue ? 1 : 0),
      previousValue: value,
    }),
    { count: 0, value: 0 }
  ).count
}

const firstTask = (input) => {
  return countIncreases(input)
}

const secondTask = (input) => {
  const summedArray = input.reduce((newArray, value, index, oldArray) => {
    if (index + 2 < oldArray.length) {
      newArray.push(value + oldArray[index + 1] + oldArray[index + 2])
    }
    return newArray
  }, [])
  return countIncreases(summedArray)
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
