const controller = require("../controller/logic/course.controller")

exports.courseRoutes = (app) => {
    app.get("/course", (request, response, next) => {
        controller.getAll(request, response, next)
    })

    app.get("/course/bycode/:code", (request, response, next) => {
        console.log("Getting course by code");
        controller.getByCode(request, response, next)
    })

    app.post("/course", (request, response, next) => {
        controller.createCourse(request, response, next)
    })

    app.put("/course", (request, response, next) => {
        controller.updateCourse(request, response, next)
    })
    
    app.delete("/course", (request, response, next) => {
        controller.deleteCourse(request, response, next)
    })
}