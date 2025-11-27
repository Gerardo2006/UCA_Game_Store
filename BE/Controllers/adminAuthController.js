import { db } from '../Data/connection.js';
import jwt from 'jsonwebtoken';
import { generateHash, compareHash } from '../Utils/hash.js';
import { JWT_SECRET } from '../Keys/keys.js';

// REGISTRAR ADMIN (SIGNUP)
export const signupAdmin = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const check = await db.query('SELECT * FROM administradores WHERE email = $1', [email]);
        if (check.rows.length > 0) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        const hash = await generateHash(password);

        const result = await db.query(
            'INSERT INTO administradores (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
            [nombre, email, hash]
        );

        res.status(201).json({ message: "Admin registrado", admin: result.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};

// INICIAR SESIÓN ADMIN (LOGIN)
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM administradores WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Admin no encontrado" });
        }

        const admin = result.rows[0];
        const isValid = await compareHash(password, admin.password);

        if (!isValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Bienvenido Admin",
            token,
            admin: { id: admin.id, nombre: admin.nombre, email: admin.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};