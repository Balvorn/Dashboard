import { getUserData } from './api/userApiService'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css'
import styles from "./app.module.css"
import Nav from './components/nav/nav';
import SessionsChart from './components/sessionsChart/sessionsChart';
import NutrientsInfo from './components/nutrientsInfo/nutrientsInfo';
import LengthChart from './components/lenghtChart/lenghtChart';
import { formatNutrients } from './formatData';
import calories from './assets/calories.svg'
import glucides from './assets/glucides.svg'
import lipides from './assets/lipides.svg'
import proteines from './assets/proteines.svg'
import RadarInfo from './components/radarInfo/radarInfo';

const icons = [
  { url: calories, color: "#FF00001A" },
  { url: proteines, color: "#4AB8FF1A" },
  { url: glucides, color: "#FDCC0C1A" },
  { url: lipides, color: "#FD51811A" }
]



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
          let data = result.data
          data.keyData = formatNutrients(data.keyData)
          setData(data);
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
          : data &&
          <div className={styles.text}>
            <h1>Bonjour <span>{data.userInfos.firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            <div className={styles.charts}>

              <div className={styles.sessions + ' sessions'}>
                <SessionsChart id={userId}></SessionsChart>
              </div>
              <ul className={styles.nutrients}>
                {Object.entries(data.keyData).map((data, i) => {
                  return <NutrientsInfo key={data} data={data} url={icons[i].url} color={icons[i].color}></NutrientsInfo>
                })}
              </ul>
              <div className={styles.length}>
                <LengthChart id={userId}></LengthChart>
              </div>
              <div className={styles.performance}><RadarInfo id = {userId}/></div>
              <div className={styles.score}><RadarInfo id = {userId}/></div>
            </div>
          </div>
        }

      </main>
    </>
  )
}

export default App
