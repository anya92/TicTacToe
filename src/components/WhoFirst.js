import React from 'react';

const WhoFirst = ({ playerMark, turn, message, firstTurn, renderMessages }) => {
  return (
    <div>
      {
        playerMark && turn == null
        ? <div className="col-sm-9 choosePlayer text-center">
          <h2>Losowanie...</h2>
            {firstTurn()}      
          </div>
        : message  
          ? <div className="col-sm-9 choosePlayer text-center">
              <h2>{message}</h2>
              {renderMessages()}
              <h2>Powodzenia!</h2>
            </div>  
          : <div></div>  
      }
    </div>  
  );
};

export default WhoFirst;
