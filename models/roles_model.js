// const mongoose = require("mongoose");
const db = require('../configs/db_config')

const RoleSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
}, {
    collection: 'roles'
});

const RoleModel = db.model("Roles", RoleSchema);

module.exports = RoleModel;
