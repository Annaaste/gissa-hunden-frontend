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
      <h2  >Skapa konto</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSignup}>
        <div >
        <input 
          type="text" 
          placeholder="Namn" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Efternamn" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
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
        </div>
        <button type="submit">Skapa konto</button>
      </form>
    </div>
    </>
  );
}

