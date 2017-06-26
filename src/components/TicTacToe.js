import React, { Component } from 'react';
import PlayAgain from './PlayAgain';
import { aiMove, isEmpty, getWinningCombo, isWinner, isBoardFull } from '../utils/gameFunctions';

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
    firstTurn === 'computer' ? setTimeout(() => this.firstComputerMove(), 500) : null;
 }


  firstComputerMove = () => {
    let { board } = this.state;
    const { computerMark, playerMark } = this.props;
    let computerMoveIndex = aiMove(board, computerMark, playerMark);
    board.splice(computerMoveIndex, 1, computerMark);
    this.setState({
      yourTurn: true,
      board
    });
  }

  playerMove = (index, mark) => {
    let { playerMark, computerMark } = this.props;
    let { board, gameIsPlaying, yourTurn } = this.state;
    if (gameIsPlaying && yourTurn && isEmpty(board, index)) { //player move
      board.splice(index, 1, mark);
      this.setState({
        board
      });
      if (isWinner(board, playerMark)) {
        this.setState({ 
          gameIsPlaying: false, 
          winner: 'Wygrałeś!!!' 
        });
        let winningCombo = getWinningCombo(board);
        winningCombo.map(mark => {
          let cell = document.getElementById(`cell${mark}`);
          cell.classList.add('winner');
        });
      } else {
        if (isBoardFull(board)) {
          this.setState({ 
            gameIsPlaying: false, 
            winner: 'Remis' 
          });
        } else { // computer move
            this.setState({ 
              yourTurn: !yourTurn 
            });
            setTimeout(() => this.computerMove(computerMark), 500);
        }
      }
    }
  }

  computerMove = (computerMark) => {
    let { board, yourTurn, gameIsPlaying } = this.state;
    let { playerMark } = this.props;
    let computerMoveIndex = aiMove(board, computerMark, playerMark);
    if (gameIsPlaying) {
      board.splice(computerMoveIndex, 1,  computerMark);
      this.setState({
        board
      });
      if (isWinner(board, computerMark)) {
        this.setState({ 
          gameIsPlaying: false, 
          winner: 'Przegrałeś...'
        });
        let winningCombo = getWinningCombo(board);
        winningCombo.map(mark => {
          let cell = document.getElementById(`cell${mark}`);
          cell.classList.add('winner');
        });
      } else {
        if (isBoardFull(board)) {
          this.setState({ 
            gameIsPlaying: false, 
            winner: 'Remis' 
          });
        } else {
          this.setState({ yourTurn: !yourTurn });
        }
      }
    } 
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
          className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3" id="gameboard">
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
