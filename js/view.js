setup()




let effectTexture = [], effectVideoSource = []
//let catSprite
let profileContainer = new Container()
let profileTexture = []
let buttonGraphic  = []
let bgInterval


const gifLoader = new PIXI.loaders.Loader();
const gifLoadOpt = {
        loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR,
        xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER,
        crossOrigin: ''
    };

loader.add('./video/BendedText.mp4')
      .add('./video/LogoRotate.mp4')
      .add('callico','./image/callico.jpg')
      .add('bird','./image/bird.jpg')
      .add('desert', './image/DesertTrance.jpeg')
      .add('filter', './image/filter.jpg')
      .load(setupView)
      


function setupView() {
    effectVideoSetup()
    profileSetup()
    buttonSetup()
    soundSetup()
}


function effectVideoSetup() {

    effectTexture.push(Texture.from('./video/LogoRotate.mp4'))
    effectTexture.push(Texture.from('./video/BendedText.mp4'))
    

    effectTexture.forEach(function(e, i) {
        effectVideoSource[i] = e.baseTexture.source
        effectVideoSource[i].autoplay = true
        effectVideoSource[i].loop = true

    })
}







// function soundSetup() {
//     player.start()
//     player.loop = true
// }


// function buttonSetup() {
//     for(var i = 0; i < 4; i++) {

//         let bw = vw / 2
//         let bh = vh / 2
        
//         buttonGraphic[i] = new Sprite(solid)
//         buttonGraphic[i].width  = bw
//         buttonGraphic[i].height = bh;
//         buttonGraphic[i].tint = 0xFFFFFF;
//         buttonGraphic[i].interactive = true
//         buttonGraphic[i].alpha = 0
//         buttonGraphic[i].position.set((i % 2) * bw - bw, Math.floor(i / 2) * bh - bh);
//         buttonGraphic[i].id = i

//         buttonGraphic[i].on('pointerdown', function() {
//             var execStr = "";
//             if(this.id == 0) {
//                 execStr = 
//                 `sound.restart();
//                 changeBG();
//                 setTimeout(() => {
//                     sound.restart()
//                     changeBG()
//                 }, 100);
//                 `
//                 sound.restart()
//                 changeBG()
//                 bgInterval = setInterval(() => {
//                     if (this.alpha == 0) buttonShine(this)
//                     sound.restart()
//                     changeBG()
//                 }, 300);
                
//             } else if(this.id == 1) {
//                 execStr = 
//                 `clearInterval(bgInterval);
//                 catsound.start();
//                 createImage();`
//                 clearInterval(bgInterval)
//                 catsound.start()
                
//                 createImage()
//             } else if(this.id == 2) {
//                 execStr = 
//                 `clearInterval(bgInterval);
//                 bubble();`
//                 clearInterval(bgInterval);
//                 bubble();
//             } else if(this.id == 3) {
//                 execStr = 
//                 `clearInterval(bgInterval);
//                 crashsound.restart();
//                 createProfile();`
//                 clearInterval(bgInterval)
//                 crashsound.restart()
//                 createProfile()
//             }
//             var data = {exec: execStr};
//             emit(data);
//             if (this.alpha == 0) buttonShine(this)

//         })

//         buttonGraphic[i].on('pointerup', function () {
//             if(this.id == 0) {
//                 clearInterval(bgInterval)
//                 bgSprite.texture = bgTexture
//             }
//         })
        
        
        
//         stage.addChild(buttonGraphic[i])

//     }
// }


// function buttonShine(btn) {
//     let t = new TimelineMax()
//     t.to(btn, 0, {alpha: 0.4})
//     .to(btn, 0, {alpha: 0}, "+=0.1")
//     t.play()
// }


function changeBG() {
    if (bgSprite.texture == bgTexture) {
        bgSprite.texture = effectTexture[0]
        console.log(effectTexture)
    } else {
        bgSprite.texture = bgTexture
    }
}
