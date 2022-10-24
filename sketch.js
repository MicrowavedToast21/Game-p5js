//Game created and modified by Tom and Leo
// Based on code originally written by UrbanAtWork
var ballx = 300;
var bally = 300;
var ballSize = 40;
var score = 0;
var timer;
var interval = 10000;
var countdown;
var resetFlag = 0;
var gameOver = false;
let xArray = [];
let yArray = [];
let randomVArray = [];

let img;
function preload() {
  img = loadImage('assets/crown.jpg');
}
function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  textSize(20);
  timer = millis() + interval;
  for (let i = 0; i < 10; i++) {
    ballx = random(width);
    bally = random(height);
    append(xArray, ballx);
    append(yArray, bally);
  }
  getRandomVelocities();
  
}

function resetTimer() {
  timer = millis() + interval;
  
}

function getRandomVelocities() {
  randomVArray = [];
  for (let i = 0; i < 12; i++) {
    append(randomVArray, p5.Vector.random2D());
  }
}

function getRandomCoordinates() {
 xArray = [];
 yArray = [];
 for (let i = 0; i < 10; i++) {
    ballx = random(width);
    bally = random(height);
    append(xArray, ballx);
    append(yArray, bally);
  } 
}

function draw() {
  background(220);
  if(score < 10) {
      levelOne();
  }
  countdown = ceil((timer-millis())/1000);
  text(("Score: " + score),width/2,40);
  if (countdown == 0) {
    gameOver = true;
  }
  if(score >= 10 && score < 20) {
      if (resetFlag == 1) {
        resetTimer();
        resetFlag = 0;
      }
      text(("Score: " + score),width/2,40);
      background(255, 0, 0);
      levelTwo();
  }
  if(score >= 20 && score < 30) {
    if (resetFlag == 1) {
        resetTimer();
      resetFlag = 0;
      }
      text(("Score: " + score),width/2,40);
      background(0, 255, 0);
      levelThree();
  }
  if(score >= 30 && score < 40) {
    if (resetFlag == 1) {
        resetTimer();
      resetFlag = 0;
      }
      text(("Score: " + score),width/2,40);
      background(0, 255, 0);
      levelFour();
  }
  if(score >= 40 && score < 50) {
    if (resetFlag == 1) {
        resetTimer();
      resetFlag = 0;
      }
      text(("Score: " + score),width/2,40);
      background(0, 255, 0);
      levelFive();
  }
  if(score >= 50) {
        //epilepsy warning to those who might be sensitive
     background(0);
     stroke(222, 255, 0)
     strokeWeight(3)
     textSize(20)
     textAlign(CENTER)
     background(0);
     image(img, width/2 -50, height/2 -50, 100, 100);
     fill(255);
     text(("Score: " + score),width/2,40);
     fill(255);
     text("YOU WINNNNNNNNN", width/2, 200) 
  }
  if (gameOver == true & score < 50){
     background(220);
     stroke(222, 255, 0)
     strokeWeight(3)
     textSize(20)
     textAlign(CENTER)
     text("YOU LOSE", width/2, 200)
     text(("Score: " + score), width/2, 40);
  }
}

function levelOne(){
  text("Level 1", width/2,height-20);
  text(("Timer: " + countdown),width*3/4,40);
  var distToBall = dist(ballx,bally,mouseX,mouseY);
  if(distToBall < ballSize/2){
    ballx = random(width);
    bally = random(height);
    score = score + 1;
  }
  
  line(ballx,bally,mouseX,mouseY);
  ellipse(ballx, bally, ballSize, ballSize);
  if (score == 10) {
    resetFlag = 1;
  }
}

function levelTwo(){
  text("Level 2", width/2,height-20);
  text(("Score: " + score),width/2,40);
  text(("Timer: " + countdown),width*3/4,40);
  var distToBall = dist(ballx,bally,mouseX,mouseY);
  if(distToBall < ballSize/2){
    ballx = random(width);
    bally = random(height);
    score = score + 1;
    ballSize = ballSize - 2;
  }
  ellipse(ballx, bally, ballSize, ballSize);
  if (score == 20) {
    resetFlag = 1;
  }
}

function levelThree(){
  text("Level 3", width/2,height-20);
  text(("Score: " + score),width/2,40);
  text(("Timer: " + countdown),width*3/4,40);
  var distToBall = dist(ballx,bally,mouseX,mouseY);
  if(distToBall < ballSize/2){
    ballx = random(width);
    bally = random(height);
    score = score + 1;
    ballSize = ballSize - 1;
  }
  ellipse(ballx, bally, ballSize, ballSize);
  if (score == 30) {
    resetFlag = 1;
  }
}

function levelFour(){
  text("Level 4", width/2,height-20);
  text(("Score: " + score),width/2,40);
  text(("Timer: " + countdown),width*3/4,40);
  
  for (let i = 0; i < xArray.length + 1; i++) {
    ellipse(xArray[i], yArray[i], ballSize, ballSize);
    var distToBall = dist(xArray[i],yArray[i],mouseX,mouseY);
    if(distToBall < ballSize/2){
      score = score + 1;
      xArray.splice(i, 1)
      yArray.splice(i, 1)
    }
  if (score == 40) {
    resetFlag = 1;
    getRandomCoordinates();
  }
}
}
  
function levelFive(){
  text("Level 5", width/2,height-20);
  text(("Score: " + score),width/2,40);
  text(("Timer: " + countdown),width*3/4,40);
  
  for (let i = 0; i < xArray.length ; i++) {
    xArray[i] = xArray[i] + randomVArray[i].x
    yArray[i] = yArray[i] + randomVArray[i].y
    if (xArray[i] < 0 | yArray[i] < 0 | xArray[i] > width | yArray[i] > height) {
      randomVArray[i].x = -randomVArray[i].x
      randomVArray[i].y = -randomVArray[i].y
    }
    ellipse(xArray[i], yArray[i], ballSize, ballSize);
    var distToBall = dist(xArray[i],yArray[i],mouseX,mouseY);
    if(distToBall < ballSize/2){
      score = score + 1;
      xArray.splice(i, 1)
      yArray.splice(i, 1)
    }
  }
  if (score == 50) {
    resetFlag = 1;
  }
}
