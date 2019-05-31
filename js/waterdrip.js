
let wrapMode = PIXI.WRAP_MODES.REPEAT
let oldX = 0;
let oldY = 0;
let currentY = 0;
let currentX = 0;
let state = ''
let filterSprite
let filterLoader = new Loader()
let filterMap = {
    intensity: 40,
    mouseDelay: 0.05,
    speed: 1,
    size: {
        height: 500,
        width: 500
    }
}



function waterDripAnimate(time) {
    waterDripStart()
    setTimeout(() => {
        waterDripStop()
    }, time)
}

function waterDripSetup() {

    let filter = Texture.from('./image/Part2/filter.jpg')

    filterSprite = new PIXI.Sprite(filter)
    filterSprite.width = 0
    filterSprite.height = 0
    filterSprite.texture.baseTexture.wrapMode = wrapMode

}

function waterDripStart() {
    bgSprite.filters = [new PIXI.filters.DisplacementFilter(
        filterSprite,
        filterMap.intensity
    )]
    stage.addChild(filterSprite)
    state = 'started'
    app.ticker.add(looping)
}


function waterDripStop() {
    state = 'stopped'
}

function looping(delta) {

    if (state == 'started') {
         if (filterSprite.width >= filterMap.size.width || filterSprite.height >= filterMap.size.height) {
             filterSprite.width = filterMap.size.width
             filterSprite.height = filterMap.size.height
         } else {
            filterSprite.width += 10
            filterSprite.height += 10
         }

    } else if(state == 'stopped') {
        if (filterSprite.height == 0 || filterSprite.width == 0) {
            bgSprite.filters = null
            filterSprite.width = 0
            filterSprite.height = 0
            app.ticker.remove(looping)
        } else {
            filterSprite.height -= 10
            filterSprite.width -= 10
        }


    }
    
    const diffX = currentY - oldX;
    const diffY = currentX - oldY;



    if (filterSprite) {
        filterSprite.x =
            filterSprite.x +
            filterMap.speed -
            diffX * filterMap.mouseDelay;
        filterSprite.y =
            filterSprite.y -
            filterMap.speed +
            diffY * filterMap.mouseDelay;
    }

    oldX = oldX + diffX * filterMap.mouseDelay;
    oldY = oldY + diffY * filterMap.mouseDelay;
}