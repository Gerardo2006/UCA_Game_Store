import { db } from "../Data/connection.js";

// Controlador para PUT rechazar solicitud
export const rechazarSolicitud = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const query = `
      UPDATE solicitudes_venta 
      SET estado = 'rechazado' 
      WHERE id = $1 AND estado = 'pendiente'
      RETURNING *;
    `;

        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontró ninguna solicitud pendiente con ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Solicitud con ID: ${id} marcada como 'rechazada'.`,
            solicitud: result.rows[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al rechazar la solicitud",
            error: error.message
        });
    }
};