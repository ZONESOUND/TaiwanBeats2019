const http = require('http');
const socketio = require('socket.io');
const port = process.env.PORT || 8000

const server = http.createServer((req, res) => {
    res.end("I am connected!")
});
const io = socketio(server);
var scene = 0;
var sceneInt = null;
var count = 0;
var waitTime = 60000*2;

io.on('connection', (socket, req) => {

    socket.emit('welcome', {
        'welcome': 'Welcome!!'
    })

    socket.on('broadcast',(data) => {
        //console.log(data);
        io.emit('broadcast', data);
        if (data.state != undefined) {
            scene = (data.state+1)%4;
            setSceneInterval();
        }
    })

    socket.on('connected', (data) => {
        io.emit('broadcast', {state : scene});
        count ++;
        console.log("TOTAL CONNECT: " + count + ", NOW SCENE: "+ scene);
        if (sceneInt == null) {
            scene = 1;
            setSceneInterval();
        }
    })

    socket.on('disconnected',(data) => {
        checkSceneInterval();
    })

})

server.listen(port, function listening() {
    console.log("Listening on %d", server.address().port);
});

function setSceneInterval() {
    clearInterval(sceneInt);
    sceneInt = setInterval(function() {
        if (checkSceneInterval()) return;
        io.emit('broadcast', {state : scene});
        scene = (scene+1)%4;
    }, waitTime);
}

function checkSceneInterval() {
    if (io.engine.clientsCount == 0) {
        console.log("end interval");
        clearInterval(sceneInt);
        sceneInt = null;
        scene = 0;
        return true;
    }
    return false;
}
