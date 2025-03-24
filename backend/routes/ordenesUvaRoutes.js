const express = require("express");
const router = express.Router();
const {
  getOrdenesUva,
  addOrdenesUva,
} = require("../controllers/ordenesUvaController");

// Ruta para obtener datos
router.get("/", getOrdenesUva);

// Ruta para agregar un nuevo registro
router.post("/", addOrdenesUva);

module.exports = router;
