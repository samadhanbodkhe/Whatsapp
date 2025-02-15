const auth = require("../controllers/auth.controller")
const router = require("express").Router()
router
    .post("/login", auth.loginUser)
    .post("/register", auth.registerUser)
    .post("/logout", auth.logout)

module.exports = router