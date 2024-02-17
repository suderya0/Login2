const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.interest = async (req,res) => {

    //kullanıcıdan interest al ve bu interestleri listeye ekle ve listeyi database e ekle
    const interest = req.body.interest;
    let interestUpdate = "";

    console.log(interest)
    const sqlSelect = "SELECT interest FROM users WHERE email = ?;";

    db.query(sqlSelect, [global.now_email], (err, result) => {
        console.log(global.now_email)
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length > 0) {
            // Eğer bir sonuç varsa, mevcut değeri alın ve yeni değeri ekleyin
            interestUpdate = result[0].interest +","+ interest;
        } else {
            // Eğer bir sonuç yoksa, sadece yeni değeri ekleyin
            interestUpdate = interest;
        }

        // UPDATE sorgusunu burada çağırın, içeriğini result ile birleştirmiş olarak
        const sqlUpdate = "UPDATE users SET interest = ? WHERE email = ?;";
        db.query(sqlUpdate, [interestUpdate, global.now_email], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send("Internal Server Error");
            } else {
                console.log(results)
                console.log("şu anda burdasiniz")
                return res.render("profile", {
                    message: "Interest saved"
                });
            }
        });
    });

 
}