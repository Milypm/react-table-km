import React, { useState, useEffect } from 'react';
import Table from './Table';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  // const getData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/data', { mode: 'cors' });
  //     console.log('1');
  //     const d = await response.json();
  //     return d;
  //   } catch (error) {
  //     return error.message;
  //   }
  // };
  useEffect(() => {
    fetch('http://localhost:3001/data')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setData(`Error: ${error.message}`));
    // if (data.length === 0) {
    //   setData(getData());
    // }
  }, []);
  console.log('data App', data);
  const loadingError = () => {
    let s;
    if (typeof data === 'string') {
      s = <h1>Error...</h1>
    } else {
      s = <h1>Loading...</h1>
    }
    return s;
  };
  return (
    <div className="app">
      {
        data.length === 0 || data.includes('Error')
        ? loadingError()
        : <Table fetched={data}/>
      }
    </div>
  )
};
export default App;