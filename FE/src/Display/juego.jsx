import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './juego.css'
import logo from '../assets/logo.png'

function Juego() {
  const { state: producto } = useLocation()
  const navigate = useNavigate()
  const [notificacion, setNotificacion] = useState(false)

  if (!producto) return <p className="Juego-error">No se encontró el producto.</p>

  const agregarAlCarrito = () => {
    setNotificacion(true)
    setTimeout(() => setNotificacion(false), 3000)
  }

  return (
    <main className="Juego">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <h1>UCA Games Store</h1>
        <nav>
          <a href="#buscar">Buscar</a>
          <a href="#vender">Vender</a>
          <a href="#comprar">Comprar</a>
          <a href="#reseñas">Reseñas</a>
        </nav>
      </header>

      <section className="Juego-producto">
        <h2>{producto.nombre}</h2>
        <img src={producto.imagen} alt={producto.nombre} />
        <p className="Juego-descripcion">{producto.descripcion}</p>
        <p className="Juego-precio">${producto.precio.toFixed(2)}</p>
        <button onClick={agregarAlCarrito}>Agregar al carrito</button>
        <button className="Juego-volver" onClick={() => navigate('/')}>Volver al inicio</button>
      </section>

      {notificacion && (
        <div className="Juego-toast">¡Producto agregado al carrito!</div>
      )}

      <footer className="Inicio-footer">
        <p>© 2025 UCA Game Store</p>
      </footer>
    </main>
  )
}

export default Juego
