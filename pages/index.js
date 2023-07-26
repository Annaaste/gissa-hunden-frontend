import Image from 'next/image'
import DOGS from '../constants/dogs.js'
import Layout from '../components/Layout/Layout'
import styles from './startpage.module.scss'

export default function Home() {

  const databaseDogImage = '/../public/assets/images/dog.jpg'

  return (
    <Layout
      title="Startsida"
      description="Gissa vilken hundras"
    >
      {DOGS?.map(dog => (
      <div className={styles.guessTheBreedContainer} key={dog.id} >
        <p className={styles.dogName}>{dog.name}</p>
        <Image 
          src={dog.image}
          //src={databaseDogImage}
          className={styles.dogImage} 
          width="200" 
          height="200" 
          alt={dog.altText}
        />
        <p className={styles.anecdote}>{dog.anecdote}</p>
      </div>
      ))}
    </Layout>
  )
}
