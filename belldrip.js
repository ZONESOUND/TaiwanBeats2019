let filterMap = {
    intensity: 40,
    mouseDelay: 0.05,
    speed: 1,
    size: {
        height: 500,
        width: 500
    },
    wrapMode: PIXI.WRAP_MODES.REPEAT,
    filterSprite: null
}



function waterEffectSetup(texture) {
    filterSprite = new PIXI.Sprite(texture)
    filterSprite.width = filterMap.size.width
    filterSprite.height = filterMap.size.height
    filterSprite.texture.baseTexture.wrapMode = wrapMode
    stage.addChild(filterSprite)

    app.ticker.add(waterEffectAnimation)
}



function waterEffectAnimation() {
    const diffX = 1
    const diffY = 1

    if (filterMap.filterSprite) {
        filterMap.filterSprite.x =
            filterMap.filterSprite.x +
            filterMap.speed -
            diffX * filterMap.mouseDelay;
        filterMap.filterSprite.y =
            filterMap.filterSprite.y -
            filterMap.speed +
            diffY * filterMap.mouseDelay;
    }

    oldX = oldX + diffX * filterMap.mouseDelay;
    oldY = oldY + diffY * filterMap.mouseDelay;
}

let i
window.addEventListener('click', e => {
    if (!bgSprite.filters && !i) {
        bgSprite.filters = [
            new PIXI.filters.DisplacementFilter(
                filterSprite,
                filterMap.intensity
            )
        ]
        i = setInterval(() => {
            filterSprite.width += 100
            filterSprite.height += 100
            if (filterSprite.width >= filterMap.size.width || filterSprite.height >= filterMap.size.height) {
                filterSprite.width = filterMap.size.width
                filterSprite.height = filterMap.size.height
                app.ticker.add(looping)
                clearInterval(i)
                i = null
            }

        }, 100)
    } else if (!i) {
        i = setInterval(() => {
            console.log('1')
            filterSprite.width -= 100
            filterSprite.height -= 100
            if (filterSprite.height == 0 || filterSprite.width == 0) {
                bgSprite.filters = null
                filterSprite.width = 0
                filterSprite.height = 0
                app.ticker.remove(looping)
                clearInterval(i)
                i = null
            }

        }, 100)
    }

})
