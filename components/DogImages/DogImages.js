import { useState } from 'react';

const DogImages = ({ dogs }) => {
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [correctGuessCount, setCorrectGuessCount] = useState(0);

  const handleNextDog = () => {
    setUserGuess('');
    setShowResult(false);
    setCurrentDogIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmitGuess = () => {
    const currentDog = dogs[currentDogIndex];
    if (userGuess.toLowerCase() === currentDog.breed.toLowerCase()) {
      setShowResult(true);
      setCorrectGuessCount((prevCount) => prevCount + 1);
    }
    handleNextDog(); // Move to the next dog regardless of guess result
  };

  if (currentDogIndex >= dogs.length) {
    return (
      <div>
        <p>Bra gjort! Här är ditt resultat!</p>
        <p>Antal rätt: {correctGuessCount} out of {currentDogIndex}</p>
        <button onClick={() => { setCurrentDogIndex(0); setCorrectGuessCount(0); }}>Spela igen!</button>
      </div>
    );
  }

  const currentDog = dogs[currentDogIndex];

  return (
    <div>
      <h2>Gissa Hunden!</h2>
      <div style={{ width: '400px', height: '400px', overflow: 'hidden', margin: '10px' }}>
        <img
          src={`data:image/jpeg;base64,${currentDog.image}`}
          alt={currentDog.alt_text}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Skriv in hundras här!"
      />
      <button onClick={handleSubmitGuess}>Nästa</button>
      
      
    </div>
  );
};

export default DogImages;

// import { useState } from 'react';

// const DogImages = ({ dogs }) => {
//   const [currentDogIndex, setCurrentDogIndex] = useState(0);
//   const [userGuess, setUserGuess] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const [correctGuessCount, setCorrectGuessCount] = useState(0);

//   const handleNextDog = () => {
//     setUserGuess('');
//     setShowResult(false);
//     setCurrentDogIndex((prevIndex) => prevIndex + 1);
//   };

//   const handleSubmitGuess = () => {
//     const currentDog = dogs[currentDogIndex];
//     if (userGuess.toLowerCase() === currentDog.breed.toLowerCase()) {
//       setShowResult(true);
//       setCorrectGuessCount((prevCount) => prevCount + 1);
//     }
//   };

//   const totalDogsSeen = currentDogIndex;

//   if (currentDogIndex >= dogs.length) {
//     return (
//       <div>
//         <p>You've seen all the dogs!</p>
//         <p>Number of correct guesses: {correctGuessCount} out of {totalDogsSeen}</p>
//         <button onClick={() => { setCurrentDogIndex(0); setCorrectGuessCount(0); }}>Play Again</button>
//       </div>
//     );
//   }

//   const currentDog = dogs[currentDogIndex];

//   return (
//     <div>
//       <h2>Guess the Breed!</h2>
//       <img
//         src={`data:image/jpeg;base64,${currentDog.image}`}
//         alt={currentDog.alt_text}
//         style={{ maxWidth: '400px', height: 'auto', margin: '10px' }}
//       />
//       <input
//         type="text"
//         value={userGuess}
//         onChange={(e) => setUserGuess(e.target.value)}
//         placeholder="Enter your guess"
//       />
//       <button onClick={handleSubmitGuess}>Submit Guess</button>
//       {showResult && <p>Correct! The breed is {currentDog.breed}.</p>}
//       <button onClick={handleNextDog}>Next Dog</button>
//     </div>
//   );
// };

// export default DogImages;
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const DogImages = () => {
//   const [dogs, setDogs] = useState([]);

//   useEffect(() => {
//     // Fetch the data of all dogs from the backend
//     axios
//       .get('http://localhost:8080/dogs')
//       .then((response) => {
//         setDogs(response.data);
//         console.log(response.data); // Log the fetched data
//       })
//       .catch((error) => {
//         console.error('Error while fetching data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       {dogs.map((dog) => (
//         <div key={dog.id}>
//         <p>{dog.dog_name}</p>
//         <img
//           src={`data:image/jpeg;base64,${dog.image}`} 
//           alt={dog.alt_text}
//           style={{ maxWidth: '400px', height: 'auto', margin: '10px' }}/>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DogImages;
