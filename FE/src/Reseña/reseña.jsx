import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api.js'
import './reseña.css'
import logo from '../assets/logo.png'

// Estrella de calificación
const StarIcon = ({ filled, size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`star-icon ${filled ? 'star-icon-filled' : ''}`}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

function Reseña() {
  const navigate = useNavigate()

  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null)
  const [calificacion, setCalificacion] = useState(null)
  const [hover, setHover] = useState(null)
  const [reseña, setReseña] = useState('')
  const [reseñasPorJuego, setReseñasPorJuego] = useState({})
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
  const [listaDeJuegos, setListaDeJuegos] = useState([])
  const [cargandoJuegos, setCargandoJuegos] = useState(true)

  // Cargar Lista de Juegos (Catálogo)
  useEffect(() => {
    if (!juegoSeleccionado) {
      setCargandoJuegos(true);
      const fetchJuegos = async () => {
        try {
          const response = await api.get('/juegos')
          const data = response.data

          if (Array.isArray(data)) {
            setListaDeJuegos(data)
          }
        } catch (err) {
          console.error("Error al cargar juegos: ", err)
        } finally {
          setCargandoJuegos(false)
        }
      }
      fetchJuegos()
    }
  }, [juegoSeleccionado])

  // Cargar Reseñas del Juego Seleccionado
  useEffect(() => {
    if (juegoSeleccionado && !reseñasPorJuego[juegoSeleccionado.id]) {
      const fetchReseñas = async () => {
        try {
          const response = await api.get(`/resenas/${juegoSeleccionado.id}`)
          const data = response.data

          if (Array.isArray(data)) {
            setReseñasPorJuego(prev => ({
              ...prev,
              [juegoSeleccionado.id]: data
            }))
          }
        } catch (err) {
          console.error("Error al cargar reseñas: ", err)
          setReseñasPorJuego(prev => ({
            ...prev,
            [juegoSeleccionado.id]: []
          }))
        }
      }
      fetchReseñas()
    }
  }, [juegoSeleccionado, reseñasPorJuego])

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 3000)
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

  const manejarEnvio = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token');
    if (!token) {
      mostrarNotificacion('Debes iniciar sesión para publicar una reseña.', 'advertencia');
      return;
    }

    if (!calificacion) {
      mostrarNotificacion('Por favor selecciona una calificación', 'advertencia')
      return
    }

    if (!reseña.trim()) {
      mostrarNotificacion('Por favor escribe una reseña', 'advertencia')
      return
    }

    try {
      const nuevaReseña = {
        juego_id: juegoSeleccionado.id,
        calificacion: calificacion,
        comentario: reseña
      };

      const response = await api.post('/resenas', nuevaReseña);
      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        mostrarNotificacion('Reseña enviada con éxito', 'exito')

        setCalificacion(null)
        setReseña('')
      }
    } catch (err) {
      let mensajeError = 'Error de conexión con el servidor.';

      if (err.response) {
        mensajeError = err.response.data.message || `Error: ${err.response.status}`;
      }

      mostrarNotificacion(mensajeError, 'error')
    }
  }

  const truncarTexto = (texto, maxCaracteres = 100) => {
    if (!texto) return "";
    if (texto.length <= maxCaracteres) return texto
    return texto.substring(0, maxCaracteres) + '...'
  }

  const reseñasActuales = juegoSeleccionado
    ? (reseñasPorJuego[juegoSeleccionado.id] || [])
    : []

  const promedioActual = calcularPromedio(reseñasActuales)

  return (
    <div className="contenedor-reseña">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Game Store" />
        </div>
        <div className="header-content">
          <h1>UCA Game Store</h1>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/buscar">Buscar</Link>
            <Link to="/vender">Vender</Link>
            <Link to="/carrito">Carrito</Link>
          </nav>
        </div>
      </header>
      {notificacion.mostrar && (
        <div className={`Reseña-toast toast-${notificacion.tipo}`}>
          {notificacion.mensaje}
        </div>
      )}

      <main className="reseña-contenido">
        {!juegoSeleccionado ? (
          <section>
            <h2 className="titulo-seleccion">
              Selecciona un juego para reseñar
            </h2>

            {cargandoJuegos ? (
              <h3 style={{ color: 'white', textAlign: 'center' }}>Cargando lista de juegos...</h3>
            ) : (
              <div className="lista-productos-reseña">
                {listaDeJuegos.map(producto => (
                  <div
                    key={producto.id}
                    onClick={() => setJuegoSeleccionado(producto)}
                    className="producto-reseña"
                  >
                    <img
                      src={producto.imagen || logo}
                      alt={producto.nombre}
                      className="producto-imagen-reseña"
                    />
                    <div className="producto-info-reseña">
                      <h3>{producto.nombre}</h3>
                      <p>{truncarTexto(producto.descripcion)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <div className="encabezado-seccion">
              <img
                src={juegoSeleccionado.imagen || logo}
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

              <section className="reseñas-previas-container">
                <h3 className="reseñas-titulo">Reseñas de usuarios</h3>

                {reseñasActuales.length === 0 ? (
                  <p className="sin-reseñas">
                    Aún no hay reseñas para este juego. ¡Sé el primero en reseñar!
                  </p>
                ) : (
                  <div className="lista-reseñas">
                    {reseñasActuales.map((reseñaItem, index) => (
                      // Usamos index como key fallback por si la reseña nueva no tiene ID aun
                      <div key={reseñaItem.id || index} className="reseña-item">
                        <div className="reseña-header">
                          <span className="reseña-carnet">
                            Usuario: {reseñaItem.usuario_carnet || "Anónimo"}
                          </span>
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
                        <p className="reseña-texto">{reseñaItem.comentario}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </main >

      < footer className="Inicio-footer" >
        <p>© 2025 UCA Game Store</p>
      </footer >
    </div >
  )
}

export default Reseña