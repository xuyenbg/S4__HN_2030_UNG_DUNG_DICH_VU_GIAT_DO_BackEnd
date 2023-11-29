var express = require("express");
var router = express.Router();
const AddressApiController = require("../../controllers/api_controllers/address_api_controllers");

router.get("/list", AddressApiController.getListAddress);
router.put(
  "/update-default-address/:idAddress",
  AddressApiController.updateAddressDefault
);
router.get("/detail-address/:idAddress", AddressApiController.getAddressById);
router.get(
  "/list-by-iduser/:idUser",
  AddressApiController.getListAddressByIdUser
);
router.post("/add-address", AddressApiController.addAddress);
router.put("/update-address/:idAddress", AddressApiController.updateAddress);
router.delete("/delete-address/:idAddress", AddressApiController.deleteAddress);
router.get(
  "/getListStoreNearest/:latitude/:longitude",
  AddressApiController.getListStoreNearest
);
module.exports = router;
