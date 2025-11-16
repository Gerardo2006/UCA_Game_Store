import { db } from "../Data/connection.js";

// Controlador para POST aprobar solicitud
export const aprobarSolicitud = async (req, res) => {

    const { solicitud_id, imagen_url } = req.body;

    if (!solicitud_id || !imagen_url) {
        return res.status(400).json({
            success: false,
            message: "Se requiere 'solicitud_id' y 'imagen_url' en el body."
        });
    }

    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const solicitudResult = await client.query(
            "SELECT * FROM solicitudes_venta WHERE id = $1 AND estado = 'pendiente'",
            [solicitud_id]
        );

        if (solicitudResult.rowCount === 0) {
            throw new Error(`Solicitud con ID ${solicitud_id} no encontrada o ya fue procesada.`);
        }

        const solicitud = solicitudResult.rows[0];

        const insertJuegoQuery = `
      INSERT INTO juegos (nombre, descripcion, precio, imagen, carnet_vendedor)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
        const values = [
            solicitud.nombre,
            solicitud.descripcion,
            solicitud.precio,
            imagen_url,
            solicitud.carnet_vendedor
        ];

        const nuevoJuegoResult = await client.query(insertJuegoQuery, values);
        const nuevoJuego = nuevoJuegoResult.rows[0];

        await client.query(
            "UPDATE solicitudes_venta SET estado = 'aprobado' WHERE id = $1",
            [solicitud_id]
        );

        await client.query('COMMIT');

        return res.status(201).json({
            success: true,
            message: `¡Juego '${nuevoJuego.nombre}' aprobado y publicado!`,
            juegoPublicado: nuevoJuego
        });

    } catch (error) {
        await client.query('ROLLBACK');
        return res.status(500).json({
            success: false,
            message: "Error al aprobar la solicitud",
            error: error.message
        });
    } finally {
        client.release();
    }
};