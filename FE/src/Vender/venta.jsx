import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './venta.css'
import logo from '../assets/logo.png'

function Venta() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [carnet, setCarnet] = useState('')
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 3000)
  }

  const manejarPublicacion = () => {
    const valorNumerico = parseFloat(precio.replace('$', '')) || 0
    const valorCarnet = carnet.replace('#', '')

    if (!nombre || !descripcion || !precio || !carnet) {
      mostrarNotificacion('Completa todos los campos antes de publicar.', 'advertencia')
      return
    }

    if (valorNumerico <= 0) {
      mostrarNotificacion('El precio debe ser mayor que 0.', 'advertencia')
      return
    }

    if (valorNumerico > 200) {
      mostrarNotificacion('El precio máximo permitido es $200.00.', 'advertencia')
      return
    }

    if (!/^\d{8}$/.test(valorCarnet) || valorCarnet === '00000000') {
      mostrarNotificacion('El carnet debe tener 8 dígitos y no puede ser 00000000.', 'advertencia')
      return
    }

    mostrarNotificacion('Solicitud enviada con éxito', 'exito')

    // Limpiar campos
    setNombre('')
    setDescripcion('')
    setPrecio('')
    setCarnet('')
  }

  const manejarCambioPrecio = (e) => {
    let valor = e.target.value.replace('$', '')

    if (!/^[0-9]*\.?[0-9]*$/.test(valor)) return
    if (valor.startsWith('-')) return

    if (valor.includes('.')) {
      const [entero, decimal] = valor.split('.')
      if (decimal.length > 2) return
    }

    if (valor.replace('.', '').length > 5) return
    if (parseFloat(valor) > 200) valor = '200.00'
    if (/^0\d+/.test(valor)) valor = parseFloat(valor).toString()

    setPrecio(valor ? `$${valor}` : '')
  }

  const manejarCambioNombre = (e) => {
    if (e.target.value.length <= 100) setNombre(e.target.value)
  }

  const manejarCambioDescripcion = (e) => {
    if (e.target.value.length <= 500) setDescripcion(e.target.value)
  }

  const manejarCambioCarnet = (e) => {
    let valor = e.target.value.replace('#', '')
    if (!/^\d*$/.test(valor) || valor.length > 8) return
    if (valor === '00000000') valor = '00000001'
    setCarnet(valor ? `#${valor}` : '')
  }

  return (
    <main className="Venta">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <div className="header-content">
          <h1>UCA Games Store</h1>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="#buscar">Buscar</Link>
            <Link to="/carrito">Carrito</Link>
            <Link to="/reseñas">Reseñas</Link>
          </nav>
        </div>
      </header>

      <section className="Venta-contenido">
        <div className="Juego-cuadros">
          <h2>Publicar un nuevo juego en venta</h2>

          <div className="Juego-cuadro">
            <h3>Nombre del juego</h3>
            <input
              type="text"
              placeholder="Escribe el nombre..."
              value={nombre}
              onChange={manejarCambioNombre}
            />
            <p className="contador">{nombre.length}/100</p>
          </div>

          <div className="Juego-cuadro">
            <h3>Descripción</h3>
            <textarea
              placeholder="Escribe una breve descripción..."
              value={descripcion}
              onChange={manejarCambioDescripcion}
            ></textarea>
            <p className="contador">{descripcion.length}/500</p>
          </div>

          <div className="Juego-cuadro">
            <h3>Precio</h3>
            <input
              type="text"
              placeholder="$0.00"
              value={precio}
              onChange={manejarCambioPrecio}
            />
            <p className="contador">Máximo: $200.00, hasta 5 dígitos</p>
          </div>

          <div className="Juego-cuadro">
            <h3>Carnet (Usuario)</h3>
            <input
              type="text"
              placeholder="#12345678"
              value={carnet}
              onChange={manejarCambioCarnet}
            />
            <p className="contador">Debe tener 8 dígitos, mínimo #00000001</p>
          </div>

          <div className="Juego-botones">
            <button className="Juego-publicar" onClick={manejarPublicacion}>Enviar Solicitud</button>
            <button className="Juego-volver" onClick={() => navigate('/')}>Volver al inicio</button>
          </div>
        </div>

        {notificacion.mostrar && (
          <div className={`Juego-toast ${notificacion.tipo === 'advertencia' ? 'toast-advertencia' : 'toast-exito'}`}>
            {notificacion.mensaje}
          </div>
        )}
      </section>

      <footer className="Inicio-footer">
        <p>© 2025 UCA Game Store</p>
      </footer>
    </main>
  )
}

export default Venta
