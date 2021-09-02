/** Dto */
const userDto = require("../../model/dto/user.dto")
/* const config */
const helper = require("../helpers/general.helper")

exports.login = (request, responds, next) => {
    userDto.login({username: request.body.username}, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        if(data.length > 0){
            let pass = helper.DescryptPassword(data[0].password)
            console.log("Password en BD: " + pass);
            if(request.body.password === pass){
                
                tk = helper.GenerateToken(data[0])

                return responds.status(200).json({
                    token: tk
                })
            }else{
                return responds.status(400).json({
                    info: "Username or Password are incorrect."
                })
            }
        }
    })
}

exports.getAll = (request, responds, next) => {
    userDto.getAll({}, (erro, data) => {
        if (erro) {
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(200).json({
            info: data
        })

    })
}