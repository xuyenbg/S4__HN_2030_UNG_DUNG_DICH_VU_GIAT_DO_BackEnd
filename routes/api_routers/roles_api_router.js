const express = require("express");
const { getListRole } = require("../../controllers/roles_controller");
const router = express.Router();

router.get("/list", getListRole);

module.exports = router