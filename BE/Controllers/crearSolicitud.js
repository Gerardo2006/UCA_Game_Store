import { db } from "../Data/connection.js";

// Controlador para POST
export const crearSolicitud = async (req, res) => {
    try {
        const { nombre, descripcion, precio, carnet } = req.body;

        if (!nombre || !precio || !carnet) {
            return res.status(400).json({
                success: false,
                message: "Nombre, precio y carnet son obligatorios."
            });
        }

        const precioNumerico = parseFloat(precio.replace('$', '')) || 0;

        const query = `
            INSERT INTO solicitudes_venta (nombre, descripcion, precio, carnet_vendedor) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        const values = [nombre, descripcion, precioNumerico, carnet];

        const result = await db.query(query, values);

        return res.status(201).json({
            success: true,
            message: "Solicitud de venta enviada con éxito.",
            solicitud: result.rows[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al enviar la solicitud de venta",
            error: error.message
        });
    }
};