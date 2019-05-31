let emojiOptions = ['😍', '😘', '😢', '😭', '💔', '❤️']
let catLoader = new Loader()
let catTexture;


function preloadCatImage() {
    console.log('preloadCat')
    if (catLoader.progress == 100) return
    catLoader.add('cat', './image/Part1/cat.png')
    .load((_, resources) => {
        catTexture = resources['cat'].texture
    })
}



let showImage = function (image) {
    let catSprite
    if (catTexture) {
        catSprite = new Sprite.from(catTexture)
    } else {
        catSprite = new Sprite.from(image)
    }
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

    setTimeout(function (sprite) {
        try {
            sprite.destroy()
        } catch (e) {
            console.log(e)
        }

    }, 1000, catSprite)



}



let showEmoji = function () {
    
    let text = new PIXI.Text(emojiOptions[Math.floor(Math.random() * emojiOptions.length)]);
    let cx = Math.random() * vw - (vw / 2)
    let cy = Math.random() * vh - (vh / 2)

    text.anchor.set(0.5, 0.5)
    text.scale.set(1, 1)
    text.position.set(cx, cy)




    stage.addChild(text)
    TweenMax.to(text, 1, {
        pixi: {
            x: 0,
            y: 0,
            alpha: 0,
            scale: 4
        },
        yoyo: true
    });

    setTimeout(function (text) {
        try {
            text.destroy()
        } catch (e) {
            console.log(e)
        }

    }, 1000, text)



}