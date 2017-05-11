import React, { Component } from 'react';
import ChooseLetter from './ChooseLetter';
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
          {
            this.state.playerMark && this.state.turn == null
            ? <div className="col-sm-9 choosePlayer text-center">
                <h2>Losowanie...</h2>
                {this.firstTurn()}
                
              </div>
            : this.state.message  
            ?<div className="col-sm-9 choosePlayer text-center">
                <h2>{this.state.message}</h2>
                {this.renderMessages()}
              </div>  
            : <div></div>  
          }
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
