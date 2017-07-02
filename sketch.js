function setup() {
  // Canvas parameters
  canvasWidth = 1400;
  canvasHeight = 600;
  createCanvas(canvasWidth, canvasHeight);

  // Drawing parameters
  strokeAlpha = 25;
  angleMode(DEGREES);
  angle = 12;
  xDist = 5;
  fr = 50;
  frameRate(fr);

  smooth();
  strokeWeight(2);
  strokeCap(SQUARE);
  
  stroke(255,255,255, strokeAlpha);
  textFont("Avenir Next");

  cntr = 1;
  procNums = [];
  
  // Background
  push();
  noStroke();
  fill(0,0,0);
  rect(0, 0, canvasWidth, canvasHeight);
  pop();
  
  // Interface elements
  alphaSlider = createSlider(0, 255, strokeAlpha);
  alphaSlider.position(20, 70);

  angleSlider = createSlider(0, 90, angle);
  angleSlider.position(20, 100);

  distSlider = createSlider(5, 20, xDist);
  distSlider.position(20, 130);

  frameRateSlider = createSlider(1, 50, fr);
  frameRateSlider.position(20, 160);

  numInp = createInput();
  numInp.position(20, 190);
  numInp.size(75);

  numButton = createButton("Jump to Number");
  numButton.position(numInp.x * 2 + numInp.width, 191);
  numButton.mousePressed(jumpToNumber);

  resetButton = createButton("Reset");
  resetButton.position(20, 230);
  resetButton.mousePressed(resetCanvas);

  pauseButton = createButton("Pause");
  pauseButton.position(90, 230);
  pauseButton.mousePressed(pauseDrawing);

  playButton = createButton("Play");
  playButton.position(170, 230);
  playButton.mousePressed(resumeDrawing);

  cumRenderButton = createButton("Cumulative Render");
  cumRenderButton.position(20, 260);
  cumRenderButton.mousePressed(cumRender);

  pngButton = createButton("Save Img");
  pngButton.position(145, 260);
  pngButton.mousePressed(saveImg);
}


function drawInterfaceText() {
  push();
  stroke(255, 255, 255, 255);
  strokeWeight(0.5);
  fill(50, 50, 50);
  rect(0, 0, 300, 295);
  pop();

  push();
  noStroke();
  fill(255, 255, 255);
  
  // Title  
  textSize(36);
  text("Collatz Musings", 20, 50);
  
  textSize(12);
  
  text("Alpha: " + alphaSlider.value(), alphaSlider.x * 2 + alphaSlider.width, 82);
  text("Angle: " + angleSlider.value(), angleSlider.x * 2 + angleSlider.width, 112);
  text("Distance: " + distSlider.value(), distSlider.x * 2 + distSlider.width, 142);
  text("Speed: " + frameRateSlider.value(), frameRateSlider.x * 2 + frameRateSlider.width, 172);
  
  pop();   
}

function blankCanvas() {
  push();
  fill(0,0,0);
  noStroke();
  rect(0, 0, canvasWidth, canvasHeight);
  pop();  
}

function resetCanvas() {
  blankCanvas();

  cntr = 1;
  numInp.value(cntr);
  procNums = [];

  drawInterfaceText();
}

function pauseDrawing() {
  noLoop();
}

function resumeDrawing() {
  loop();
}

function jumpToNumber() {
  num = parseInt(numInp.value());

  if (isNaN(num)) {
    num = 1;
  }

  cntr = num;
  numInp.value(cntr);
}

function updateParams() {
  strokeAlpha = alphaSlider.value();
  stroke(255, 255, 255, strokeAlpha);
  angle = angleSlider.value();
  xDist = distSlider.value();
  fr = frameRateSlider.value();
  frameRate(fr);
  numInp.value(cntr);
}

function cumRender() {
  blankCanvas();

  // Reset the procNums array
  procNums = [];
  cntr = parseInt(numInp.value());
  updateParams();

  for (i = 1; i <= cntr; i++) {
    procNums.push(i);
    drawCollatzNum(i);
  }

  drawInterfaceText();
}


function saveImg() {
  // Remove the interface
  blankCanvas();

  updateParams();

  // Title water mark
  push();
  textSize(36);
  noStroke();
  fill(150, 150, 150);
  text("Collatz Musings", 20, 50);
  textSize(12);
  fill(50, 50, 50);
  textFont("Courier");
  text("Alpha     : " + alphaSlider.value(), 30, 70);
  text("Angle     : " + angleSlider.value(), 30, 85);
  text("Distance  : " + distSlider.value(), 30, 100);
  text("No. Values: " + procNums.length, 30, 115);
  pop();

  // Render with all the processed numbers
  for (i = 0; i < procNums.length; i++) {
    drawCollatzNum(procNums[i]);
  }

  imgName = "collatz_" + strokeAlpha + "-" + angle + "-" + xDist + "-" + procNums.length + ".png"
  saveCanvas(imgName);

  // Re-draw Interface
  drawInterfaceText();
}

function drawCollatzNum(num) {
  seq = collatz(num);
  
  push();
  
  translate(canvasWidth * 0.5, canvasHeight * 0.5);
  for (j = 1; j < seq.length; j++) {
    curVal = seq[j];
  
    if (curVal % 2 == 0) {
      rotate(-1 *angle);
    } else {
      rotate(angle);
    }
  
    line(0, 0, xDist, 0);
    translate(xDist, 0);
  }
  
  pop();
}

function draw() {
  updateParams();
  drawInterfaceText();
  procNums.push(cntr);
  drawCollatzNum(cntr);
  cntr += 1;
}


function collatz(num) {
  seq = [num];
  
  while (num != 1) {
    // Divide by 2 for even numbers
	  if (num % 2 == 0) {
      newNum = num / 2	
    } else {
    // Otherwise, multiply by 3, add 1  
      newNum = num * 3 + 1
    }
    
    seq.push(newNum);
    num = newNum;
	}
	
	return(reverse(seq));
}
