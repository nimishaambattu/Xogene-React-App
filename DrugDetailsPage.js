// src/DrugDetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DrugDetailsPage = () => {
  const [drug, setDrug] = useState({});
  const [ndcs, setNDCs] = useState([]);
  const { drugName } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/drugs?name=${drugName}`)
      .then(response => {
        setDrug(response.data[0]);
      })
      .catch(error => {
        console.error(error);
      });
  }, [drugName]);

  useEffect(() => {
    axios.get(`http://localhost:3001/ndcs/${drug.rxcui}`)
      .then(response => {
        setNDCs(response.data.ndcs);
      })
      .catch(error => {
        console.error(error);
      });
  }, [drug]);

  return (
    <div>
      <h1>Drug Details</h1>
      <p>RxCUI: {drug.rxcui}</p>
      <p>Name: {drug.name}</p>
      <p>Synonym: {drug.synonym}</p>
      <p>NDCs: {ndcs.join(', ')}</p>
    </div>
  );
};

export default DrugDetailsPage;