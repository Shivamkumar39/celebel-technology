import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import From from './From';
import Success from './Success';
import './index.css';


function App() {

  return (
    <Routes>
      <Route path="/" element={<From/>} />
      <Route path="/success" element={<Success/>} />
    </Routes>
  )
}

export default App
