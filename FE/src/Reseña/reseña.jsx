import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './reseña.css'
import { FaStar } from 'react-icons/fa'
import logo from '../assets/logo.png'

function Reseña() {
  const navigate = useNavigate()
  const [calificacion, setCalificacion] = useState(null)
  const [hover, setHover] = useState(null)
  const [reseña, setReseña] = useState('')
  const [carnet, setCarnet] = useState('')

  const manejarEnvio = (e) => {
    e.preventDefault()
    //agregar backend
    console.log({ calificacion, reseña, carnet })
  }

  return (
    <div className="contenedor-reseña">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <div className="header-content">
          <h1>UCA Games Store</h1>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="#buscar">Buscar</Link>
            <Link to="/vender">Vender</Link>
            <Link to="/carrito">Carrito</Link>
          </nav>
        </div>
      </header>

      <main className="reseña-principal">
        <h2>Dejar una Reseña</h2>
        <form onSubmit={manejarEnvio} className="formulario-reseña">
          <div className="calificacion-estrellas">
            {[...Array(5)].map((estrella, indice) => {
              const valorCalificacion = indice + 1
              return (
                <label key={indice}>
                  <input
                    type="radio"
                    name="calificacion"
                    value={valorCalificacion}
                    onClick={() => setCalificacion(valorCalificacion)}
                  />
                  <FaStar
                    className="estrella"
                    color={
                      valorCalificacion <= (hover || calificacion)
                        ? '#ffc107'
                        : '#e4e5e9'
                    }
                    onMouseEnter={() => setHover(valorCalificacion)}
                    onMouseLeave={() => setHover(null)}
                    size={30}
                  />
                </label>
              )
            })}
          </div>

          <div className="grupo-formulario">
            <label htmlFor="carnet">Carnet:</label>
            <input
              type="text"
              id="carnet"
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
              placeholder="Ingresa tu carnet"
              required
            />
          </div>

          <div className="grupo-formulario">
            <label htmlFor="reseña">Tu Reseña:</label>
            <textarea
              id="reseña"
              value={reseña}
              onChange={(e) => setReseña(e.target.value)}
              placeholder="Escribe tu reseña aquí"
              required
            />
          </div>

          <button type="submit" className="boton-enviar">
            Enviar Reseña
          </button>
        </form>
      </main>

       <footer className="Inicio-footer">
        <p>© 2025 UCA Game Store</p>
      </footer>
    </div>
  )
}

export default Reseña