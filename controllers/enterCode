

exports.code = async (req,res) => {
    const userEnteredCode = req.body.verificationCode; // Kullanıcı tarafından girilen doğrulama kodu
    const randomNumber = global.randomNumber; // Global olarak saklanan rastgele sayı
    
    if (userEnteredCode && userEnteredCode === randomNumber.toString()) {
        console.log("code doğru")
        res.render("homepage");
    } else {
        console.log("code yanlis")
        res.render("login");
    }
}