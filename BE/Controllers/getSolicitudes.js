import { db } from '../Data/connection.js';

// Controlador para GET solicitudes de venta pendiente
export const getSolicitudesPendientes = async (req, res) => {
    try {
        const query = `
            SELECT 
                s.id, 
                s.nombre, 
                s.descripcion, 
                s.precio, 
                s.estado,
                s.fecha_solicitud,
                c.carnet,
                (c.carnet || '@uca.edu.sv') AS contacto_generado
            FROM solicitudes s
            JOIN clientes c ON s.cliente_id = c.id
            WHERE s.estado = 'pendiente'
        `;

        const result = await db.query(query);
        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener solicitudes" });
    }
};