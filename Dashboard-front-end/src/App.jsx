import { useState, useEffect } from 'react';
import formatData from "./formatData";
import './App.css'
import { getUserData } from './api/userApiService'
import Nav from './components/nav/nav';
const App = () => {
  const [data, setData] = useState(null);

  // Fetch data when the component mounts
  async function fetchData() {
    try {
      const result = await getUserData(12);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // useEffect block
  useEffect(() => {
    fetchData();
  }, []);
  formatData(data)
  return (
    <>
      <Nav></Nav>
    </>
  )
}

export default App
