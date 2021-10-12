import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './main.css';

const Table = (props) => {
  const { fetched, keysNames } = props;
  const [data, setData] = useState(fetched);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const doSort = () => {
    const sort = [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === 'ascending' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortOrder === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sort;
  };
  useMemo(() => {
    if (sortBy !== '') {
      setData(doSort());
    }
  }, [sortBy, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps
  const sortingFunc = (column, order) => {
    if (order === '') {
      setSortOrder('ascending');
    } else if (order === 'ascending') {
      setSortOrder('descending');
    } else if (order === 'descending') {
      setSortOrder('ascending');
    }
    setSortBy(column);
  };
  const btn = (val) => {
    return (
      <button type="button" className="sort-btn" onClick={() => sortingFunc(val, sortOrder)}>
        {sortOrder === '' ? 'Sort' : sortOrder.toUpperCase()}
      </button>
    )
  };
  const extraCol = (val) => {
    const today = new Date();
    const year = today.getFullYear();
    const age = year - parseInt(val.slice(0, 4));
    return age;
  };
  let prev;
  return (
    <table className="table">
      <thead>
        <tr className="table-headers">
          {
            keysNames.map((name) => (
              name !== 'age'
                ? 
                  (
                    <th key={name}>
                      {name}
                      {btn(name)}
                    </th>
                  )
                : <th key={name}>{name}</th>
            ))
          }
        </tr>
      </thead>
      <tbody className="table-body">
        {
          data.map((obj) => (            
            <tr key={obj.name} className="table-datarows">
              {
                keysNames.map((name) => {
                  const rend = name === 'age' ? <td>{extraCol(prev)}</td> : <td>{obj[name]}</td>
                  prev = obj[name];
                  return rend;
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
Table.propTypes = {
  fetched: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
export default Table;
