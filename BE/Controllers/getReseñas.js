import { db } from "../Data/connection.js";

// Controlador para GET reseñas
export const getReseñas = async (req, res) => {
  try {
    const juegoId = parseInt(req.params.id);

    const results = await db.query(
      "SELECT * FROM reseñas WHERE juego_id = $1 ORDER BY fecha_publicacion DESC",
      [juegoId]
    );

    return res.status(200).json({
      success: true,
      reseñas: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener reseñas",
      error: error.message,
    });
  }
};
