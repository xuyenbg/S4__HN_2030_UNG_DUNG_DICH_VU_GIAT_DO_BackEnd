const NotificationModel = require("../../models/notification_model");

exports.getListNotification = async (req, res) => {
  try {
    const listNotification = await NotificationModel.find()
      .populate("idUser")
      .populate({
        path: "idUser",
        populate: { path: "idRole", model: "RoleModel" },
      })
      .populate({
        path: "idUser",
        populate: { path: "favoriteStores", model: "StoreModel" },
      });
    res.status(200).json(listNotification);
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListNotificationByIdUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const list = await NotificationModel.find({ idUser: idUser })
      .populate("idUser")
      .populate({
        path: "idUser",
        populate: { path: "idRole", model: "RoleModel" },
      })
      .populate({
        path: "idUser",
        populate: { path: "favoriteStores", model: "StoreModel" },
      });

    res.json(list);
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};
