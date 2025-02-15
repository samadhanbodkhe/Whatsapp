const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    name: String,
    users: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    isGroup: { type: Boolean, default: false },
    admin: { type: mongoose.Types.ObjectId, ref: "user" }

}, { timestamps: true })

module.exports = mongoose.model("chat", chatSchema)