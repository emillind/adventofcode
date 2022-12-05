const fs = require('fs')
const log = require('./log.js')

const DAY = '04'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  return inputString.split('\n').map((val) => {
    const [elf1, elf2] = val.split(',')
    return [
      elf1.split('-').map((it) => parseInt(it)),
      elf2.split('-').map((it) => parseInt(it)),
    ]
  })
}

const isContained = (firstElf, secondElf) =>
  firstElf[0] >= secondElf[0] && firstElf[1] <= secondElf[1]

const isOverlapping = (firstElf, secondElf) =>
  (firstElf[0] >= secondElf[0] && firstElf[0] <= secondElf[1]) ||
  (firstElf[1] >= secondElf[0] && firstElf[1] <= secondElf[1])

const firstTask = (input) => {
  return input.reduce(
    (count, elves) =>
      count +
      (isContained(elves[0], elves[1]) || isContained(elves[1], elves[0])
        ? 1
        : 0),
    0
  )
}

const secondTask = (input) => {
  return input.reduce(
    (count, elves) =>
      count +
      (isOverlapping(elves[0], elves[1]) || isOverlapping(elves[1], elves[0])
        ? 1
        : 0),
    0
  )
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
