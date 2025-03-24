const express = require("express");
const router = express.Router();
const { getFrioData,addFrioData } = require("../controllers/frioController"); // ✅ Asegúrate de que el import es correcto

router.get("/", getFrioData); // ✅ Define la ruta correctamente
router.post("/", addFrioData); // ✅ Define la ruta correctamente
module.exports = router;
