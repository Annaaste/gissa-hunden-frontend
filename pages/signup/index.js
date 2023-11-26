import { useState } from 'react';
import axios from 'axios';
import styles from '../login/login.module.scss';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'


export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const { t } = useTranslation();


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
    <h1>{t('title')}</h1>
    </div>
    <div className={styles.loginContainer}>
      <h2>{t('createAccount')}</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSignup}>
        <div >
        <input 
          type="text" 
          placeholder={t("nameColumn")} 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder={t("lastName")}
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
          placeholder={t("password")} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        </div>
        <button type="submit">{t('createAccount')}</button>
      </form>
    </div>
    </>
  );
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

