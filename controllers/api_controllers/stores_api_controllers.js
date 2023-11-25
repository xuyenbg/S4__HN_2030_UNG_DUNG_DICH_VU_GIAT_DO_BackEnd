const StoreModel = require("../../models/stores_model");
const UserModel = require("../../models/users_model");
const AddressModel = require("../../models/address_model");

exports.getListStore = async (req, res) => {
  try {
    const listStore = await StoreModel.find()
      .populate("idUser")
      .populate("idAddress");

    res.json(listStore);
  } catch (e) {
    console.log(e);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.registerStore = async (req, res) => {
  try {
    const {
      name,
      rate,
      idUser,
      status,
      transportTypeList,
      longitude,
      latitude,
      address,
      isDefault,
    } = req.body;

    const newAddress = new AddressModel({
      longitude: longitude,
      latitude: latitude,
      isDefault: isDefault,
      idUser: idUser,
      address: address,
    });

    const user = await UserModel.findOne({ _id: idUser });

    await newAddress.save().then(async (newAddress) => {
      // sau khi them dia chi thi se them id address vao cua hang
      const newStore = new StoreModel({
        name: name,
        rate: rate,
        idUser: idUser,
        idAddress: newAddress._id,
        status: status,
        transportTypeList: transportTypeList,
        image:
          req.file == null || req.file == undefined
            ? user.avatar
            : `/img/${req.file.filename}`,
      });

      await newStore.save().then(async (newStore) => {
        await UserModel.findByIdAndUpdate(
          { _id: idUser },
          {
            idRole: "6522666361b6e95df121642d",
          }
        ).then(() => {
          res.send("Đăng ký cửa hàng thành công");
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getObjStoreById = async (req, res) => {
  const idUser = req.params.idUser;
  try {
    const objStore = await StoreModel.findOne({ idUser: idUser })
      .populate("idAddress")
      .populate("idUser");
    res.status(200).json(objStore);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.searchStoreByName = async (req, res) => {
  const nameSearch = req.query.name;
  try {
    const listStore = await StoreModel.find();
    const listSearch = listStore.filter((item) =>
      item.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
    res.status(200).json(listSearch);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getStoreByidStore = async (req, res) => {
  const idStore = req.params.idStore;
  try {
    const listStore = await StoreModel.findOne({ _id: idStore })
      .populate("idAddress")
      .populate("idUser");
    res.status(200).json(listStore);
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(error);
  }
};

exports.updateStore = async (req, res) => {
  try {
    const idStore = req.params.idStore;
    const {
      name,
      rate,
      idUser,
      status,
      transportTypeList,
      longitude,
      latitude,
      address,
      isDefault,
    } = req.body;

    const store = await StoreModel.findOne({ _id: idStore });
    const checkAddress = await AddressModel.findOne({ _id: store.idAddress });

    if (
      (longitude != null ||
        longitude != undefined ||
        latitude != null ||
        latitude != undefined) &&
      (longitude != checkAddress.longitude || latitude != checkAddress.latitude)
    ) {
      const newAddress = new AddressModel({
        longitude: longitude,
        latitude: latitude,
        isDefault: isDefault,
        address: address,
        idUser: idUser,
      });

      await newAddress.save().then(async (newAddress) => {
        await StoreModel.findByIdAndUpdate(
          { _id: idStore },
          {
            name: name != null || name != undefined ? name : store.name,
            rate: rate != null || rate != undefined ? rate : store.rate,
            idUser:
              idUser != null || idUser != undefined ? idUser : store.idUser,
            idAddress: newAddress._id,
            status:
              status != null || status != undefined ? status : store.status,
            transportTypeList:
              transportTypeList != null || transportTypeList != undefined
                ? transportTypeList
                : store.transportTypeList,
            image:
              req.file != null || req.file != undefined
                ? `/img/${req.file.filename}`
                : store.image,
          }
        ).then((_) => {
          res.send("Cập nhật cửa hàng thành công");
        });
      });
    } else {
      await StoreModel.findByIdAndUpdate(
        { _id: idStore },
        {
          name: name != null || name != undefined ? name : store.name,
          rate: rate != null || rate != undefined ? rate : store.rate,
          idUser: idUser != null || idUser != undefined ? idUser : store.idUser,
          idAddress: store.idAddress,
          status: status != null || status != undefined ? status : store.status,
          transportTypeList:
            transportTypeList != null || transportTypeList != undefined
              ? transportTypeList
              : store.transportTypeList,
          image:
            req.file != null || req.file != undefined
              ? `/img/${req.file.filename}`
              : store.image,
        }
      ).then((_) => {
        res.send("Cập nhật cửa hàng thành công");
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.updateRateStore = async (req, res) => {
  try {
    const idStore = req.params.idStore;
    const rate = req.body.rate;

    console.log(idStore + " " + rate);

    await StoreModel.findByIdAndUpdate(
      { _id: idStore },
      {
        rate: rate,
      }
    ).then((_) => {
      res.send("Đánh giá cửa hàng thành công");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getNearStore = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.openCloseStore = async (req, res) => {
  try {
    const idStore = req.params.idStore;
    const status = req.body.status;
    await StoreModel.findByIdAndUpdate(
      { _id: idStore },
      {
        status: status,
      }
    ).then((_) => {
      res.send("Cập nhật trạng thái cửa hàng thành công");
    });
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};
