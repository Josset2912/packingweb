const express = require("express");
const router = express.Router();
const {
  getRecepcionUva,
  addRecepcionUva,
} = require("../controllers/recepcionUvaController");

router.get("/", getRecepcionUva);
router.post("/", addRecepcionUva);

module.exports = router;
