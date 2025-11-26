import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './buscar.css'
import '../Inicio/home.css'
import logo from '../assets/logo.png'

function Buscar() {
  const navigate = useNavigate()

  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const [resultados, setResultados] = useState([])

  const [listaMaestraJuegos, setListaMaestraJuegos] = useState([])

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/juegos')
        const data = await response.json()
        if (data.success) {
          setListaMaestraJuegos(data.juegos)
        }
      } catch (err) {
        console.error("Error al cargar juegos: ", err)
      }
    }
    fetchJuegos()
  }, [])

  useEffect(() => {
    if (terminoBusqueda.trim() === '') {
      setResultados([])
    } else {
      const busquedaLower = terminoBusqueda.toLowerCase()

      const juegosFiltrados = listaMaestraJuegos.filter(juego =>
        juego.nombre.toLowerCase().includes(busquedaLower)
      )

      setResultados(juegosFiltrados)
    }
  }, [terminoBusqueda, listaMaestraJuegos])

  const irAVista = producto => {
    navigate(`/juego/${producto.id}`, { state: producto })
  }

  const truncarTexto = (texto, maxCaracteres = 100) => {
    if (texto.length <= maxCaracteres) return texto
    return texto.substring(0, maxCaracteres) + '...'
  }

  return (
    <main className="Buscar">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <div className="header-content">
          <h1>UCA Games Store</h1>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/vender">Vender</Link>
            <Link to="/carrito">Carrito</Link>
            <Link to="/reseñas">Reseñas</Link>
          </nav>
        </div>
      </header>

      <div className="Buscar-content">
        <section className="buscador-container">
          <h2>Encuentra tu próximo juego</h2>
          <input
            type="text"
            placeholder="Escribe el nombre del juego..."
            className="buscador-input"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
        </section>
      </div>
      <div className="Inicio-content" style={{ paddingTop: 0 }}>
        <section className="resultados-container">
          {terminoBusqueda.length > 0 && (
            <div className="lista-productos">
              {resultados.map(producto => (
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
                    <p>{truncarTexto(producto.descripcion)}</p>
                    <p className="producto-precio">${Number(producto.precio).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {terminoBusqueda.length > 0 && resultados.length === 0 && (
            <p className="no-resultados">
              No se encontraron juegos que coincidan con "{terminoBusqueda}".
            </p>
          )}
        </section>
      </div>

      <footer className="Inicio-footer">
        <p>©️ 2025 UCA Game Store</p>
      </footer>
    </main>
  )
}

export default Buscar