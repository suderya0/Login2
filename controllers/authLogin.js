const mysql = require('mysql');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



exports.login = (req,res) => {


    const { email, password} = req.body;
    
    db.query("SELECT password FROM users WHERE email = ?", [email], async (error, results) => {
        console.log(results);
        console.log(results[0])
        console.log("1lksdm")
        console.log(email)
        if(error){
            console.log(error);
        }else if(results[0] === undefined){
            return res.render("login", {
                message: "User not found!"
        })
        }else{
            bcrypt.compare(password, results[0].password, (err, result) => {
                if (err) {
                    // Hata durumunda burada işlem yapabilirsiniz
                    console.error('Şifre karşılaştırma hatası:', err);
                    return;
                }
            
                if (result) {
                    global.now_email = email;
                    console.log(global.now_email);
                    return res.render("homepage", {
                      });

                } else {
                    return res.render("login", {
                        message: "Password do not match!"
                      });}
            });
        }
    })};