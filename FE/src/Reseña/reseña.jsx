import { useState } from 'react'
import { Link } from 'react-router-dom'
import './reseña.css'
import logo from '../assets/logo.png'
import { listaDeJuegos } from '../data/juegos'

// Estrella de calificación
const StarIcon = ({ filled, size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? '#ffc107' : '#e4e5e9'}
    style={{ cursor: 'pointer', transition: 'fill 200ms' }}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

function Reseña() {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null)
  const [calificacion, setCalificacion] = useState(null)
  const [hover, setHover] = useState(null)
  const [reseña, setReseña] = useState('')
  const [carnet, setCarnet] = useState('')
  const [reseñasPorJuego, setReseñasPorJuego] = useState({})
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 3000)
  }

  // Verificación para que solo permita números y un máximo de 8 dígitos
  const manejarCambioCarnet = (e) => {
    const valor = e.target.value
    if (valor === '' || /^\d+$/.test(valor)) {
      if (valor.length <= 8) {
        setCarnet(valor)
      }
    }
  }

  const manejarCambioReseña = (e) => {
    const valor = e.target.value
    if (valor.length <= 500) {
      setReseña(valor)
    }
  }

  const calcularPromedio = (reseñas) => {
    if (!reseñas || reseñas.length === 0) return 0
    const suma = reseñas.reduce((acc, r) => acc + r.calificacion, 0)
    return (suma / reseñas.length).toFixed(1)
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!calificacion) {
      mostrarNotificacion('Por favor selecciona una calificación', 'advertencia')
      return
    }
    if (carnet.length === 0) {
      mostrarNotificacion('Por favor ingresa tu carnet', 'advertencia')
      return
    }
    if (carnet.length !== 8) {
      mostrarNotificacion('El carnet debe tener exactamente 8 dígitos', 'error')
      return
    }
    if (!carnet.startsWith('0')) {
      mostrarNotificacion('El carnet debe comenzar con 0', 'error')
      return
    }
    if (!reseña.trim()) {
      mostrarNotificacion('Por favor escribe una reseña', 'advertencia')
      return
    }

    // Crear nueva reseña
    const nuevaReseña = {
      id: Date.now(),
      carnet,
      calificacion,
      texto: reseña,
      fecha: new Date().toLocaleDateString()
    }

    // Agregar la reseña al juego seleccionado
    setReseñasPorJuego(prev => ({
      ...prev,
      [juegoSeleccionado.id]: [
        ...(prev[juegoSeleccionado.id] || []),
        nuevaReseña
      ]
    }))

    mostrarNotificacion('¡Reseña enviada con éxito!', 'exito')

    // Limpiar solo el formulario
    setCalificacion(null)
    setReseña('')
    setCarnet('')
  }

  const reseñasActuales = juegoSeleccionado
    ? (reseñasPorJuego[juegoSeleccionado.id] || [])
    : []

  const promedioActual = calcularPromedio(reseñasActuales)


  return (
    <div className="contenedor-reseña">
      {/* Header */}
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
            <Link to="/carrito">Carrito</Link>
          </nav>
        </div>
      </header>

      {/* Toast de notificación */}
      {notificacion.mostrar && (
        <div className={`Reseña-toast toast-${notificacion.tipo}`}>
          {notificacion.mensaje}
        </div>
      )}

      {/* Contenido principal */}
      <main className="reseña-contenido">
        {!juegoSeleccionado ? (
          // Vista de lista de juegos
          <section>
            <h2 className="titulo-seleccion">
              Selecciona un juego para reseñar
            </h2>

            <div className="lista-productos-reseña">
              {listaDeJuegos.map(producto => (
                <div
                  key={producto.id}
                  onClick={() => setJuegoSeleccionado(producto)}
                  className="producto-reseña"
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="producto-imagen-reseña"
                  />
                  <div className="producto-info-reseña">
                    <h3>{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          // Vista con formulario y reseñas
          <>
            <div className="encabezado-seccion">
              <img
                src={juegoSeleccionado.imagen}
                alt={juegoSeleccionado.nombre}
                className="imagen-juego-header"
              />
              <div className="titulo-con-promedio">
                <h2 className="titulo-juego-header">
                  {juegoSeleccionado.nombre}
                </h2>
                {reseñasActuales.length > 0 && (
                  <div className="promedio-calificacion">
                    <span className="promedio-numero">{promedioActual}</span>
                    <div className="promedio-estrellas">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          filled={i < Math.round(promedioActual)}
                          size={20}
                        />
                      ))}
                    </div>
                    <span className="promedio-texto">
                      ({reseñasActuales.length} {reseñasActuales.length === 1 ? 'reseña' : 'reseñas'})
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setJuegoSeleccionado(null)}
                className="btn-volver-lista"
              >
                ← Volver a la lista
              </button>
            </div>

            <div className="contenedor-formulario-reseñas">
              {/* Formulario de reseña */}
              <section className="formulario-reseña-container">
                <h3 className="formulario-titulo">Escribe tu reseña</h3>

                <div className="formulario-reseña">
                  <div className="calificacion-estrellas">
                    {[...Array(5)].map((estrella, indice) => {
                      const valorCalificacion = indice + 1
                      return (
                        <div
                          key={indice}
                          className="estrella-container"
                          onClick={() => setCalificacion(valorCalificacion)}
                          onMouseEnter={() => setHover(valorCalificacion)}
                          onMouseLeave={() => setHover(null)}
                        >
                          <StarIcon
                            filled={valorCalificacion <= (hover || calificacion)}
                            size={30}
                          />
                        </div>
                      )
                    })}
                  </div>

                  <div className="grupo-formulario">
                    <label htmlFor="carnet">Carnet (8 dígitos, debe iniciar con 0):</label>
                    <input
                      type="text"
                      id="carnet"
                      value={carnet}
                      onChange={manejarCambioCarnet}
                      placeholder="00000000"
                      maxLength="8"
                    />
                    <span className="contador-caracteres">
                      {carnet.length}/8 dígitos
                    </span>
                  </div>

                  <div className="grupo-formulario">
                    <label htmlFor="reseña">Tu Reseña:</label>
                    <textarea
                      id="reseña"
                      value={reseña}
                      onChange={manejarCambioReseña}
                      placeholder="Escribe tu reseña aquí"
                    />
                    <span className={`contador-caracteres ${reseña.length === 500 ? 'limite-alcanzado' : ''}`}>
                      {reseña.length}/500 caracteres
                    </span>
                  </div>

                  <button
                    onClick={manejarEnvio}
                    className="boton-enviar-reseña"
                  >
                    Enviar Reseña
                  </button>
                </div>
              </section>

              {/* Reseñas previas */}
              <section className="reseñas-previas-container">
                <h3 className="reseñas-titulo">Reseñas de usuarios</h3>

                {reseñasActuales.length === 0 ? (
                  <p className="sin-reseñas">
                    Aún no hay reseñas para este juego. ¡Sé el primero en reseñar!
                  </p>
                ) : (
                  <div className="lista-reseñas">
                    {reseñasActuales.map(reseñaItem => (
                      <div key={reseñaItem.id} className="reseña-item">
                        <div className="reseña-header">
                          <span className="reseña-carnet">Carnet: {reseñaItem.carnet}</span>
                          <div className="reseña-calificacion">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                filled={i < reseñaItem.calificacion}
                                size={16}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="reseña-texto">{reseñaItem.texto}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="Inicio-footer">
        <p>© 2025 UCA Game Store</p>
      </footer>
    </div>
  )
}

export default Reseña