const controller = require("../controller/logic/period.controller")

exports.periodRoutes = (app) => {
    app.get("/period", (request, response, next) => {
        controller.getAll(request, response, next)
    })

    app.get("/period/bycode/:code", (request, response, next) => {
        console.log("Getting period by code");
        controller.getByCode(request, response, next)
    })

    app.post("/period", (request, response, next) => {
        controller.createPeriod(request, response, next)
    })

    app.put("/period", (request, response, next) => {
        controller.updatePeriod(request, response, next)
    })
    
    app.delete("/period", (request, response, next) => {
        controller.deletePeriod(request, response, next)
    })
}