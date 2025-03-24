const express = require("express");
const router = express.Router();
const {
  getRecepcion,
  addRecepcion,
} = require("../controllers/recepcionController");

router.get("/", getRecepcion);
router.post("/", addRecepcion);

module.exports = router;
