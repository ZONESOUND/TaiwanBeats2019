let gifSprite;

function loadGif(progress, resources) {
    console.log(resources);
    console.log(gifLoader.resources);
    //window.gif = new PixiApngAndGif('./image/heartBeat.gif', resources);
    // window.gif = new PixiApngAndGif('./image/birdScream.gif', gifLoader.resources);
    
    // gifSprite = window.gif.sprite
    // console.log(gifSprite)
    // gifSprite.anchor.set(0.5, 0.5);
    // gifSprite.blendMode = PIXI.BLEND_MODES.ADD;
}

function gifAppearWithName(gifFile, changeSize) {
    delete(window.gif);
    window.gif = new PixiApngAndGif(gifFile, gifLoader.resources);
    gifAppear(changeSize);
}

function gifAppear(changeSize) {
    let sprite = window.gif.sprite
    sprite.anchor.set(0.5, 1);
    sprite.blendMode = PIXI.BLEND_MODES.SCREEN;
    sprite.id = Math.random()

    sprite.x = Math.random()*vw/2 - vw/4;
    sprite.y = Math.random()*vh/2 - vh/4;
    sprite.angle = Math.random()*60 - 30;
    if (changeSize) sizeChanging(sprite);
    window.gif.play(1);
    setTimeout(function() {
        window.gif.pause();
        if (changeSize) ticker.stop();
        let sec = 0.5;
        TweenMax.to(sprite, sec, {
          pixi: {
              alpha: 0
          }
        });
        setTimeout(() => {
            stage.removeChild(sprite)
        }, sec*1000);
    }, window.gif.getDuration()-1)
    

    stage.addChild(sprite);
}

let scale = 1.01;
let ticker;
function sizeChanging(sprite) {
    ticker = new PIXI.Ticker();
        
    ticker.add((deltaTime) => {
        if (sprite.scale.x > 1.1) scale = 0.99;
        else if (sprite.scale.x < 0.9) scale = 1.01;
        sprite.scale.x *= scale;
        sprite.scale.y *= scale;
    }); 
    ticker.start();

}

function gifTest(gifFile) {
    gifAppearWithName(gifFile);
    var data = {exec: "gifAppearWithName(gifFile);"};
    emit(data);
}

function gifTest() {
    gifAppear();
    var data = {exec: "gifAppear();"};
    emit(data);
}