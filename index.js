const http = require('http');
const socketio = require('socket.io');
const port = process.env.PORT || 8000

const server = http.createServer((req, res) => {
    res.end("I am connected!")
});
const io = socketio(server);

io.on('connection', (socket, req) => {

    socket.emit('welcome', {
        'welcome': 'Welcome!!'
    })

    socket.on('broadcast',(data) => {
        io.emit('broadcast', data);
    })

    socket.on('connected', (data) => {
    })

    socket.on('disconnected',(data) => {
    })

})

server.listen(port, function listening() {
    console.log("Listening on %d", server.address().port);
});

