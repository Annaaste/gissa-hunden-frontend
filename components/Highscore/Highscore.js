import styles from './Highscore.module.scss'

const Highscore = ({ highscores }) => {
 

  return (
    <div className={styles.highscoreBox}>
      <h3>Top 5 på Gissa Hunden</h3>
      <table >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Namn</th>
            <th>Poäng</th>
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
