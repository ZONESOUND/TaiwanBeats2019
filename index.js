const http = require('http');
const socketio = require('socket.io');
const port = process.env.PORT || 8000

const server = http.createServer((req, res) => {
    res.end("I am connected!")
});
const io = socketio(server);
var scene = 0;
var uuidSet = new Set();
var sceneInt = null;
var count = 0;

io.on('connection', (socket, req) => {

    socket.emit('welcome', {
        'welcome': 'Welcome!!'
    })

    socket.on('broadcast',(data) => {
        io.emit('broadcast', data);
    })

    socket.on('connected', (data) => {
        uuidSet.add(data.uuid);
        socket.emit('broadcast', {state : scene});
        count ++;
        console.log("TOTAL CONNECT: " + count + ", NOW SCENE: "+ scene);
        if (sceneInt == null) {
            scene = 1;
            sceneInt = setInterval(function() {
                console.log("change scene: "+scene);
                socket.emit('broadcast', {state : scene});
                scene = (scene+1)%4;
                
            }, 10000);
        }
    })

    socket.on('disconnected',(data) => {
        uuidSet.delete(data.uuid);
        if (uuidSet.size == 0) {
            console.log("end interval");
            clearInterval(sceneInt);
            sceneInt = null;
        }
    })

})

server.listen(port, function listening() {
    console.log("Listening on %d", server.address().port);
});

