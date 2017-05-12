import React, { Component } from 'react';

class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [' ', 'O', ' ', 'X', ' ', 'O', 'X', ' ', 'O'],
      gameIsPlaying: true,
      yourTurn: props.firstTurn === 'player' ? true : false
    }
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

  componentDidMount() {
    let { firstTurn } = this.props;
    firstTurn === 'computer' 
    ? setTimeout(() => this.firstComputerMove(), 5000) 
    : null;
  }

  game = () => {
    let { playerMark, computerMark, turn } = this.props;
    let { board, gameIsPlaying } = this.state;
    
  }

  render() {
    let { board } = this.state;
    return (
      <div className="col-sm-9 text-center">
        <div className="gameboard col-sm-8 col-sm-offset-2">
          {
            board.map((cell, index) => {
              return (  
                <div 
                  key={index} 
                  className={`cells cell${index}`}
                  onClick={() => this.game()}
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
