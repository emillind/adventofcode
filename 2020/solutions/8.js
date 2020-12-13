const { exec } = require('child_process')
const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/8.txt').toString()
  return inputString.split('\n').map((val) => {
    const instruction = val.split(' ')
    return {
      op: instruction[0],
      arg: parseInt(instruction[1]),
    }
  })
}

const operations = {
  nop: 'nop',
  acc: 'acc',
  jmp: 'jmp',
}

executeInstruction = (instructionPointer, instructions, accumulator) => {
  const operation = instructions[instructionPointer]
  if (operation === undefined) console.log(instructionPointer)
  switch (operation.op) {
    case operations.acc:
      return [instructionPointer + 1, accumulator + operation.arg]
    case operations.jmp:
      return [instructionPointer + operation.arg, accumulator]
    case operations.nop:
      return [instructionPointer + 1, accumulator]
  }
}

executeInstructions = (instructions) => {
  let accumulator = 0
  let currentPointer = 0
  const instructionsRun = []
  while (!instructionsRun.includes(currentPointer) && currentPointer < instructions.length) {
    instructionsRun.push(currentPointer)
    const res = executeInstruction(currentPointer, instructions, accumulator)
    currentPointer = res[0]
    accumulator = res[1]
  }
  return [currentPointer, accumulator]
}

createPotentialInputs = (input) => {
  const inputs = [JSON.parse(JSON.stringify(input))]
  input.forEach((instruction, i) => {
    const copy = JSON.parse(JSON.stringify(input))
    if (instruction.op === operations.nop) {
      copy[i].op = operations.jmp
      inputs.push(copy)
    } else if (instruction.op === operations.jmp) {
      copy[i].op = operations.nop
      inputs.push(copy)
    }
  })
  return inputs
}

const firstTask = (input) => {
  return executeInstructions(input)[1]
}

const secondTask = (input) => {
  let ans = 0
  const inputs = createPotentialInputs(input)
  inputs.forEach((instructions) => {
    const res = executeInstructions(instructions)
    if (res[0] === instructions.length) ans = res[1]
  })
  return ans
}

const main = () => {
  const parsedInput = parseInput()
  log.start(8)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
