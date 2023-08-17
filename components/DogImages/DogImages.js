import { useState, useEffect } from 'react';
import styles from './DogImages.module.scss';
import Highscore from '../Highscore/Highscore';
import axios from 'axios';

const DogImages = ({ dogs }) => {
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [correctGuessCount, setCorrectGuessCount] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [playerName, setPlayerName] = useState(''); 
  const [highscores, setHighscores] = useState([]);

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


  const handleNextDog = () => {
    setUserGuess('');
    setCurrentDogIndex((prevIndex) => prevIndex + 1);
  };

  // const handleSaveHighscore = async () => {
  //   try {
  //     const intCorrectGuessCount = parseInt(correctGuessCount);

  //     if (playerName.trim() === '') {
  //       console.log('Please enter a player name.');
  //       return;
  //     }

  //     const response = await axios.post('http://localhost:8080/highscores', {
  //       playerName: playerName,
  //       score: intCorrectGuessCount
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
      
  //     console.log('Highscore saved successfully:', response.data);
  //     fetchHighscores();
  //   } catch (error) {
  //     console.error('Error while saving highscore:', error);
  //   }

    
  
  //   try {
  //     await axios.post('http://localhost:8080/save', {
  //       playerName: playerName,
  //       score: correctGuessCount,
  //     });
  //     // Refresh the highscores after saving
  //     fetchHighscores();
  //   } catch (error) {
  //     console.error('Error while saving highscore:', error);
  //   }
  // };


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
        <div className={styles.resultSection}>
          <h2>Bra gjort! Här är ditt resultat</h2>
          <p>Antal rätt: {correctGuessCount} av {currentDogIndex}</p>
          <button className={styles.playAgain} onClick={() => { setCurrentDogIndex(0); setCorrectGuessCount(0); setIncorrectGuesses([]); }}>Spela igen!</button>
          <div className={styles.incorrectGuesses}>
            {incorrectGuesses.map((guess, index) => (
              <div key={index}>
                <h3>Felaktiga gissningar:</h3>
                <p>Du gissade: {guess.userGuess}</p>
                <p>Rätt svar: {guess.correctAnswer}</p>
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
          <h3>Här kan du skicka in ditt resultat</h3>
          <input
            type="text"
            placeholder="Skriv in spelnamn"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={handleSaveHighscore}>Skicka in</button>
          <Highscore highscores={highscores}/>
        </div>
        
      </div>
    );
  }
  
  const currentDog = dogs[currentDogIndex];

  return (
    <div>
      <h1>Gissa Hunden!</h1>
      <div className={styles.flexContainer}>
        <h2 className={styles.dogName}>{`${currentDog.dog_name}`}</h2>
        <p>{currentDogIndex + 1} / {dogs.length}</p>
      </div>
      <div className={styles.guessTheBreedContainer} >
        <img
          src={`data:image/jpeg;base64,${currentDog.image}`}
          alt={currentDog.alt_text}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Skriv in hundras här!"
          className={styles.inputField}
        />
        <button onClick={handleSubmitGuess} className={styles.nextButton}>
          Nästa bild</button>
      
      </div>
    </div>
  );
};

export default DogImages;
