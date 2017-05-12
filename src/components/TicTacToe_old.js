import React, { Component } from 'react';
import { Stage } from 'react-konva';
import Board from './Board';
import Squares from './Squares';
import { getComputerMove } from '../utils/gameMoves';

class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: new Array(9).fill(false),
      ownMark: 'X',
      otherMark: 'O',
      gameOver: false,
      yourTurn: props.turn === 'player' ? true : false, 
      winner: false,
      win: false
    };
    this.combos = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    this.move = this.move.bind(this);

  }

  componentWillMount() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    let size = (height < width) ? height * .7 : width * .7;
    let rows = 3;
    let unit = size / rows;
    let coordinates = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < rows; x++) {
        coordinates.push([x * unit, y * unit]);
      }
    }

    this.setState({
      size,
      rows,
      unit,
      coordinates
    });
  }

 move(index, marker) {
    this.setState(prevState => {
      let { gameState, yourTurn, gameOver, winner } = prevState;
      yourTurn = !yourTurn;
      gameState.splice(index, 1, marker);
      let foundWin = this.winChecker(gameState);
      if (foundWin) {
        winner = gameState[foundWin[0]];
      }
      if ( foundWin || !gameState.includes(false)) {
        gameOver = true;
      } 
      if (!yourTurn && !gameOver) {
        this.makeAiMove(gameState);
      }
      return {
        gameState,
        yourTurn,
        gameOver,
        win: foundWin || false,
        winner
      };
    });
  }

  makeAiMove(gameState) {
    let { otherMark } = this.state;
    let openSquares = [];
    gameState.forEach((square, index) => {
      if(!square) {
        openSquares.push(index);
      }
    });
    let aiMove = openSquares[this.random(0, openSquares.length)];
    setTimeout(() => {
      this.move(aiMove, otherMark);
    }, 500);
  }

  random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min;
  }

  winChecker(gameState) {
    let combos = this.combos;
    return combos.find(combo => {
      let [a,b,c] = combo;
      return (gameState[a] === gameState[b] && gameState[a] === gameState[c] && gameState[a]);
    });
  }
  render() {
    let { unit, size, rows, coordinates, gameState, win, gameOver, yourTurn, ownMark } = this.state;
    return (
      <div className="col-sm-9 text-center">
        <Stage
          height={size}
          width={size}
        >
          <Board 
            unit={unit}
            size={size}
            rows={rows}
          />
          <Squares 
          unit={unit}
          coordinates={coordinates}
          gameState={gameState}
          win={win}
          gameOver={gameOver}
          yourTurn={yourTurn}
          ownMark={ownMark}
          move={this.move}
        />
        </Stage>
      </div>
    );
  }
}

export default TicTacToe;
