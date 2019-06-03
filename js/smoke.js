let particles = [];
let particleCount = 100
let maxVelocity = 5
let targetFPS = 35
let canvasWidth = 400
let canvasHeight = 400
let canvas, context
let starting, stopping
let particles_save = []

var imageObj = new Image();
imageObj.onload = function () {
    particles.forEach(function (particle) {
        particle.setImage(imageObj);
    });
};

imageObj.src = './image/Part2/smoke.png';


function initgas() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        gasGenerate()
    } else {
        alert("Please update your browser!");
    }
}

function draw() {

    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.fillRect(0, 0, 400, 400);

    particles.forEach(function (particle) {
        particle.draw();
    });
}


function update() {
    particles.forEach(function (particle) {
        particle.update();
    });
}

function generateRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function gasstop() {
    clearInterval(stopping)
    stopping = setInterval(function () {
        console.log('stop')
        for (var i = 0; i < 10; i++) {
            particles.pop()
        }
        if(particles.length == 0 ) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            $('#myCanvas').css('z-index', -10)
            clearInterval(stopping)        
        }
    }, 1000 / targetFPS);
}

var number = 0

function gasstart() {
    $('#myCanvas').css('z-index', 10)
    if(context) {
        clearInterval(starting)
        particles = particles_save.slice()
        starting = setInterval(function () {
            console.log('start')
            console.log(particles.length)
            draw();
            update();
            if (particles.length <= 0) {
                console.log('clear')
                clearInterval(starting)
            }
        }, 1000 / targetFPS);
    }
}

function gasGenerate() {
    for (let i = 0; i < particleCount; ++i) {
        let particle = new Particle(context);
        particle.setPosition(generateRandom(0, canvasWidth), generateRandom(0, canvasHeight));
        particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
        particles.push(particle);
    }

    particles_save = particles.slice()
}


function gasanimate(time) {
    gasstart()
    setTimeout(() => {
        gasstop()
    }, time)
}

function Particle(context) {
    this.x = 0;
    this.y = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.radius = 5;
    this.context = context;
    this.draw = function () {
        if (this.image) {
            this.context.drawImage(this.image, this.x - 128, this.y - 128);
            return;
        }

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba(0, 255, 255, 0)";
        this.context.fill();
        this.context.closePath();
    };

    this.update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        if (this.x >= canvasWidth) {
            this.xVelocity = -this.xVelocity;
            this.x = canvasWidth;
        } else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        if (this.y >= canvasHeight) {
            this.yVelocity = -this.yVelocity;
            this.y = canvasHeight;
        } else if (this.y <= 0) {
            this.yVelocity = -this.yVelocity;
            this.y = 0;
        }
    };


    this.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };


    this.setVelocity = function (x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    };

    this.setImage = function (image) {
        this.image = image;
    }
}

