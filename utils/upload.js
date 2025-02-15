const multer = require("multer")
const { v4: uuid } = require("uuid")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    },
    destination: (req, file, cb) => {
        const url = "uploads"
        if (!fs.existsSync(url)) {
            fs.mkdirSync(url)
        }
        cb(null, url)
    },
})
const profileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    },
    destination: (req, file, cb) => {
        const url = "profile"
        if (!fs.existsSync(url)) {
            fs.mkdirSync(url)
        }
        cb(null, url)
    },
})

const upload = multer({ storage }).fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
    { name: "video", maxCount: 1 },
])

const profileUpload = multer({ storage: profileStorage }).single("photo")

module.exports = { upload, profileUpload }