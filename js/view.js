setup()




let bgTexture, bgSprite, bgVideoSource, effectTexture, effectVideoSource
let buttonGraphic = []



loader.add('./video/LuckyCat.mp4')
      .add('./video/BendedText.mp4')
      .add('desert', './image/DesertTrance.jpeg')
      .load(videosetup);



function videosetup() {

    bgTexture = PIXI.Texture.from('./video/LuckyCat.mp4');
    effectTexture = PIXI.Texture.from('./video/BendedText.mp4');
    
    bgSprite = new PIXI.Sprite(bgTexture);
    bgSprite.width  = vw
    bgSprite.height = vh
    bgSprite.anchor.set(0.5, 0.5);
    console.log(vw, vh)
    bgVideoSource = bgTexture.baseTexture.source
    bgVideoSource.paused = true
    bgVideoSource.autoplay = false
    bgVideoSource.loop = true
    console.log(bgVideoSource.autoplay)
    
    effectVideoSource = effectTexture.baseTexture.source
    effectVideoSource.paused = true
    effectVideoSource.autoplay = false
    effectVideoSource.loop = true

    stage.addChild(bgSprite);
    soundsetup()
    createGraphic()
   
}

window.addEventListener('keypress', (event) => {
    sound.restart()
    if (bgSprite.texture == bgTexture) {
        bgSprite.texture = effectTexture
    } else {
        bgSprite.texture = bgTexture
    }
    
})

window.addEventListener('keyup', (event) => {
    if (bgSprite) {
        bgSprite.texture = bgTexture
    }
    
})



function createGraphic() {
    for(var i = 0; i < 4; i++) {
        let bw = vw / 2
        let bh = vh / 2
        buttonGraphic[i] = new Sprite(solid)
        buttonGraphic[i].width  = bw
        buttonGraphic[i].height = bh;
        buttonGraphic[i].tint = 0xFFFFFF;
        buttonGraphic[i].interactive = true
        buttonGraphic[i].alpha = 0
        buttonGraphic[i].position.set((i % 2) * bw - bw, Math.floor(i / 2) * bh - bh);
        buttonGraphic[i].id = i
        buttonGraphic[i].on('pointerdown', function() {
            if(this.id == 0) {
            sound.restart()
            if (bgSprite.texture == bgTexture) {
                bgSprite.texture = effectTexture
            } else {
                bgSprite.texture = bgTexture
            }
        }
        if (this.id == 2) {
            bubble();
        }
        
            let t = new TimelineMax()
            t.to(this, 0, {alpha: 0.4})
            .to(this, 0, {alpha: 0}, "+=0.1")
            t.play()


        })
        stage.addChild(buttonGraphic[i])


        // buttonGraphic[i] = new Graphics()
        // buttonGraphic[i].beginFill(0x000ff0)
        // buttonGraphic[i].drawRect( (i%2)*bw - bw, Math.floor(i/2)*bh-bh, bw, bh)
        // buttonGraphic[i].endFill()
        // buttonGraphic[i].interactive = true
        // buttonGraphic[i].zOrder = -10
        // buttonGraphic[i].on('pointerdown', function() {
        //     TweenMax.to(this, 0.2, {
        //         pixi: {
        //             colorize: 'red',
        //             autoalpha: 1
        //         },
        //         yoyo: true,
        //         repeat: 1
        //     });
        // })
        // stage.addChild(buttonGraphic[i])
    }
}

function soundsetup() {
    player.start()
    player.loop = true
}

