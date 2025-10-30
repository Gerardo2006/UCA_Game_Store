import { useState } from 'react'
import './reseña.css'
import logo from '../assets/logo.png'

// Componente de estrella SVG
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

  const productos = [
    {
      id: 1,
      nombre: 'Marvel: Spider Man',
      descripcion: 'Una aventura épica en la piel de Spider-Man, con una narrativa envolvente y combates fluidos.',
      imagen: 'https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/C784xeOFo2wViCf4m5bxgoeH.png',
      precio: 59.99
    },
    {
      id: 2,
      nombre: 'Detroit: Become Human',
      descripcion: 'Un juego de aventura interactivo que explora la vida de androides en un futuro cercano.',
      imagen: 'https://tse2.mm.bing.net/th/id/OIP.oDrIZz93myhtzMyD2-dSSQHaJ4?rs=1&pid=ImgDetMain',
      precio: 39.99
    },
    {
      id: 3,
      nombre: 'Minecraft',
      descripcion: 'Un juego de construcción y aventura en un mundo abierto de bloques.',
      imagen: 'https://gaming-cdn.com/images/products/442/orig/minecraft-java-and-bedrock-edition-java-and-bedrock-edition-pc-game-cover.jpg',
      precio: 29.99
    },
    {
      id: 4,
      nombre: 'The Last of Us Part II Remastered',
      descripcion: 'Una historia emocionalmente intensa en un mundo post-apocalíptico.',
      imagen: 'https://blog.playstation.com/uploads/2024/01/76a2583e03ed46f0d63c50b9c347937d6a251a6a.jpeg',
      precio: 39.99
    },
    {
      id: 5,
      nombre: 'God of War Ragnarok',
      descripcion: 'Una épica aventura en la mitología nórdica con un enfoque en la narrativa y la exploración.',
      imagen: 'https://igm.gg/_next/image?url=https%3A%2F%2Fstorage.yandexcloud.net%2Figm-s3%2FPROD%2F202408%2F86b1fcae%2FGod_of_War_%D0%A0%D0%B0%D0%B3%D0%BD%D0%B0%D1%80%D1%91%D0%BA.png&w=640&q=75',
      precio: 69.99
    },
    {
      id: 6,
      nombre: 'Hollow Knight',
      descripcion: 'Un juego de acción y aventura en 2D con un hermoso estilo artístico y una jugabilidad desafiante.',
      imagen: 'https://i.ytimg.com/vi/JuP47fRBsWg/maxresdefault.jpg',
      precio: 4.99
    },
    {
      id: 7,
      nombre: 'Hollow Knight: Silksong',
      descripcion: 'Una secuela muy esperada del aclamado juego de acción y aventura en 2D.',
      imagen: 'https://psverso.com.br/wp-content/uploads/2025/09/Hollow-Knight-Silksong.webp',
      precio: 6.99
    },
    {
      id: 8,
      nombre: 'Cyberpunk 2077',
      descripcion: 'Un RPG de mundo abierto en un futuro distópico con una narrativa profunda y opciones de personalización.',
      imagen: 'https://th.bing.com/th/id/R.205e40bba03a5f5b8a6034fe49958ffc?rik=DcvgaFOKIM9IaA&pid=ImgRaw&r=0',
      precio: 49.99
    },
    {
      id: 9,
      nombre: 'The legend of Zelda: Tears of the Kingdom',
      descripcion: 'Un juego de acción y aventura en un mundo abierto lleno de exploración y desafíos.',
      imagen: 'https://tse1.mm.bing.net/th/id/OIP.xJqlZQdmVMRG7Md9zRWLwwHaJ4?rs=1&pid=ImgDetMain',
      precio: 59.99
    }
  ]

  const manejarCambioCarnet = (e) => {
    const valor = e.target.value
    // Solo permite números
    if (valor === '' || /^\d+$/.test(valor)) {
      // Máximo 8 dígitos
      if (valor.length <= 8) {
        setCarnet(valor)
      }
    }
  }

  const manejarCambioReseña = (e) => {
    const valor = e.target.value
    // Máximo 500 caracteres
    if (valor.length <= 500) {
      setReseña(valor)
    }
  }

  const validarCarnet = (carnet) => {
    // Debe tener exactamente 8 dígitos y empezar con 0
    return carnet.length === 8 && carnet.startsWith('0')
  }

  const calcularPromedio = (reseñas) => {
    if (!reseñas || reseñas.length === 0) return 0
    const suma = reseñas.reduce((acc, r) => acc + r.calificacion, 0)
    return (suma / reseñas.length).toFixed(1)
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!calificacion) {
      alert('Por favor selecciona una calificación')
      return
    }

    if (!validarCarnet(carnet)) {
      alert('El carnet debe tener exactamente 8 dígitos y comenzar con 0')
      return
    }

    if (!reseña.trim()) {
      alert('Por favor escribe una reseña')
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

    alert('¡Reseña enviada con éxito!')

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
            <a href="/">Inicio</a>
            <a href="#buscar">Buscar</a>
            <a href="/vender">Vender</a>
            <a href="/carrito">Carrito</a>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="reseña-contenido">
        {!juegoSeleccionado ? (
          // Vista de lista de juegos
          <section>
            <h2 className="titulo-seleccion">
              Selecciona un juego para reseñar
            </h2>

            <div className="lista-productos-reseña">
              {productos.map(producto => (
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