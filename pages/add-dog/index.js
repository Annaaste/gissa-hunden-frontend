import Link from 'next/link'
import DogForm from '../../components/DogForm/DogForm'
import styles from './add-dog.module.scss'
import Layout from '../../components/Layout/Layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const AddDog = () => {

  const { t } = useTranslation()


  return (
    <Layout>
    <div className={styles.temporaryLayout}>
      <Link href="/">
        <button>{t('playGame')}</button>
      </Link>
      <DogForm />
    </div>
    </Layout>
  )
}
export async function getServerSideProps(context) {
     const { locale } = context;
     const translations = await serverSideTranslations(locale, ['common']);
  
     return {
       props: {
         ...translations,
       },
     };
   }


export default AddDog