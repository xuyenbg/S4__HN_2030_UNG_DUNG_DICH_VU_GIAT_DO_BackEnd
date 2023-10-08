const express = require("express");
const { getListSetPrice } = require("../controllers/set_prices_controller");
const router = express.Router();

router.get("/", getListSetPrice);

module.exports = router;
