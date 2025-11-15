import express from "express";

// Creación del router
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: true, message: "API funcionando" });
});

export default router;