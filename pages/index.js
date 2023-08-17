import Layout from '../components/Layout/Layout';
import DogImages from '../components/DogImages/DogImages';
import axios from 'axios';


export default function Home({ dogs }) {
  console.log('Dogs:', dogs);

  return (
    <Layout title="Startsida" description="Gissa vilken hundras">
      <DogImages dogs={dogs} />
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:8080/dogs');
    const dogs = response.data;
    return {
      props: { dogs },
    };
  } catch (error) {
    console.error('Error while fetching data:', error);
    return {
      props: { dogs: [] },
    };
  }
}
