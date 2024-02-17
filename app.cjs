const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const indexRouter = require('./routes/index.cjs');
const authRouter = require('./routes/auth.cjs');
const passport = require('passport');
const bodyParser = require('body-parser');
const { Strategy } = require('passport-google-oauth20');
const { profile } = require('console');
const app = express();
const GoogleStrategy = require('passport-google-oauth20').Strategy;


dotenv.config({ path: "./.env"});
// Örnek:
app.set('views', path.join(__dirname, '/public/views'));



const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error23:', err);
        return;
    }
    console.log('MySQL connected2');
});
app.use(session({
    secret: '12345', // Güvenli bir anahtar belirleyin
    resave: false,
    saveUninitialized: true
}));

const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb){
    cb(null, user)
});

passport.deserializeUser(function (obj, cb){
    cb(null, obj)
});

app.get('/auth/google',
  passport.authenticate('google', { scope: 'email' })
);

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile,done){
    global.userEmail = profile.emails ? profile.emails[0].value : null;
    // console.log(profile)
    // console.log("User Email:", userEmail); 
    // console.log(profile.emails[0].value)

      done(null, {})
}
)) 


app.set('view engine', 'hbs');


app.get('/auth/google', passport.authenticate("google",{scope: ["profile"]}))
  
  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    const email = userEmail; // Email'i buradan alıyoruz
    global.now_email = userEmail;

    const sql = "SELECT * FROM users WHERE email = ?;";
    db.query(sql, [email], (err, result) => {

      // if (result[0] === undefined) {

      //   return res.render("index", {        
      //       message: "Email does not exist in Database"
      //   });
      // } else {
        res.render("homepage", {});
    //   }
    // });
    })});


app.use("/", require("./routes/pages.cjs"));
app.use("/auth", require("./routes/auth.cjs"));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
