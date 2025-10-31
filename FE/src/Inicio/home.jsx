import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' 
import './home.css'
import logo from '../assets/logo.png'
import { listaDeJuegos } from '../data/juegos'

function Home() {
  const navigate = useNavigate()

  const [productos, setProductos] = useState(listaDeJuegos)

  const irAVista = producto => {
    navigate(`/juego/${producto.id}`, { state: producto })
  }

  return (
    <main className="Inicio">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <div className="header-content">
          <h1>UCA Games Store</h1>
          <nav>
            <Link to="/buscar">Buscar</Link>
            <Link to="/vender">Vender</Link>
            <Link to="/carrito">Carrito</Link>
            <Link to="/reseñas">Reseñas</Link>
          </nav>
        </div>
      </header>

      <div className="Inicio-content">
        <section className="productos">
          <h2>Productos en venta</h2>
          <div className="lista-productos">
            {productos.map(producto => (
              <div
                key={producto.id}
                className="producto"
                onClick={() => irAVista(producto)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                />
                <div className="producto-info">
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <p className="producto-precio">${producto.precio.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="Inicio-footer">
        <p>© 2025 UCA Game Store</p>
      </footer>
    </main>
  )
}

export default Home