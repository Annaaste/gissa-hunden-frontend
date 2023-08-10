import DogForm from '../../components/DogForm/DogForm'
import styles from './add-dog.module.scss'

const AddDog = () => {


  return (
    
    <div className={styles.temporaryLayout}>
      <button>Till startsidan</button>
      <p>Här kan du ladda upp en hund till tävlingen!</p>
      <DogForm />
    </div>
   
  )
}

export default AddDog