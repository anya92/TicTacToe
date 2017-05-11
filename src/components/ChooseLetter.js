import React from 'react';

const ChooseLetter = (props) => {
  return (
    <div className="col-sm-9 choosePlayer text-center">
      <h2>Wybierz Gracza</h2>
      <button 
        className="marks btn"
        onClick={() => props.chooseLetter('X', 'O')}
      >
        X
      </button>
      <button 
        className="marks btn"
        onClick={() => props.chooseLetter('O', 'X')}
      >
        O
      </button>
    </div>
  );
};

export default ChooseLetter;
