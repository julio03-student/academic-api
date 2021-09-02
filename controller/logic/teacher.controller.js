/** Dto */
const teacherDto = require("../../model/dto/teacher.dto")
const userDto = require("../../model/dto/user.dto")
const config = require("config")

/** helper */
const helper = require("../helpers/general.helper")
const notHleper = require("../helpers/notification.helper")

exports.createTeacher = (request, responds, next) => {
    let teacher = {
        document: request.body.document,
        name: request.body.name,
        lastname: request.body.lastname,
        email: request.body.email,
        phone: request.body.phone,
        office: request.body.office,
        department: request.body.department
    }
    teacherDto.create(teacher, (erro, data) => {
        if (erro) {
            return responds.status(400).json({
                error: erro
            })
        }
        let role = config.get("rol.teacher")
        let user = {
            name: teacher.name,
            lastname: teacher.lastname,
            username: teacher.document,
            password: helper.EncryptPassword(request.body.password),
            rol: role
        }
        console.log(user);
        userDto.create(user, (erro, u) => {
            if (erro) {
                teacherDto.delete({ _id: data._id }, (error, data) => {
                    console.log("Deleting due to not creation user");
                })
                return responds.status(400).json({
                    error: erro
                })
            }
            notHleper.sendMSM(teacher.phone)
            responds.status(201).json({
                info: data
            })
        })
    })
}

exports.updateTeacher = (request, responds, next) => {
    let teacher = {
        document: request.body.document,
        name: request.body.name,
        lastname: request.body.lastname,
        email: request.body.email,
        phone: request.body.phone,
        office: request.body.office,
        department: request.body.department
    }
    teacherDto.update({ _id: request.body.id }, teacher, (erro, data) => {
        if (erro) {
            return responds.status(400).json({
                error: erro
            })
        }
        if (request.body.oldDocument) { 
            console.log("Cambiamos el usuario");
            let role = config.get("rol.teacher")
            let user = {
                name: teacher.name,
                lastname: teacher.lastname,
                username: teacher.document,
                password: helper.EncryptPassword(request.body.password),
                rol: role
            }
            console.log("user: ", user);

            userDto.update({ username: request.body.oldDocument }, user, (erro, u) => {
                console.log("Actualizó");
                if (erro) {
                    return responds.status(400).json({
                        error: erro
                    })
                }
                notHleper.sendMSM(teacher.phone)
                responds.status(201).json({
                    info: u
                })
            })

        } else{
            return responds.status(201).json({
                info: data
            })
        }

        responds.status(201).json({
            info: data
        })
    })

}

exports.getAll = (request, responds, next) => {
    teacherDto.getAll({}, (erro, data) => {
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

exports.getByDocument = (request, responds, next) => {
    teacherDto.getByDocument({ document: request.params.document }, (erro, data) => {
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

exports.deleteTeacher = (request, responds, next) => {
    teacherDto.delete({ _id: request.body.id }, (erro, data) => {
        if (erro) {
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(204).json()

    })
}
