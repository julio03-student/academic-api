/** packages */
const CryptoJS = require("crypto-js");
const config = require("config")
const jwt = require("jsonwebtoken")

/** Encrypt Password */
exports.EncryptPassword = (password) => {
    let secretKey = config.get("secretsKeys").cryptojs
    let encryptPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    return encryptPassword
}

exports.DescryptPassword = (cryptPassword) => {
    let secretKey = config.get("secretsKeys").cryptojs
    let bytes  = CryptoJS.AES.decrypt(cryptPassword, secretKey);
    let originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword
}

exports.GenerateToken = (user) => {
    let secretKey = config.get("secretsKeys").jwt
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + config.get("sessionTime"),
        data: {
            id: user._id,
            name: user.lastname+" "+user.name,
            username: user.username,
            rol: user.rol
        }
      }, secretKey)
      return token
}