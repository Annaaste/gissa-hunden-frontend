
// const DogImages = ({ dogs }) => {
//   const convertArrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = [].slice.call(new Uint8Array(buffer));
//     bytes.forEach((b) => (binary += String.fromCharCode(b)));
//     return btoa(binary);
//   };

//   return (
//     <div>
//       {dogs.map((dog) => (
//         <img
//           key={dog.id}
//           src={`data:image/jpeg;base64,${convertArrayBufferToBase64(dog.image.data)}`}
//           alt={dog.alt_text}
//           style={{ width: '200px', height: 'auto', margin: '10px' }}
//         />
//       ))}
//     </div>
//   );
// };

// export default DogImages;

// import React, { useEffect, useState } from 'react';
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

//   const convertArrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = [].slice.call(new Uint8Array(buffer));
//     bytes.forEach((b) => (binary += String.fromCharCode(b)));
//     return btoa(binary);
//   };


//   return (
//     <div>
//       {dogs.map((dog) => (
//         <img
//           key={dog.id}
//           src={`data:image/jpeg;base64,${convertArrayBufferToBase64(dog.image.data)}`}
//           alt={dog.alt_text}
//           style={{ width: '200px', height: 'auto', margin: '10px' }}
//         />
//       ))}
//     </div>
//   );
// };

// export default DogImages;
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
          src={`data:image/jpeg;base64,${dog.image}`} // Use base64 data as src
          alt={dog.alt_text}
          style={{ maxWidth: '400px', height: 'auto', margin: '10px' }}        />
        </div>
      ))}
    </div>
  );
};

export default DogImages;
