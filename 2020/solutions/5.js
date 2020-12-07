const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/5.txt').toString()
  return inputString.split('\n').map((val) => val.split(''))
}

const binarySearch = ([lower, upper], letter) => {
  return letter === 'B' || letter == 'R'
    ? [Math.ceil(lower + (upper - lower) / 2), upper]
    : [lower, Math.floor(lower + (upper - lower) / 2)]
}

getSeatId = ([row, column]) => row * 8 + column

const extractSeat = (binaryPartition) => {
  const row = binaryPartition
    .slice(0, 7)
    .reduce((range, letter) => binarySearch(range, letter), [0, 127])[0]
  const seat = binaryPartition
    .slice(7)
    .reduce((range, letter) => binarySearch(range, letter), [0, 7])[0]
  return [row, seat]
}

const firstTask = (input) => {
  return input.reduce(
    (highestId, binaryPartition) => Math.max(highestId, getSeatId(extractSeat(binaryPartition))),
    0
  )
}

const secondTask = (input) => {
  const seats = input
    .reduce((seats, binaryPartition) => [...seats, getSeatId(extractSeat(binaryPartition))], [])
    .sort((a, b) => a - b)
  return Array.from(
    new Set([...Array(seats[seats.length - 1]).keys()].filter((x) => !seats.includes(x)))
  ).pop()
}

const main = () => {
  const parsedInput = parseInput()
  log.start(5)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
