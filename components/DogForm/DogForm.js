import axios from 'axios'
import { useState } from 'react'
import styles from './DogForm.module.scss'


const DogForm = () => {

  const [formData, setFormData] = useState({
    dog_name: '',
    breed: '',
    anecdote: '',
    image: 'Skippa denna just nu',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Innehållet i formData är: ", formData)

    // Send the form data to the backend API using Axios
    axios.post('http://localhost:8080/dogs', formData)
      .then((response) => {
        console.log('Data sent successfully!', response.data);

      })
      .catch((error) => {
        console.error('Error while sending data:', error);
      });

       // Clear the form after successful submission
       setFormData({
        dog_name: '',
        breed: '',
        anecdote: '',
        image: //'This will later be a path to the image'
        '',
      });
}

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
        type="text"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="x"
        //required
      />
      <button type="submit">Skicka in</button>
    </form>
)}

export default DogForm