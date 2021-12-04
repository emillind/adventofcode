const fs = require('fs')
const log = require('./log.js')

const parseInput = () => {
  const inputString = fs.readFileSync('../inputs/4.txt').toString()
  const lines = inputString.split('\n').map((val) => val)
  const bingoSequence = lines[0].split(',').map((number) => parseInt(number))
  const boardSize = 5
  const boards = []
  for (let i = 2; i < lines.length; i += boardSize + 1) {
    boards.push(
      lines.slice(i, i + boardSize).map((row) =>
        row
          .replaceAll('  ', ' ')
          .trim()
          .split(' ')
          .map((cell) => ({ number: parseInt(cell), marked: false }))
      )
    )
  }
  return { bingoSequence, boards }
}

const markBoard = (board, number) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].number === number) {
        board[i][j].marked = true
        return
      }
    }
  }
}

const markBoards = (boards, number) => {
  boards.forEach((board) => {
    markBoard(board, number)
  })
}

const checkRow = (board, rowIndex) => {
  return board[rowIndex].every((cell) => cell.marked)
}

const checkColumn = (board, colIndex) => {
  for (let i = 0; i < board.length; i++) {
    if (!board[i][colIndex].marked) return false
  }
  return true
}

const checkBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (checkRow(board, i) || checkColumn(board, i)) return true
  }
}

const checkBoards = (boards) => {
  for (let i = 0; i < boards.length; i++) {
    if (checkBoard(boards[i])) return i + 1
  }
  return 0
}

const checkBoardsTwo = (boards, completed) => {
  for (let i = 0; i < boards.length; i++) {
    if (!completed.includes(i) && checkBoard(boards[i])) completed.push(i)
  }
}

const sumBoard = (board) => {
  return board.reduce(
    (sum, row) =>
      sum +
      row.reduce(
        (innerSum, cell) => innerSum + (cell.marked ? 0 : cell.number),
        0
      ),

    0
  )
}

const firstTask = ({ bingoSequence, boards }) => {
  for (let i = 0; i < bingoSequence.length; i++) {
    const number = bingoSequence[i]
    markBoards(boards, number)
    let bingoBoardIndex = checkBoards(boards)
    if (bingoBoardIndex !== 0) {
      return number * sumBoard(boards[bingoBoardIndex - 1])
    }
  }
}

const secondTask = ({ bingoSequence, boards }) => {
  const completed = []
  for (let i = 0; i < bingoSequence.length; i++) {
    const number = bingoSequence[i]
    markBoards(boards, number)
    checkBoardsTwo(boards, completed)
    if (completed.length === boards.length) {
      return number * sumBoard(boards[completed[completed.length - 1]])
    }
  }
}

const main = () => {
  const parsedInput = parseInput()
  log.start(4)
  log.runTask(firstTask, parsedInput, 1)
  console.log('-------------------')
  log.runTask(secondTask, parsedInput, 2)
  log.end()
}

main()

exports.main = main
