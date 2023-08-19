const express = require("express");
const {
  getContacts,
  createContacts,
  getContact,
  updateContacts,
  deleteContacts,
} = require("../controllers/contactController.js");
const validateToken = require("../middlewares/validateTokenHandler.js");
const router = express.Router();

//? Since all the used in contact need a used
//? hence we can use validate middleware above these all

router.use(validateToken);
router.route("/").get(getContacts).post(createContacts);
router.route("/:id").get(getContact).put(updateContacts).delete(deleteContacts);

module.exports = router;
