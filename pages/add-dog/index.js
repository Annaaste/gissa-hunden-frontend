import Link from 'next/link'
import DogForm from '../../components/DogForm/DogForm'
import styles from './add-dog.module.scss'
import Layout from '../../components/Layout/Layout'

const AddDog = () => {


  return (
    <Layout>
    <div className={styles.temporaryLayout}>
      <Link href="/">
        <button>Tillbaka till spelet</button>
      </Link>
      <DogForm />
    </div>
    </Layout>
  )
}

export default AddDog