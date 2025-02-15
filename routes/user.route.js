const user = require("../controllers/user.controller")
const router = require("express").Router()
router
    .post("/update", user.updateProfile)
    .get("/search/:term", user.searchProfile)

module.exports = router