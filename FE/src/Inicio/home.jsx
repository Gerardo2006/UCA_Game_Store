import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './home.css'
import logo from '../assets/logo.png'
import api from '../utils/api.js'

function Home() {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }

    const fetchJuegos = async () => {
      try {
        const response = await api.get('/juegos')

        const data = response.data;

        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error("Respuesta inesperada:", data);
          setProductos([]);
        }

      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los juegos.")
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
    if (!texto) return "";
    if (texto.length <= maxCaracteres) return texto
    return texto.substring(0, maxCaracteres) + '...'
  }

  if (cargando) {
    return <main className="Inicio-content"><h2 style={{ color: 'white', textAlign: 'center' }}>Cargando juegos...</h2></main>
  }

  if (error) {
    return <main className="Inicio-content"><h2 style={{ color: 'red', textAlign: 'center' }}>Error: {error}</h2></main>
  }

  return (
    <main className="Inicio">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Game Store" />
        </div>

        <div className="header-content">
          <h1>UCA Game Store</h1>
          <nav>
            <Link to="/buscar">Buscar</Link>
            <Link to="/vender">Vender</Link>
            <Link to="/carrito">Carrito</Link>
            <Link to="/reseñas">Reseñas</Link>
            {!isLoggedIn && <Link to="/Login">Iniciar Sesión</Link>}
          </nav>
        </div>

        <div className="header-actions">
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>

      <div className="Inicio-content">
        <section className="productos">
          <h2>Productos en venta</h2>
          <div className="lista-productos">
            {productos.length > 0 ? (
              productos.map(producto => (
                <div
                  key={producto.id}
                  className="producto"
                  onClick={() => irAVista(producto)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={producto.imagen || logo}
                    alt={producto.nombre}
                    className="producto-imagen"
                  />
                  <div className="producto-info">
                    <h3>{producto.nombre}</h3>
                    <p>{truncarTexto(producto.descripcion, 100)}</p>
                    <p className="producto-precio">${Number(producto.precio).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'white' }}>No hay productos disponibles.</p>
            )}
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