import axios from 'axios';
import { useState } from 'react';
import styles from './DogForm.module.scss';
import { getUserFromToken } from '../../utils/authUtils';
import { useEffect } from 'react';


const DogForm = () => {

  const [user, setUser] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const user = getUserFromToken(token); 
    console.log('Logged-in user:', user);

    const userEmail = user.sub;

    axios.get(`http://localhost:8080/users/${userEmail}`)
      .then(response => {
        console.log('User data:', response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []);

  const [formData, setFormData] = useState({
       dog_name: '',
       breed: '',
       anecdote: '',
       image: null, 
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

    const token = localStorage.getItem('jwtToken');
    const data = new FormData();
    data.append('dog_name', formData.dog_name);
    data.append('breed', formData.breed);
    data.append('anecdote', formData.anecdote);
    data.append('image', formData.image);
    data.append('alt_text', formData.alt_text);
    
    if (user) {
      data.append('user_id', user.id); // Append the user's ID
    }


    axios
      .post('http://localhost:8080/dogs', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set proper headers for file upload
          'Authorization': `Bearer ${token}`, 
        },
      })

      .then((response) => {
        console.log('Data sent successfully!', response.data);
        setShowNotification(true);
      const newDogId = response.data.id;

      // Update the user's dogIds array with the newDogId
      if (user) {
        const updatedUser = { ...user };
        updatedUser.dogIds.push(newDogId);
        setUser(updatedUser);
      }

      // Clear the form after successful submission
      setFormData({
        dog_name: '',
        breed: '',
        anecdote: '',
        image: null,
        alt_text: '',
      });

            // Clear the file input value
        const fileInput = document.getElementById('image');
        if (fileInput) {
          fileInput.value = '';
        }

      // Update the user's data with the new dogIds array
      if (user) {
        axios.put(`http://localhost:8080/users/${user.id}/addDog/${newDogId}`, null, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('User data updated:', response.data);
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
        });
      }
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

      {showNotification && (
      <div className={styles.notification}>
        <p>Din hund har lagts till i spelet! Lägg till fler hundar eller gå tillbaka till spelet.</p>
        <button onClick={() => setShowNotification(false)}>Stäng</button>
      </div>
    )}
    </form>
)}

export default DogForm