import { useState, useEffect } from 'react';
import styles from './DogImages.module.scss';
import Highscore from '../Highscore/Highscore';
import axios from 'axios';
import { useTranslation } from 'next-i18next'
import Confetti from 'react-confetti';
import {AiOutlineArrowUp} from 'react-icons/ai'


const DogImages = ({ dogs }) => {

  const { t } = useTranslation();

  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [correctGuessCount, setCorrectGuessCount] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [playerName, setPlayerName] = useState(''); 
  const [highscores, setHighscores] = useState([]);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    // Add a scroll event listener to track scrolling
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const fetchHighscores = async () => {
    try {
      const response = await axios.get('http://localhost:8080/highscores/top');
      setHighscores(response.data);
    } catch (error) {
      console.error('Error while fetching highscores:', error);
    }
  };


  useEffect(() => {
    fetchHighscores();
  }, []);

  const handleSaveHighscore = async () => {
    try {
      const intCorrectGuessCount = parseInt(correctGuessCount);

      if (playerName.trim() === '') {
        console.log('Please enter a player name.');
        return;
      }

      const response = await axios.post('http://localhost:8080/highscores', {
        playerName: playerName,
        score: intCorrectGuessCount
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Highscore saved successfully:', response.data);
      setPlayerName('');
      fetchHighscores();
    } catch (error) {
      console.error('Error while saving highscore:', error);
    }
  };

  useEffect(() => {
    if (correctGuessCount === dogs.length && incorrectGuesses.length === 0) {
      setIsGameCompleted(true);
    }
  }, [correctGuessCount, incorrectGuesses, dogs]);

  const handleNextDog = () => {
    setUserGuess('');
    setCurrentDogIndex((prevIndex) => prevIndex + 1);
  };


  const handleSubmitGuess = () => {
    const currentDog = dogs[currentDogIndex];
    if (userGuess.toLowerCase() === currentDog.breed.toLowerCase()) {
      setCorrectGuessCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectGuesses((prevGuesses) => [
        ...prevGuesses,
        {
          dog: currentDog,
          userGuess: userGuess,
          correctAnswer: currentDog.breed,
        },
      ]);
    }
    handleNextDog();
  };

   if (currentDogIndex >= dogs.length) {


    return (
      <div className={styles.resultContainer}>
        {isGameCompleted && (
        <Confetti 
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
        <div className={styles.resultSection}>
          <h2>{t('resultsPage.title')}</h2>
          <p>{t('resultsPage.correctGuess', {
            correctGuessCount,
            currentDogIndex,
          })}</p>
          <button className={styles.playAgain} onClick={() => { setCurrentDogIndex(0); setCorrectGuessCount(0); setIncorrectGuesses([]); }}>{t('resultsPage.playAgain')}</button>
          <div className={styles.incorrectGuesses}>
            {incorrectGuesses.map((guess, index) => (
              <div key={index}>
                <h3>{t('resultsPage.incorrectGuesses.title')}</h3>
                <p>{t('resultsPage.incorrectGuesses.userGuess', { userGuess: guess.userGuess })}</p>
                <p>{t('resultsPage.incorrectGuesses.correctAnswer', { correctAnswer: guess.correctAnswer })}</p>
                <img
                  src={`data:image/jpeg;base64,${guess.dog.image}`}
                  alt={guess.dog.alt_text}
                  style={{ maxWidth: '40rem', maxHeight: '40rem', height: 'auto', margin: '1rem' }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.inputSection}>
          <h3>{t('resultsPage.sendResult.title')}</h3>
          <input
            type="text"
            placeholder={t('resultsPage.sendResult.placeholder')}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={handleSaveHighscore}>{t('submit')}</button>
          <Highscore highscores={highscores}/>
        </div>
        {showBackToTop && (
          <button className={styles.backToTop} onClick={scrollToTop}>
            <AiOutlineArrowUp />
          </button>
        )}
      </div>
    );
  }
  
  const currentDog = dogs[currentDogIndex];

  return (
    <div>
      <h1>{t('title')}</h1>
      <div className={styles.flexContainer}>
        <h2 className={styles.dogName}>{`${currentDog.dog_name}`}</h2>
        <p>{currentDogIndex + 1} / {dogs.length}</p>
      </div>
      <div className={styles.guessTheBreedContainer} >
        <img
          src={`data:image/jpeg;base64,${currentDog.image}`}
          alt={currentDog.alt_text}
          className={styles.responsiveImage}
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder={t('guessPlaceholder')}
          className={styles.inputField}
        />
        <button onClick={handleSubmitGuess} className={styles.nextButton}>
        {t('next')}</button>
      
      </div>
    </div>
  );
};

export default DogImages;
