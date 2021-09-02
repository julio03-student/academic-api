
const controller = require("../controller/logic/teacher.controller")

exports.teacherRoutes = (app) => {
    app.get("/teacher", (request, response, next) => {
        controller.getAll(request, response, next)
    })

    app.get("/teacher/bydocument/:document", (request, response, next) => {
        console.log("Getting teacher by document");
        controller.getByDocument(request, response, next)
    })

    app.post("/teacher", (request, response, next) => {
        controller.createTeacher(request, response, next)
    })

    app.put("/teacher", (request, response, next) => {
        controller.updateTeacher(request, response, next)
    })
    
    app.delete("/teacher", (request, response, next) => {
        controller.deleteTeacher(request, response, next)
    })
}