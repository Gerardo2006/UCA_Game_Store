import { db } from '../Data/connection.js';

// Controlador para POST solicitud venta
export const crearSolicitud = async (req, res) => {
    const { id: usuario_id, role } = req.user;

    if (role !== 'usuario') {
        return res.status(403).json({ message: "Los administradores no pueden crear solicitudes de venta." });
    }

    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || !precio) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const query = `
            INSERT INTO solicitudes_venta (nombre, descripcion, precio, usuario_id, estado) 
            VALUES ($1, $2, $3, $4, 'pendiente')
        `;

        await db.query(query, [nombre, descripcion, precio, usuario_id]);

        res.status(201).json({ message: "Solicitud enviada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear solicitud" });
    }
};