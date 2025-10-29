import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './venta.css'
import logo from '../assets/logo.png'

function Venta() {
  const { state: producto } = useLocation()
  const navigate = useNavigate()
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })

  if (!producto) return <p className="Juego-error">No se encontró el producto.</p>

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]')
    const juegoExiste = carritoActual.find(item => item.id === producto.id)

    if (!juegoExiste) {
      const nuevoCarrito = [...carritoActual, producto]
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito))

      setNotificacion({ mostrar: true, mensaje: '¡Producto agregado al carrito!', tipo: 'exito' })
      setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 3000)
    } else {
      setNotificacion({ mostrar: true, mensaje: 'Este juego ya está en tu carrito', tipo: 'advertencia' })
      setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 3000)
    }
  }

  return (
    <main className="Juego">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <div className="header-content">
          <h1>UCA Games Store</h1>
          <nav>
            <a href="/">Inicio</a>
            <a href="#buscar">Buscar</a>
            <a href="/carrito">Carrito</a>
            <a href="#reseñas">Reseñas</a>
          </nav>
        </div>
      </header>

      <section className="Juego-producto">
        <img className="Juego-imagen" src={producto.imagen} alt={producto.nombre} />

        <div className="Juego-cuadros">
          <div className="Juego-cuadro">
            <h3>Nombre del juego</h3>
            <p>{producto.nombre}</p>
          </div>

          <div className="Juego-cuadro">
            <h3>Descripción</h3>
            <p>{producto.descripcion}</p>
          </div>

          <div className="Juego-cuadro">
            <h3>Precio</h3>
            <p>${producto.precio.toFixed(2)}</p>
          </div>
        </div>

        <div className="Juego-botones">
          <button onClick={agregarAlCarrito}>Agregar al carrito</button>
          <button className="Juego-volver" onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      </section>

      {notificacion.mostrar && (
        <div className={`Juego-toast ${notificacion.tipo === 'advertencia' ? 'toast-advertencia' : ''}`}>
          {notificacion.mensaje}
        </div>
      )}

      <footer className="Inicio-footer">
        <p>© 2025 UCA Game Store</p>
      </footer>
    </main>
  )
}

export default Venta
