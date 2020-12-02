const fs = require('fs')
const log = require('./log.js')
const inputString = fs.readFileSync('inputs/X.txt').toString()

const firstTask = () => {
  let ans = ''
  return ans
}

const secondTask = () => {
  let ans = ''
  return ans
}

const main = () => {
  log.start('X')
  log.runTask(firstTask, 1)
  console.log('-------------------')
  log.runTask(secondTask, 2)
  log.end()
}

main()

exports.main = main
