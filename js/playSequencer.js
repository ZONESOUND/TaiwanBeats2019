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
let count = 0;
let folder = './sound/CulTech/2bar_sample'
// let soundUrl = [`${folder}/sasa.mp3`, `${folder}/sample1-巴拉巴拉巴拉.mp3`, `${folder}/sample2-巴拉巴拉巴拉.mp3`, `${folder}/sample3-巴拉巴拉巴拉.mp3`, `${folder}/sample4-巴拉巴拉巴拉.mp3`, `${folder}/sample5-巴拉巴拉巴拉.mp3`, `${folder}/sample6-巴拉巴拉巴拉.mp3`, `${folder}/sample7-巴拉巴拉巴拉.mp3`, `${folder}/sample8-巴拉巴拉巴拉.mp3`]
let soundUrl = [`${folder}/sasa.mp3`, `${folder}/2bar1-巴拉巴拉巴拉.mp3`, `${folder}/2bar2-巴拉巴拉巴拉.mp3`, `${folder}/2bar3-巴拉巴拉巴拉.mp3`, `${folder}/2bar4-巴拉巴拉巴拉.mp3`, `${folder}/2bar5-巴拉巴拉巴拉.mp3`, `${folder}/2bar6-巴拉巴拉巴拉.mp3`, `${folder}/2bar7-巴拉巴拉巴拉.mp3`, `${folder}/2bar8-巴拉巴拉巴拉.mp3`]

let soundArray = []
let bgSound;

let size = 8
console.log(soundUrl.length)
function loadSound() {
    for(var i =0; i <= size ; i++) {
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
    Tone.Transport.scheduleRepeat(repeat, '4n');
    Tone.Transport.bpm.value = 76
    // Tone.Transport.start();
}

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.resize(w, h);
    let bw = w / (size * 5)
    stage.x = vw / 2 - bw * (size)
    stage.y = vh / 2 - bw * (size / 2)

}

function repeat(time) {
    if(count % 2 == 0) {
        if (soundArray[0]) {
            soundArray[0].start()
        }
    } else {
        if (soundArray[0]) {
            soundArray[0].start()
        }
    }
    count++
    if(index != 0) {
        sequenceGraphic[(index-1) % 16].alpha = 0
    }
    let nowindex = index % 16
    sequenceGraphic[nowindex].alpha = 1
    for (var i = 1; i <= size; i++) {
        if(buttonGraphic[(i-1) * 16 + nowindex].alpha == 0.5) {
            soundArray[i].start()
            let data = {};
            data.id = i
            emit(data);
        }
    }

    index++
    if(nowindex == 15) {
        Tone.Transport.stop()
    }
    soundArray[0].start()
}

function sequencerUI() {
    for (var i = 0; i < 16; i++) {
        let w = window.innerWidth;
        let bw = w / (size * 5)
        let bh = bw / 3
        let xStart = (i % 16) * bw;
        let yStart = -1.5*bw

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
    let w = window.innerWidth;
    let bw = w / (size * 5)
    let bh = w / (size * 5)
    var startBtn = new Sprite(solid)
    let xStart = -bw;
    let yStart = - bh;
    startBtn.width = bw
    startBtn.height = bh;
    startBtn.interactive = true
    startBtn.alpha = 0
    startBtn.position.set(xStart, yStart);

    let lineWidth = 1.5;
    let startGraphic = new PIXI.Graphics();
    let lineColor = 0xfff951;
    startGraphic.lineStyle(lineWidth, lineColor);
    startGraphic.drawRect(xStart, yStart, bw - lineWidth, bh - lineWidth);

    startBtn.on('pointerdown', function () {
        buttonShine(startBtn);
        Tone.Transport.start();
        // if (this.alpha == 0.5) {
        //     Tone.Transport.stop();
        //     this.alpha = 0
        // } else {
        //     Tone.Transport.start();
        //     this.alpha = 0.5
        // }    
    })

    for(var i = 0; i < size * 16; i++) {
        let xStart = (i % 16) * bw;
        let yStart = Math.floor(i / 16) * bh - bh;
        buttonGraphic[i] = new Sprite(solid)
        buttonGraphic[i].width  = bw
        buttonGraphic[i].height = bh;
        buttonGraphic[i].tint = 0xffffff;
        buttonGraphic[i].interactive = true
        buttonGraphic[i].alpha = 0
        buttonGraphic[i].position.set(xStart, yStart);
        buttonGraphic[i].id = i

        let lineWidth = 1.5;
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

        stage.addChild(startBtn);
        stage.addChild(startGraphic);
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


function removeAll() {
    stage.children.forEach((s) => {
        s.destroy()
    })
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