import { db } from '../Data/connection.js';

// Controlador para DELETE usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado." });
    }

    try {
        const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING id, carnet';
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Usuario eliminado exitosamente.",
            usuario_eliminado: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};