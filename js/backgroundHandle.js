// let freeze = new Tone.Player('./sound/freeze.wav').toMaster()
//glitch(3000)

function glitch(timeoutMS) {

	let filter = new PIXI.filters.GlitchFilter;
	filter.fillMode = PIXI.filters.GlitchFilter.MIRROR;
	filter.red.x = -5;
	filter.red.y = -10;
	bgSprite.filters = [filter];
	bgVideoSource.pause();

	Tone.Transport.pause();
	// freeze.restart();

	const ticker = new PIXI.Ticker();
	ticker.add((deltaTime) => {
		if (Math.random() > 0.65)
			filter.slices = Math.floor(Math.random()*7)+5;
	});

	ticker.start();
	setTimeout(function() {
		bgSprite.filters = null;
		ticker.stop();
		bgVideoSource.play();
		Tone.Transport.start();
		// freeze.stop();
	}, timeoutMS)
}

//loop(1500, 0.4)
function loopy(time, period = 0.4) {
	let ticker = loop_video(time, period);
	loop_sound(time, period);
	setTimeout(function() {
		ticker.stop();
		Tone.Transport.loop = false;
	}, time)
}

function loop_sound(time, period) {
	var temp = Tone.Transport.seconds;
	Tone.Transport.setLoopPoints(temp-period, temp);
	Tone.Transport.loop = true;
}

function loop_video(time, period) {
	
	let current = bgVideoSource.currentTime;
	bgVideoSource.currentTime = current-period;
	const ticker = new PIXI.Ticker();
	ticker.add((deltaTime) => {
		if (bgVideoSource.currentTime >= current) bgVideoSource.currentTime = current-period;
	});
	ticker.start();
	return ticker;
	

}

function showBGhtml() {
	$("#background").show();
}

function rmBGhtml() {
	$("#background").hide();
	}