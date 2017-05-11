import React from 'react';

const PlayAgain = ({ playAgain }) => {
  return (
    <div className="col-md-9 text-center">
      <h2>Chcesz zagrać jeszcze raz? </h2>
      <button 
        className="btn" 
        onClick={() => playAgain()}
      >
        Zagraj jeszcze raz
      </button>
    </div>
  );
};

export default PlayAgain;
