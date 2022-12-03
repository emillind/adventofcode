const fs = require('fs')
const log = require('./log.js')

const DAY = '03'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  return inputString.split('\n').map((val) => {
    const firstCompartment = val.substring(0, val.length / 2)
    const secondCompartment = val.substring(val.length / 2)
    return [firstCompartment, secondCompartment]
  })
}

const letterValue = (letter) =>
  letter === letter.toUpperCase()
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').indexOf(letter) + 27
    : 'abcdefghijklmnopqrstuvwxyz'.split('').indexOf(letter) + 1

const firstTask = (input) => {
  return input.reduce(
    (sum, [firstCompartment, secondCompartment]) =>
      sum +
      letterValue(
        firstCompartment.split('').find((it) => secondCompartment.includes(it))
      ),
    0
  )
}

const secondTask = (input) => {
  let sum = 0
  for (let i = 0; i < input.length; i += 3) {
    const group = input.slice(i, i + 3)
    sum += letterValue(
      group[0]
        .split('')
        .find((it) => group[1].includes(it) && group[2].includes(it))
    )
  }
  return sum
}

const main = () => {
  const testInput = parseInput('test', DAY)
  const parsedInput = parseInput('input', DAY)
  log.start(DAY)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(
    secondTask,
    parsedInput.map((it) => it.join('')),
    2
  )
  log.end()
}

main()

exports.main = main
