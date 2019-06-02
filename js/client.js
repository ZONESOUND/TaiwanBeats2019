

socket.on('connect', () => {

    console.log("connect");
    if(UUID == null) {
        UUID = generate_uuid()
        console.log(UUID)
        localStorage.setItem("uuid", UUID);
    }

    socket.on('broadcast', (data) => {
        console.log(data)
        if (data.state != undefined) {
            changeScenes(data.state)
            return
        }
        if (data.uuid == UUID) return;
        levels[STATE].trigger[data.id].func(levels[STATE].trigger[data.id].options)
        if (levels[STATE].sounds[data.id + 1] == undefined) return
        levels[STATE].sounds[data.id + 1].start()
    });
    
})

socket.on('disconnect', function () {
    console.log('user disconnected');
});


window.addEventListener('beforeunload', function (e) {
    socket.emit('disconnected',{
        uuid: UUID
    })
});

function emit(data) {
    console.log(data);
    data.uuid = UUID;
    socket.emit('broadcast', data);
}


function generate_uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}