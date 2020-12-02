const fs = require('fs')
const log = require('./log.js')
const inputString = fs.readFileSync('inputs/1.txt').toString()
const arr = inputString.split('\n').map((val) => parseInt(val))

const firstTask = () => {
  for (let i = 0; i < arr.length; i++) {
    const remaining = 2020 - arr[i]
    const found = arr.find((v) => remaining === v)
    if (found) {
      return arr[i] * found
    }
  }
}

const secondTask = () => {
  for (let i = 0; i < arr.length; i++) {
    const first = arr[i]
    for (let j = i + 1; j < arr.length; j++) {
      const second = arr[j]
      const remaining = 2020 - first - second
      const found = arr.find((v) => remaining === v)
      if (found) {
        return first * second * found
      }
    }
  }
}

const main = () => {
  log.start(1)
  log.runTask(firstTask, 1)
  console.log('-------------------')
  log.runTask(secondTask, 2)
  log.end()
}

main()

exports.main = main
