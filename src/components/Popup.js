import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';
import DemoLine from './GraphComponent';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain,time,bestScore,score }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  
console.log(bestScore,score)
  if (checkWin(correctLetters, wrongLetters, selectedWord,time) === 'win') {
    finalMessage = 'Congratulations! You won! 😃';
  }
  else if (checkWin(correctLetters, wrongLetters, selectedWord,time) === 'lose') {
    finalMessage = 'Unfortunately, you lost. 😕';
    finalMessageRevealWord = `...the word was: .....`;
  }

  else if (checkWin(correctLetters, wrongLetters, selectedWord,time) === 'timeup') {
    finalMessage = 'Unfortunately, Time is Up. 😕';
    finalMessageRevealWord = `...the word was: ...`;
  }

  useEffect(() => {
    if (finalMessage !== '') {
      setPlayable(false);
    }
  }, [finalMessage, setPlayable]);

  return (
    <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>

        <DemoLine bestScore={bestScore} score={score} />
        {finalMessage !== '' && (
          <button onClick={playAgain}>Play Again</button>
        )}
      </div>
    </div>
  );
};

export default Popup;
