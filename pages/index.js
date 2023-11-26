import Layout from '../components/Layout/Layout';
import DogImages from '../components/DogImages/DogImages';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function Home({dogs}) {

  
  return (
    <Layout title="Startsida" description="Gissa vilken hundras">
       <DogImages dogs={dogs} /> 
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { locale } = context;
  const translations = await serverSideTranslations(locale, ['common']);
  let dogs = [];

  try {
    const response = await axios.get('http://localhost:8080/dogs');
    dogs = response.data;
  } catch (error) {
    console.error('Error while fetching dog data:', error);
  }

  return {
    props: {
      ...translations,
      dogs,
    },
  };
}

// export async function getServerSideProps(context) {
//   const { locale } = context;
//   const translations = await serverSideTranslations(locale, ['common']);

//   return {
//     props: {
//       translations,
//     },
//   };
// }

// export async function getStaticProps(context) {
//   // extract the locale identifier from the URL
//   const { locale } = context

//   return {
//     props: {
//       // pass the translation props to the page component
//       ...(await serverSideTranslations(locale)),
//     },
//   }
// }
// export async function getServerSideProps() {
//   try {
//     const response = await axios.get('http://localhost:8080/dogs');
//     const dogs = response.data;
    
//     return {
//       props: { 
//         dogs },
//     };
//   } catch (error) {
//     console.error('Error while fetching data:', error);
//     return {
//       props: { dogs: [] },
//     };
//   }
// }
