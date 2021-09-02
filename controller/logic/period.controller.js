/** Dto */
const periodDto = require("../../model/dto/period.dto")

exports.createPeriod = (request, responds, next) => {
    let period = {
        year: request.body.year,
        number: request.body.number,
        current: request.body.current
    }
    periodDto.create(period, (erro, data) => {
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

exports.updatePeriod = (request, responds, next) => {
    let period = {
        year: request.body.year,
        number: request.body.number,
        current: request.body.current
    }
    periodDto.update({_id: request.body.id}, period, (erro, data) => {
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
    periodDto.getAll({}, (erro, data) => {
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
    periodDto.getByCode({code: request.params.code}, (erro, data) => {
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

exports.deletePeriod = (request, responds, next) => {
    periodDto.delete({_id: request.body.id}, (erro, data) => {
        if(erro){
            return responds.status(400).json({
                error: erro
            })
        }
        responds.status(204).json()
        
    })
}
