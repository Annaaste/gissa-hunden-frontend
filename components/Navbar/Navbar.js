import Link from 'next/link'
import styles from './Navbar.module.scss'


const Navbar = () => {

  return (
    <div className={styles.navbarContainer}>
      <Link href='/login' className={styles.loginButton}>Logga in / Skapa konto</Link>
    </div>
  )
}
  

export default Navbar