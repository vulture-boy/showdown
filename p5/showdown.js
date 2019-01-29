/*
Showdown
January 2019

by Tyson Moll and Frank Ferrao

operates in conjunction with xbee input and game environment
*/

// Serial Communication
var serialPortName = "COM8"; // Change this as needed
var shotA = 0;
var shotB = 0;

// Game Stats
var canv = 0;
var playerStatus = [0,0]; // 0 - not hit, 1 - hit 
var playerScore = [0,0]; // Points
var playerScoreMax = 1; // Total to victory
var playerChar = [0,0]; // which character each player is 
var characters = 5; // Number of characters 
var timerReady = 20; // Time until Fire is displayed (20 to debug) 

// Images
var imgHead = [0,0,0,0,0];
var imgBody = [0,0,0,0,0];
var imgLimb = [ [0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0]];

function preload() {
	//img = loadImage('assets/thisImage.png');
	imgHead[0] = loadImage('assets/body-green/head-green.png');
	imgHead[1] = loadImage('assets/body-pink/head-pink.png');
	imgHead[2] = loadImage('assets/body-yellow/head-yellow.png');
	imgHead[3] = loadImage('assets/body-red/head-red.png');
	imgHead[4] = loadImage('assets/body-multi/head-multi.png');
	imgBody[0] = loadImage('assets/body-green/body-green.png');
	imgBody[1] = loadImage('assets/body-pink/body-pink.png');
	imgBody[2] = loadImage('assets/body-yellow/body-yellow.png');
	imgBody[3] = loadImage('assets/body-red/body-red.png');
	imgBody[4] = loadImage('assets/body-multi/body-multi.png');
	imgLimb[0][0] = loadImage('assets/limbs-green/limb-1g.png');
	imgLimb[0][1] = loadImage('assets/limbs-green/limb-2g.png');
	imgLimb[0][2] = loadImage('assets/limbs-green/limb-3g.png');
	imgLimb[0][3] = loadImage('assets/limbs-green/limb-4g.png');
	imgLimb[1][0] = loadImage('assets/limbs-pink/limb-1p.png');
	imgLimb[1][1] = loadImage('assets/limbs-pink/limb-2p.png');
	imgLimb[1][2] = loadImage('assets/limbs-pink/limb-3p.png');
	imgLimb[1][3] = loadImage('assets/limbs-pink/limb-4p.png');
	imgLimb[2][0] = loadImage('assets/limbs-yellow/limb-1y.png');
	imgLimb[2][1] = loadImage('assets/limbs-yellow/limb-2y.png');
	imgLimb[2][2] = loadImage('assets/limbs-yellow/limb-3y.png');
	imgLimb[2][3] = loadImage('assets/limbs-yellow/limb-4y.png');
	imgLimb[3][0] = loadImage('assets/limbs-red/limb-1r.png');
	imgLimb[3][1] = loadImage('assets/limbs-red/limb-2r.png');
	imgLimb[3][2] = loadImage('assets/limbs-red/limb-3r.png');
	imgLimb[3][3] = loadImage('assets/limbs-red/limb-4r.png');
	imgLimb[4][0] = loadImage('assets/limbs-multi/limb-1m.png');
	imgLimb[4][1] = loadImage('assets/limbs-multi/limb-2m.png');
	imgLimb[4][2] = loadImage('assets/limbs-multi/limb-3m.png');
	imgLimb[4][3] = loadImage('assets/limbs-multi/limb-4m.png');
}

function resetTimer() {
	timerReady = 90 + round(random(120));
}

function setup() {
	
	////// Canvas /////

	// Setup the Canvas based on the window dimensions
	canv = createCanvas(windowWidth, windowHeight);
	canv.position(0,0);
	fr = 30; // Frames per second 
	frameRate(fr); 
	getAudioContext().resume(); // Overrides sound setting on some computers
	
	serialInit();
	
	////// ______ //////
	
	gameState = 0; // Determines which 'room' the game is in 
	resetTimer(); // Prep timer in advance
	
	// Random Characters
	playerChar[0] = round(random(characters - 1));
	playerChar[1] = round(random(characters - 1));
	if (playerChar[0] == playerChar[1]) {
		playerChar[1]++;
		if (playerChar[1] >= characters) {
			playerChar[1] = 0;
		}
	}
}

