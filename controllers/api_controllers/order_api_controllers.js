const OrderModel = require("../../models/order_model");

exports.getListOrderModel = async (req, res) => {
    try {
        const listOrder = await OrderModel.find().populate('idUser').populate('idStore').populate('listItem.idService').populate('listItem.idService.attributeList._id').populate('listItem.attributeList');

        res.status(200).json(listOrder);
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra");
        console.log(err)
    }
};

exports.insertOrder = async (req, res) => {
    try {
        const {
            idUser,
            idStore,
            total,
            note,
            transportType,
            methodPaymentType,
            feeDelivery,
            status,
            idAddress,
            isPaid
        } = req.body;

        if (idUser.length === 0) {
            res.status(400).send("Vui lòng không để trống id người đặt")
            return
        }

        if (idStore.length === 0) {
            res.status(400).send("Vui lòng không để trống id cửa hàng")
            return
        }

        if (total.length === 0) {
            res.status(400).send("Vui lòng không để trống tổng tiền đơn hàng")
            return
        }

        if(isNaN(total) === true){
            res.status(400).send("Vui lòng nhập tổng tiền đơn hàng là số")
            return
        }

        if (transportType.length === 0) {
            res.status(400).send("Vui lòng không để trống phương thức giao hàng")
            return
        }

        if (methodPaymentType.length === 0) {
            res.status(400).send("Vui lòng không để trống phương thức thanh toán")
            return
        }

        if (feeDelivery.length === 0) {
            res.status(400).send("Vui lòng không để trống phí vận chuyển")
            return
        }

        if(isNaN(feeDelivery) === true){
            res.status(400).send("Vui lòng nhập phí vận chuyển là số")
            return
        }

        if (status.length === 0) {
            res.status(400).send("Vui lòng không để trống trạng thái đơn hàng")
            return
        }

        if(isNaN(status) === true){
            res.status(400).send("Vui lòng nhập trạng thái đơn hàng là số")
            return
        }

        if (idAddress.length === 0) {
            res.status(400).send("Vui lòng không để trống id địa chỉ cửa hàng")
            return
        }

        if (isPaid.length === 0) {
            res.status(400).send("Vui lòng không để trống trạng thái thanh toán đơn hàng")
            return
        }

        const order = new OrderModel({
            idUser: idUser,
            idStore: idStore,
            total: total,
            note: note,
            transportType: transportType,
            methodPaymentType: methodPaymentType,
            feeDelivery: feeDelivery,
            status: status,
            idAddress: idAddress,
            isPaid: isPaid
        })

        await order.save();

        res.send("Tạo đơn thành công")
    } catch (e) {
        res.status(500).send("Có lỗi xảy ra");
        console.log(e)
    }
}

exports.updateStatusOrder = async (req, res) => {
    try {
        const idOrder = req.params.idOrder
        const status = req.body.status

        if (status.length === 0) {
            res.status(400).send("Vui lòng không để trống trạng thái đơn hàng")
            return
        }

        if(isNaN(status) === true){
            res.status(400).send("Vui lòng nhập trạng thái đơn hàng là số")
            return
        }

        await OrderModel.findByIdAndUpdate({_id: idOrder},
            {
                status: status
            })

        res.send("Cập nhật trạng thái đơn hàng thành công")
    } catch (e) {
        res.status(500).send(`Có lỗi xảy ra ${e}`);
        console.log(e)
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const idOrder = req.params.idOrder
        const {
            idUser,
            idStore,
            total,
            note,
            transportType,
            methodPaymentType,
            feeDelivery,
            status,
            idAddress,
            isPaid
        } = req.body;

        if (idUser.length === 0) {
            res.status(400).send("Vui lòng không để trống id người đặt")
            return
        }

        if (idStore.length === 0) {
            res.status(400).send("Vui lòng không để trống id cửa hàng")
            return
        }

        if (total.length === 0) {
            res.status(400).send("Vui lòng không để trống tổng tiền đơn hàng")
            return
        }

        if(isNaN(total) === true){
            res.status(400).send("Vui lòng nhập tổng tiền đơn hàng là số")
            return
        }

        if (transportType.length === 0) {
            res.status(400).send("Vui lòng không để trống phương thức giao hàng")
            return
        }

        if (methodPaymentType.length === 0) {
            res.status(400).send("Vui lòng không để trống phương thức thanh toán")
            return
        }

        if (feeDelivery.length === 0) {
            res.status(400).send("Vui lòng không để trống phí vận chuyển")
            return
        }

        if(isNaN(feeDelivery) === true){
            res.status(400).send("Vui lòng nhập phí vận chuyển là số")
            return
        }

        if (status.length === 0) {
            res.status(400).send("Vui lòng không để trống trạng thái đơn hàng")
            return
        }

        if(isNaN(status) === true){
            res.status(400).send("Vui lòng nhập trạng thái đơn hàng là số")
            return
        }

        if (idAddress.length === 0) {
            res.status(400).send("Vui lòng không để trống id địa chỉ cửa hàng")
            return
        }

        if (isPaid.length === 0) {
            res.status(400).send("Vui lòng không để trống trạng thái thanh toán đơn hàng")
            return
        }

        await OrderModel.findByIdAndUpdate(
            {
                _id: idOrder
            },
            {
                idUser: idUser,
                idStore: idStore,
                total: total,
                note: note,
                transportType: transportType,
                methodPaymentType: methodPaymentType,
                feeDelivery: feeDelivery,
                status: status,
                idAddress: idAddress,
                isPaid: isPaid
            }
        )

        res.send("Cập nhật thông tin đơn hàng thành công")
    } catch (e){
        res.status(500).send(`Có lỗi xảy ra ${e}`);
        console.log(e)
    }
}

