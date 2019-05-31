let profileContainer = new Container()
let profileTexture = []

function profileSetup() {
    profileTexture[0] = Texture.from('./image/Part1/bird.jpg')
    profileTexture[1] = Texture.from('./image/Part1/callico.jpg')
    // profileTexture[0] = resources['bird'].texture
    // profileTexture[1] = resources['callico'].texture

    for (var i = 0; i < 150; i++) {
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
    
    let nowContainer = profileContainer
    
    nowContainer.alpha = 1
    stage.addChild(nowContainer)
    
    TweenMax.to(nowContainer, 1, {
        pixi: {
            alpha: 0
        },
        yoyo: true,
        // ease: Elastic.easeOut.config(1, 0.2)
    })

    setTimeout(() => {
        stage.removeChild(nowContainer)
    }, 1000);
}