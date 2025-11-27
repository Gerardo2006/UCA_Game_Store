import { useLocation, useNavigate, Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './juego.css'
import logo from '../assets/logo.png'
import api from '../utils/api.js';

function Juego() {
  const { state: productoDesdeHome } = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()

  const [producto, setProducto] = useState(productoDesdeHome)
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
  const [cargando, setCargando] = useState(!productoDesdeHome)

  useEffect(() => {
    if (!producto) {
      const fetchJuego = async () => {
        try {
          const response = await api.get(`/juegos/${id}`);

          const data = response.data;

          if (data) {
            setProducto(data);
          } else {
            console.error("No se encontraron datos del juego");
          }

        } catch (err) {
          console.error("Error al cargar juego:", err);
        } finally {
          setCargando(false);
        }
      }
      fetchJuego()
    }
  }, [id, producto])

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]')
    const juegoExiste = carritoActual.find(item => item.id === producto.id)

    if (!juegoExiste) {
      const nuevoCarrito = [...carritoActual, producto]
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
      setNotificacion({ mostrar: true, mensaje: '¡Producto agregado al carrito!', tipo: 'exito' })
    } else {
      setNotificacion({ mostrar: true, mensaje: 'Este juego ya está en tu carrito', tipo: 'advertencia' })
    }
    setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 3000)
  }

  if (cargando) return <main className="Juego-error"><h2>Cargando...</h2></main>

  if (!producto) return <main className="Juego-error"><h2>Error: No se encontró el producto.</h2></main>

  const precioComoNumero = Number(producto.precio);

  return (
    <main className="Juego">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <div className="header-content">
          <h1>UCA Game Store</h1>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/buscar">Buscar</Link>
            <Link to="/vender">Vender</Link>
            <Link to="/carrito">Carrito</Link>
            <Link to="/reseñas">Reseñas</Link>
          </nav>
        </div>
      </header>

      <section className="Juego-producto">
        <h2>{producto.nombre}</h2>
        <img src={producto.imagen || logo} alt={producto.nombre} />

        <p className="Juego-descripcion">{producto.descripcion}</p>

        {producto.carnet_vendedor && (
          <p className="Juego-vendedor"><small>Vendido por: {producto.carnet_vendedor}</small></p>
        )}

        <p className="Juego-precio">${precioComoNumero.toFixed(2)}</p>
        <button onClick={agregarAlCarrito}>Agregar al carrito</button>
        <button className="Juego-volver" onClick={() => navigate('/')}>Volver al inicio</button>
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

export default Juego