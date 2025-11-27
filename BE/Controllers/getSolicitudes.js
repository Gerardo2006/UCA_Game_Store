import { db } from '../Data/connection.js';

// Controlador para GET solicitudes de venta pendiente
export const getSolicitudesPendientes = async (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado: Se requieren permisos de administrador." });
    }

    try {
        const query = `
            SELECT 
                s.id, 
                s.nombre, 
                s.descripcion, 
                s.precio, 
                s.estado, 
                s.fecha_solicitud, 
                u.carnet, 
                (u.carnet || '@uca.edu.sv') AS contacto_generado
            FROM solicitudes_venta s
            JOIN usuarios u ON s.usuario_id = u.id
            WHERE s.estado = 'pendiente'
            ORDER BY s.fecha_solicitud ASC
        `;

        const result = await db.query(query);
        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener solicitudes" });
    }
};