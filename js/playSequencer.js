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

let buttonGraphic = []
let sequenceGraphic = []
let last
let gtGraphic = []
let solid = PIXI.Texture.WHITE;
let Sprite = PIXI.Sprite;
let control = false;
let index = 0;
let soundUrl = ['./sound/sequencer/S1.mp3', './sound/sequencer/S2.mp3', './sound/sequencer/S3.mp3', './sound/sequencer/S4.mp3']
let soundArray = []

function loadSound() {
    for(var i =0; i < 4 ; i++) {
        soundArray[i] = new Tone.Player(soundUrl[i]).toMaster()
    }
}

window.onresize = resize;
document.body.appendChild(app.view);
setup();

let time_record = 0


function setup() {
    resize();
    buttonSetup();
    sequencerUI();
    soundSetup();
}

function soundSetup() {
    loadSound()
    Tone.Transport.scheduleRepeat(repeat, '8n');
    Tone.Transport.start();
}

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.resize(w, h);
    stage.x = vw / 2 - 50 * 8
    stage.y = vh / 2 - 50 * 2
}

function repeat(time) {
    if(index != 0) {
        sequenceGraphic[(index-1) % 16].alpha = 0
    }
    let nowindex = index % 16
    sequenceGraphic[nowindex].alpha = 1
    for (var i = 0; i < 4; i++) {
        if(buttonGraphic[i * 16 + nowindex].alpha == 0.5) {
            soundArray[i].start()
            let data = {};
            data.id = i
            emit(data);
        }
    }


    index++


}

function sequencerUI() {
    for (var i = 0; i < 16; i++) {
        let w = window.innerWidth;
        let bw = w / 30
        let bh = bw / 3
        let xStart = (i % 16) * bw - bw;
        let yStart = -60

        sequenceGraphic[i] = new Sprite(solid)
        sequenceGraphic[i].width = bw
        sequenceGraphic[i].height = bh;
        sequenceGraphic[i].tint = 0xff5151;
        sequenceGraphic[i].interactive = true
        sequenceGraphic[i].alpha = 0
        sequenceGraphic[i].position.set(xStart, yStart);
        sequenceGraphic[i].id = i

        let lineWidth = 1.5;
        let gt = new PIXI.Graphics();
        //gt.beginFill(0x123123);
        let lineColor = 0xff5151;
        gt.lineStyle(lineWidth, lineColor);
        gt.drawRect(xStart, yStart, bw - lineWidth, bh - lineWidth);
        //gt.endFill();


        stage.addChild(sequenceGraphic[i]);
        stage.addChild(gt);
    }
}


function buttonSetup() {
    let color = [0xff5151, 0xfff951, 0x51ff85, 0x51d3ff]
    for(var i = 0; i < 64; i++) {
        let w = window.innerWidth;
        let bw = w / 30
        let bh = w / 30
        let xStart = (i % 16) * bw - bw;
        let yStart = Math.floor(i / 16) * bh - bh;
        buttonGraphic[i] = new Sprite(solid)
        buttonGraphic[i].width  = bw
        buttonGraphic[i].height = bh;
        buttonGraphic[i].tint = 0xffffff;
        buttonGraphic[i].interactive = true
        buttonGraphic[i].alpha = 0
        buttonGraphic[i].position.set(xStart, yStart);
        buttonGraphic[i].id = i

        let lineWidth = 3;
        gtGraphic[i] = new PIXI.Graphics();
        //gt.beginFill(0x123123);
        let lineColor = 0x5a8ee2;
        if (control) lineColor = 0xff5151
        gtGraphic[i].lineStyle(lineWidth, lineColor);
        gtGraphic[i].drawRect(xStart, yStart, bw - lineWidth, bh - lineWidth);
        //gt.endFill();

        

        buttonGraphic[i].on('pointerdown', function() {
            // let data = {};
            // data.id = this.id
            // emit(data);
            if(this.alpha == 0.5) {
                this.alpha = 0
            } else {
                this.alpha = 0.5
            }

        })
        
        stage.addChild(buttonGraphic[i]);
        stage.addChild(gtGraphic[i]);
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