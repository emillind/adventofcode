const fs = require('fs')
const inputString = fs.readFileSync('inputs/2.txt').toString()
const arr = inputString.split('\n').map((val) => {
  const split = val.split(' ')
  const range = split[0].split('-').map((val) => parseInt(val))
  return {
    firstNumber: range[0],
    secondNumber: range[1],
    letter: split[1].substr(0, 1),
    password: split[2].split(''),
  }
})

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

const firstTask = () => {
  const ans = arr.reduce(
    (a, b) => a + (isValidOne(b.firstNumber, b.secondNumber, b.letter, b.password) ? 1 : 0),
    0
  )
  return ans
}

const secondTask = () => {
  const ans = arr.reduce(
    (a, b) => a + (isValidTwo(b.firstNumber - 1, b.secondNumber - 1, b.letter, b.password) ? 1 : 0),
    0
  )
  return ans
}

const main = () => {
  console.log('DAY 2')
  console.log('===============================')
  let start = new Date()
  console.log(
    'Executing first task at',
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  )

  console.log('Answer:', firstTask())

  let end = new Date()
  console.log(
    'Finished first task at',
    `${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`,
    'in',
    end.getTime() - start.getTime(),
    'milliseconds'
  )
  console.log('-------------------')
  start = new Date()
  console.log(
    'Executing second task at',
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  )

  console.log('Answer:', secondTask())

  end = new Date()
  console.log(
    'Finished second task at',
    `${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`,
    'in',
    end.getTime() - start.getTime(),
    'milliseconds'
  )
  console.log('===============================')
  console.log()
}

main()

exports.main = main
