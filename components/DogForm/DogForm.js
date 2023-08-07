import axios from 'axios';
import { useState } from 'react';
import styles from './DogForm.module.scss';

const DogForm = () => {
  const [formData, setFormData] = useState({
    dog_name: '',
    breed: '',
    anecdote: '',
    image: null, // Changed to null, will hold the selected image file
    alt_text: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // For image input, use the selected file instead of the value
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Innehållet i formData är: ', formData);

    // Send the form data to the backend API using FormData (which supports file uploads)
    const data = new FormData();
    data.append('dog_name', formData.dog_name);
    data.append('breed', formData.breed);
    data.append('anecdote', formData.anecdote);
    data.append('image', formData.image); // Append the image file to the form data
    data.append('alt_text', formData.alt_text);

    axios
      .post('http://localhost:8080/dogs', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set proper headers for file upload
        },
      })
      .then((response) => {
        console.log('Data sent successfully!', response.data);
        // Clear the form after successful submission
        setFormData({
          dog_name: '',
          breed: '',
          anecdote: '',
          image: null,
          alt_text: '',
        });
      })
      .catch((error) => {
        console.error('Error while sending data:', error);
      });
  };

  return (
    <form className={styles.dogForm} onSubmit={handleSubmit}>
      <label htmlFor="dog_name">Vad heter din hund?</label>
      <input
        type="text"
        id="dog_name"
        name="dog_name"
        value={formData.dog_name}
        onChange={handleChange}
        placeholder="Lassie"
        required
      />
      <label htmlFor="breed">Vilken ras är hunden?</label>
      <input
        type="text"
        id="breed"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        placeholder="Golden Retriever"
        required
      />
      <label htmlFor="anecdote">Berätta något kort om hunden</label>
      <textarea
        id="anecdote"
        name="anecdote"
        value={formData.anecdote}
        onChange={handleChange}
        placeholder="En gång när vi... Han/hon älskar att... "
        required
      />
      <label htmlFor="image">Ladda upp en bild av din hund</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*" 
        onChange={handleChange}
        
        //required
      />
      <label htmlFor="alt_text">Beskriv med max 7 ord vad din hund gör på bilden</label>
      <input
        type="text"
        id="alt_text"
        name="alt_text"
        value={formData.alt_text}
        onChange={handleChange}
        placeholder="En hund ligger i gräset"
        required
      />
      <button type="submit">Skicka in</button>
    </form>
)}

export default DogForm