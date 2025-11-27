import { db } from '../Data/connection.js';
import jwt from 'jsonwebtoken';
import { generateHash, compareHash } from '../Utils/hash.js';
import { JWT_SECRET } from '../Keys/keys.js';

// REGISTRAR USUARIO (SIGNUP)
export const signupUser = async (req, res) => {
    const { carnet, password } = req.body;

    try {
        if (!carnet || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const check = await db.query('SELECT * FROM usuarios WHERE carnet = $1', [carnet]);
        if (check.rows.length > 0) {
            return res.status(400).json({ message: "El carnet ya está registrado" });
        }

        const hash = await generateHash(password);

        const result = await db.query(
            'INSERT INTO usuarios (carnet, password) VALUES ($1, $2) RETURNING id, carnet',
            [carnet, hash]
        );

        res.status(201).json({ message: "Usuario registrado con éxito", user: result.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// INICIAR SESIÓN USUARIO (SIGNIN / LOGIN)
export const signinUser = async (req, res) => {
    const { carnet, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM usuarios WHERE carnet = $1', [carnet]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = result.rows[0];
        const isValid = await compareHash(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.id, carnet: user.carnet, role: 'usuario' },
            JWT_SECRET,
            { expiresIn: '1h' }
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