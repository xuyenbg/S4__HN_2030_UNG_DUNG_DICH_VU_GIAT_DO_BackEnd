const db = require('../configs/db_config')

const RoleSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
}, {
    collection: 'Roles'
});

const RoleModel = db.model("RoleModel", RoleSchema);

module.exports = RoleModel;
