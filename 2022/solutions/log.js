const answer = (ans) => {
  console.log('Answer:', ans)
}

const end = () => {
  console.log('===============================')
  console.log()
}

const execute = (start, task) => {
  console.log(`Executing task ${task} at ${toTimeString(start)}`)
}

const finish = (start, end, task) => {
  console.log(
    'Finished task',
    task,
    toTimeString(end),
    'in',
    end.getTime() - start.getTime(),
    'milliseconds'
  )
}

const start = (day) => {
  console.log('DAY', day)
  console.log('===============================')
}

const tryPrependZero = (value) => {
  return value > 9 ? value : `0${value}`
}

const toTimeString = (date) => {
  return `${tryPrependZero(date.getHours())}:${tryPrependZero(
    date.getMinutes()
  )}:${tryPrependZero(date.getSeconds())}:${tryPrependZero(
    date.getMilliseconds()
  )}`
}

const runTask = (func, input, task) => {
  const start = new Date()
  execute(start, task)
  answer(func(input))
  const end = new Date()
  finish(start, end, task)
}

exports.end = end
exports.start = start
exports.runTask = runTask
