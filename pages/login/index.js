import { useState } from 'react';
import axios from 'axios';
import styles from './login.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();


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
    <h1>{t('title')}</h1>
  </div>
    <div className={styles.loginContainer}>
      <h2>{t('loginTitle')}</h2>
      {error && <div className={styles.error}>{error}</div>}
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
      <button onClick={handleLogin}>
        {t('login')}
      </button>

      <div className={styles.signupLink}>
        <p>{t('newUser')}</p>
        <Link href='/signup'>{t('createAccountLinkText')}</Link>
      </div>
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