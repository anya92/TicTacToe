import React from 'react';

const ChooseLetter = ({ playerMark, chooseLetter }) => {
  return (
    <div>
      {
        playerMark == null
        ? <div className="col-sm-9 choosePlayer text-center">
            <h2>Wybierz Gracza</h2>
            <button 
              className="marks btn"
              onClick={() => chooseLetter('X', 'O')}
            >
              X
            </button>
            <button 
              className="marks btn"
              onClick={() => chooseLetter('O', 'X')}
            >
              O
            </button>
          </div>
        : <div></div>  
      }
    </div>
  );
};

export default ChooseLetter;
