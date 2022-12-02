const fs = require('fs')
const log = require('./log.js')

const DAY = '02'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  return inputString.split('\n').map((val) => {
    const choices = val.split(' ')
    return { opponent: choices[0], response: choices[1] }
  })
}

const letterMapping = { A: 'X', B: 'Y', C: 'Z' }
const outcomeMapping = { X: 0, Y: 3, Z: 6 }
const pointsMapping = { X: 1, Y: 2, Z: 3 }

const win = (opponent, response) =>
  (opponent === 'X' && response === 'Y') ||
  (opponent === 'Y' && response === 'Z') ||
  (opponent === 'Z' && response === 'X')

const findScore = (opponent, response) => {
  if (response === opponent) return 3
  if (win(opponent, response)) return 6
  return 0
}

const findAnswer = (opponent, outcome) => {
  if (outcome === 3) return opponent
  if (outcome === 6)
    return opponent === 'X' ? 'Y' : opponent === 'Y' ? 'Z' : 'X'
  return opponent === 'X' ? 'Z' : opponent === 'Y' ? 'X' : 'Y'
}

const firstTask = (input) => {
  return input.reduce(
    (score, game) =>
      score +
      pointsMapping[game.response] +
      findScore(letterMapping[game.opponent], game.response),
    0
  )
}

const secondTask = (input) => {
  return input.reduce(
    (score, game) =>
      score +
      outcomeMapping[game.response] +
      pointsMapping[
        findAnswer(letterMapping[game.opponent], outcomeMapping[game.response])
      ],
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
