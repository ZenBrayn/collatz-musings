function setup() {
  // Canvas parameters
  canvasWidth = 1600;
  canvasHeight = 1200;
  createCanvas(canvasWidth, canvasHeight);

  // Drawing parameters
  smooth();
  strokeWeight(2);
  strokeCap(SQUARE);
  strokeAlpha = 50;
  stroke(255,255,255, strokeAlpha);
	
	// Misc drawing variables
	angleMode(DEGREES);
  angle = 12;
  xDist = 10;
  cntr = 1;
  
  // Background
  push();
  fill(0,0,0);
  noStroke();
  rect(0, 0, canvasWidth, canvasHeight);
  pop();
  
  // Interface elements
  alphaSlider = createSlider(0, 255, strokeAlpha);  
  angleSlider = createSlider(0, 90, angle);
  distSlider = createSlider(5, 20, xDist);
  resetButton = createButton("Reset");
  playButton = createButton("Play");
  pauseButton = createButton("Pause");
  pngButton = createButton("Save Img");
  
  drawInterface();
  
}

function drawInterface() {
  push();
  noStroke();
  fill(255, 255, 255);
  
  // Title  
  textSize(36);
  text("Collatz Musings", 20, 50);
  
  textSize(12);
  
  // Alpha Slider
  alphaSlider.position(20, 70);
  text("Alpha", alphaSlider.x * 2 + alphaSlider.width, 85);
  
  // Angle Slider
  angleSlider.position(20, 100);
  text("Angle", angleSlider.x * 2 + angleSlider.width, 115);
  
  // Distance Slider
  distSlider.position(20, 130);
  text("Distance", distSlider.x * 2 + distSlider.width, 145);
  
  // Reset Button
  resetButton.position(20, 160);
  resetButton.mousePressed(resetCanvas);
  
  // Play Button
  playButton.position(80, 160);
  playButton.mousePressed(resumeDrawing);

  // Pause Button
  pauseButton.position(132, 160);
  pauseButton.mousePressed(pauseDrawing);
  
  // Save png
  pngButton.position(20, 190);
  pngButton.mousePressed(saveImg);
  
  pop();  
}

function resetCanvas() {
  push();
  fill(0,0,0);
  noStroke();
  rect(0, 0, canvasWidth, canvasHeight);
  pop();
  
  drawInterface();
  
  cntr = 1;
}

function pauseDrawing() {
  noLoop();
}

function resumeDrawing() {
  loop();
}

function saveImg() {
  saveCanvas("collatz_img.png");
}

function draw() {
  // Slider params
  strokeAlpha = alphaSlider.value();
  stroke(255, 255, 255, strokeAlpha);
  angle = angleSlider.value();
  xDist = distSlider.value();
  	
	seq = collatz(cntr);
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
