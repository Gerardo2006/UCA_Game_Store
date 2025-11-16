import { db } from "../Data/connection.js";

// Controlador para GET solicitudes de venta pendiente
export const getSolicitudesPendientes = async (req, res) => {
    try {
        const query = "SELECT * FROM solicitudes_venta WHERE estado = 'pendiente' ORDER BY fecha_solicitud ASC";

        const results = await db.query(query);

        return res.status(200).json({
            success: true,
            solicitudes: results.rows,
            total: results.rowCount
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener solicitudes",
            error: error.message
        });
    }
};