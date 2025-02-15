const asyncHandler = require("express-async-handler")
const { profileUpload } = require("../utils/upload")
const User = require("./../models/User")
const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")
exports.updateProfile = asyncHandler(async (req, res) => {
    profileUpload(req, res, async err => {

        if (err) {
            return res.status(400).json({ message: err.message || "Multer Error" })
        }

        const { auth } = req.cookies
        if (!auth) {
            return res.status(401).json({ message: "Non Cookie Found" })
        }
        jwt.verify(auth, process.env.JWT_KEY, async (err, decode) => {
            if (err) {
                return res.status(401).json({ message: err.message || "JWT ERROR" })
            }
            req.body.userId = decode.userId
            const { userId, name, email, mobile, about } = req.body
            const result = await User.findOne({ _id: userId })
            // console.log()
            let updatedProfile
            if (req.file) {
                if (result.photo !== "dummy.png") {
                    fs.unlinkSync(path.join(__dirname, "..", "profile", result.photo))
                }
                updatedProfile = await User.findByIdAndUpdate(userId, { photo: req.file.filename }, { new: true })
            } else {
                updatedProfile = await User.findByIdAndUpdate(userId, { name, email, mobile, about }, { new: true })
            }
            res.json({ messag: "Profile Update Success", result: updatedProfile })
        })




    })
})
exports.searchProfile = asyncHandler(async (req, res) => {
    const { term } = req.params
    const result = await User.find({
        $or: [
            { name: term },
            { email: term },
            { mobile: term },
        ]
    })
    res.json({ message: "search success", result })

})