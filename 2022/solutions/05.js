const fs = require('fs')
const log = require('./log.js')

const DAY = '05'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  const [inputMatrix, rawOperations] = inputString.split('\n\n')
  const lines = inputMatrix.split('\n')
  const matrix = lines[lines.length - 1].split('  ').map(() => [])
  lines.pop()

  lines.reverse().forEach((line) => {
    for (let i = 0; i < matrix.length; i++) {
      const element = line.slice(i * 4, i * 4 + 3)
      matrix[i].push(element)
    }
  })

  const stacks = matrix.map((row) => row.filter((crate) => !!crate.trim()))

  const operations = rawOperations.split('\n').map((operation) => {
    const split = operation.split(' ')
    return {
      amount: parseInt(split[1]),
      from: parseInt(split[3]),
      to: parseInt(split[5]),
    }
  })

  return [stacks, operations]
}

const firstTask = (input) => {
  return 0
}

const secondTask = (input) => {
  return 0
}

const main = () => {
  const testInput = parseInput('test', DAY)
  const parsedInput = parseInput('input', DAY)
  log.start(DAY)
  log.runTask(firstTask, testInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, testInput, 2)
  log.end()
}

main()

exports.main = main
