let lush = new Tone.Player('./sound/lush.wav').toMaster()
//let bubbleSprites = [];

function bubble() {
	randomBubble();
	setTimeout(function() {
		randomBubble();
	}, 200);
	setTimeout(function() {
		randomBubble();
	}, 600);
	lush.restart();
	//bubbleSprites.push(createBubble(loader.resources["desert"].texture, 100, 100, 100))
}

function randomBubble() {
	let randX = Math.floor(Math.random()*vw/2 - vw/4);
	let randY = Math.floor(Math.random()*vh/2 - vh/4);
	let maxR = Math.floor(Math.random()*vh/2 + vh/2);
	let randS = Math.random()*0.07+1.07;
	createBubble(loader.resources["desert"].texture, randX, randY, maxR, randS)

	
}

function createBubble(imgTexture, x, y, bubbleMax, growSpeed) {

	let imgSprite = new PIXI.Sprite(imgTexture);
    imgSprite.anchor.set(0.5, 0.5);
    imgSprite.position.set(x, y);

    let initSize = 10;
    let ratio = Math.floor(Math.random()*5)*2*initSize / imgSprite.width;
   	imgSprite.scale.x *= ratio;
   	imgSprite.scale.y *= ratio;

   	let circles = createCircle(x, y, 10);
   	

   	stage.addChild(circles);
    imgSprite.mask = circles;
    stage.addChild(imgSprite);

   	const ticker = new PIXI.Ticker();
	ticker.add((deltaTime) => {
	  	// do something every frame
	  	//console.log(circles.width, bubbleMax);
	    //if (circles.width >= bubbleMax) ticker.stop();
	    if (circles.width >= bubbleMax) {
	    	ticker.stop();
	    	stage.removeChild(imgSprite, circles);
	    }
		let scale = growSpeed;
		//let preC = circles;
		let newR = circles.width*scale/2
		circles.clear();
		circles.beginFill(0xFFFFFF);
		circles.drawCircle(x, y, newR);
		circles.endFill();

	    imgSprite.scale.x *= scale;
	    imgSprite.scale.y *= scale;
	    //renderer.render(stage);
	});
	ticker.start();

   
    return imgSprite;
}

function createCircle(xPos, yPos, r, circle) {
	circle.clear();
	circle.beginFill(0xFFFFFF);
	circle.drawCircle(xPos, yPos, r);
	circle.endFill();

  	return circle;
}

function createCircle(xPos, yPos, r) {
  	let circle = new PIXI.Graphics();

	circle.beginFill(0xFFFFFF);
	circle.drawCircle(xPos, yPos, r);
	circle.endFill();

  	return circle;
}
