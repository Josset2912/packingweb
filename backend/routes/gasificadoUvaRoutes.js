const express = require("express");
const {
  getGasificadoUva,
  addGasificadoUva,
} = require("../controllers/gasificadoUvaController"); // 🔥 Verifica que el nombre sea correcto

const router = express.Router();

router.get("/", getGasificadoUva); // 🔥 Asegúrate de que esta función existe
router.post("/", addGasificadoUva); // 🔥 Asegúrate de que esta función existe
module.exports = router;
