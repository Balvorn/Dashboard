import { getUserData } from './api/userApiService'
import { useState, useEffect } from 'react';
import formatData from "./formatData";
import './App.css'
import styles from "./app.module.css"
import Nav from './components/nav/nav';
import SessionsChart from './components/sessionsChart/sessionsChart';


const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    // Fetch data when the component mounts
    const fetchData = async () => {
      const result = await getUserData(12);
      if (!ignore) {
        setData(result.data);
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
        <div className={styles.text}>
          <h1>Bonjour <span>{data && data.userInfos.firstName}</span></h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          <div className={styles.charts}>
            <SessionsChart></SessionsChart>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
