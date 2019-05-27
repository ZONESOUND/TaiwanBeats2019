let buttons = [];

function buttonSetup() {
    for (var i=0; i<4; i++) {
        let b = new PIXI.Sprite(PIXI.Texture.WHITE);
        b.width = vw / 2;
        b.height = vh / 2;
        b.tint = 0xFFFFFF;
        let by = Math.floor(i/2);
        let bx = i-by*2;
        by *= vh/2;
        bx *= vw/2;
        b.position.set(bx, by);
        b.alpha = 1;
        buttons.push(b);
        stage.addChild(b);
    }
}

function buttonClick(event) {
	let xGroup = Math.floor(event.clientX*2 / vw);
	let yGroup = Math.floor(event.clientY*2 / vh);
	let group = xGroup + yGroup*2;

	let tl = new TimelineMax();
	tl.to(buttons[group], 0, { alpha: 0.4 })
	  .to(buttons[group], 0, { alpha: 0}, "+=0.1");
	tl.play();
}

window.addEventListener('touchstart', buttonClick);
window.addEventListener('click', buttonClick);