const express = require("express");
const {
  getGasificadoPre,
  addGasificadoPre,
} = require("../controllers/gasificadoPreController"); // 🔥 Verifica que el nombre sea correcto

const router = express.Router();

router.get("/", getGasificadoPre); // 🔥 Asegúrate de que esta función existe
router.post("/", addGasificadoPre); // 🔥 Asegúrate de que esta función existe

module.exports = router;
