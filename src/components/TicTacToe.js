import React, { Component } from 'react';
import { Stage } from 'react-konva';

class TicTacToe extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  componentWillMount() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    let size = (height < width) ? height * .6 : width * .6;
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

  render() {
    let { size, rows, unit, coordinates } = this.state;
    return (
      <div>
        <Stage
          height={size}
          width={size}
        >
          
        </Stage>
      </div>
    );
  }
}

export default TicTacToe;
