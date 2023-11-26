import styles from './Highscore.module.scss'
import { useTranslation } from 'next-i18next'


const Highscore = ({ highscores }) => {
 
  const { t } = useTranslation();

  return (
    <div className={styles.highscoreBox}>
      <h3>{t('highscoreTitle')}</h3>
      <table >
        <thead>
          <tr>
            <th>{t('rankColumn')}</th>
            <th>{t('nameColumn')}</th>
            <th>{t('scoreColumn')}</th>
          </tr>
        </thead>
        <tbody>
          {highscores.map((highscore, index) => (
            <tr key={highscore.id}>
              <td className={styles.centeredCell}>{index + 1}</td>
              <td className={styles.centeredCell}>{highscore.playerName}</td>
              <td className={styles.centeredCell}>{highscore.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Highscore;
