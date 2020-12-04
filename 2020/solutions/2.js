const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/2.txt').toString()
  return inputString.split('\n').map((val) => {
    const split = val.split(' ')
    const range = split[0].split('-').map((val) => parseInt(val))
    return {
      firstNumber: range[0],
      secondNumber: range[1],
      letter: split[1].substr(0, 1),
      password: split[2].split(''),
    }
  })
}

const isValidOne = (least, most, letter, password) => {
  const amountOfLetters = password.filter((it) => it === letter).length
  return amountOfLetters <= most && amountOfLetters >= least
}

const isValidTwo = (firstIndex, secondIndex, letter, password) => {
  return (
    (password[firstIndex] === letter && password[secondIndex] !== letter) ||
    (password[secondIndex] === letter && password[firstIndex] !== letter)
  )
}

const firstTask = (input) => {
  return input.reduce(
    (a, b) => a + (isValidOne(b.firstNumber, b.secondNumber, b.letter, b.password) ? 1 : 0),
    0
  )
}

const secondTask = (input) => {
  return input.reduce(
    (a, b) => a + (isValidTwo(b.firstNumber - 1, b.secondNumber - 1, b.letter, b.password) ? 1 : 0),
    0
  )
}

const main = () => {
  const parsedInput = parseInput()
  log.start(2)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
