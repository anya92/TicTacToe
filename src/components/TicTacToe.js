import React, { Component } from 'react';

class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      gameIsPlaying: true,
      yourTurn: props.firstTurn === 'player' ? true : false,
      winner: null
    }
  }

  componentDidMount() {
    let { firstTurn } = this.props;
    firstTurn === 'computer' 
    ? setTimeout(() => this.firstComputerMove(), 1000) 
    : null;
  }

  firstComputerMove = () => {
    let { board } = this.state;
    const { computerMark } = this.props;
    const moveAi = 0; // funkcja => [0, ... , 9]
    board.splice(moveAi,1, computerMark);
    this.setState({
      yourTurn: true,
      board
    });
  }

  isEmpty = (board, index) => board[index] === ' '; 

  isWinner = (board, mark) => {
    let winningCombo = this.getWinningCombo(board);
    if (winningCombo) {
      return board[winningCombo[0]] === mark;
    }
  }

  getWinningCombo = (board) => {
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

  playerMove = (index, mark) => {
    let { playerMark, computerMark } = this.props;
    let { board, gameIsPlaying, yourTurn } = this.state;
    if (gameIsPlaying) {
    if (yourTurn) { //player move
      console.log('Players move?', yourTurn);
      if (this.isEmpty(board, index)) { 
        board.splice(index, 1, mark);
        this.setState({
          board
        });
         if(this.isWinner(board, playerMark)) {
        this.setState({ gameIsPlaying: false, winner: 'player' });
      } else {
        if (this.isBoardFull(board)) {
          this.setState({ gameIsPlaying: false, winner: 'tie' });
        } else {
          this.setState({ yourTurn: !yourTurn });
          setTimeout(() => this.computerMove(computerMark), 500);
        }
      }
      } else {
        null;
      }
     }
    } 


    // if (!yourTurn) {
    //   console.log('It\'s computer move');
    //   // return;
    // }
    // if (this.isEmpty(board, index)) {
    //   yourTurn = !yourTurn;
    //   board.splice(index, 1, mark);
    //   this.setState({
    //     yourTurn,
    //     board
    //   });
    //   setTimeout(() => { // oddzielna funkcja
    //     let computerMoveIndex = this.computerMove();
    //     yourTurn = !yourTurn;
    //     board.splice(computerMoveIndex, 1, computerMark);
    //     this.setState({
    //       yourTurn,
    //       board
    //     });
    //   }, 500);
      
    // }
    
    // computer move
  }

  makeMove = (boardCopy, mark, move) => {
    boardCopy[move] = mark;
  }
  computerMove = (computerMark) => {
    let { board, yourTurn, gameIsPlaying } = this.state;
    let computerMoveIndex = this.computerMoveIndex();
    if (gameIsPlaying) {
      board.splice(computerMoveIndex, 1,  computerMark);
      this.setState({
        board
      });
      if(this.isWinner(board, computerMark)) {
        this.setState({ gameIsPlaying: false, winner: 'computer'});
      } else {
        if (this.isBoardFull(board)) {
          this.setState({ gameIsPlaying: false, winner: 'tie' });
          
        } else {
          this.setState({ yourTurn: !yourTurn });
        }
      }
    } else {
      console.log('This game is over.');
    }
    

  }
  computerMoveIndex = () => {
    let { board } = this.state;
    const { computerMark, playerMark } = this.props;
    let boardCopy, move;
    // check, if AI can win in the next move
    for(let i = 1; i < 9; i++) {
      boardCopy = [...board];
      if (this.isEmpty(boardCopy, i)) {
        this.makeMove(boardCopy, computerMark, i);
        if (this.isWinner(boardCopy, computerMark)) {
          return i;
        }
      }
    }
    // check, if player could win in the next move, and block them
    for(let i = 1; i < 9; i++) {
      boardCopy = [...board];
      if (this.isEmpty(boardCopy, i)) {
        this.makeMove(boardCopy, playerMark, i);
        if (this.isWinner(boardCopy, playerMark)) {
          return i;
        }
      }
    }
    // try to take one of the corners, if they free
    move = this.chooseRandomMove(board, [1,3,7,9]);
    if (move != null) {
      return move;
    }
    // try to take center
    if (this.isEmpty(board, 5)) {
      return 5;
    }
    // move on one of the sides
    return this.chooseRandomMove(board, [2,4,6,8]);
  }

  chooseRandomMove = (board, listOfMoves) => {
      let possibleMoves = listOfMoves.filter(move => this.isEmpty(board, move));
      return (possibleMoves.length > 0) ? possibleMoves[Math.floor(Math.random()*possibleMoves.length)] : null;
    }

  isBoardFull = (board) => {
    for (let i = 0; i < 9; i++) {
      if (this.isEmpty(board, i)) {
        return false;
      }
    }
    return true;
  }

  render() {
    let { board } = this.state;
    let { playerMark } = this.props;
    return (
      <div className="col-sm-9 text-center">
        <div className="gameboard col-sm-8 col-sm-offset-2">
          {
            board.map((cell, index) => {
              return (  
                <div 
                  key={index} 
                  className={`cells cell${index}`}
                  onClick={() => this.playerMove(index, playerMark)}
                >
                  {cell}
                </div>
              );
            })
          }
        </div>  
        {this.state.winner} 
      </div>
    );
  }
}


export default TicTacToe;
