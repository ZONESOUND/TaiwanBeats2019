var DEVICE_EVENT = 'click'
var UUID = localStorage.getItem("uuid");
let STATE = 0
let USER_GESTURE
let DEVICE_TYPE = 'desktop'
let ALLSOUNDS = []
let ALLSOUNDS_URL = [
    ['./sound/Part1/background.wav', './sound/Part1/calico.wav', './sound/Part1/meow.wav', './sound/Part1/lush.wav', './sound/Part1/hacrash.wav'],
    ['./sound/Part2/background.wav', './sound/Part2/thunder.wav', './sound/Part2/heartbeat.wav', './sound/Part2/belldrip.wav', './sound/Part2/birdscream.wav'],
    ['./sound/Part3/background.wav', './sound/Part3/demon.wav', './sound/Part3/girl.wav', './sound/Part3/honk.wav', './sound/Part3/inbox.wav'],
    ['./sound/Part4/background.wav', './sound/Part4/freeze.wav', './sound/Part4/robot.wav', './sound/Part4/transformer.wav', '']
]


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    DEVICE_EVENT = 'touchstart'
    DEVICE_TYPE  = 'mobile'
}

$(document).ready(function () {
    document.addEventListener(DEVICE_EVENT, initial)
    loadingStart()
});

function initial() {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }

    bodyScrollLock.disableBodyScroll(window);
    disableZoom()
    // openFullscreen()
}


function disableZoom() {
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
       event.preventDefault();
    }
  }, { passive: false });
  
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

}

function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        /* IE/Edge */
        document.documentElement.msRequestFullscreen();
    }
}

function loadingStart() {
    $('body').append('<div id="loadingBG"><div class="loader">Loading</div></div>')
}

function loadingStop() {
    $("#loadingBG").remove();
}

