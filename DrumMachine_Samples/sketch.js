let hh, clap, bsss; //INSTRUMENT. will serve as a container that holds a sound source.
let hPat, cPat, bPat; //INSTRUMENT PATTERN. will be an array of numbers that we can manipulate to make beats.
let hPhrase, cPhrase, bPhrase; //HIHAT PHRASE. which defines how the instruments pattern is interpreted.
let drums; //PART. we will attach the phrase to the part, thich will serve as our transport to drive the phrase.
let beatLength;
let cellWidth;
let cnv;
let sPat;
let cursorPos;
let w = window.innerWidth
let h = window.innerHeight

function setup() {
  cnv=createCanvas(w, h);
  cnv.mousePressed(canvasPressed);
  beatLength =16;
  cellWidth = width/beatLength;
  cursorPos = 0;
  
  hh = loadSound('assets/4.mp3', () => {});
  clap = loadSound('assets/3.mp3',()=>{});
  bass = loadSound('assets/2.mp3',()=>{});
  sound = loadSound('assets/1.mp3', () => { });
  
  hPat = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0];
  cPat = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0];
  bPat = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0];
  dPat = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
  sPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  
  hPhrase = new p5.Phrase('hh', (time) => {
    let data = {};
    data.id = 0
    emit(data);
    hh.play(time);
  }, hPat);
  
   cPhrase = new p5.Phrase('clap', (time) => {
    let data = {};
    data.id = 1
    emit(data);
    clap.play(time);
  }, cPat);

   bPhrase = new p5.Phrase('bass', (time) => {
    let data = {};
    data.id = 2
    emit(data);
    bass.play(time);
  }, bPat);

  dPhrase = new p5.Phrase('sound', (time) => {
    let data = {};
    data.id = 3
    emit(data);
    sound.play(time);
  }, dPat);


  drums = new p5.Part();

  drums.addPhrase(hPhrase);
  drums.addPhrase(cPhrase);
  drums.addPhrase(bPhrase);
  drums.addPhrase(dPhrase);
  drums.addPhrase('seq', sequence, sPat);
  
  
  bpmCTRL= createSlider(20,200, 80, 1);
  bpmCTRL.position(10,70);
  bpmCTRL.input(()=>{drums.setBPM(bpmCTRL.value())});
  drums.setBPM('80')
  
  drawMatrix();
}


function mousePressed() {
    if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded() && sound.isLoaded()) {
      if (!drums.isPlaying) {
        drums.metro.metroTicks = 0;
        drums.loop();
      } else {
        drums.stop();
      }
    } else {
      console.log('oops, be patient as drums load...');
    }
}


function keyPressed(){
    if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded() && sound.isLoaded()) {
      if (!drums.isPlaying) {
        drums.metro.metroTicks = 0;
        drums.loop();
      } else {
        drums.stop();
      }
    } else {
      console.log('oops, be patient as drums load...');
    }
}

function canvasPressed(){
  let rowClicked = floor(4*mouseY/height);
  let indexClicked = floor(16*mouseX/width);
  if (rowClicked === 0){
    console.log('first row '+indexClicked);
    hPat[indexClicked] = +!hPat[indexClicked];
  }else if (rowClicked === 1){
    console.log('second row');
    cPat[indexClicked] = +!cPat[indexClicked];
  }else if (rowClicked === 2){
    console.log('third row');
    bPat[indexClicked] = +!bPat[indexClicked];
  } else if (rowClicked === 3) {
    console.log('forth row');
    dPat[indexClicked] = +!dPat[indexClicked];
  }
  drawMatrix();
}

function drawMatrix(){ //draw dots that represent the the pressed notes in step.
  background(80);
  stroke('gray');
  strokeWeight(2);
  fill('white');
  
  for (let i=0; i<beatLength+1; i++){
    //startx, starty, endx, endy
    line(i*cellWidth, 0, i*cellWidth, height);
  }
  for (let i=0; i<5; i++){
    line(0, i*height/4, width, i*height/4);
  }
  noStroke();
  for (let i=0; i<beatLength; i++){
    if (hPat[i]===1){
    ellipse(i*cellWidth+0.5*cellWidth, height/8, 10);
    }
    if (cPat[i]===1){
    ellipse(i*cellWidth+0.5*cellWidth, height*3/8, 10);
    }
    if (bPat[i]===1){
    ellipse(i*cellWidth+0.5*cellWidth, height*5/8, 10);
    }
    if (dPat[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, height * 7 / 8, 10);
    }
  }
}

function sequence(time, beatIndex){

  if(beatIndex == 16) {
    drums.stop()
  }
  setTimeout(()=>{
    drawMatrix();
    drawPlayhead(beatIndex);
  },time*1000);//form sec to millisec
}

function drawPlayhead(beatIndex){
  stroke('red');
  fill(255,0,0, 30); 
  rect((beatIndex-1)*cellWidth, 0, cellWidth, height);
}
  

