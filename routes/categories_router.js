const express = require("express");
const { getListCategory } = require("../controllers/categories_controller");
const router = express.Router();

router.get("/", getListCategory);

module.exports = router;
