import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Figure from '../components/Figure';
import WrongLetters from '../components/WrongLetters';
import Word from '../components/Word';
import Popup from '../components/Popup';
import Notification from '../components/Notification';
import { showNotification as show, checkWin } from '../helpers/helpers';

import '../App.css';
import { useSelector } from 'react-redux';
import DemoLine from '../components/GraphComponent';

const wordList = {
  english: ['application', 'programming', 'interface', 'wizard', 'computer', 'technology', 'internet', 'software'],
  spanish: ['aplicación', 'programación', 'interfaz', 'mago', 'computadora', 'tecnología', 'internet', 'software'],
  french: ['application', 'programmation', 'interface', 'sorcier', 'ordinateur', 'technologie', 'internet', 'logiciel'],
  german: ['anwendung', 'programmierung', 'oberfläche', 'zauberer', 'computer', 'technologie', 'internet', 'software'],
};


const gameDuration = 30; // Duration of the game in seconds
const maxGuesses = 5; // Maximum number of wrong guesses for each word

function HomeScreen({ history }) {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);

  const [wordIndex, setWordIndex] = useState(0);
  const [guesses, setGuesses] = useState(maxGuesses);
  const [bestScore, setBestScore] = useState(0);
  const [allScores, setAllScores] = useState([]);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const gameData = JSON.parse(localStorage.getItem('gameData'));
    if (!gameData) {
      history.push('/login');
    }
    else {
      console.log("learning is ",gameData.learningLanguage)
      setSelectedLanguage(gameData.learningLanguage);
      const randomIndex = Math.floor(Math.random() * wordList[gameData.learningLanguage].length);
      setSelectedWord(wordList[selectedLanguage][randomIndex]);
    }
  }, [history]);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
          show(setShowNotification);
          return;
        }
        // console.log("letter is ",letter)
        
        if (wordList[selectedLanguage][wordIndex].includes(letter)) {
          console.log("w ",wordList[selectedLanguage][wordIndex])
          console.log(correctLetters)
          setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          setScore((prevScore) => prevScore + 10);
        } else {
          setWrongLetters((currentLetters) => [...currentLetters, letter]);
          setGuesses((prevGuesses) => prevGuesses - 1);
        }


        const selectedWordTrimmed = selectedWord.trim().toLowerCase();
const letterTrimmed = letter.trim().toLowerCase();

        if (selectedWordTrimmed.includes(letterTrimmed)) {
          console.log("Selected word:", selectedWordTrimmed);
          console.log("Correct letters:", correctLetters);
          setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          setScore((prevScore) => prevScore + 10);
        } else {
          setWrongLetters((currentLetters) => [...currentLetters, letter]);
          setGuesses((prevGuesses) => prevGuesses - 1);
        }

      }
    };

    const countdown = setInterval(() => {
      if (timeRemaining > 0 && playable) {
        setTimeRemaining((prevTime) => prevTime - 1);
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
  }, [correctLetters, wrongLetters, playable, timeRemaining, wordIndex]);

  useEffect(() => {
    if (timeRemaining === 0) {
      setPlayable(false);
      endGame();
    }
  }, [timeRemaining]);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    setSelectedWord(wordList[language][0]);
    setWordIndex(0);
    setCorrectLetters([]);
    setWrongLetters([]);
    setScore(0);
    setGuesses(maxGuesses);
  };
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const randomIndex = Math.floor(Math.random() * wordList[selectedLanguage].length);

  const updateScore = () => {
    setScore((prevScore) => prevScore + 10);
    if (wordIndex + 1 === wordList[selectedLanguage].length) {
      endGame();
    } else {
      setWordIndex((prevIndex) => prevIndex + 1);
      setSelectedWord(wordList[selectedLanguage][wordIndex + 1]);
      setCorrectLetters([]);
      setWrongLetters([]);
      setGuesses(maxGuesses);
    }
  };

  const endGame = () => {
    setPlayable(false);
    setRoundScores((prevRoundScores) => [...prevRoundScores, score]);
    setAllScores((prevAllScores) => [...prevAllScores, score]);
    const maxScore = Math.max(...roundScores, score);
    setBestScore(maxScore);
  };

  const playAgain = () => {
    setPlayable(true);
    setTimeRemaining(gameDuration);
    setCorrectLetters([]);
    setWrongLetters([]);
    setGuesses(maxGuesses);
    setScore(0);
    setRoundScores([]);
    setWordIndex(0);
    setSelectedWord(wordList[selectedLanguage][randomIndex]);
  };

  const exitGame = () => {
    history.push('/login');
  };


  const [selectedWord, setSelectedWord] = useState(wordList[selectedLanguage][randomIndex]);
  
  console.log(selectedWord)
  const chartData = {
    labels: roundScores.map((_, index) => `Round ${index + 1}`),
    datasets: [
      {
        label: 'Score',
        data: roundScores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...allScores, bestScore) + 10,
      },
    },
  };


  useEffect(() => {
    // Check if the current score is greater than the previous best score
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);


  const renderRoundScores = () => {
    return roundScores.map((score, index) => (
      <div key={index}>Round {index + 1}: {score}</div>
    ));
  };

  return (
    <>
      <Header />

      <div className="round-scores">
        {renderRoundScores()}
      </div>
      <Notification showNotification={showNotification} />
      <div className="timer">Time Remaining: {timeRemaining}s</div>
      <div className="score">Score: {score}</div>
      <div className="score">Best Score: {bestScore}</div>
      <div className="guesses">Guesses Remaining: {guesses}</div>
      {/* <DemoLine /> */}
     
      <div className="buttons">
        {playable ? (
          <button className="btn btn-secondary" onClick={() => setPlayable(false)}>
            Pause
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => setPlayable(true)}>
            Resume
          </button>
        )}
        <button className="btn btn-primary" onClick={playAgain}>
          Play Again
        </button>
        <button className="btn btn-danger" onClick={exitGame}>
          Exit Game
        </button>
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
        
      />
    </>
  );
}

export default HomeScreen;
