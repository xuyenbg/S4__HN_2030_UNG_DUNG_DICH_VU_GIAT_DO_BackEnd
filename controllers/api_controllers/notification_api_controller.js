const NotificationModel = require('../../models/notification_model');

exports.getListNotification = async (req,res)=>{
    try {
        const listNotification = await NotificationModel.find().populate('idOrder').populate('idUser');
        res.status(200).json(listNotification);
    } catch (error) {
        res.status(500).send("Có lỗi xảy ra");
    }
}