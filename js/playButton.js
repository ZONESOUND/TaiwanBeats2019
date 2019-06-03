let app = new PIXI.Application({
    backgroundColor: 0x000000,
    autoResize: true,
    forceCanvas: true,
    resolution: devicePixelRatio,
    antialias: true
});

let renderer = app.renderer,
    stage = app.stage,
    view = app.view,
    vw = window.innerWidth,
    vh = window.innerHeight;

let buttonGraphic = [0,0,0,0];
let solid = PIXI.Texture.WHITE;
let Sprite = PIXI.Sprite;
let control = false;

window.onresize = resize;
document.body.appendChild(app.view);
setup();

let time_record = 0


function setup() {
    if (getParameterByName('control') == "true") {
        control = true;
    }
    resize();
    buttonSetup();
}


function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.resize(w, h);
    stage.x = vw / 2
    stage.y = vh / 2
}


function buttonSetup() {
    let color = [0xff5151, 0xfff951, 0x51ff85, 0x51d3ff]
    for(var i = 0; i < 4; i++) {

        let bw = vw / 2
        let bh = vh / 2
        let xStart = (i % 2) * bw - bw;
        let yStart = Math.floor(i / 2) * bh - bh;
        buttonGraphic[i] = new Sprite(solid)
        buttonGraphic[i].width  = bw
        buttonGraphic[i].height = bh;
        buttonGraphic[i].tint = 0xffffff;
        buttonGraphic[i].interactive = true
        buttonGraphic[i].alpha = 0
        buttonGraphic[i].position.set(xStart, yStart);
        buttonGraphic[i].id = i

        let lineWidth = 3;
        let gt = new PIXI.Graphics();
        //gt.beginFill(0x123123);
        let lineColor = 0x5a8ee2;
        if (control) lineColor = 0xff5151
        gt.lineStyle(lineWidth, lineColor);
        gt.drawRect(xStart, yStart, bw-lineWidth, bh-lineWidth);﻿
        //gt.endFill();


        buttonGraphic[i].on('pointerdown', function() {
            let data = {};
            if (control) {
                if (Date.now() - time_record < 300) {
                    alert('不要按這麼快，拜託！！')
                    return 
                }
                data.state = this.id;
            }
            else {
                data.id = this.id
            }
            emit(data);
            time_record = Date.now()
            if (this.alpha == 0) buttonShine(this)

        })
        
        stage.addChild(buttonGraphic[i]);
        stage.addChild(gt);
    }
}

function buttonShine(btn) {
    let t = new TimelineMax()
    t.to(btn, 0, {alpha: 1})
    .to(btn, 0, {alpha: 0}, "+=0.1")
    t.play()
}




function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}