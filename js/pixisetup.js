let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

PIXI.utils.sayHello(type)

const app = new PIXI.Application({
    transparent: true,
    autoResize: true,
    forceCanvas: true,
    resolution: devicePixelRatio,
});

let renderer = app.renderer,
    stage = app.stage,
    view = app.view,
    loader = app.loader,
    vw = window.innerWidth,
    vh = window.innerHeight


window.onresize = resize


function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.resize(w, h);
    stage.x = renderer.width * 0.5;
    stage.y = renderer.height * 0.5;
}


function setup() {
    document.body.appendChild(app.view);
    resize()
}



