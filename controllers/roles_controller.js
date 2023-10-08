const RoleModel = require("../models/roles_model");

exports.getListRole = async (req, res) => {
  const listRole = await RoleModel.find();

  res.status(200).json(listRole);
};
