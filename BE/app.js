import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./Keys/keys.js";
import { db } from "./Data/connection.js";

// Importaremos nuestras rutas
// import apiRouter from "./router/router.js";

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Ruta de bienvenida para probar que el servidor funciona
app.get("/", (req, res) => {
  res.status(200).json({ status: true, message: "¡Bienvenido al Backend de UCA Game Store!" });
});


// --- Iniciar Servidor ---
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);