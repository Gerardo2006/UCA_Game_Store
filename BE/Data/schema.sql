CREATE TABLE administradores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Tabla: Usuarios (Antes Clientes)
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  carnet VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Tabla: Juegos
CREATE TABLE juegos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  imagen TEXT,
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE 
);

-- Tabla: Solicitudes de ventas
CREATE TABLE solicitudes_venta (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE 
);

-- Tabla: Reseñas
CREATE TABLE reseñas (
  id SERIAL PRIMARY KEY,
  comentario TEXT NOT NULL,
  calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  juego_id INT REFERENCES juegos(id) ON DELETE CASCADE,
  usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE 
);