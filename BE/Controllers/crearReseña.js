import { db } from "../Data/connection.js";

// Controlador para POST reseñas
export const crearReseña = async (req, res) => {
  try {
    const { id: usuario_id, role } = req.user;

    if (role !== 'usuario') {
      return res.status(403).json({ message: "Los administradores no pueden dejar reseñas." });
    }

    const { juego_id, calificacion, comentario } = req.body;

    if (!juego_id || !calificacion || !comentario) {
      return res.status(400).json({ message: "Faltan datos." });
    }

    const query = `
      INSERT INTO reseñas (juego_id, calificacion, usuario_id, comentario) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const values = [juego_id, calificacion, usuario_id, comentario];

    const result = await db.query(query, values);

    res.status(201).json({
      success: true,
      message: "Reseña creada con éxito",
      reseña: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reseña" });
  }
};