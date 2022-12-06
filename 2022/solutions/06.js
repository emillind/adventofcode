const fs = require('fs')
const log = require('./log.js')

const DAY = '06'

const parseInput = (file) => {
  return fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
}

const findStartMarker = (buffer, uniqueCharacters) => {
  const active = []
  for (let i = 0; i < buffer.length; i++) {
    if (new Set(active).size === uniqueCharacters) return i
    if (active.length === uniqueCharacters) active.shift()
    active.push(buffer[i])
  }
}

const firstTask = (input) => {
  return findStartMarker(input, 4)
}

const secondTask = (input) => {
  return findStartMarker(input, 14)
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
