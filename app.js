/** packages */
const express = require("express")
const config = require("config")
const bodyParser = require("body-parser")

/** app configuration */
const app = express()
const port = config.get("server-port")
const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({
    extended: true
})

app.use(jsonParser)
app.use(urlEncodedParser)

const ipFn = require("./middleware/getIpAdress")
app.use("*", ipFn)

//** Methods */
app.get("/", (request, responds, next) => {
    responds.send("Welcome to academic rest api.")
})

/** User Routes Loading */
const userRoutes = require("./routes/user.routes").userRoutes(app)

/** Token middleware */
const tkFn = require("./middleware/verifyToken")
app.use(tkFn)

/** Students Routes Loading */
const studentRoutes = require("./routes/student.routes").studentRoutes(app)

/** Teachers Routes Loading */
const teacherRoutes = require("./routes/teacher.routes").teacherRoutes(app)

/** Courses Routes Loading */
const courseRoutes = require("./routes/course.routes").courseRoutes(app)

/** Period Routes Loading */
const periodRoutes = require("./routes/period.routes").periodRoutes(app)

app.listen(port, () => {
    console.log("Server running");
})

