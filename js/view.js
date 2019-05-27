setup()




let bgTexture, bgSprite, bgVideoSource
let effectTexture = [], effectVideoSource = []
let catSprite
let profileContainer = new Container()
let profileTexture = []
let buttonGraphic  = []



loader.add('catVideo','./video/LuckyCat.mp4')
      .add('logoVideo_1','./video/BendedText.mp4')
      .add('logoVideo_2', './video/LogoRotate.mp4')
      .add('callico','./image/callico.jpg')
      .add('bird','./image/bird.jpg')
      .add('desert', './image/DesertTrance.jpeg')
      .load(videosetup);




function videosetup() {

    bgTexture = Texture.from('./video/LuckyCat.mp4');

    effectTexture.push(Texture.from('./video/LogoRotate.mp4'))
    effectTexture.push(Texture.from('./video/BendedText.mp4'))
    


    bgSprite = new PIXI.Sprite(bgTexture);
    bgSprite.width  = vw
    bgSprite.height = vh
    bgSprite.anchor.set(0.5, 0.5);


    bgVideoSource = bgTexture.baseTexture.source
    bgVideoSource.autoplay = true
    bgVideoSource.loop = true

    effectTexture.forEach(function(e, i) {
        console.log(i)
        effectVideoSource[i] = e.baseTexture.source
        effectVideoSource[i].autoplay = true
        effectVideoSource[i].loop = true

    })
    
    stage.addChild(bgSprite);

    soundsetup()
    createGraphic()
    profileSetup()

}


window.addEventListener('keypress', (event) => {
    sound.restart()
    if (bgSprite.texture == bgTexture) {
        bgSprite.texture = effectTexture[Math.floor(Math.random() * 2)]
    } else {
        bgSprite.texture = bgTexture
    }
    
})

window.addEventListener('keyup', (event) => {
    if (bgSprite) {
        bgSprite.texture = bgTexture
    }
    
})


function profileSetup() {

    profileTexture[0] = resources['bird'].texture
    profileTexture[1] = resources['callico'].texture

    for(var i=0; i< 1000; i++) {
        let index = Math.floor(Math.random() * 2)
        let px = Math.random() * vw - (vw / 2)
        let py = Math.random() * vh - (vh / 2)
        let profile = new Sprite(profileTexture[index])
        profile.scale.set(0.15, 0.15)
        profile.position.set(px, py)
        profileContainer.addChild(profile)
    }
}


function createProfile() {
    console.log(profileContainer)
    let nowContainer = profileContainer
    nowContainer.alpha = 1
    stage.addChild(nowContainer)
    TweenMax.to(nowContainer, 1, {
        pixi: {
            alpha: 0
        },
        yoyo: true,
        ease: Elastic.easeOut.config(1, 0.2)
    })
    setTimeout(() => {
        stage.removeChild(nowContainer)
        
    }, 1000);
}



function createImage() {

    catSprite = new Sprite.from('./image/cat.png')
    catSprite.anchor.set(0.5, 0.5)
    catSprite.scale.set(0.3, 0.3)

    let cx = Math.random() * vw - (vw / 2)
    let cy = Math.random() * vh - (vh / 2)

    catSprite.position.set(cx, cy)



    
    stage.addChild(catSprite)
    TweenMax.to(catSprite, 1, {
        pixi: {
            x: 0,
            y: 0,
            alpha: 0
        },
        yoyo: true
    });

    setTimeout(function() {
        try {
            catSprite.destroy()
        } catch(e) {
            console.log(e)
        }
        
    },1000)

    

}   



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
            console.log('down')
            if(this.id == 0) {
                sound.restart()
                changeBG()
            } else if(this.id == 1) {
                catsound.start()
                createImage()
            } else if(this.id == 2) {
                bubble()
            } else if(this.id == 3) {
                crashsound.restart()
                createProfile()
            }
    
            let t = new TimelineMax()
            t.to(this, 0, {alpha: 0.4})
            .to(this, 0, {alpha: 0}, "+=0.1")

            t.play()
        })

        buttonGraphic[i].on('pointerup', function () {
            if(this.id == 0) {
                bgSprite.texture = bgTexture
            }
        })
        
        
        stage.addChild(buttonGraphic[i])

    }
}

function soundsetup() {
    player.start()
    player.loop = true
}

function changeBG() {
    if (bgSprite.texture == bgTexture) {
        bgSprite.texture = effectTexture[0]
        console.log(effectTexture)
    } else {
        bgSprite.texture = bgTexture
    }
}
