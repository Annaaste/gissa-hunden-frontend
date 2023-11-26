import Link from 'next/link'
import styles from './Navbar.module.scss'
import { useEffect, useState } from 'react';
import {IoMdImages} from 'react-icons/io';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'



const Navbar = () => {

  const { t } = useTranslation();


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginNotification, setShowLoginNotification] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleAddDogClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); 
      setShowLoginNotification(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    router.push('/');
  };

  const switchLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className={styles.navbarContainer}>
       <Link href='/add-dog' className={styles.addDogLink} onClick={handleAddDogClick}>
       <IoMdImages /> {t('addDogLinkTitle')}
      </Link>
      {showLoginNotification && (
        <p className={styles.loginNotification}>{t('loginNotificationText')}</p>
      )}
      {isAuthenticated ? (
        <button className={styles.loginButton} onClick={handleLogout}>{t('logoutButtonText')}</button>
      ) : (
        <Link href='/login' className={styles.loginButton}>{t('loginLinkText')}</Link>
      )}
      <div className={styles.flagsContainer}>
        <img
          src="/assets/images/640px-Flag_of_Sweden.svg.png"
          alt="Swedish Flag"
          className={styles.flag}
          onClick={() => switchLanguage('sv')}
        />

        <img
          src="/assets/images/640px-Flag_of_The_United_Kingdom.svg.png"
          alt="United Kingdom Flag"
          className={styles.flag}
          onClick={() => switchLanguage('en')}
        />
      </div>
    </div>
  )
}
  

export default Navbar