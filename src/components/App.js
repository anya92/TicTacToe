import React, { Component } from 'react';
import ChooseLetter from './ChooseLetter';
import RandomFirst from './RandomFirst';
import { whoStartsFirst, getBoard } from '../utils/helpers';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playerMark: null,
      computerMark: null,
      turn: null,
      message: '',
      board: [],
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
        ? 'Zaczynasz pierwszy. Powodzenia!' 
        : 'Zaczyna komputer. Powodzenia!';
      this.setState({ turn : first, message});
    }, 1000);
  }

  renderMessages = () => {
    setTimeout(() => this.setState({ 
      message: '', 
      gameIsPlaying: true 
    }), 2000);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3 title text-center">
            <h1>Kółko i Krzyżyk</h1>
          </div>
          {
            this.state.playerMark == null 
            ? <ChooseLetter
                chooseLetter={this.chooseLetter}
              />
            : <div></div>
          }
          <RandomFirst 
            playerMark={this.state.playerMark}
            turn={this.state.turn}
            message={this.state.message}
            firstTurn={this.firstTurn}
            renderMessages={this.renderMessages}
          />
          {
            this.state.gameIsPlaying 
            ? <div>
              Board !!! <br/>
              Chcesz zagrać jeszcze raz? 
              <button className="btn" onClick={() => this.setState({gameIsPlaying: false, playerMark: null, turn: null})}>Jeszcze raz</button>
            </div>
            : <div></div>
          }
        </div>
      </div>
    );
  }
}

export default App;
