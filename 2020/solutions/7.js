const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('inputs/7.txt').toString()
  return inputString.split('\n').map((val) => {
    const [bag, contents] = val.split('contain')
    const bags = contents.includes('no other bags')
      ? []
      : contents.split(',').map((content) => ({
          amount: parseInt(content.substr(1, 1)),
          bag: content.substr(3).replace(' bags', '').replace('.', ''),
        }))
    return {
      bag,
      contents: bags,
    }
  })
}

findPossibleContainers = (amount, bag, input) => {
  const directContainers = input
    .filter((it) => it.contents.some((c) => c.amount >= amount && c.bag.includes(bag)))
    .map((b) => b.bag)
  const indirectContainers = directContainers.reduce(
    (containers, currentContainer) => [
      ...containers,
      ...findPossibleContainers(1, currentContainer, input),
    ],
    []
  )
  return [...directContainers, ...indirectContainers].filter(
    (value, index, self) => typeof value === 'string' && self.indexOf(value) === index
  )
}

const findContainedBagCount = (bag, input, first) => {
  const contents = input.find((it) => it.bag.includes(bag))
  if (!contents || contents.contents.length === 0) return 1
  return (
    (first ? 0 : 1) +
    contents.contents.reduce((count, content) => {
      const inside = findContainedBagCount(content.bag, input, false)
      return count + content.amount * inside
    }, 0)
  )
}

const firstTask = (input) => {
  return findPossibleContainers(1, 'shiny gold', input).length
}

const secondTask = (input) => {
  return findContainedBagCount('shiny gold', input, true)
}

const main = () => {
  const parsedInput = parseInput()
  log.start(7)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
