import React, { Component } from 'react';
import { whoStartsFirst } from '../utils/helpers';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playerMark: null,
      computerMark: null,
      turn: null,
      message: ''
    }
  }

  firstTurn = () => {
    setTimeout(() => {
      let first = whoStartsFirst();
      let message = (first === 'player') ? 'Zaczynasz pierwszy. Powodzenia!' : 'Zaczyna komputer. Powodzenia';
      this.setState({ turn : first, message});
    }, 2000);
  }
  renderMessages = () => {
    return <div>{this.state.message}</div>
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3 title">
            <h1>Kółko i <br/>Krzyżyk</h1>
          </div>
          {
            this.state.playerMark == null 
            ? <div className="col-sm-9 choosePlayer text-center">
              <h2>Wybierz Gracza</h2>
              <button 
                className="marks btn"
                onClick={() => this.setState({ playerMark: 'X', computerMark: 'O'})}
              >
              X
              </button>
              <button 
                className="marks btn"
                onClick={() => this.setState({ playerMark: 'O', computerMark: 'X'})}
              >
              O
              </button>
            </div>
            : <div></div>
          }
          {
            this.state.playerMark && this.state.turn == null
            ? <div className="col-sm-9 choosePlayer text-center">
                <h2>Losowanie...</h2>
                {this.firstTurn()}
                
              </div>
            : <div>{this.renderMessages()}</div>  
          }
        </div>
      </div>
    );
  }
}

export default App;
