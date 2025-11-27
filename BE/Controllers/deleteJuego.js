import { db } from "../Data/connection.js";

// Controlador para DELETE juego
export const deleteJuego = async (req, res) => {
    const { role } = req.user;
    
    if (role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado: Se requieren permisos de administrador." });
    }

    try {
        const id = parseInt(req.params.id);

        const query = "DELETE FROM juegos WHERE id = $1 RETURNING *";

        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontró ningún juego con ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Juego '${result.rows[0].nombre}' (ID: ${id}) fue eliminado.`,
            juegoEliminado: result.rows[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el juego",
            error: error.message
        });
    }
};