function setup() {

  canvasWidth = 1600;
  canvasHeight = 1200;

  createCanvas(canvasWidth, canvasHeight);

  // Compute for all numbers up to
  maxNum = 10000;

  allSeqs = []
  maxSeqLen = 0;
  for (i = 1; i <= maxNum; i++) {
    seq = collatz(i);

    if (seq.length > maxSeqLen) {
      maxSeqLen = seq.length;
    }

    allSeqs.push(seq);
  }

  xUnits = canvasWidth / (maxSeqLen * 0.65);

  // Drawing parameters
  smooth();
  strokeWeight(2);
  strokeCap(SQUARE);
  stroke(255,255,255,10);
  noLoop();

  angle = 12 / 180 * Math.PI;
  // angle = 0;
  // angleDelta = 0.1 / 180 * Math.PI;
}

function draw() {
  push();
  fill(0,0,0);
  rect(0, 0, canvasWidth, canvasHeight);
  pop();

  // angle += angleDelta;
  // print(angle)

  for (i = 1; i <= maxNum; i ++) {
    seq = collatz(i);
    push();

    translate(canvasWidth * 0.5, canvasHeight * 0.5);
    for (j = 1; j < seq.length; j++) {
      curVal = seq[j];
    
      if (curVal % 2 == 0) {
        rotate(-1 *angle);
      } else {
        rotate(angle);
      }

      line(0, 0, xUnits, 0);
      translate(xUnits, 0);
    }

    pop();
  }

  saveCanvas("collatz_img.png")
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
