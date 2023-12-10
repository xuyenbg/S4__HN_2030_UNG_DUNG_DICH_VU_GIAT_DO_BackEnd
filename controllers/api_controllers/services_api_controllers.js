const ServiceModel = require("../../models/services_model");
const SaleModel = require("../../models/sale_model");
const AttributeModel = require("../../models/attribute_model");

exports.getListService = async (req, res) => {
  try {
    const listServices = await ServiceModel.find()
      .populate("idCategory")
      .populate("attributeList")
      .populate("idSale")
      .populate("idStore")
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      });

    res.json(listServices);
  } catch (e) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(e);
  }
};

exports.getServiceByIdStore = async (req, res) => {
  try {
    const idStore = req.params.idStore;
    const listServices = await ServiceModel.find({ idStore: idStore })
      .populate("idCategory")
      .populate("attributeList")
      .populate("idSale")
      .populate("idStore")
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      });
    res.json(listServices);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.getServiceByIdStoreAndIdService = async (req, res) => {
  const idStore = req.query.idStore;
  const idService = req.query.idService;
  try {
    let listService = [];
    if (idService != null || idService != undefined) {
      listService = await ServiceModel.find({ idStore: idStore });
      const listCheckedService = listService.filter(
        (item) => !item._id.equals(idService)
      );
      res.status(200).json(listCheckedService);
    } else {
      listService = await ServiceModel.find({ idStore: idStore })
        .populate("idCategory")
        .populate("attributeList")
        .populate("idSale")
        .populate("idStore")
        .populate({
          path: "idStore",
          populate: {
            path: "idAddress",
            model: "AddressModel",
          },
        })
        .populate({
          path: "idStore",
          populate: {
            path: "idUser",
            model: "UserModel",
          },
        });
      res.status(200).json(listService);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

// sua api nay
exports.getServiceByIdCategory = async (req, res) => {
  try {
    const idCategory = req.params.idCategory;

    const listService = await ServiceModel.find({ idCategory: idCategory })
      .populate("idCategory")
      .populate("attributeList")
      .populate("idSale")
      .populate("idStore")
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      });

    const uniqueServices = [];
    listService.forEach((service) => {
      const exist = uniqueServices.some(
        (uniqueService) =>
          uniqueService.name.toLowerCase() === service.name.toLowerCase()
      );

      if (!exist) {
        uniqueServices.push(service);
      }
    });

    res.json(uniqueServices);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.insertService = async (req, res) => {
  try {
    const {
      name,
      attributeList,
      price,
      isActive,
      unit,
      idCategory,
      idStore,
      unitSale,
      valueSale,
    } = req.body;
    console.log(attributeList);
    // console.log(JSON.parse(attributeList[0]))

    if (
      unitSale != undefined ||
      unitSale != null ||
      valueSale != undefined ||
      valueSale != null
    ) {
      const newSale = new SaleModel({
        value: valueSale,
        unit: unitSale,
      });
      var listAttribute = [];
      if (attributeList != null || attributeList != undefined) {
        if (attributeList.length != 0) {
          for (let index = 0; index < attributeList.length; index++) {
            try {
              var objAttribute = JSON.parse(attributeList[index]);

              console.log("name :" + objAttribute.name);
              console.log("price :" + objAttribute.price);
              const insertAttribute = new AttributeModel({
                name: objAttribute.name,
                price: objAttribute.price,
              });
              await insertAttribute.save().then((newAttribute) => {
                listAttribute.push(newAttribute._id);
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      console.log(listAttribute);
      newSale.save().then((newSale) => {
        const newService = new ServiceModel({
          name: name,
          attributeList: listAttribute,
          price: price,
          image:
            req.file == null || req.file == undefined
              ? null
              : `/img/${req.file.filename}`,
          isActive: isActive,
          unit: unit,
          idCategory: idCategory,
          idSale: newSale._id,
          idStore: idStore,
        });

        newService.save().then((newService) => {
          // newService là item vừa thêm, cần xem chi tiết thì log ra
          res.send("Thêm dịch vụ thành công");
        });
      });
    } else {
      var listAttribute = [];
      if (attributeList != null || attributeList != undefined) {
        if (attributeList.length != 0) {
          for (let index = 0; index < attributeList.length; index++) {
            try {
              var objAttribute = JSON.parse(attributeList[index]);
  
              console.log("name :" + objAttribute.name);
              console.log("price :" + objAttribute.price);
              const insertAttribute = new AttributeModel({
                name: objAttribute.name,
                price: objAttribute.price,
              });
              await insertAttribute.save().then((newAttribute) => {
                listAttribute.push(newAttribute._id);
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      
      console.log(listAttribute);
      const newService = new ServiceModel({
        name: name,
        attributeList: listAttribute,
        price: price,
        image:
          req.file == null || req.file == undefined
            ? null
            : `/img/${req.file.filename}`,
        isActive: isActive,
        unit: unit,
        idCategory: idCategory,
        idSale: null,
        idStore: idStore,
      });

      newService.save().then((newService) => {
        // newService là item vừa thêm, cần xem chi tiết thì log ra
        res.send("Thêm dịch vụ thành công");
      });
    }
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.searchServiceByName = async (req, res) => {
  const nameSearch = req.query.name;
  try {
    const listService = await ServiceModel.find()
      .populate("idCategory")
      .populate("attributeList")
      .populate("idSale")
      .populate("idStore")
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      });
    const listSearch = listService.filter((item) =>
      item.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
    res.status(200).json(listSearch);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

exports.updateService = async (req, res) => {
  try {
    const idService = req.params.idService;
    const {
      name,
      attributeList,
      price,
      isActive,
      unit,
      idCategory,
      idStore,
      unitSale,
      valueSale,
    } = req.body;
    console.log(req.body);

    const service = await ServiceModel.findOne({ _id: idService });
    let sale;
    if (service.idSale != null || service.idSale != undefined) {
      sale = await SaleModel.findOne({ _id: service.idSale });
    } else {
      sale = sale;
    }
    var listAttributePost = [];
    if (attributeList != null || attributeList != undefined) {
      if (attributeList.length > 0) {
        for (let i = 0; i < attributeList.length; i++) {
          var objAttribute = JSON.parse(attributeList[i]);

          // var objAttribute = attributeList[i];

          if (i == service.attributeList.length) {
            const insertAttribute = new AttributeModel({
              name: objAttribute.name,
              price: objAttribute.price,
            });
            await insertAttribute.save().then((newObj) => {
              listAttributePost.push(newObj._id);
            });
          } else {
            console.log("list id: " + i + ":" + service.attributeList[i]);
            const attributeObj = await AttributeModel.findOne({
              _id: service.attributeList[i],
            });
            console.log(attributeObj);
            if (attributeObj.name !== objAttribute.name) {
              console.log(objAttribute);
              const insertAttribute = new AttributeModel({
                name: objAttribute.name,
                price: objAttribute.price,
              });
              await insertAttribute.save().then((newObj) => {
                listAttributePost.push(newObj._id);
              });
            } else {
              listAttributePost.push(service.attributeList[i]._id);
            }
          }
        }
      }
    }

    if (
      unitSale != undefined ||
      unitSale != null ||
      valueSale != undefined ||
      valueSale != null
    ) {
      if (unitSale != sale.unit || valueSale != sale.value) {
        const newSale = new SaleModel({
          value: valueSale,
          unit: unitSale,
        });

        newSale.save().then(async (newSale) => {
          await ServiceModel.findByIdAndUpdate(
            { _id: idService },
            {
              name: name != null || name != undefined ? name : service.name,
              attributeList:
                attributeList != null || attributeList != undefined
                  ? listAttributePost
                  : service.attributeList,
              price:
                price != null || price != undefined ? price : service.price,
              image:
                req.file == null || req.file == undefined
                  ? service.image
                  : `/img/${req.file.filename}`,
              isActive:
                isActive != null || isActive != undefined
                  ? isActive
                  : service.isActive,
              unit: unit != null || unit != undefined ? unit : service.unit,
              idCategory:
                idCategory != null || idCategory != undefined
                  ? idCategory
                  : service.idCategory,
              idSale: newSale._id,
              idStore:
                idStore != null || idStore != undefined
                  ? idStore
                  : service.idStore,
            }
          ).then((_) => {
            res.send("Cập nhật dịch vụ thành công");
          });
        });
      } else {
        await ServiceModel.findByIdAndUpdate(
          {
            _id: idService,
          },
          {
            name: name != null || name != undefined ? name : service.name,
            attributeList:
              attributeList != null || attributeList != undefined
                ? listAttributePost
                : service.attributeList,
            price: price != null || price != undefined ? price : service.price,
            image:
              req.file == null || req.file == undefined
                ? service.image
                : `/img/${req.file.filename}`,
            isActive:
              isActive != null || isActive != undefined
                ? isActive
                : service.isActive,
            unit: unit != null || unit != undefined ? unit : service.unit,
            idCategory:
              idCategory != null || idCategory != undefined
                ? idCategory
                : service.idCategory,
            idSale: service.idSale,
            idStore:
              idStore != null || idStore != undefined
                ? idStore
                : service.idStore,
          }
        ).then((_) => {
          res.send("Cập nhật dịch vụ thành công");
        });
      }
    } else {
      await ServiceModel.findByIdAndUpdate(
        {
          _id: idService,
        },
        {
          name: name != null || name != undefined ? name : service.name,
          attributeList:
            attributeList != null || attributeList != undefined
              ? listAttributePost
              : service.attributeList,
          price: price != null || price != undefined ? price : service.price,
          image:
            req.file == null || req.file == undefined
              ? service.image
              : `/img/${req.file.filename}`,
          isActive:
            isActive != null || isActive != undefined
              ? isActive
              : service.isActive,
          unit: unit != null || unit != undefined ? unit : service.unit,
          idCategory:
            idCategory != null || idCategory != undefined
              ? idCategory
              : service.idCategory,
          idSale: service.idSale,
          idStore:
            idStore != null || idStore != undefined ? idStore : service.idStore,
        }
      ).then((_) => {
        res.send("Cập nhật dịch vụ thành công");
      });
    }
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.getServiecById = async (req, res) => {
  const idService = req.params.idService;
  try {
    const objService = await ServiceModel.findOne({ _id: idService })
      .populate("idCategory")
      .populate("attributeList")
      .populate("idSale")
      .populate("idStore")
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      });

    res.status(200).json(objService);
  } catch (error) {
    res.status(500).json(error);
  }
};
