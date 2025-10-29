import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Inicio/home.jsx'
import Display from './Display/juego.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/juego/:id" element={<Display />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
