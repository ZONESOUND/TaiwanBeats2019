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
    vw = window.innerWidth,
    vh = window.innerHeight

let loader = PIXI.Loader.shared
let Loader = PIXI.Loader
let resources = PIXI.Loader.shared.resources
let Texture = PIXI.Texture
let Graphics  = PIXI.Graphics
let Sprite = PIXI.Sprite
let Container = PIXI.Container
let solid = PIXI.Texture.WHITE
let buttonGraphic = []
let bgSprite, bgVideoSource







window.onresize = resize


function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.resize(w, h);
    stage.x = w / 2
    stage.y = h / 2
}


function pixiSetup() {
    document.body.appendChild(app.view);
    resize()
}





