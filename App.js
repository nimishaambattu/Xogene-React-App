// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import DrugDetailsPage from './DrugDetailsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/drugs/search" element={<SearchPage />} />
        <Route path="/drugs/:drugName" element={<DrugDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;