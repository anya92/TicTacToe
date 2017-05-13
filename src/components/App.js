import React, { Component } from 'react';
import Header from './Header';
import ChooseLetter from './ChooseLetter';
import WhoFirst from './WhoFirst';
import TicTacToe from './TicTacToe';
import { whoStartsFirst } from '../utils/helpers';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playerMark: null,
      computerMark: null,
      firstTurn: null,
      message: '',
      gameIsPlaying: false
    }
  }

  chooseLetter = (playerMark, computerMark) => {
    this.setState({
      playerMark,
      computerMark
    });
  }

  firstTurn = () => {
    setTimeout(() => {
      let first = whoStartsFirst();
      let message = (first === 'player') 
        ? 'Zaczynasz pierwszy.' 
        : 'Zaczyna komputer.';
      this.setState({ 
        firstTurn : first, 
        message
      });
    }, 1000);
  }

  renderMessages = () => { // rename !!!
    setTimeout(() => this.setState({ 
      message: '', 
      gameIsPlaying: true
    }), 1500);
  }

  playAgain = () => {
    this.setState({
      gameIsPlaying: false,
      playerMark: null,
      firstTurn: null,
      board: new Array(9).fill(' ')
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header />
          <ChooseLetter
            playerMark={this.state.playerMark}
            chooseLetter={this.chooseLetter}
          />
          <WhoFirst 
            playerMark={this.state.playerMark}
            turn={this.state.firstTurn}
            message={this.state.message}
            firstTurn={this.firstTurn}
            renderMessages={this.renderMessages}
          />
          {
            this.state.gameIsPlaying 
            ? <div>
              <TicTacToe 
                playerMark={this.state.playerMark}
                computerMark={this.state.computerMark}
                firstTurn={this.state.firstTurn}
                playAgain={this.playAgain}
              />              
              
            </div>
            : <div></div>
          }
        </div>
      </div>
    );
  }
}

export default App;
