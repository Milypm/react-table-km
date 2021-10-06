import React, { useState, useEffect } from 'react';
import Table from './Table';
import './main.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/data')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setData(`Error: ${error.message}`));
  }, []);
  const loadingError = () => {
    let s;
    if (typeof data === 'string') {
      s = <h2 className="message">{data}</h2>
    } else {
      s = <h2 className="message">Loading...</h2>
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
