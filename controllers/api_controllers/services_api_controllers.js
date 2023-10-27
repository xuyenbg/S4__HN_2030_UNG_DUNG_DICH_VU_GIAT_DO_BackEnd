const ServiceModel = require("../../models/services_model");

exports.getListService = async (req, res) => {
    try {
        const listServices = await ServiceModel.find()
            .populate('idCategory')
            .populate('attributeList')
            .populate('idSale')

        res.json(listServices)
    } catch (e) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(e)
    }
}

exports.getServiceByIdStore = async (req, res) => {
    try {
        const idStore = req.params.idStore
        const listServices = await ServiceModel.find({ idStore: idStore }).populate('idCategory')
            .populate('attributeList')
            .populate('idSale')
        res.json(listServices);
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(err)
    }
}

exports.getServiceByIdStoreAndIdService = async(req,res) =>{
    const idStore = req.params.idStore;
    const idService = req.params.idService
    try{
        const checkService = await ServiceModel.find({_id:idService,idStore:idStore});
            if(checkService.length === 0){
                res.status(200).send("Dịch vụ không có trong cửa hàng");
                return;
            }
            else{
                const listServiceByIdStore = await ServiceModel.find({idStore:idStore});
                const listService = listServiceByIdStore.filter((item)=>!item._id.equals(idService));
                res.status(200).send(listService);
            }
    }catch(error){
        res.status(500).send("Có lỗi xảy ra");
    }
}