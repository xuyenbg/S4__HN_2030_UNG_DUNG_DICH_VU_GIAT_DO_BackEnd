const { Store } = require("express-session");
const AddressModel = require("../../models/address_model");
const geolib = require("geolib");
const StoreModel = require("../../models/stores_model");

exports.getListAddress = async (req, res) => {
  try {
    const listAddress = await AddressModel.find().populate({
      path: "idUser",
      populate: { path: "idRole", model: "RoleModel" },
    });

    res.json(listAddress);
  } catch (e) {
    console.log(e);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { longitude, latitude, address, idUser, isDefault } = req.body;

    const newAddress = new AddressModel({
      longitude: longitude,
      latitude: latitude,
      isDefault: isDefault,
      idUser: idUser,
      address: address,
    });

    if (isDefault == true) {
      newAddress.save().then((newAddress) => {
        AddressModel.updateMany(
          { _id: { $ne: newAddress.id }, idUser: idUser },
          { $set: { isDefault: false } }
        )
          .then(() => {
            // Cập nhật địa chỉ được chỉ định thành mặc định (true)
            return AddressModel.findByIdAndUpdate(newAddress.id, {
              $set: { isDefault: true },
            });
          })
          .then(() => {
            res.send("Thêm địa chỉ thành công");
          });
      });
    } else {
      newAddress.save().then((_) => {
        res.send("Thêm địa chỉ thành công");
      });
    }
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(error);
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const idAddress = req.params.idAddress;
    const { longitude, latitude, address, isDefault } = req.body;

    const addressObject = await AddressModel.findOne({ _id: idAddress });

    if (isDefault == true) {
      AddressModel.updateMany(
        { _id: { $ne: idAddress }, idUser: addressObject.idUser },
        { $set: { isDefault: false } }
      )
        .then(() => {
          // Cập nhật địa chỉ được chỉ định thành mặc định (true)
          return AddressModel.findByIdAndUpdate(idAddress, {
            $set: { isDefault: true },
          });
        })
        .then(async () => {
          await AddressModel.findByIdAndUpdate(
            { _id: idAddress },
            {
              longitude:
                longitude != null || longitude != undefined
                  ? longitude
                  : addressObject.longitude,
              latitude:
                latitude != null || latitude != undefined
                  ? latitude
                  : addressObject.latitude,
              address:
                address != null || address != undefined
                  ? address
                  : addressObject.address,
              isDefault:
                isDefault != null || isDefault != undefined
                  ? isDefault
                  : addressObject.isDefault,
              idUser: addressObject.idUser,
            }
          ).then((_) => {
            res.send("Cập nhật địa chỉ thành công");
          });
        });
    } else {
      await AddressModel.findByIdAndUpdate(
        { _id: idAddress },
        {
          longitude:
            longitude != null || longitude != undefined
              ? longitude
              : addressObject.longitude,
          latitude:
            latitude != null || latitude != undefined
              ? latitude
              : addressObject.latitude,
          address:
            address != null || address != undefined
              ? address
              : addressObject.address,
          isDefault:
            isDefault != null || isDefault != undefined
              ? isDefault
              : addressObject.isDefault,
          idUser: addressObject.idUser,
        }
      ).then((_) => {
        res.send("Cập nhật địa chỉ thành công");
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.updateAddressDefault = (req, res) => {
  try {
    const idAddress = req.params.idAddress;
    const idUser = req.query.idUser;

    // set tất cả địa chỉ khác với idAddress truyền từ params theo iduser thành false, sau đó update lại địa chỉ đó thành true
    AddressModel.updateMany(
      { _id: { $ne: idAddress }, idUser: idUser },
      { $set: { isDefault: false } }
    )
      .then(() => {
        // Cập nhật địa chỉ được chỉ định thành mặc định (true)
        return AddressModel.findByIdAndUpdate(idAddress, {
          $set: { isDefault: true },
        });
      })
      .then(() => {
        res.send("Cập nhật thành công.");
      })
      .catch((error) => {
        res.status(500).send("Lỗi khi cập nhật");
        console.error("Lỗi khi cập nhật:", error);
      });
  } catch (e) {
    console.log(e);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const idAddress = req.params.idAddress;

    await AddressModel.findByIdAndDelete({ _id: idAddress }).then((_) => {
      res.send("Xoá địa chỉ thành công");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getAddressById = async (req, res) => {
  try {
    const idAddress = req.params.idAddress;
    const address = await AddressModel.findById(idAddress).populate("idUser");

    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListAddressByIdUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const listAddress = await AddressModel.find({ idUser: idUser }).populate(
      "idUser"
    );

    res.json(listAddress);
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListStoreNearest = async (req, res) => {
  const userLocation = {
    latitude: req.params.latitude,
    longitude: req.params.longitude,
  };

  const listStore = await StoreModel.find()
    .populate("idUser")
    .populate("idAddress");
  const distances = listStore.map((store) => ({
    storeId: store.id.toString(),
    storeName: store.name,
    distance: parseFloat(
      geolib.getDistance(userLocation, {
        latitude: store.idAddress.latitude || 0,
        longitude: store.idAddress.longitude || 0,
      })
    ),
    distanceUnit: "meters",
  }));
  distances.sort((a, b) => a.distance - b.distance);

  res.status(200).json(distances);
};
