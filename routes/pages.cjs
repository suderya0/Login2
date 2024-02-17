const express = require('express');
const passport = require('passport');
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();
const mysql = require('mysql');
// ...

// Handlebars'a json helper'ını ekleyin
handlebars.registerHelper('json', helpers.json);
const router = express.Router();
// Define your routes here

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
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
    const userEmail = global.now_email; // Assuming you have the user's email available
    console.log(userEmail)
    const sql = "SELECT * FROM users WHERE email = ?;";

    db.query(sql, [userEmail], (err, result) => {
        if (err) {
            console.error("Error fetching data from database:", err);
            return res.status(500).send("Internal Server Error");
        }

        const userData = result[1]; // Assuming the user data is in the first row of the result
        console.log("result")
        console.log(result)

        // Render the profile template and pass the user data
        res.render("profile", { userData: result });
    });
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


userEmail = global.now_email;
sql = "SELECT interest FROM users WHERE email = ?";
db.query(sql, [userEmail], (err, result) => {
  
})

router.get('/map', (req, res) => {

    const userEmail = global.now_email;
    const interestCheckSql = "SELECT interest FROM users WHERE email = ?";
    
    db.query(interestCheckSql, [userEmail], (err, result) => {
        if (err) {
            console.error("Error checking user interest:", err);
            return res.status(500).send("Internal Server Error");
        }
        const interest = result[0] ? result[0].interest : 0;
    if(global.now_email == "suderya.atasoy@gmail.com"){
        if(interest > 1){
            res.render('map4', { coordinatesList: global.coordinatesList })
        }else{
        console.log("map")
        res.render('map', { coordinatesList: global.coordinatesList });
        }
    }else if(global.now_email == "Can@wm.com"){
        if(interest > 1){
            res.render('map4', { coordinatesList: global.coordinatesList })
        }else{
        res.render('map3', { coordinatesList: global.coordinatesList });
        }
    }
    else{
        console.log("map2")
        res.render('map2', { coordinatesList: global.coordinatesList });
}})});



module.exports = router;