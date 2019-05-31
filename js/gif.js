// let heartbeat = new Tone.Player('./sound/heartbeat.wav').toMaster()


const gifLoader = new Loader()
const gifLoadOpt = {
    loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR,
    xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER,
    crossOrigin: ''
};



function gifLoad(s, a) {
    console.log('s')
    console.log(s)
    console.log(a)
}

function preloadGif() {
    if (gifLoader.progress == 100) return 
    gifLoader.add('./image/Part2/heartBeat.gif', gifLoadOpt)
        .add('./image/Part2/Thunder.gif', gifLoadOpt)
        .load(gifLoad)
}


function gifHeart(gifFile) {
    gifAppearWithName(gifFile, true, true, false, 3000)
}

function gifThurder(gifFile) {
    console.log(gifFile)
    gifAppearWithName(gifFile, false, false, true, 2000)
}

function gifAppearWithName(gifFile, changeSize, random, fit, time) {
    delete(window.gif);
    
    window.gif = new PixiApngAndGif(gifFile, gifLoader.resources);
    
    var x = 0;
    var y = 0;
    if (random) {
        x = Math.random() * vw / 2 - vw / 4;
        y = Math.random() * vh / 2;
    }
    let sprite = gifAppear(changeSize, x, y, time);
    if (fit) spriteFitScreen(sprite);
    //gifSound.restart();
}

function spriteFitScreen(sprite) {
    sprite.width = vw;
    sprite.height = vh;
}

function gifAppear(changeSize, x, y, time) {
    let sprite = window.gif.sprite
    sprite.anchor.set(0.5, 0.5);
    sprite.blendMode = PIXI.BLEND_MODES.SCREEN;
    //sprite.tint = tint;
    sprite.id = Math.random()

    sprite.x = x;
    sprite.y = y;
    //sprite.x = Math.random()*vw/2 - vw/4;
    //sprite.y = Math.random()*vh/2 - vh/4;
    scale = 1.01
    if (changeSize) sizeChanging(sprite);
    //window.gif.play(1);
    setTimeout(function () {
        //window.gif.pause();
        if (changeSize) ticker.stop();
        let sec = 0.3;
        TweenMax.to(sprite, sec, {
            pixi: {
                alpha: 0
            }
        });
        setTimeout(() => {
            stage.removeChild(sprite)
        }, sec * 1000);
    }, time)


    stage.addChild(sprite);
    return sprite;
}

var scale = 1.01;
let ticker;

function sizeChanging(sprite) {
    ticker = new PIXI.Ticker();

    ticker.add((deltaTime) => {
        if (sprite.scale.x > 1.12) scale = 0.99;
        else if (sprite.scale.x < 0.88) scale = 1.01;
        sprite.scale.x *= scale;
        sprite.scale.y *= scale;
    });
    ticker.start();

}

// function gifTest(gifFile) {
//     gifAppearWithName(gifFile);
//     var data = {
//         exec: "gifAppearWithName(gifFile);"
//     };
//     emit(data);
// }

// function gifTest() {
//     gifAppear();
//     var data = {
//         exec: "gifAppear();"
//     };
//     emit(data);
// }