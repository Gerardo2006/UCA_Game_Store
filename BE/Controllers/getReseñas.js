import { db } from '../Data/connection.js';

// Controlador para GET reseñas
export const getReseñas = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
            SELECT 
                r.id, 
                r.comentario, 
                r.calificacion, 
                r.fecha_publicacion,
                u.carnet AS usuario_carnet 
            FROM reseñas r
            JOIN usuarios u ON r.usuario_id = u.id
            WHERE r.juego_id = $1
            ORDER BY r.fecha_publicacion DESC
        `;

    const result = await db.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener reseñas" });
  }
};