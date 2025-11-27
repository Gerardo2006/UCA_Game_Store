import { db } from '../Data/connection.js';

// Controlador para DELETE juego
export const deleteCliente = async (req, res) => {
    const { id } = req.params;
    
    const { role } = req.user; 

    if (role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado: Solo los administradores pueden eliminar clientes." });
    }

    try {
        const query = 'DELETE FROM clientes WHERE id = $1 RETURNING id, carnet';
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se encontró un cliente con ese ID." });
        }

        res.status(200).json({ 
            message: "Cliente eliminado exitosamente.", 
            cliente_eliminado: result.rows[0] 
        });

    } catch (error) {
        console.error("Error en deleteCliente:", error);
        res.status(500).json({ message: "Error al intentar eliminar el cliente." });
    }
};