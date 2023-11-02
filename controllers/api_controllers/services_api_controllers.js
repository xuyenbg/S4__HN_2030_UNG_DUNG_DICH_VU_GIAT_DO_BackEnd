const ServiceModel = require("../../models/services_model");
const SaleModel = require('../../models/sale_model')

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

        await res.json(listService);
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
            idSale,
            idStore,
            unitSale,
            valueSale
        } = req.body;

        if(unitSale != undefined || unitSale != null){
            const newSale = new SaleModel({
                value: valueSale,
                unit: unitSale,
            })

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
            })
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
