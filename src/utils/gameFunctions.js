export const isEmpty = (board, index) => board[index] === ' '; 

const makeMove = (boardCopy, mark, move) => { 
  boardCopy[move] = mark;
}

export const getWinningCombo = (board) => {
  const winningCombos = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
  return winningCombos.find(combo => {
    let [a,b,c] = combo;
    return (board[a] === board[b] && board[a] === board[c] && board[a]);
  });
}

export const isWinner = (board, mark) => {
  let winningCombo = getWinningCombo(board);
  if (winningCombo) {
    return board[winningCombo[0]] === mark;
  }
}

const chooseRandomMove = (board, listOfMoves) => {
  let possibleMoves = listOfMoves.filter(move => isEmpty(board, move));
  return (possibleMoves.length > 0) ? possibleMoves[Math.floor(Math.random() * possibleMoves.length)] : null;
}


export const aiMove = (board, computerMark, playerMark) => { 
  let boardCopy, move;
  // check, if AI can win in the next move
  for(let i = 1; i < 9; i++) {
    boardCopy = [...board];
    if (isEmpty(boardCopy, i)) {
      makeMove(boardCopy, computerMark, i);
      if (isWinner(boardCopy, computerMark)) {
        return i;
      }
    }
  }
  // check, if player could win in the next move, and block them
  for(let i = 1; i < 9; i++) {
    boardCopy = [...board];
    if (isEmpty(boardCopy, i)) {
      makeMove(boardCopy, playerMark, i);
      if (isWinner(boardCopy, playerMark)) {
        return i;
      }
    }
  }
  // try to take one of the corners, if they free
  move = chooseRandomMove(board, [0,2,6,8]);
  if (move != null) {
    return move;
  }
  // try to take center
  if (isEmpty(board, 4)) {
    return 5;
  }
  // move on one of the sides
  return chooseRandomMove(board, [1,3,5,7]);
}

export const isBoardFull = (board) => {
  for (let i = 0; i < 9; i++) {
    if (isEmpty(board, i)) {
      return false;
    }
  }
  return true;
}
