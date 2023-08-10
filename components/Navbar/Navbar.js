import Link from 'next/link'
import styles from './Navbar.module.scss'
import LogoutButton from '../LogOutButton/LogOutButton'


const Navbar = () => {

  return (
    <div className={styles.navbarContainer}>
      <LogoutButton />
      <Link href='/login' className={styles.loginButton}>Logga in / Skapa konto</Link>
    </div>
  )
}
  

export default Navbar