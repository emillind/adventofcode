const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/4.txt').toString()
  const arr = inputString.split('\n').map((val) =>
    val.split(' ').reduce((passport, val) => {
      if (!val) return null
      const pair = val.split(':')
      passport[pair[0]] = pair[1]
      return passport
    }, {})
  )
  return arr.reduce(
    (passports, line) => {
      if (line) passports[passports.length - 1] = { ...passports[passports.length - 1], ...line }
      else passports.push({})
      return passports
    },
    [{}]
  )
}

const neededFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const isValidPassportOne = (passport) => {
  return neededFields
    .filter((it) => it !== 'cid')
    .every((field) => Object.keys(passport).includes(field))
}

isValidField = (field, value) => {
  switch (field) {
    case 'cid':
      return true
    case 'byr':
      return value.length === 4 && value >= 1920 && value <= 2002
    case 'iyr':
      return value.length === 4 && value >= 2010 && value <= 2020
    case 'eyr':
      return value.length === 4 && value >= 2020 && value <= 2030
    case 'hgt':
      return /(((19[0-3])|(1[5-8][0-9]))cm)|(((59)|(6[0-9])|(7[0-6]))in)/g.test(value)
    case 'hcl':
      return /#([a-f0-9]){6}/g.test(value)
    case 'ecl':
      return eyeColors.includes(value)
    case 'pid':
      return value.length === 9
    default:
      return false
  }
}

const isValidPassportTwo = (passport) => {
  return neededFields.every(
    (field) => Object.keys(passport).includes(field) && isValidField(field, passport[field])
  )
}

const firstTask = (input) => {
  return input.reduce((ans, passport) => ans + (isValidPassportOne(passport) ? 1 : 0), 0)
}

const secondTask = (input) => {
  return input.reduce((ans, passport) => ans + (isValidPassportTwo(passport) ? 1 : 0), 0)
}

const main = () => {
  const parsedInput = parseInput()
  log.start(4)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
