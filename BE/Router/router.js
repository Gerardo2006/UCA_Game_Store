import express from "express";
import { getJuegos, getJuegoById } from "../Controllers/getJuegos.js";
import { updateJuego } from "../Controllers/updateJuego.js";

// Creación del router
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: true, message: "API funcionando" });
});

// Rutas
router.get("/juegos", getJuegos);
router.get("/juegos/:id", getJuegoById);
router.put("/juegos/:id", updateJuego);


export default router;