const express = require("express");
const CategoriesApiController = require('../../controllers/api_controllers/categories_api_controllers')
const router = express.Router();

router.get("/list", CategoriesApiController.getListCategory);

module.exports = router;
