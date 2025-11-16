import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './home.css'
import logo from '../assets/logo.png'

function Home() {
  const navigate = useNavigate()

  const [productos, setProductos] = useState([])

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/juegos')
        if (!response.ok) {
          throw new Error('No se pudo conectar a la API')
        }
        const data = await response.json()
        
        if (data.success) {
          setProductos(data.juegos) 
        } else {
          throw new Error(data.message)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false) 
      }
    }

    fetchJuegos() 
  }, []) 

  const irAVista = producto => {
    navigate(`/juego/${producto.id}`, { state: producto })
  }

   const truncarTexto = (texto, maxCaracteres = 100) => {
    if (texto.length <= maxCaracteres) return texto
    return texto.substring(0, maxCaracteres) + '...'
  }

  if (cargando) {
    return <main className="Inicio-content"><h2 style={{color: 'white', textAlign: 'center'}}>Cargando juegos...</h2></main>
  }

  if (error) {
    return <main className="Inicio-content"><h2 style={{color: 'red', textAlign: 'center'}}>Error: {error}</h2></main>
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
                 <p>{truncarTexto(producto.descripcion, 100)}</p>
                  <p className="producto-precio">${Number(producto.precio).toFixed(2)}</p>
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