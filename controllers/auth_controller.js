const UserModel = require("../models/users_model");
const RoleModel = require("../models/roles_model");

exports.loginAdmin = async (req, res) => {
  let msg = "";
  if (req.method === "POST") {
    if (req.body.username.length === 0) {
      msg = "Tên tài khoản không được bỏ trống";
      return res.render("login", { msg: msg });
    }
    if (req.body.passwd.length === 0) {
      msg = "Mật khẩu không được bỏ trống";
      return res.render("login", { msg: msg });
    }
    try {
      const objU = await UserModel.findOne({ username: req.body.username });
      if (objU !== null) {
        const objRole = await RoleModel.findOne({ _id: objU.idRole });
        console.log(objRole.name);
        if (objRole.id === "6552dad6ca05d848a1d10b4c") {
          if (objU.passwd !== req.body.passwd) {
            msg = "Mật khẩu không đúng";
          } else {
            req.session.userLogin = objU;
            return res.redirect("/");
          }
        } else {
          msg = "Tài khoản của bạn không có quyền đăng nhập";
          return res.render("login", { msg: msg });
        }
      } else {
        msg = "Tài khoản không tồn tại";
      }
    } catch (error) {
      msg = `Lỗi: ${error}`;
    }
  }
  res.render("login", { msg: msg });
};

exports.logoutAdmin = (req, res) => {
  if (req.session != null) {
    req.session.destroy(function () {
      console.log("Đăng xuất thành công");
      res.redirect("/auth/login");
    });
  }
};
