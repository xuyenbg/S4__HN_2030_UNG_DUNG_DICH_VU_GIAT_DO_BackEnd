const express = require("express");
const { getListRole } = require("../controllers/roles_controller");
const router = express.Router();

router.get("/", getListRole);

module.exports = router