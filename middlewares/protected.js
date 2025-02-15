const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.userProtected = asyncHandler(async (req, res, next) => {
    const { auth } = req.cookies
    if (!auth) {
        return res.status(401).json({ message: "Non Cookie Found" })
    }
    jwt.verify(auth, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT ERROR" })
        }
        req.body.userId = decode.userId
        req.user = decode.userId
        next()
    })

})