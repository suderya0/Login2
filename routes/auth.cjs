const express = require('express');
const mysql = require('mysql');
const authController = require("../controllers/auth")
const authLoginController = require("../controllers/authLogin")
const changeController = require("../controllers/change")
const forgetController = require("../controllers/forget")
const enterCodeController = require("../controllers/enterCode")




const router = express.Router();


router.post('/register', authController.register)

router.post("/login", authLoginController.login)

router.post('/change', changeController.change);

router.post("/forget", forgetController.forget);

router.post("/code", enterCodeController.code);

module.exports = router;