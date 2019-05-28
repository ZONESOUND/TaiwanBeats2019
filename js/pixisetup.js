let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

PIXI.utils.sayHello(type)

let app = new PIXI.Application({
    transparent: true,
    autoResize: true,
    forceCanvas: true,
    resolution: devicePixelRatio,
    antialias: true
});

let renderer = app.renderer,
    stage = app.stage,
    view = app.view,
    // loader = app.loader,
    vw = window.innerWidth,
    vh = window.innerHeight

let loader = PIXI.Loader.shared
let resources = PIXI.Loader.shared.resources
let Texture = PIXI.Texture
let Graphics  = PIXI.Graphics
let Sprite = PIXI.Sprite
let Container = PIXI.Container
let solid = PIXI.Texture.WHITE
let player = new Tone.Player('./sound/background.wav').toMaster()
let sound  = new Tone.Player('./sound/calico.wav').toMaster()
let catsound = new Tone.Player('./sound/meow.wav').toMaster()
let crashsound = new Tone.Player('sound/hacrash.wav').toMaster()

let bgTexture, bgSprite, bgVideoSource

window.onresize = resize


function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.resize(w, h);
    stage.x = vw / 2
    stage.y = vh / 2
}


function setup() {
    document.body.appendChild(app.view);
    resize()
    setupBG()
}


function setupBG() {
    
    bgTexture = Texture.from('./video/LuckyCat.mp4');

    bgSprite = new PIXI.Sprite(bgTexture);
    bgSprite.width = vw
    bgSprite.height = vh
    bgSprite.anchor.set(0.5, 0.5);

    bgVideoSource = bgTexture.baseTexture.source
    bgVideoSource.autoplay = true
    bgVideoSource.loop = true

    stage.addChild(bgSprite)
    
}



