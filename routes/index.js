var express = require("express");
var router = express.Router();
const checkLogin = require("../middleware/checkLogin");
const AuthController = require("../controllers/auth_controller");
const HomeCtl = require("../controllers/home_controler");
// /* GET home page. */
// router.get("/", checkLogin.reqLogin, function (req, res, next) {
//   res.render("home", { title: "Express" });
// });

router.get("/", checkLogin.reqLogin, HomeCtl.data);

router.get("/logout", checkLogin.reqLogin, AuthController.logoutAdmin);

// đoạn code ở đây chỉ mang tính chất hiện lên trang table
router.get("/table", async (req, res) => {
  try {
    res.render("table");
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
});

module.exports = router;
