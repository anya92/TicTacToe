import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playerMark: null,
      computerMark: null
    }
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
          
        </div>
      </div>
    );
  }
}

export default App;
