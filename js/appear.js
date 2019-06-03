// let honk = new Tone.Player('./sound/honk.wav').toMaster()
let logoVideo
let logoLoader = new Loader()

let demeonVideo
let demeonLoader = new Loader()

let glitchVideo
let glitchLoader = new Loader()



function preloadLogoVideo() {
	if (logoLoader.progress == 100) return
	logoLoader.add('logoVideo', './video/Part1/logoRotate.mp4')
	.load(( _, resources ) => {
		logoVideo = resources['logoVideo'].data
	})
}

function preloadDemeonVideo() {
	if (demeonLoader.progress == 100) return
	demeonLoader.add('demonVideo', './video/Part3/Demon.mp4')
		.load((_, resources) => {
			demeonVideo = resources['demonVideo'].data
		})
}


function preloadGlitchVideo() {
	if (glitchLoader.progress == 100) return
	glitchLoader.add('glitchVideo', './video/Part4/Glitch.mp4')
		.load((_, resources) => {
			glitchVideo = resources['glitchVideo'].data
		})
}

function appearDemon(time) {
	if (!demeonVideo) {
		demeonVideo = './video/Part3/Demon.mp4'
	}
	appearVideo(demeonVideo, time)
}


function appearLogo(time) {
	if (!logoVideo) {
		logoVideo = './video/Part1/logoRotate.mp4'
	}
	appearVideo(logoVideo, time)
}

function appearWarning(time) {
	appearColor(0xdb0000, time)
}

function appearGlitch(time) {
	if (!glitchVideo) {
		glitchVideo = './video/Part4/Glitch.mp4'
	}
    if (containers.length >= 30) {
    	removeBeam()
    }
	appearVideo(glitchVideo, time)
}

function appearVideo(file, time) {
	let texture = Texture.from(file);
	let appearSprite = appear(texture, time, 1);
	appearSprite.blendMode = PIXI.BLEND_MODES.ADD;
	let vSource = texture.baseTexture.source;
    vSource.loop = true;
	vSource.autoplay = true;
	
}

function appearColor(color, time) {
	// honk.restart();

	let appearSprite = appear(solid, time, 0);
	appearSprite.tint = color;
	let alpha = 0.5;
	let duration = 0.5;
	
	let t = new TimelineMax()
    t.fromTo(appearSprite, duration, {alpha:0}, {alpha:alpha})
    .fromTo(appearSprite, duration, {alpha:alpha}, {alpha:0})
    .fromTo(appearSprite, duration, {alpha:0}, {alpha:alpha})
    .fromTo(appearSprite, duration, {alpha:alpha}, {alpha:0})
    .fromTo(appearSprite, duration, {alpha:0}, {alpha:alpha})
    .fromTo(appearSprite, duration, {alpha:alpha}, {alpha:0})
    .fromTo(appearSprite, duration, {alpha:0}, {alpha:alpha})
    .fromTo(appearSprite, duration, {alpha:alpha}, {alpha:0})
    t.play()

}

function appear(texture, time, alpha) {
	let appearSprite = new Sprite(texture);
	appearSprite.anchor.set(0.5, 0.5)
	appearSprite.width = vw;
	appearSprite.height = vh;
	appearSprite.alpha = alpha;
	stage.addChild(appearSprite);

	setTimeout(function(){
		stage.removeChild(appearSprite);
	}, time);

	return appearSprite;
	
}

// appear(PIXI.Texture.WHITE, 0x000000, 0.5)