function draw() {
	
	// Background
	background(120,30,30);
	noStroke();
	fill(255,140,55);
	rect(0,canv.height*0.7,canv.width,canv.height);
	fill(225,150,120);
	rect(0,canv.height*0.8,canv.width,canv.height);
	
	// Font Standards
	textAlign(CENTER);
	
	// TODO: Display background elements 
	
	if (gameState == 0) { // Start Screen 
		
		// TODO: Display Logo
		textSize(32);
		text("Showdown!!", canv.width/2, canv.height/2);
		textSize(20);
		fill(30);
		text("Press Start", canv.width/2, canv.height * 0.6);
		
		// TODO: Display 'press start / etc' button or keyboard key 
		// TODO: catch button press to change game state 
		
	} else if (gameState == 1) { // Ready / Gameplay
	
		// TODO: Characters enter scene?
		
		var charPosB = canv.height * 0.6
		var cS = 0.5;
		
		// Player 1
		var charPosA = canv.width*0.2;
		drawCharacter(charPosA,charPosB,cS,playerChar[0]);
		
		// Player 2
		charPosA = canv.width*0.7;
		drawCharacter(charPosA,charPosB,cS,playerChar[1]);
		
		
	
		// TODO: Timed events
		//text(timerReady, canv.width/2, canv.height/2);
		
		if (timerReady > 0) {
			// Display 'ready?'
			textSize(32);
			text("Ready??", canv.width/2, canv.height/2);
			timerReady--;
		
		} else if (playerStatus[0] == 0 && playerStatus[1] == 0) {
			// FIRE!! (listen for gunshot from serial)
			textSize(60);
			fill(255,0,0);
			text("FIRE!!", canv.width/2, canv.height/2);
		
		} else {
			// TODO: Who shot first? resolution
			if (playerStatus[0]) {
				text("Player 1 Wins!", canv.width/2, canv.height/2);
			} else {
				text("Player 2 Wins!", canv.width/2, canv.height/2);
			}
			// TODO: play again?
		}
	}
	
	// TODO: Display foreground elements (e.g. tumbleweed)
	
}

function drawCharacter(charPosA,charPosB,cS,fella) {
	
	// Left Arm
	image(imgLimb[fella][0], charPosA - imgLimb[fella][0].width * cS + 30, charPosB - imgLimb[fella][0].height *cS +35, imgLimb[fella][0].width *cS, imgLimb[fella][0].height *cS);
	// Right Arm
	image(imgLimb[fella][1], charPosA + imgBody[fella].width * cS - 40, charPosB + 20, imgLimb[fella][1].width *cS -5, imgLimb[fella][1].height *cS);
	// Left Leg
	image(imgLimb[fella][2], charPosA - imgLimb[fella][2].width * cS + 60, charPosB + imgLimb[fella][2].height *cS , imgLimb[fella][2].width *cS, imgLimb[fella][2].height *cS);
	// Right Leg
	image(imgLimb[fella][3], charPosA + imgBody[fella].width * cS - 40, charPosB + imgLimb[fella][3].height*cS + 20, imgLimb[fella][3].width *cS, imgLimb[fella][3].height *cS);
	// Body
	image(imgBody[fella], charPosA, charPosB, imgBody[fella].width *cS, imgBody[fella].height * cS);
	// Head
	image(imgHead[fella], charPosA - imgHead[fella].width *cS *0.25  , charPosB - imgHead[fella].height *cS, imgHead[fella].width *cS, imgHead[fella].height *cS);
}

function keyPressed() {
	// "start" button 
	if (gameState == 0) {
		gameState = 1;
	}
}

function keyTyped() {
	
	// Gunfire
	if (timerReady == 0 && (playerStatus[0] == 0 && playerStatus[1] == 0)) {
		if (key === '1') {
			playerStatus[0] = 1;
		}
		if (key === '0') {
			playerStatus[1] = 1;
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	
	// Note: may have to rescale image display; can implement later
	
}

function serialInit() {
	
	//Setting up the serial port
	serial = new p5.SerialPort();     //create the serial port object
	serial.open(serialPortName); //open the serialport. determined 
	serial.on('open',ardCon);         //open the socket connection and execute the ardCon callback
	serial.on('data',dataReceived);   //when data is received execute the dataReceived function

}

function dataReceived() {  //this function is called every time data is received
  
	var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    console.log(rawData);    	//uncomment this line to see the incoming string in the console     
    
	if(rawData.length>1)                      //check that there is something in the string
    {                   
		// Read information 
		shotA = JSON.parse(rawData).s1;       //the parameter value .s1 must match the parameter name created within the arduino file
		shotB = JSON.parse(rawData).s2; 
	}
}

function ardCon() { // Triggered when an arduino connection is confirmed

	console.log("connected to the arduino!");
}

/*
function setGradient(x, y, w, h, c1, c2, axis) { // Quick gradient function from the p5.js documentation example

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
*/