import { db } from "../Data/connection.js";

// Controlador para POST aprobar solicitud
export const aprobarSolicitud = async (req, res) => {
    const { role } = req.user;
    
    if (role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado: Se requieren permisos de administrador." });
    }

    const { solicitud_id, imagen_url } = req.body;

    if (!solicitud_id || !imagen_url) {
        return res.status(400).json({ success: false, message: "Faltan datos." });
    }

    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const solicitudResult = await client.query(
            "SELECT * FROM solicitudes_venta WHERE id = $1",
            [solicitud_id]
        );

        if (solicitudResult.rowCount === 0) throw new Error(`Solicitud no encontrada.`);

        const solicitud = solicitudResult.rows[0];

        const insertJuegoQuery = `
            INSERT INTO juegos (nombre, descripcion, precio, imagen, usuario_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const values = [
            solicitud.nombre,
            solicitud.descripcion,
            solicitud.precio,
            imagen_url,
            solicitud.usuario_id
        ];

        const nuevoJuegoResult = await client.query(insertJuegoQuery, values);
        const nuevoJuego = nuevoJuegoResult.rows[0];

        await client.query(
            "UPDATE solicitudes_venta SET estado = 'aprobada' WHERE id = $1",
            [solicitud_id]
        );

        await client.query('COMMIT');

        return res.status(201).json({
            success: true,
            message: `Juego '${nuevoJuego.nombre}' aprobado`,
            juegoPublicado: nuevoJuego
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        return res.status(500).json({ success: false, message: "Error al aprobar" });
    } finally {
        client.release();
    }
};