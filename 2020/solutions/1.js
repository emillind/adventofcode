const fs = require('fs')
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
  console.log('DAY 1')
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
