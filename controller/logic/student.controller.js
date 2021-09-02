/** Dto */
const studentDto = require("../../model/dto/student.dto")
const userDto = require("../../model/dto/user.dto")
const config = require("config")

/** helper */
const helper = require("../helpers/general.helper")
const notHleper = require("../helpers/notification.helper")

exports.createStudent = (request, responds, next) => {
    let student = {
        code: request.body.code,
        name: request.body.name,
        lastname: request.body.lastname,
        email: request.body.email,
        phone: request.body.phone,
        career: request.body.career
    }
    studentDto.create(student, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        let role = config.get("rol.student")
        let user = {
            name: student.name,
            lastname: student.lastname,
            username: student.code,
            password: helper.EncryptPassword(request.body.password),
            rol: role
        }
        console.log(user);
        userDto.create(user, (erro, u) =>{
            if(erro){
                studentDto.deleteOne({_id: data._id}, (error, data) => {
                    console.log("Deleting due to not creation user");
                })
                return responds.status(400).json({
                    error: erro
                })
            }
            notHleper.sendMSM(student.phone)
            responds.status(201).json({
                info: u
            })
        })
    })
}

exports.updateStudent = (request, responds, next) => {
    let student = {
        code: request.body.code,
        name: request.body.name,
        lastname: request.body.lastname,
        email: request.body.email,
        phone: request.body.phone,
        career: request.body.career
    }
    studentDto.update({_id: request.body.id}, student, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }

        if(request.body.oldCode){
            let role = config.get("rol.student")
            let user = {
                name: student.name,
                lastname: student.lastname,
                username: student.code,
                password: helper.EncryptPassword(request.body.password),
                rol: role
            }

            userDto.update({ username: request.body.oldCode }, user, (erro, u) => {
                console.log("Actualizó");
                if (erro) {
                    return responds.status(400).json({
                        error: erro
                    })
                }
                notHleper.sendMSM(student.phone)
                /* return responds.status(201).json({
                    info: data
                }) */
            })

            return responds.status(201).json({
                info: data
            })

        }else{
            responds.status(201).json({
                info: data
            })
        }
        
        
    })
}

exports.getAll = (request, responds, next) => {
    studentDto.getAll({}, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(200).json({
            info: data
        })
        
    })
}

exports.getByCode = (request, responds, next) => {
    studentDto.getByCode({code: request.params.code}, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(200).json({
            info: data
        })
        
    })
}

exports.deleteStudent = (request, responds, next) => {
    studentDto.delete({_id: request.body.id}, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(204).json()
        
    })
}
