const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "user" }, //1
    chat: { type: mongoose.Types.ObjectId, ref: "chat" },
    message: String,
    gif: String,
    audio: String,
    video: String,
    image: String,
    seen: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("message", messageSchema)