-- Tabla 1: Solicitudes de ventas
CREATE TABLE solicitudes_venta (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(5, 2) NOT NULL,
  carnet_vendedor VARCHAR(8) NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente', 
  fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla 2: Juegos visibles
CREATE TABLE juegos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(5, 2) NOT NULL,
  imagen TEXT, 
  carnet_vendedor VARCHAR(8) NOT NULL,
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla 3: Reseñas de juegos
CREATE TABLE reseñas (
  id SERIAL PRIMARY KEY,
  juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE, 
  calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
  carnet_usuario VARCHAR(8) NOT NULL,
  texto VARCHAR(500),
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla 4: Clientes
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  carnet VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Tabla 5: Administradores
CREATE TABLE administradores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);