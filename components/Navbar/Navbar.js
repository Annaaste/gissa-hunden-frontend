import Link from 'next/link'
import styles from './Navbar.module.scss'
import { useEffect, useState } from 'react';


const Navbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginNotification, setShowLoginNotification] = useState(false);

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
    alert('Du är nu utloggad!');
  };

  return (
    <div className={styles.navbarContainer}>
       <Link href='/add-dog' className={styles.addDogLink} onClick={handleAddDogClick}>
        Lägg till hund
      </Link>
      {showLoginNotification && (
        <p className={styles.loginNotification}>Du måste logga in för att kunna lägga till en hund!</p>
      )}
      {isAuthenticated ? (
        <button className={styles.loginButton} onClick={handleLogout}>Logga ut</button>
      ) : (
        <Link href='/login' className={styles.loginButton}>Logga in / Skapa konto</Link>
      )}
    </div>
  )
}
  

export default Navbar