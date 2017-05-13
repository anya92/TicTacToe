import React, { Component } from 'react';
import PlayAgain from './PlayAgain';

class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: new Array(9).fill(' '),
      gameIsPlaying: true,
      yourTurn: props.firstTurn === 'player' ? true : false,
      winner: null
    }
  }

  componentDidMount() {
    let { firstTurn } = this.props;
    firstTurn === 'computer' 
    ? setTimeout(() => this.firstComputerMove(), 500) 
    : null;
    // let gameboard = document.getElementById('gameboard');
    // let width = gameboard.offsetWidth;
    // this.setState({ size: `${width}px` });
    let height = window.innerHeight;
    let width = window.innerWidth;
    let size = (height < width) ? height * .8 : width * .8;
    this.setState({size});
  }

  firstComputerMove = () => {
    let { board } = this.state;
    const { computerMark } = this.props;
    let computerMoveIndex = this.computerMoveIndex();
    board.splice(computerMoveIndex, 1, computerMark);
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
      if (this.isEmpty(board, index)) { 
        board.splice(index, 1, mark);
        this.setState({
          board
        });
         if(this.isWinner(board, playerMark)) {
        this.setState({ gameIsPlaying: false, winner: 'Wygrałeś!!!' });
        let winningCombo = this.getWinningCombo(board);
        winningCombo.map(mark => {
          let cell = document.getElementById(`cell${mark}`);
          cell.classList.add('winner');
        });
      } else {
        if (this.isBoardFull(board)) {
          this.setState({ gameIsPlaying: false, winner: 'Remis' });
        } else { // computer move
          this.setState({ yourTurn: !yourTurn });
          setTimeout(() => this.computerMove(computerMark), 500);
        }
      }
      } else {
        null;
      }
     }
    } 
  }

  makeMove = (boardCopy, mark, move) => { // => przenieść do tej większej
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
        this.setState({ gameIsPlaying: false, winner: 'Przegrałeś...'});
        let winningCombo = this.getWinningCombo(board);
        winningCombo.map(mark => {
          let cell = document.getElementById(`cell${mark}`);
          cell.classList.add('winner');
        });
      } else {
        if (this.isBoardFull(board)) {
          this.setState({ gameIsPlaying: false, winner: 'Remis' });
          
        } else {
          this.setState({ yourTurn: !yourTurn });
        }
      }
    } else {
      console.log('This game is over.');
    }
    

  }
  computerMoveIndex = () => { // ==> przenieść
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
    move = this.chooseRandomMove(board, [0,2,6,8]);
    if (move != null) {
      return move;
    }
    // try to take center
    if (this.isEmpty(board, 4)) {
      return 5;
    }
    // move on one of the sides
    return this.chooseRandomMove(board, [1,3,5,7]);
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
    let { board, gameIsPlaying, winner } = this.state;
    let { playerMark, playAgain } = this.props;
    return (
      <div className="col-sm-9 text-center">
        <div className="winner">
          <h2>{winner}</h2>
          {
            !gameIsPlaying 
            ? <PlayAgain playAgain={playAgain}/>
            : <h2>Grasz <span>{playerMark}</span></h2>
          }
        </div>
        <div 
          className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3" 
          id="gameboard"
        >
          {
            board.map((cell, index) => {
              return (  
                <div 
                  key={index} 
                  className={'cells'}
                  id={`cell${index}`}
                  onClick={() => this.playerMove(index, playerMark)}
                >
                  {cell}
                </div>
              );
            })
          }
        </div>  
        
      </div>
    );
  }
}


export default TicTacToe;
