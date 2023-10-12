const RoleModel = require('../../models/roles_model');

exports.getListRole = async (req, res) => {
    try {
        const listRole = await RoleModel.find();

        res.status(200).json(listRole);
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra");
    }
};
