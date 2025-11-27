import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { signupClient, signinClient } from "../Controllers/clientAuthController.js";
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

// Rutas de autenticación
router.post("/auth/signup", signupClient);
router.post("/auth/signin", signinClient);

// Rutas para cliente
router.post("/juegos/solicitud", verifyToken, crearSolicitud);
router.post("/resenas", verifyToken, crearReseña);


router.get("/juegos", getJuegos);
router.get("/juegos/:id", getJuegoById);
router.put("/juegos/:id", updateJuego);
router.get("/resenas/:id", getReseñas);
router.delete("/resenas/:id", deleteReseña);
router.delete("/juegos/:id", deleteJuego);
router.get("/admin/solicitudes", getSolicitudesPendientes);
router.post("/admin/aprobar", aprobarSolicitud);
router.put("/admin/rechazar/:id", rechazarSolicitud);

export default router;