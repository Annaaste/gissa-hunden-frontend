
import { useEffect, useState } from 'react';
import axios from 'axios';

const DogImages = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    // Fetch the data of all dogs from the backend
    axios
      .get('http://localhost:8080/dogs')
      .then((response) => {
        setDogs(response.data);
        console.log(response.data); // Log the fetched data
      })
      .catch((error) => {
        console.error('Error while fetching data:', error);
      });
  }, []);

  return (
    <div>
      {dogs.map((dog) => (
        <div key={dog.id}>
        <p>{dog.dog_name}</p>
        <img
          src={`data:image/jpeg;base64,${dog.image}`} 
          alt={dog.alt_text}
          style={{ maxWidth: '400px', height: 'auto', margin: '10px' }}/>
        </div>
      ))}
    </div>
  );
};

export default DogImages;
