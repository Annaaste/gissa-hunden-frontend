import { useState } from 'react';
import styles from './DogImages.module.scss';

const DogImages = ({ dogs }) => {
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [correctGuessCount, setCorrectGuessCount] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);


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
      <div>
        <p>Bra gjort! Här är ditt resultat!</p>
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
              style={{ maxWidth: '40rem', maxHeight: '40rem',height: 'auto', margin: '1rem' }}
            />
          
          </div>
        ))}
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
