/** Dto */
const courseDto = require("../../model/dto/course.dto")

/** helper */
const helper = require("../helpers/general.helper")
const notHleper = require("../helpers/notification.helper")

exports.createCourse = (request, responds, next) => {
    let course = {
        code: request.body.code,
        name: request.body.name
    }
    courseDto.create(course, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(201).json({
            info: data
        })
    })
}

exports.updateCourse = (request, responds, next) => {
    let course = {
        code: request.body.code,
        name: request.body.name
    }
    courseDto.update({_id: request.body.id}, course, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(201).json({
            info: data
        })
        
        
    })
}

exports.getAll = (request, responds, next) => {
    courseDto.getAll({}, (erro, data) => {
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
    courseDto.getByCode({code: request.params.code}, (erro, data) => {
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

exports.deleteCourse = (request, responds, next) => {
    courseDto.delete({_id: request.body.id}, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(204).json()
        
    })
}
