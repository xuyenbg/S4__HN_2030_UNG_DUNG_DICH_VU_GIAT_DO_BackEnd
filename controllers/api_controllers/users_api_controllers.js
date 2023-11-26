const UserModel = require("../../models/users_model");

exports.getListUser = async (req, res) => {
  try {
    const listUser = await UserModel.find()
      .populate("idRole")
      .populate("favoriteStores");

    res.json(listUser);
  } catch (e) {
    console.log(e);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.login = async (req, res) => {
  var user = {
    phone: req.body.phone,
    passwd: req.body.userId,
  };

  const checkExistUser = await UserModel.findOne({ phone: user.phone });
  if (checkExistUser != null) {
    if (user.passwd === checkExistUser.passwd) {
      res.status(200).json({
        message: "Đăng nhập thành công",
        user: checkExistUser,
      });
    } else {
      res.status(401).send("Mật khẩu không đúng");
    }
  } else {
    res.status(401).send("Tài khoản không tồn tại");
  }
};

//validate username

// validate phone
// const isValidPhone = (phone) => {
//     const phoneRegex = /^0[0-9]{9}$/;

//     if (phone.match(phoneRegex)) {
//         return true;
//     }

//     return false;
// }

// validate pass

// const isValidPassword = (password) => {
//     const passwordRegex = /^[A-Z][A-Za-z0-9]{9,}$/;

//     if (password.match(passwordRegex)) {
//         return true;
//     }

//     return false;
// }

exports.register = async (req, res) => {
  var objUser = new UserModel();
  objUser.phone = req.body.phone;
  objUser.passwd = req.body.passwd;
  objUser.fullname = req.body.fullname;
  objUser.idRole = req.body.idRole;
  objUser.favoriteStores = [];
  objUser.createAt = new Date();
  objUser.updateAt = new Date();
  objUser.avatar =
    req.file != null || req.file != undefined
      ? `/img/${req.file.filename}`
      : null;

  const checkExistUser = await UserModel.findOne({ phone: objUser.phone });

  if (objUser.phone === undefined) {
    res.status(500).send("Thiếu thuộc tính phone");
    return;
  }
  if (objUser.passwd === undefined) {
    res.status(500).send("Thiếu thuộc tính passwd");
    return;
  }
  if (objUser.fullname === undefined) {
    res.status(500).send("Thiếu thuộc tính fullname");
    return;
  }

  if (objUser.phone.length === 0) {
    res.status(401).send("Số điện thoại không được bỏ trống");
    return;
  }

  if (checkExistUser != null) {
    res.status(401).send("Số điện thoại đã tồn tại");
    return;
  }

  if (objUser.passwd.length === 0) {
    res.status(401).send("Mật khẩu không được bỏ trống");
    return;
  }

  if (objUser.fullname.length === 0) {
    res.status(401).send("Họ và tên không được bỏ trống");
    return;
  }
  try {
    await objUser.save();
    res.status(200).send("Đăng ký thành công");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const { phone, passwd, fullname } = req.body;

    const user = await UserModel.findOne({ _id: idUser });
    if (phone != null && phone != undefined) {
      const checkExistPhone = await UserModel.findOne({ phone: phone });

      if (checkExistPhone != null) {
        res.status(401).send("Số điện thoại đã tồn tại");
        return;
      }
    }

    await UserModel.findByIdAndUpdate(
      { _id: idUser },
      {
        phone: phone != null || phone != undefined ? phone : user.phone,
        passwd: passwd != null || passwd != undefined ? passwd : user.passwd,
        fullname:
          fullname != null || fullname != undefined ? fullname : user.fullname,
        avatar:
          req.file != null || req.file != undefined
            ? `/img/${req.file.filename}`
            : user.avatar,
        favoriteStores: user.favoriteStores,
        idRole: user.idRole,
        updateAt: Date.now(),
      }
    )
      .then(async (_) => {
        const newUser = await UserModel.findOne({ _id: idUser });
        res.json({
          message: "Cập nhật thông tin người dùng thành công",
          user: newUser,
        });
      })
      .catch((err) => {
        res.status(500).send("Cập nhật thông tin người dùng thất bại");
        console.log(err);
      });
  } catch (err) {
    res.status(500).send("Cập nhật thông tin người dùng thất bại");
    console.log(err);
  }
};

exports.addFavouriteStore = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const favoriteStores = req.body.favoriteStores;

    await UserModel.findOneAndUpdate(
      { _id: idUser, favoriteStores: { $nin: favoriteStores } },
      { $push: { favoriteStores: { $each: favoriteStores } } },
      { new: true }
    ).then((newUser) => {
      res.send("Thêm cửa hàng yêu thích thành công");
      // cần xem thông tin của user mới thì log newUser
      // console.log(newUser);
    });
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.removeFavouriteStore = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const favoriteStores = req.body.favoriteStores;

    await UserModel.findByIdAndUpdate(
      { _id: idUser },
      { $pull: { favoriteStores: { $in: favoriteStores } } },
      { new: true }
    ).then((updateUser) => {
      res.send("Xoá cửa hàng yêu thích thành công");
    });
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.getDetailsUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;

    const user = await UserModel.findOne({ _id: idUser })
      .populate("favoriteStores")
      .populate("idRole");

    res.json(user);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};
