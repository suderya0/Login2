const express = require('express');
const passport = require('passport');

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/change', (req, res) => {
    res.render('change');
});

router.get("/forget" , (req, res) => {
    res.render('forget');
});

router.get("/code", (req, res) => {
    res.render('enterCode');
})

router.get("/logout", (req,res) => {
    res.render("index")
})
router.get("/rooms", (req,res) =>{
    res.render("rooms")
})


module.exports = router;