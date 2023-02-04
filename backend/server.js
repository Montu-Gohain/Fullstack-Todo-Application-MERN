console.clear()
const express = require("express")
const app = express()
require("colors")
require("dotenv").config({ path : "backend/config.env" })
const delay = require("./middlewares/delay")
const connectDB = require("./scripts/connectDB")
const setStatic = require("./scripts/setStatic")
const getProdDetails = require("./scripts/getProdDetails")
const [PORT, isInProduction] = getProdDetails(5000)

// Middleware
app.use(express.json())
app.use(delay(isInProduction ? 0 : 0.5 ))//only delay in dev

// Routes
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/todos", require("./routes/todosRoute"))

// Server Client App
setStatic(app, express)

// Start Server
app.listen(PORT, () => {
    console.log("Server Started".cyan.bold.underline)
    connectDB()
})
