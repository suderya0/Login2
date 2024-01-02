const nodemailer = require("nodemailer");
const min = 10000;
const max = 99999;
const mysql = require('mysql');


exports.forget = async (req,res) => {
    global.randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const email = req.body.email;

    const sql = "SELECT * FROM users WHERE email = ?;";
    db.query(sql, [email], (err, result) => {
        if (result[0] === undefined){
            return res.render("login", {
                message: "Email not exist in Database"
            })
        }else{
            console.log(randomNumber);
            

            
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error sending email");
                    } else {
                        console.log("Email sent");
                        res.render("enterCode", { message: "Email sent successfully!" });
                    }
                });
    } })};