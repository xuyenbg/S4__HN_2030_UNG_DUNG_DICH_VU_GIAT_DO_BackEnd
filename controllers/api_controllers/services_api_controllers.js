const ServiceModel = require("../../models/services_model");
const SaleModel = require("../../models/sale_model");

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

      if(!exist){
        uniqueServices.push(service)
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

      newSale.save().then((newSale) => {
        const newService = new ServiceModel({
          name: name,
          attributeList: attributeList,
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
      const newService = new ServiceModel({
        name: name,
        attributeList: attributeList,
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
    const listService = await ServiceModel.find().populate("idCategory")
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
    });;
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

    const service = await ServiceModel.findOne({ _id: idService });
    const sale = await SaleModel.findOne({ _id: service.idSale });

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
                  ? attributeList
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
                ? attributeList
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
              ? attributeList
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

exports.getServiecById = async (req,res)=>{
    const idService = req.params.idService;
    try {
        const objService = await ServiceModel.findOne({_id:idService}).populate("idCategory")
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
  
        res.status(200).json(objService)
    } catch (error) {
        res.status(500).json(error)
    }
}