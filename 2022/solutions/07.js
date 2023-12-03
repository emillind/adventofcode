const fs = require('fs')
const log = require('./log.js')

const DAY = '07'

const parseInput = (file) => {
  const inputString = fs.readFileSync(`../inputs/${DAY}/${file}`).toString()
  return inputString.split('\n').map((line) => {
    const split = line.split(' ')
    if (split[0] === '$') return { type: 'op', op: split[1], val: split[2] }
    else if (split[0] === 'dir') return { type: 'dir', name: split[1] }
    else return { type: 'file', name: split[1], size: parseInt(split[0]) }
  })
}

// [
//   {
//     name: '/',
//     files: [
//       {
//         name: 'a',
//         files: [
//           { name: 'e', files: [{ name: 'i', size: 584 }] },
//           { name: 'f', size: 29116 },
//           { name: 'g', size: 2557 },
//         ],
//       },
//       { name: 'b.txt', size: 14848514 },
//       { name: 'c.dat', size: 8504156 },
//       {
//         name: 'd',
//         files: [
//           { name: 'j', size: 4060174 },
//           { name: 'd.log', size: 8033020 },
//           { name: 'd.ext', size: 5626152 },
//           { name: 'k', size: 7214296 },
//         ],
//       },
//     ],
//   },
// ]

const buildDirectory = (commands, name) => {
  const dir = { name, files: [] }
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]
    if (command.type === 'file' && command.size) {
      dir.files.push({ name: command.name, size: command.size })
    }
    if (command.type === 'op' && command.op === 'cd') {
      if (command.val === '..') {
        return dir
      } else {
        dir.files.push(buildDirectory(commands.slice(i + 1), command.val))
      }
    }
  }
  return dir
}

const firstTask = (input) => {
  return buildDirectory(input, '').files[0]
}

const secondTask = (input) => {
  return 0
}

const main = () => {
  const testInput = parseInput('test', DAY)
  console.log(testInput)
  const parsedInput = parseInput('input', DAY)
  log.start(DAY)
  log.runTask(firstTask, testInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, testInput, 2)
  log.end()
}

main()

exports.main = main
