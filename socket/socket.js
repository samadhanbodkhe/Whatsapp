const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
require("colors")

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

let ONLINE_USERS = []
let TYPING = []
io.on("connection", socket => {
    socket.on("join-chat", data => {
        socket.join(data._id)
        ONLINE_USERS.push({ sid: socket.id, uid: data._id })
        io.emit("online-response", ONLINE_USERS)
    })
    socket.on("disconnect", data => {
        ONLINE_USERS = ONLINE_USERS.filter(item => item.sid !== socket.id)
        io.emit("online-response", ONLINE_USERS)
    })
})


module.exports = { app, server, io, ONLINE_USERS }