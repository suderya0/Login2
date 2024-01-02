const mysql = require('mysql');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

console.log("0")


exports.change = async (req, res) => {
  console.log("1");

  const { change_username, change_password } = req.body;

  if (change_username === '' && change_password === '') {
      // Her ikisi de boşsa, işlem yapma
      console.log('Kullanıcı adı ve şifre boş, güncelleme yapılmadı.');
  } else if (change_username === '') {
      // Kullanıcı adı boşsa, sadece şifreyi güncelle
      let hashedPassword = await bcrypt.hash(change_password, 8);
      console.log("2 - Sadece şifre güncellendi.");

      const sql = 'UPDATE users SET password = ? WHERE email = ?';
      db.query(sql, [hashedPassword, global.now_email], (err, result) => {
          if (err) {
              console.log(err);
          }
          console.log('Update successful!');
      });
  } else if (change_password === '') {
      // Şifre boşsa, sadece kullanıcı adını güncelle
      console.log("3 - Sadece kullanıcı adı güncellendi.");

      const sql = 'UPDATE users SET username = ? WHERE email = ?';
      db.query(sql, [change_username, global.now_email], (err, result) => {
          if (err) {
              console.log(err);
          }
          console.log('Update successful!');
      });
  } else {
      // Her ikisi de doluysa, her ikisini de güncelle
      let hashedPassword = await bcrypt.hash(change_password, 8);
      console.log("4 - Her ikisi de güncellendi.");

      const sql = 'UPDATE users SET password = ?, username = ? WHERE email = ?';
      db.query(sql, [hashedPassword, change_username, global.now_email], (err, result) => {
          if (err) {
              console.log(err);
          }
          console.log('Update successful!');
      });
  }

  return res.render("homepage", {});
};
