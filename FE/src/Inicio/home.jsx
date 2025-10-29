import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
import logo from '../assets/logo.png'

function Home() {
  const navigate = useNavigate()

  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: 'Marvel: Spider Man',
      descripcion:
        'Una aventura épica en la piel de Spider-Man, con una narrativa envolvente y combates fluidos.',
      imagen: 'https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/C784xeOFo2wViCf4m5bxgoeH.png',
      precio: 59.99
    },
    {
      id: 2,
      nombre: 'EA Sports FC 25',
      descripcion:
        'La última entrega de fútbol con gráficos realistas y modos de juego variados.',
      imagen: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2669320/86a267ec44fc57124127eba46f25120813374317/capsule_616x353.jpg?t=1752681627',
      precio: 69.99
    },
    {
      id: 3,
      nombre: 'Minecraft',
      descripcion:
        'Un juego de construcción y aventura en un mundo abierto de bloques.',
      imagen: 'https://gaming-cdn.com/images/products/442/orig/minecraft-java-and-bedrock-edition-java-and-bedrock-edition-pc-game-cover.jpg?v=1716387513',
      precio: 29.99
    },
    {
      id: 4,
      nombre: 'The Last of Us Part II Remastered',
      descripcion:
        'Una historia emocionalmente intensa en un mundo post-apocalíptico.',
      imagen: 'https://blog.playstation.com/uploads/2024/01/76a2583e03ed46f0d63c50b9c347937d6a251a6a.jpeg',
      precio: 39.99
    },
    {
      id: 5,
      nombre: 'God of War Ragnarok',
      descripcion:
        'Una épica aventura en la mitología nórdica con un enfoque en la narrativa y la exploración.',
      imagen: 'https://igm.gg/_next/image?url=https%3A%2F%2Fstorage.yandexcloud.net%2Figm-s3%2FPROD%2F202408%2F86b1fcae%2FGod_of_War_%D0%A0%D0%B0%D0%B3%D0%BD%D0%B0%D1%80%D1%91%D0%BA.png&w=640&q=75',
      precio: 69.99
    },
    {
      id: 6,
      nombre: 'Hollow Knight',
      descripcion:
        'Un juego de acción y aventura en 2D con un hermoso estilo artístico y una jugabilidad desafiante.',
      imagen: 'https://i.ytimg.com/vi/JuP47fRBsWg/maxresdefault.jpg',
      precio: 19.99
    },
    {
      id: 7,
      nombre: 'Hollow Knight: Silksong',
      descripcion:
        'Una secuela muy esperada del aclamado juego de acción y aventura en 2D.',
      imagen: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Hollow_Knight_Silksong_first_cover_art.jpg',
      precio: 29.99
    }
  ])

  const irAVista = producto => {
    navigate(`/compra/${producto.id}`, { state: producto })
  }

  return (
    <main className="Inicio">
      <header className="Inicio-header">
        <div className="Inicio-logo">
          <img src={logo} alt="Logo UCA Games Store" />
        </div>
        <h1>UCA Games Store</h1>
        <nav>
          <a href="#buscar">Buscar</a>
          <a href="#vender">Vender</a>
          <a href="#comprar">Comprar</a>
          <a href="#reseñas">Reseñas</a>
        </nav>
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
                  <p>{producto.precio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="Inicio-footer">
        <p>© 2025 Mi Tienda React</p>
      </footer>
    </main>
  )
}

export default Home
