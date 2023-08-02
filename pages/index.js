import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import styles from './startpage.module.scss';
import axios from 'axios';

export default function Home({ dogsData }) {
  return (
    <Layout title="Startsida" description="Gissa vilken hundras">
      {dogsData?.map((dog) => (
        <div className={styles.guessTheBreedContainer} key={dog.id}>
          <p className={styles.dogName}>{dog.dog_name}</p>
          {/* test */}
          {/* <Image
            src={dog.image}
            width="200"
            height="200"
            alt={dog.alt_text}
          /> */}
          <p className={styles.anecdote}>{dog.anecdote}</p>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:8080/dogs');
    const dogsData = response.data;
    return {
      props: {
        dogsData,
      },
    };
  } catch (error) {
    console.error('Error while fetching dogs:', error);
    return {
      props: {
        dogsData: [],
      },
    };
  }
}
