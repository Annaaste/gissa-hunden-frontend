import { useState } from 'react';
import axios from 'axios';
import styles from './login.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('jwtToken', token); 

      setSuccess(true);
      router.push('/add-dog');
    } catch (error) {
      
      setError('Felaktig inloggning, försök igen.');
      setEmail('');
      setPassword('');
    }
  };

  return (
  <>
  <div>
    <h1>Gissa Hunden</h1>
  </div>
    <div className={styles.loginContainer}>
      <h2>Inloggning</h2>
      {error && <div className={styles.error}>{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <button onClick={handleLogin}>
        Logga in
      </button>

      <div className={styles.signupLink}>
        <p>Ny på Gissa Hunden?</p>
        <Link href='/signup'>Skapa konto här!</Link>
      </div>
    </div>
    </>
  );
}
