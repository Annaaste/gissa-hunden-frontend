import Link from 'next/link'
import DogForm from '../../components/DogForm/DogForm'
import styles from './add-dog.module.scss'

const AddDog = () => {


  return (
    
    <div className={styles.temporaryLayout}>
      <Link href="/">
        <button>Tillbaka till spelet</button>
      </Link>
      <p>Här kan du ladda upp en hund till tävlingen!</p>
      <DogForm />
    </div>
   
  )
}

export default AddDog