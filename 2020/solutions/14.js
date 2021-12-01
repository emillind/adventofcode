const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/14.txt').toString()
  return inputString.split('\n').map((val) => {
    const split = val.split('=').map((v) => v.trim())
    if (split[0] === 'mask') return split[1]
    else {
      return {
        memory: parseInt(split[0].split('[')[1].replace(']', '')),
        value: parseInt(split[1]),
      }
    }
  })
}

const to36BitArray = (value) => {
  const bitArray = value.toString(2).split('')
  const remaining = 36 - bitArray.length
  bitArray.unshift(...Array(remaining).fill('0'))
  return bitArray
}

const firstTask = (input) => {
  const memory = []
  let currentMask = []
  input.forEach((line) => {
    if (typeof line === 'string') currentMask = line.split('')
    else {
      const bits = to36BitArray(line.value)
      for (let i = 0; i < currentMask.length; i++) {
        if (currentMask[i] === '1') bits[i] = '1'
        else if (currentMask[i] === '0') bits[i] = '0'
      }
      memory[line.memory] = bits.reduce((acc, val) => {
        return (acc << 1) | val
      })
    }
  })
  return memory.reduce((sum, current) => sum + (current ? current >>> 0 : 0), 0)
}

const secondTask = (input) => {
  let ans = ''
  return ans
}

const main = () => {
  const parsedInput = parseInput()
  log.start(14)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
