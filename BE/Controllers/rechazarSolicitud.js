import { db } from '../Data/connection.js';

// Controlador para PUT rechazar solicitud
export const rechazarSolicitud = async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    
    if (role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado: Se requieren permisos de administrador." });
    }

    try {
        const query = "UPDATE solicitudes_venta SET estado = 'rechazada' WHERE id = $1";

        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }

        res.status(200).json({ message: "Solicitud rechazada." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al rechazar solicitud" });
    }
};