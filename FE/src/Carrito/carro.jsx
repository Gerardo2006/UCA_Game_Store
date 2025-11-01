import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './carro.css'
import logo from '../assets/logo.png'

function Carro() {
  const navigate = useNavigate()
  const [carrito, setCarrito] = useState([])
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })

  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado))
    }
  }, [])

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (carrito.length > 0) {
      localStorage.setItem('carrito', JSON.stringify(carrito))
    } else {
      localStorage.removeItem('carrito')
    }
  }, [carrito])

  // Función para truncar texto
  const truncarTexto = (texto, maxCaracteres = 100) => {
    if (texto.length <= maxCaracteres) return texto
    return texto.substring(0, maxCaracteres) + '...'
  }

  // Función para eliminar un juego del carrito
  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(juego => juego.id !== id)
    setCarrito(nuevoCarrito)

    setNotificacion({ mostrar: true, mensaje: '¡Juego eliminado del carrito!', tipo: 'info' })
    setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 2000)
  }

  // Función para calcular el total
  const calcularTotal = () => {
    return carrito.reduce((total, juego) => total + juego.precio, 0).toFixed(2)
  }

  // Función para proceder al pago
  const procederAlPago = () => {
    if (carrito.length === 0) return

    const total = calcularTotal()
    setNotificacion({
      mostrar: true,
      mensaje: `¡Compra exitosa! Total a pagar: $${total}`,
      tipo: 'exito'
    })

    // Vaciar el carrito después de la compra
    setTimeout(() => {
      setCarrito([])
      setNotificacion({ mostrar: false, mensaje: '', tipo: '' })
    }, 3000)
  }

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([])
    setNotificacion({ mostrar: true, mensaje: 'Carrito vaciado', tipo: 'info' })
    setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 2000)
  }

  return (
    <main className="Carro">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <div className="header-content">
          <h1>UCA Games Store</h1>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/buscar">Buscar</Link>
            <Link to="/vender">Vender</Link>
            <Link to="/reseñas">Reseñas</Link>
          </nav>
        </div>
      </header>

      {notificacion.mostrar && (
        <div className={`Carro-toast ${notificacion.tipo === 'exito' ? 'toast-exito' : ''} ${notificacion.tipo === 'info' ? 'toast-info' : ''}`}>
          {notificacion.mensaje}
        </div>
      )}

      <div className="Carro-content">
        <section className="carrito-contenedor">
          <h2>Mi Carrito de Compras</h2>

          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <p>El carrito está vacío</p>
              <button onClick={() => navigate('/')}>Volver a la tienda</button>
            </div>
          ) : (
            <>
              <div className="carrito-items">
                {carrito.map((juego) => (
                  <div key={juego.id} className="carrito-item">
                    <img
                      src={juego.imagen}
                      alt={juego.nombre}
                      className="carrito-item-imagen"
                    />
                    <div className="carrito-item-info">
                      <h3>{juego.nombre}</h3>
                      <p className="carrito-item-descripcion">{truncarTexto(juego.descripcion, 100)}</p>
                      <p className="carrito-item-precio">${juego.precio.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => eliminarDelCarrito(juego.id)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>

              <div className="carrito-resumen">
                <div className="carrito-total">
                  <h3>Total:</h3>
                  <h3 className="precio-total">${calcularTotal()}</h3>
                </div>

                <div className="carrito-acciones">
                  <button onClick={vaciarCarrito} className="btn-vaciar">
                    Vaciar Carrito
                  </button>
                  <button onClick={procederAlPago} className="btn-pagar">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      <footer className="Inicio-footer">
        <p>© 2025 UCA Game Store</p>
      </footer>
    </main>
  )
}

export default Carro