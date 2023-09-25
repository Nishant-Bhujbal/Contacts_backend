const express = require('express');
const { registerUsers, loginUsers, currentUsers } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post("/register",registerUsers);

router.post("/login",loginUsers);

router.get("/current",validateToken,currentUsers);

module.exports = router;