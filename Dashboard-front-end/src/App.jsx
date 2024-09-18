import { getUserData } from './api/userApiService'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css'
import styles from "./app.module.css"
import Nav from './components/nav/nav';
import SessionsChart from './components/sessionsChart/sessionsChart';

const App = () => {
  const [data, setData] = useState(null);
  let { userId } = useParams();
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false;

    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const result = await getUserData(userId);
        if (!ignore) {
          setData(result.data);
        }
      } catch (e) {
        setError(e.message)
      }
    }

    fetchData();

    //clean up first fetch in dev env
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Nav></Nav>

      <main>
        {error ?
          <div className="error">
            Erreur lors du chargement des données : {error}
          </div>
          :
          <div className={styles.text}>
            <h1>Bonjour <span>{data && data.userInfos.firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            <div className={styles.charts}>
              <SessionsChart id={userId}></SessionsChart>
            </div>
          </div>
        }

      </main>
    </>
  )
}

export default App
