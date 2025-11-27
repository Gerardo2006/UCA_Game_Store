import { db } from '../Data/connection.js';
import jwt from 'jsonwebtoken';
import { generateHash, compareHash } from '../Utils/hash.js';
import { JWT_SECRET } from '../Keys/keys.js';

// REGISTRAR CLIENTE (SIGNUP)
export const signupClient = async (req, res) => {
    const { carnet, password } = req.body;

    try {
        if (!carnet || !password) {
            return res.status(400).json({ message: "Faltan datos (carnet, password)" });
        }

        const check = await db.query('SELECT * FROM clientes WHERE carnet = $1', [carnet]);
        if (check.rows.length > 0) {
            return res.status(400).json({ message: "El carnet ya está registrado" });
        }

        const hash = await generateHash(password);

        const result = await db.query(
            'INSERT INTO clientes (carnet, password) VALUES ($1, $2) RETURNING id, carnet',
            [carnet, hash]
        );

        res.status(201).json({ message: "Registrado con éxito", user: result.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// INICIAR SESIÓN CLIENTE (SIGNIN / LOGIN)
export const signinClient = async (req, res) => {
    const { carnet, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM clientes WHERE carnet = $1', [carnet]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = result.rows[0];
        const isValid = await compareHash(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.id, carnet: user.carnet, role: 'cliente' },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: "Login correcto",
            token,
            user: { carnet: user.carnet }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};