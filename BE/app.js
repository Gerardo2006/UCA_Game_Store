import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./Keys/keys.js";
import { db } from "./data/connection.js";
import apiRouter from "./Router/router.js";

// Configuración básica
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Rutas
app.use('/api', apiRouter);

// Iniciar Servidor
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);