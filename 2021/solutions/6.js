const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('../inputs/6.txt').toString()
  return inputString.split(',').map((it) => parseInt(it))
}

const firstTask = (fish) => {
  let newFish = []
  for (let _ = 0; _ < 80; _++) {
    for (let i = 0; i < fish.length; i++) {
      if (fish[i] === 0) {
        fish[i] = 6
        newFish.push(8)
      } else {
        fish[i]--
      }
    }
    fish = fish.concat(newFish)
    newFish = []
  }
  return fish.length
}

const secondTask = (fish) => {
  const days = 256
  let currentMap = {}
  for (let i = 0; i < fish.length; i++) {
    if (!currentMap[fish[i]]) currentMap[fish[i]] = 0
    currentMap[fish[i]]++
  }
  let tempMap
  for (let day = 1; day <= days; day++) {
    tempMap = {}
    for (let timer = 0; timer <= 8; timer++) {
      if (timer === 0) {
        tempMap[6] = currentMap[0]
        tempMap[8] = currentMap[0]
      } else {
        if (!tempMap[timer - 1]) tempMap[timer - 1] = 0
        if (currentMap[timer]) tempMap[timer - 1] += currentMap[timer]
      }
    }
    currentMap = Object.assign({}, tempMap)
  }
  return Object.values(currentMap).reduce((sum, value) => sum + value, 0)
}

const main = () => {
  const parsedInput = parseInput()
  log.start(6)
  log.runTask(firstTask, parsedInput.slice(), 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput.slice(), 2)
  log.end()
}

main()

exports.main = main
