let bgsound

class Level {
    constructor(soundUrl, videoUrl, trigger, init) {

        this.soundUrl = soundUrl
        this.videoUrl = videoUrl
        this.trigger  = trigger
        this.sounds = []
        this.assests = []
        this.bgLoader = new Loader()
        this.init = init
        this.bgSprite = {}
    }

    loadBG() {
        if (this.soundUrl) {
            bgsound = new Tone.Player(this.soundUrl[0], () => {
                Tone.Transport.start();
                bgVideoSource.currentTime = 0
            }).toMaster()
            bgsound.sync().start();
            console.log(Tone.Transport)
            bgsound.loop = true
        } 
        let level_ = this
        console.group(this.videoUrl)
        if(this.videoUrl) {
            
            let tempSprite = this.bgSprite
            this.bgLoader.reset()
            this.bgLoader.add('bgVideo', this.videoUrl[0])
            this.bgLoader.load(function(_, resources) {
                loadingStop()
                let bgTexture = Texture.from(resources['bgVideo'].data)

                tempSprite.sprite = new Sprite(bgTexture)
                tempSprite.sprite.width = vw
                tempSprite.sprite.height = vh
                tempSprite.sprite.anchor.set(0.5, 0.5);
                
                bgSprite = tempSprite.sprite
                bgVideoSource = bgTexture.baseTexture.source
                
                bgVideoSource.autoplay = false
                bgVideoSource.loop = true
                

                stage.addChild(bgSprite)
                buttonSetup(level_)
            })
        } 
        if(STATE == 0) {
            showBGhtml()
            buttonSetup(level_)
            loadingStop()
        }
    }

    initFuntion() {
        this.init.forEach(function(f) {
            f()
        })
    }
    
    loadSound() {
        if(!this.soundUrl) return
        let sounds = []
        this.soundUrl.forEach(function(url) {
            
            if(url == '') {
                console.log(url)
                return 
            }
            let sound = new Tone.Player(url).toMaster()
            sounds.push(sound)
        })
        this.sounds = sounds
    }

    leave() {
        bgsound.unsync().stop()
        Tone.Transport.stop();
    }
}



let levels = []

let trigger_function = [{
    'func': appearLogo,
    'options': 200
}, {
    'func': showImage,
    'options': null
}, {
    'func': bubble,
    'options': null
}, {
    'func': createProfile,
    'options': null,
}]
let preloadFunction = [profileSetup, preloadCatImage, prelaodPoster, preloadLogoVideo]
let soundUrl = ['./sound/Part1/background.wav', './sound/Part1/calico.wav', './sound/Part1/meow.wav', './sound/Part1/lush.wav', './sound/Part1/hacrash.wav']
let videoUrl = ['']

levels.push(new Level(soundUrl, videoUrl, trigger_function, preloadFunction))



trigger_function = [{
    'func': gifThurder,
    'options': './image/Part2/Thunder.gif'
}, {
    'func': gifHeart,
    'options': './image/Part2/heartBeat.gif'
}, {
    'func': waterDripAnimate,
    'options': 1000
}, {
    'func': gasanimate,
    'options': 1000,
}]

preloadFunction = [preloadGif, waterDripSetup, initgas]
soundUrl = ['./sound/Part2/background.wav', './sound/Part2/thunder.wav', './sound/Part2/heartbeat.wav', './sound/Part2/belldrip.wav', './sound/Part2/birdscream.wav']
videoUrl = ['./video/Part2/background.mp4']
levels.push(new Level(soundUrl, videoUrl, trigger_function, preloadFunction))




trigger_function = [{
    'func': appearDemon,
    'options': 3000
}, {
    'func': showEmoji,
    'options': null
}, {
    'func': appearWarning,
    'options': 3000
}, {
    'func': gen_notify,
    'options': null,
}]

preloadFunction = [preloadDemeonVideo]
soundUrl = ['./sound/Part3/background.wav', './sound/Part3/demon.wav', './sound/Part3/girl.wav', './sound/Part3/honk.wav', './sound/Part3/inbox.wav']
videoUrl = ['./video/Part3/background.mp4']
levels.push(new Level(soundUrl, videoUrl, trigger_function, preloadFunction))



trigger_function = [{
    'func': glitch,
    'options': 3000
}, {
    'func': createBeam,
    'options': null
}, {
    'func': appearGlitch,
    'options': 3000
}, {
    'func': loopy,
    'options': 1500,
}]

preloadFunction = [preloadGlitchVideo]
soundUrl = ['./sound/Part4/background.wav', './sound/Part4/freeze.wav', './sound/Part4/robot.wav', './sound/Part4/transformer.wav', '']
videoUrl = ['./video/Part4/background.mp4']
levels.push(new Level(soundUrl, videoUrl, trigger_function, preloadFunction))




loadScense(STATE)



function changeScense(index) {
    levels[STATE].leave()
    stage.children.forEach((s) => {
        stage.removeChild(s)
    })
    if(STATE == 0) {
        rmBGhtml()
    }
    if(STATE == 3) {
        removeBeam()
    }
    STATE = index
    loadScense(index)
}


function loadScense(index) {
    pixiSetup()
    levels[index].loadBG()
    levels[index].loadSound()
    levels[index].initFuntion()
}