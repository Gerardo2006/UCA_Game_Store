import { db } from "../Data/connection.js"; 

// Controlador para POST reseñas
export const crearReseña = async (req, res) => {
  try {
    const { juego_id, calificacion, carnet, texto } = req.body;

    if (!juego_id || !calificacion || !carnet) {
      return res.status(400).json({
        success: false,
        message: "ID del juego, calificación y carnet son obligatorios.",
      });
    }

    const query = `
      INSERT INTO reseñas (juego_id, calificacion, carnet_usuario, texto) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const values = [juego_id, calificacion, carnet, texto || null]; 

    const result = await db.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Reseña creada con éxito",
      reseña: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear la reseña",
      error: error.message,
    });
  }
};
