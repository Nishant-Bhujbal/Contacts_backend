const express = require('express');
const router = express.Router();

const {getAllContact,
    createContact,
    getContact,
    updateContact,
    deleteContact
} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route("/").get(getAllContact);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").get(getContact);

router.route("/:id").delete(deleteContact);


module.exports = router;