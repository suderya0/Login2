const express = require('express');
const authController = require("../controllers/auth")
const authLoginController = require("../controllers/authLogin")
const changeController = require("../controllers/change")
const passport = require('passport');
const mysql = require('mysql');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const router = express.Router();
module.exports = router;