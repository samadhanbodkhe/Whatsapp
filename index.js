const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { app, server } = require("./socket/socket")
const User = require("./models/User")
const { userProtected } = require("./middlewares/protected")
require("dotenv").config({ path: "./.env" })
const path = require("path")

mongoose.connect(process.env.MONGO_URL)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://whatsapp-6zo6.onrender.com",
    credentials: true
}))

app.use(express.static("uploads"))
app.use(express.static("profile"))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/chat", userProtected, require("./routes/chat.route"))
app.use("/api/user", userProtected, require("./routes/user.route"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    // res.status(404).json({ message: "No resource found" })

})

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ message: err.message || "Something went wrong" })
})

mongoose.connection.once("open", () => {
    console.log("Mongoose connected".bgGreen)
    server.listen(process.env.PORT, console.log(`Server running ${process.env.PORT}`))
})
