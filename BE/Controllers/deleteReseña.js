import { db } from "../Data/connection.js";

// Controlador para DELETE reseña
export const deleteReseña = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const query = "DELETE FROM reseñas WHERE id = $1 RETURNING *";

        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontró ninguna reseña con ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Reseña con ID: ${id} fue eliminada.`,
            reseñaEliminada: result.rows[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la reseña",
            error: error.message
        });
    }
};