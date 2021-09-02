const controller = require("../controller/logic/user.controller")

exports.userRoutes = (app) => {
    app.get("/user", (request, response, next) => {
        controller.getAll(request, response, next)
    })
    
    app.post("/user", (request, response, next) => {
        controller.login(request, response, next)
    })
}