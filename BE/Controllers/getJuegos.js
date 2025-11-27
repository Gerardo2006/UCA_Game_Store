import { db } from '../Data/connection.js';

// Controlador para GET juegos
export const getJuegos = async (req, res) => {
    try {
        // CAMBIO: JOIN con 'usuarios' y columna 'usuario_id'
        const query = `
            SELECT 
                j.id,
                j.nombre, 
                j.descripcion, 
                j.precio, 
                j.imagen, 
                j.fecha_publicacion,
                u.carnet AS carnet_vendedor
            FROM juegos j
            JOIN usuarios u ON j.usuario_id = u.id
            ORDER BY j.fecha_publicacion DESC
        `;

        const { rows } = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los juegos" });
    }
};

//Controlador para GET un juego por ID
export const getJuegoById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT j.*, c.carnet AS carnet_vendedor 
            FROM juegos j
            JOIN usuarios u ON j.usuario_id = u.id
            WHERE j.id = $1
        `;
        const { rows } = await db.query(query, [id]);

        if (rows.length === 0) return res.status(404).json({ message: "Juego no encontrado" });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el juego" });
    }
};
