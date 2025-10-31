import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Inicio/home'
import Juego from './Display/juego'
import Carro from './Carrito/carro'
import Reseña from './Reseña/reseña'
import Venta from './Vender/venta'
import Buscar from './Busqueda/buscar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/juego/:id" element={<Juego />} />
        <Route path="/carrito" element={<Carro />} />
        <Route path="/reseñas" element={<Reseña />} />
        <Route path="/vender" element={<Venta />} />
        <Route path="/buscar" element={<Buscar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)