const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server) // instancia um socket
const consign = require('consign')
const db = require('./config/db')
const PORT = 3000;

consign()
    .then('./src/config/middlewares.js')
    .then('./src/api')
    .then('./src/routes.js')
    .into(app)

app.db = db

io.on("connection", (socket) => { // realiza a conexão
    console.log(`Conectado: ${socket.id}`); // mostra quem se conectou
    socket.on("add_note", (data) => { // ouve quando o client solicita uma alteração no banco de dados
        io.emit("add_note_in_list", data) // envia a alteração solicitada pelo client pra todos da plataforma
    });
    socket.on("remove_note", (data) => { // ouve quando o client solicita uma alteração no banco de dados
        io.emit("remove_note_in_list", data) // envia a alteração solicitada pelo client pra todos da plataforma
    });

})

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})