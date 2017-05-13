import React from 'react';

const PlayAgain = ({ playAgain }) => {
  return (
    <div className="play-again">
      <h3>Chcesz zagrać jeszcze raz? </h3>
      <a
        className="btn" 
        onClick={() => playAgain()}
      >
        Start
      </a>
    </div>
  );
};

export default PlayAgain;
