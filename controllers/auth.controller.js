const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const { genrateToken } = require("../lib/genrateToken")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.registerUser = asyncHandler(async (req, res) => {
    const { password } = req.body
    const hashPass = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hashPass })
    res.status(201).json({ message: "User Register Success" })
})
exports.loginUser = asyncHandler(async (req, res) => {
    const { username, password, } = req.body
    const result = await User.findOne({
        $or: [
            { email: username },
            { mobile: username },
        ]
    })
    if (!result) {
        return res.status(401).json({ message: "Invalid Email Or Mobile" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "invalid password" })
    }
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "15d" })

    res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24 * 15 })
    res.status(200).json({
        message: "User Login Success",
        result
    })

})
exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("auth")
    res.json({ message: "Logout Success" })
})