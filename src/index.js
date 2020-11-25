const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const consign = require('consign')
const db = require('./config/db')
const PORT = 3000;

consign()
    .then('./src/config/middlewares.js')
    .then('./src/api')
    .then('./src/routes.js')
    .into(app)

app.db = db

io.on("connection", (socket) => {
    console.log(`Conectado: ${socket.id}`);
    socket.on("add_note", (data) => {
        io.emit("add_note_in_list", data)
    });
    socket.on("remove_note", (data) => {
        io.emit("remove_note_in_list", data)
    });

})

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})