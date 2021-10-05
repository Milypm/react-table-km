import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const Table = (props) => {
  const { fetched } = props;
  const [data, setData] = useState(fetched);
  console.log('data Table', data);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  // const getData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/data', { mode: 'cors' });
  //     console.log('1');
  //     const d = await response.json();
  //     setData(d);
  //     return d;
  //   } catch (error) {
  //     return error.message;
  //   }
  // };
  // useEffect(() => {
  //   if (data.length === 0) {
  //     getData();
  //   }
  // }, []);
  const doSort = () => {
    let sort;
    if (sortBy !== '') {
      sort = [...data].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sort;
  };
  useMemo(() => {
    if (sortBy !== '') {
      setData(doSort());
    }
  }, [sortBy]);
  const sortingFunc = (column, order) => {
    setSortBy(column);
    if (order === '') {
      setSortOrder('asc');
    } else if (order === 'asc') {
      setSortOrder('desc');
    } else if (order === 'desc') {
      setSortOrder('asc');
    }
  };
  // const button = (<button type="button" onClick={sortingFunc}>Sort</button>);
  return (
    <table>
      <thead>
        <tr>
          <th>
            Name
            <button type="button" onClick={() => sortingFunc('name', sortOrder)}>{sortOrder === '' ? 'Sort' : sortOrder.toUpperCase()}</button>
          </th>
          <th>
            Address
            <button type="button" onClick={() => sortingFunc('address', sortOrder)}>{sortOrder === '' ? 'Sort' : sortOrder.toUpperCase()}</button>
          </th>
          <th>
            City
            <button type="button" onClick={() => sortingFunc('city', sortOrder)}>{sortOrder === '' ? 'Sort' : sortOrder.toUpperCase()}</button>
          </th>
          <th>
            Region
            <button type="button" onClick={() => sortingFunc('region', sortOrder)}>{sortOrder === '' ? 'Sort' : sortOrder.toUpperCase()}</button>
          </th>
          <th>
            Country
            <button type="button" onClick={() => sortingFunc('country', sortOrder)}>{sortOrder === '' ? 'Sort' : sortOrder.toUpperCase()}</button>
          </th>
          <th>
            Birthday
            <button type="button" onClick={() => sortingFunc('birthday', sortOrder)}>{sortOrder === '' ? 'Sort' : sortOrder.toUpperCase()}</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((obj) => (
            <tr key={obj.name}>
              <td>{obj.name}</td>
              <td>{obj.address}</td>
              <td>{obj.city}</td>
              <td>{obj.region}</td>
              <td>{obj.country}</td>
              <td>{obj.birthday}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
Table.propTypes = {
  fetched: PropTypes.arrayOf(PropTypes.shape(PropTypes.objectOf())).isRequired,
};
export default Table;
