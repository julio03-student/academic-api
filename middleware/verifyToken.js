/** Packages */
const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (request, responds, next) => {

    let token = request.headers["access-token"]

    if(token){
        let secretKey = config.get("secretsKeys").jwt
        let tkDecoded = jwt.verify(token, secretKey)
        let currentDate = Math.floor(Date.now() / 1000)
        if(tkDecoded.exp >= currentDate){
            next()
        }else{
            return responds.status(400).json({
                mess: "This token isn't valid"
            })
        }

    }else{
        return responds.status(400).json({
            mess: "Not access token set."
        })
    }

    next()
}