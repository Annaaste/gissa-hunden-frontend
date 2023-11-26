import Head from 'next/head'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from './Layout.module.scss'
import { useTranslation } from 'next-i18next'


const Layout = ({ children, description, title }) => {

  const { t } = useTranslation();

  return ( 
    <>
      <Head>
        <meta charSet="UTF-8" />
        {title ? (
          <>
            <title>{`${title} | Gissa Hunden`}</title>
            <meta 
              name="description"
              content={description}
            />
          </>
          ) : (
          <>
            <title>{t('title')}</title>
            <meta 
              name="description"
              content="Ladda upp en bild på din egen hund eller gissa bland andras! Hur många raser klarar du?"
            />
          </>
        )}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <meta name="theme-color" content="#54B4D3" />
      </Head>
      <div className={styles.surroundingContainer}>
        <Navbar />
          <main className={styles.surroundAllPages}>
            {children}
          </main>
        <Footer />
      </div>
    </>
   );
}

export default Layout;