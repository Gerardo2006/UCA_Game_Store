import express from "express";
import { getJuegos, getJuegoById } from "../Controllers/getJuegos.js";
import { updateJuego } from "../Controllers/updateJuego.js";
import { crearSolicitud } from "../Controllers/crearSolicitud.js";
import { getReseñas } from "../Controllers/getReseñas.js";
import { crearReseña } from "../Controllers/crearReseña.js";
import { getSolicitudesPendientes } from "../Controllers/getSolicitudes.js";
import { aprobarSolicitud } from "../Controllers/aprobarSolicitud.js";
import { rechazarSolicitud } from "../Controllers/rechazarSolicitud.js";

// Creación del router
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: true, message: "API funcionando" });
});

// Rutas
router.get("/juegos", getJuegos);
router.get("/juegos/:id", getJuegoById);
router.put("/juegos/:id", updateJuego);
router.post("/juegos/solicitud", crearSolicitud);
router.get("/resenas/:id", getReseñas);
router.post("/resenas", crearReseña);
router.get("/admin/solicitudes", getSolicitudesPendientes);
router.post("/admin/aprobar", aprobarSolicitud);
router.put("/admin/rechazar/:id", rechazarSolicitud);

export default router;