exports.getOrderDetail = async (req,res) =>{
    const idOrder = req.params.idOrder;
    try{
        const listOrder = await OrderModel.find({"_id": idOrder});
        res.status(200).json(listOrder);

    }catch (error){
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.getListOrderByIdUser = async (req,res) =>{
    const idUser = req.params.idUser;
    const sortOrder = req.query.sortOrder;
    const sortOption = sortOrder === 'desc'? {createAt:'desc'} : {createAt:'asc'}
    try{
        const listOrder = await OrderModel.find({"idUser": idUser}).sort(sortOption);
        if(listOrder.length === 0){
            res.status(204).send("Không có đơn hàng nào")
        }else{
            res.status(200).json(listOrder);
        }

    }catch (error){
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.getListOrderByIdStoreAndIdUser = async (req,res) =>{
    const idStore = req.params.idStore;
    const idUser = req.params.idUser;
    const sortOrder = req.query.sortOrder;

    const sortOption = sortOrder === 'desc'? {createAt:'desc'} : {createAt:'asc'}
    try{
        const listOrder = await OrderModel.find({"idStore": idStore,"idUser":idUser}).sort(sortOption);
        if(listOrder.length === 0){
            res.status(204).send("Không có đơn hàng nào")
        }else{
            res.status(200).json(listOrder);
        }
    }catch (error){
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.getListOrderByIdStore = async (req,res) =>{
    const idStore = req.params.idStore;
    const sortOrder = req.query.sortOrder;

    const sortOption = sortOrder === 'desc'? {createAt:'desc'} : {createAt:'asc'}
    try{
        const listOrder = await OrderModel.find({"idStore": idStore}).sort(sortOption);
        if(listOrder.length === 0){
            res.status(204).send("Không có đơn hàng nào")
        }else{
            res.status(200).json(listOrder);
        }
    }catch (error){
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.getListOrderByStatusAndStoreAndUser = async (req,res) =>{
    const status = req.params.status;
    const idStore = req.params.idStore;
    const idUser = req.params.idUser;
    const sortOrder = req.query.sortOrder;
    const sortOption = sortOrder === 'desc'? {createAt:'desc'} : {createAt:'asc'}
    try{
        const listOrder = await OrderModel.find({"status": status,"idStore":idStore,"idUser":idUser}).sort(sortOption);
        if(listOrder === 0){
            res.status(204).send("Không có đơn hàng nào")
        }else{
            res.status(200).json(listOrder);
        }
    }catch (error){
        res.status(500).send("Có lỗi xảy ra"+listOrder)
    }
}

exports.getListOrderByStatusAndUser = async (req,res) =>{
    const status = req.params.status;
    const idUser = req.params.idUser;
    const sortOrder = req.query.sortOrder;
    const sortOption = sortOrder === 'desc'? {createAt:'desc'} : {createAt:'asc'}
    try{
        const listOrder = await OrderModel.find({"status": status,"idUser":idUser}).sort(sortOption);
        if(listOrder === 0){
            res.status(204).send("Không có đơn hàng nào")
        }else{
            res.status(200).json(listOrder);
        }
    }catch (error){
        res.status(500).send("Có lỗi xảy ra"+listOrder)
    }
}

