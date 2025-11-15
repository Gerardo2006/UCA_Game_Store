import { db } from "../Data/connection.js";

// Controlador para PUT
export const updateJuego = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { nombre, descripcion, precio, imagen } = req.body;

    const query = `
      UPDATE juegos 
      SET nombre = $1, descripcion = $2, precio = $3, imagen = $4 
      WHERE id = $5
      RETURNING *;
    `;

    const values = [nombre, descripcion, precio, imagen, id];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún juego con ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Juego con ID: ${id} actualizado correctamente.`,
      juego: result.rows[0]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el juego",
      error: error.message
    });
  }
};