const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('../inputs/3.txt').toString()
  return inputString
    .split('\n')
    .map((it) => it.split('').map((bit) => parseInt(bit)))
}

const findMostCommonBit = (array) => {
  return array.reduce((a, b) => a + b, 0) >= array.length / 2 ? 1 : 0
}

const filterOnBit = (array, bit, index) => {
  let i = 0
  while (i < array.length) {
    if (array[i][index] !== bit) array.splice(i, 1)
    else i++
  }
  return array
}

const getRating = (array, mostCommon) => {
  let bit = 0
  while (array.length > 1) {
    const transposed = array[0].map((_, i) => array.map((row) => row[i]))
    const mostCommonBit = findMostCommonBit(transposed[bit])
    filterOnBit(
      array,
      mostCommon ? mostCommonBit : mostCommonBit === 0 ? 1 : 0,
      bit
    )
    bit++
  }
  return array[0].join('')
}

const firstTask = (input) => {
  const transposed = input[0].map((_, i) => input.map((row) => row[i]))
  const gamma = transposed.map(findMostCommonBit)
  const epsilon = gamma.map((it) => (it === 1 ? '0' : '1')).join('')
  return parseInt(gamma.join(''), 2) * parseInt(epsilon, 2)
}

const secondTask = (input) => {
  const oxygenGeneratorRating = getRating(input.slice(), true)
  const co2ScrubberRating = getRating(input.slice(), false)
  return parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2)
}

const main = () => {
  const parsedInput = parseInput()
  log.start(3)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
