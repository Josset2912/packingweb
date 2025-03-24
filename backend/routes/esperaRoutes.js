const express = require("express");
const { getEspera, addEspera } = require("../controllers/esperaController");

const router = express.Router();

router.post("/", addEspera); // 🔥 Debe coincidir con lo que busca el frontend
router.get("/", getEspera); // 🔥 Debe coincidir con lo que busca el frontend

module.exports = router;
