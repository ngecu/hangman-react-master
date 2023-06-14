import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';

const wordList = {
  english: ['application', 'programming', 'interface', 'wizard'],
  french: ['ordinateur', 'programmation', 'interface', 'sorcier'],
};

let selectedLanguage = 'english';
let selectedWord = wordList[selectedLanguage][Math.floor(Math.random() * wordList[selectedLanguage].length)];
const gameDuration = 30; // Duration of the game in seconds

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setScore(prevScore => prevScore + 1); // Increment the score by 1 for correct guesses
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setScore(prevScore => prevScore - 1); // Decrement the score by 1 for wrong guesses
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    const countdown = setInterval(() => {
      if (timeRemaining > 0 && playable) {
        setTimeRemaining(prevTime => prevTime - 1);
      } else {
        setPlayable(false);
        clearInterval(countdown);
      }
    }, 1000);

    window.addEventListener('keydown', handleKeydown);

    return () => {
      clearInterval(countdown);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [correctLetters, wrongLetters, playable, timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      setPlayable(false);
    }
  }, [timeRemaining]);

  function handleLanguageChange(event) {
    selectedLanguage = event.target.value;
    selectedWord = wordList[selectedLanguage][Math.floor(Math.random() * wordList[selectedLanguage].length)];
    setCorrectLetters([]);
    setWrongLetters([]);
    setScore(0);
  }

  function updateScore() {
    setScore(prevScore => prevScore + 1);
  }

  function playAgain() {
    setPlayable(true);
    setTimeRemaining(gameDuration);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);
    setRoundScores(prevRoundScores => [...prevRoundScores, score]); // Store the current score in roundScores
    setScore(0);

    selectedWord = wordList[selectedLanguage][Math.floor(Math.random() * wordList[selectedLanguage].length)];
  }

  return (
    <>
      <Header />
      <div className="language-select">
        <label htmlFor="language">Select Language: </label>
        <select id="language" onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="french">French</option>
        </select>
      </div>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} updateScore={updateScore} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
        time={timeRemaining}
        score={score}
      />
      <Notification showNotification={showNotification} />
      <div className="timer">Time Remaining: {timeRemaining}s</div>
      <div className="score">Score: {score}</div>
      <div className="scoreboard">
        <h3>Scoreboard</h3>
        {roundScores.map((roundScore, index) => (
          <div key={index}>Round {index + 1}: {roundScore}</div>
        ))}
      </div>
    </>
  );
}

export default App;
