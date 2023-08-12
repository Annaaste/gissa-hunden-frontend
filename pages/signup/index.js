import { useState } from 'react';
import axios from 'axios';
import styles from '../login/login.module.scss';
import { useRouter } from 'next/router';


export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();


  const handleSignup = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('/api/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      setSuccess(true);
      
      router.push('/login')
    } catch (error) {
      setError('Felaktig inloggning, försök igen.');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <>
    <div>
    <h1>Gissa Hunden</h1>
    </div>
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle} >Skapa konto</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstName} 
          className={styles.loginInput}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastName} 
          className={styles.loginInput}
          onChange={(e) => setLastName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          className={styles.loginInput}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          className={styles.loginInput}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className={styles.loginButton} type="submit">Skapa konto</button>
      </form>
    </div>
    </>
  );
}

