import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { signupClient, signinClient } from "../Controllers/clientAuthController.js";
import { signupAdmin, loginAdmin } from "../Controllers/adminAuthController.js";
import { getJuegos, getJuegoById } from "../Controllers/getJuegos.js";
import { updateJuego } from "../Controllers/updateJuego.js";
import { crearSolicitud } from "../Controllers/crearSolicitud.js";
import { getReseñas } from "../Controllers/getReseñas.js";
import { crearReseña } from "../Controllers/crearReseña.js";
import { getSolicitudesPendientes } from "../Controllers/getSolicitudes.js";
import { aprobarSolicitud } from "../Controllers/aprobarSolicitud.js";
import { rechazarSolicitud } from "../Controllers/rechazarSolicitud.js";
import { deleteJuego } from "../Controllers/deleteJuego.js";
import { deleteReseña } from "../Controllers/deleteReseña.js";

// Creación del router
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: true, message: "API funcionando" });
});

// RUTAS PÚBLICAS

// Rutas de autenticación clientes
router.post("/auth/signup", signupClient);
router.post("/auth/signin", signinClient);

// Rutas autenticación administradores
router.post("/auth/admin/signup", signupAdmin);
router.post("/auth/admin/login", loginAdmin);

// Catálogo y vistas
router.get("/juegos", getJuegos);          
router.get("/juegos/:id", getJuegoById);   
router.get("/resenas/:id", getReseñas);

// RUTAS PROTEGIDAS

// Rutas para acciones del cliente
router.post("/juegos/solicitud", verifyToken, crearSolicitud);
router.post("/resenas", verifyToken, crearReseña);

// Rutas de acciones del administrador
router.put("/juegos/:id", verifyToken, updateJuego);
router.delete("/juegos/:id", verifyToken, deleteJuego);
router.delete("/resenas/:id", verifyToken, deleteReseña);

// Rutas de gestión de solicitudes
router.get("/admin/solicitudes", verifyToken, getSolicitudesPendientes);
router.post("/admin/aprobar", verifyToken, aprobarSolicitud);
router.put("/admin/rechazar/:id", verifyToken, rechazarSolicitud);

export default router;