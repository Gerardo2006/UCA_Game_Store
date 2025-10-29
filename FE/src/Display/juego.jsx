import { useLocation, useNavigate } from 'react-router-dom'
import './juego.css'
import logo from '../assets/logo.png'

function Vista() {
  const { state: producto } = useLocation()
  const navigate = useNavigate()

  if (!producto) return <p className="Vista-error">No se encontró el producto.</p>

  return (
    <main className="Vista">
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

      <section className="Vista-producto">
        <h2>{producto.nombre}</h2>
        <img src={producto.imagen} alt={producto.nombre} />
        <p className="Vista-descripcion">{producto.descripcion}</p>
        <p className="Vista-precio">${producto.precio.toFixed(2)}</p>
        <button onClick={() => alert('¡Compra confirmada!')}>Confirmar compra</button>
        <button className="Vista-volver" onClick={() => navigate('/')}>Volver al inicio</button>
      </section>

      <footer className="Inicio-footer">
        <p>© 2025 Mi Tienda React</p>
      </footer>
    </main>
  )
}

export default Vista
