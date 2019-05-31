var DEVICE_EVENT = 'click'
var UUID = localStorage.getItem("uuid");
let STATE = 0
let USER_GESTURE;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    DEVICE_EVENT = 'touchstart'
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
    $('body').css({
        'background-color': '#000',
        'color': '#ccc'
    })
    $('body').append('<div class="loader">Loading</div>')
}

function loadingStop() {
    $('body').css({
        'background-color': 'transparent',
    })
    $(".loader").remove();
}