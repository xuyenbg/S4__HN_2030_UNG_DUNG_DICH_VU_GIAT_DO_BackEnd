var express = require("express");
var router = express.Router();
const checkLogin = require("../middleware/checkLogin");
const AuthController = require("../controllers/auth_controller");
const HomeCtl = require('../controllers/home_controler');
// /* GET home page. */
// // router.get("/", checkLogin.reqLogin, function (req, res, next) {
// //   res.render("home", { title: "Express" });
// // });

router.get("/",HomeCtl.data);

router.get("/logout", checkLogin.reqLogin, AuthController.logoutAdmin);

module.exports = router;
