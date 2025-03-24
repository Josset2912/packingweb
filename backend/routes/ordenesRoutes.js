const express = require("express");
const router = express.Router();
const { getOrdenes, addOrdenes } = require("../controllers/ordenesController");

// Ruta para obtener datos
router.get("/", getOrdenes);

// Ruta para agregar un nuevo registro
router.post("/", addOrdenes);

module.exports = router;
