let containers = []

function generateBeamData() {
    let data = []

    for (let i = 0; i <= Math.floor(Math.random() * 10) * 3; i++) {
        let x = vw * Math.random()
        let y = vh * Math.random()
        data.push({
            x: x,
            y: y
        })
    }

    return data
}

function removeBeam() {
    containers.forEach((c) => {
        c.destroy()
    })
}




function createBeam() {
    let x = (Math.random() * vw/2) - (vw / 4)
    let y = (Math.random() * vh/2) - (vh / 4)
    let hsv = hsvToRGB2(Math.random(), 0.2, 1)
    let r = hsv[0] / 255
    let g = hsv[1] / 255
    let b = hsv[2] / 255

    let color = PIXI.utils.rgb2hex([r, g, b])
    createline(color, x, y)
}

function createline(color, x, y) {
    let beziers = [],
        lineWidth = 4;
    let container = new PIXI.Container()

    beziers.push(new PIXI.Graphics())
    beziers.push(new PIXI.Graphics())
    beziers.push(new PIXI.Graphics())

    lastX = vw * Math.random()
    lastY = vh * Math.random()

    x0 = (Math.random() * vw / 2) - (vw / 4)
    y0 = (Math.random() * vh / 2) - (vh / 4)
    x1 = (Math.random() * vw / 2) - (vw / 4)
    y1 = (Math.random() * vh / 2) - (vh / 4)
    x2 = (Math.random() * vw / 2) - (vw / 4)
    y2 = (Math.random() * vh / 2) - (vh / 4)

    beziers.forEach((bezier, i) => {
        bezier.lineStyle(lineWidth, color, 1);
        bezier.bezierCurveTo(x0, y0, x1, y1, x2, y2);
        bezier.bezierCurveTo(lastX, lastY, x2, y2, x0, y0);
        bezier.alpha = 0
        bezier.position.x = x
        bezier.position.y = y + lineWidth * i
        if (i % 2 == 0) {
            bezier.filters = [new PIXI.filters.BlurFilter()];
        }
        container.addChild(bezier)
        TweenMax.to(bezier, 0.5, {
            pixi: {
                alpha: 1
            },
            repeat: 1,
            ease: Back.easeOut
        });
    })

    bgSprite.blendMode = PIXI.BLEND_MODES.DARKEN;
    console.log(bgSprite)
    stage.addChild(container);
    
    containers.push(container)
    
}


function hsvToRGB2(hue, saturation, value) {
    var hi;
    var f;
    var p;
    var q;
    var t;

    while (hue < 0) {
        hue += 360;
    }
    hue = hue % 360;

    saturation = saturation < 0 ? 0 :
        saturation > 1 ? 1 :
        saturation;

    value = value < 0 ? 0 :
        value > 1 ? 1 :
        value;

    value *= 255;
    hi = (hue / 60 | 0) % 6;
    f = hue / 60 - hi;
    p = value * (1 - saturation) | 0;
    q = value * (1 - f * saturation) | 0;
    t = value * (1 - (1 - f) * saturation) | 0;
    value |= 0;

    switch (hi) {
        case 0:
            return [value, t, p];
        case 1:
            return [q, value, p];
        case 2:
            return [p, value, t];
        case 3:
            return [p, q, value];
        case 4:
            return [t, p, value];
        case 5:
            return [value, p, q];
    }
}