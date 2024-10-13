// src/SearchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/drugs')
      .then(response => {
        setDrugs(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:3001/drugs?name=${searchTerm}`)
      .then(response => {
        if (response.data.length > 0) {
          setDrugs(response.data);
        } else {
          axios.get(`http://localhost:3001/spellingsuggestions?term=${searchTerm}`)
            .then(response => {
              if (response.data.length > 0) {
                setDrugs(response.data);
              } else {
                setError('No results found');
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Search for Drugs</h1>
      <form onSubmit={handleSubmit}>
        <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search for a drug" />
        <button type="submit">Search</button>
      </form>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {drugs.map(drug => (
            <li key={drug.rxcui}>
              <a href={`/drugs/${drug.name}`}>{drug.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;