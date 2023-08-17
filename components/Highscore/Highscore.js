import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Highscore.module.scss'

const Highscore = ({ highscores }) => {
  // const [highscores, setHighscores] = useState([]);

  // useEffect(() => {
  //   fetchHighscores();
  // }, []);

  // const fetchHighscores = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/highscores/top');
  //     setHighscores(response.data);
  //   } catch (error) {
  //     console.error('Error while fetching highscores:', error);
  //   }
  // };

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
