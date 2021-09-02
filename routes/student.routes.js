
const controller = require("../controller/logic/student.controller")

exports.studentRoutes = (app) => {
    app.get("/student", (request, response, next) => {
        controller.getAll(request, response, next)
    })

    app.get("/student/bycode/:code", (request, response, next) => {
        console.log("Getting student by code");
        controller.getByCode(request, response, next)
    })

    app.post("/student", (request, response, next) => {
        controller.createStudent(request, response, next)
    })

    app.put("/student", (request, response, next) => {
        controller.updateStudent(request, response, next)
    })
    
    app.delete("/student", (request, response, next) => {
        controller.deleteStudent(request, response, next)
    })
}