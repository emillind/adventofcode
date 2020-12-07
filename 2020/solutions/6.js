const fs = require('fs')
const { parse } = require('path')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/6.txt').toString()
  const lines = inputString.split('\n').map((val) =>
    val.split(' ').reduce((lines, line) => {
      if (!line) return null
      return [...lines, ...line]
    }, [])
  )
  return lines.reduce(
    (groups, line) => {
      if (line) groups[groups.length - 1].push(line)
      else groups.push([])
      return groups
    },
    [[]]
  )
}

const firstTask = (input) => {
  return input.reduce(
    (count, group) =>
      count +
      group
        .reduce((questions, person) => [...questions, ...person], [])
        .filter((value, index, self) => self.indexOf(value) === index).length,
    0
  )
}

const secondTask = (input) => {
  return input.reduce(
    (count, group) =>
      count +
      (group.length === 1
        ? group[0].length
        : group
            .slice(1)
            .reduce((questions, person) => questions.filter((q) => person.includes(q)), [
              ...group[0],
            ]).length),

    0
  )
}

const main = () => {
  const parsedInput = parseInput()
  log.start(6)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
