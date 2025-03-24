const express = require("express");
const router = express.Router();
const { getFrioUva,addFrioUva } = require("../controllers/frioUvaController"); // ✅ Asegúrate de que el import es correcto

router.get("/", getFrioUva); // ✅ Define la ruta correctamente
router.get("/", addFrioUva); // ✅ Define la ruta correctamente
module.exports = router;
