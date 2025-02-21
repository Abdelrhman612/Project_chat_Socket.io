const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
    socket.on('chat message',(msg)=>{
       io.emit('chat message', msg);
       socket.on('typing' , ()=>{
        socket.broadcast.emit('Show_Typing_Status');
       })
       socket.on('StopTyping' , ()=>{
        socket.broadcast.emit('Stop_Typing_Clint');

       })
    })
});
server.listen(3000, () => {
    console.log("🚀http://localhost:3000");
});
