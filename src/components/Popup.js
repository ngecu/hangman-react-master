import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain,time }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  

  if (checkWin(correctLetters, wrongLetters, selectedWord,time) === 'win') {
    finalMessage = 'Congratulations! You won! 😃';
  }
  else if (checkWin(correctLetters, wrongLetters, selectedWord,time) === 'lose') {
    finalMessage = 'Unfortunately, you lost. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
  }

  else if (checkWin(correctLetters, wrongLetters, selectedWord,time) === 'timeup') {
    finalMessage = 'Unfortunately, Time is Up. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
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
        {finalMessage !== '' && (
          <button onClick={playAgain}>Play Again</button>
        )}
      </div>
    </div>
  );
};

export default Popup;
