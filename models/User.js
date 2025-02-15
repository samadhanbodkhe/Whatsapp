const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
    },
    photo: {
        type: String,
        default: "dummy.png"
    },
    about: {
        type: String,
    },
    password: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)