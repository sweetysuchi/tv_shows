import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowSummary from './components/ShowSummary';
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/show" element={<ShowList />} />
        <Route exact path="/show/:showId" element={<ShowSummary />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;