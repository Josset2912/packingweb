const express = require("express");
const {
  getEsperaUva,
  addEsperaUva,
} = require("../controllers/esperaUvaController");

const router = express.Router();

router.get("/", getEsperaUva); // 🔥 Debe coincidir con lo que busca el frontend
router.post("/", addEsperaUva); // 🔥 Debe coincidir con lo que busca el frontend
module.exports = router;
