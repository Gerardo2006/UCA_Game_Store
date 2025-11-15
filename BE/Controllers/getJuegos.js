import { db } from "../data/connection.js";

// Controlador para GET juegos
export const getJuegos = async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM juegos ORDER BY fecha_publicacion DESC");

        const juegos = results.rows;
        const totalJuegos = results.rowCount;

        return res.status(200).json({
            success: true,
            message: `Juegos encontrados: ${totalJuegos}`,
            juegos: juegos,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener juegos",
            error: error.message
        });
    }
};

//Controlador para GET un juego por ID
export const getJuegoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await db.query("SELECT * FROM juegos WHERE id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontró ningún juego con ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            juego: result.rows[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el juego",
            error: error.message
        });
    }
};