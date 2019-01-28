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
	imgLimb[0,0] = loadImage('assets/limb-green/limb-1g.png');
	imgLimb[0,1] = loadImage('assets/limb-green/limb-2g.png');
	imgLimb[0,2] = loadImage('assets/limb-green/limb-3g.png');
	imgLimb[0,3] = loadImage('assets/limb-green/limb-4g.png');
	imgLimb[1,0] = loadImage('assets/limb-pink/limb-1p.png');
	imgLimb[1,1] = loadImage('assets/limb-pink/limb-2p.png');
	imgLimb[1,2] = loadImage('assets/limb-pink/limb-3p.png');
	imgLimb[1,3] = loadImage('assets/limb-pink/limb-4p.png');
	imgLimb[2,0] = loadImage('assets/limb-yellow/limb-1y.png');
	imgLimb[2,1] = loadImage('assets/limb-yellow/limb-2y.png');
	imgLimb[2,2] = loadImage('assets/limb-yellow/limb-3y.png');
	imgLimb[2,3] = loadImage('assets/limb-yellow/limb-4y.png');
	imgLimb[3,0] = loadImage('assets/limb-red/limb-1r.png');
	imgLimb[3,1] = loadImage('assets/limb-red/limb-2r.png');
	imgLimb[3,2] = loadImage('assets/limb-red/limb-3r.png');
	imgLimb[3,3] = loadImage('assets/limb-red/limb-4r.png');
	imgLimb[4,0] = loadImage('assets/limb-multi/limb-1m.png');
	imgLimb[4,1] = loadImage('assets/limb-multi/limb-2m.png');
	imgLimb[4,2] = loadImage('assets/limb-multi/limb-3m.png');
	imgLimb[4,3] = loadImage('assets/limb-multi/limb-4m.png');

function setup() {
	
	////// Canvas //////

	// Setup the Canvas based on the window dimensions
	var canv = createCanvas(windowWidth, windowHeight);
	canv.position(0,0);
	fr = 30; // Frames per second 
	frameRate(fr); 
	getAudioContext().resume(); // Overrides sound setting on some computers
	
	serialInit();
	
	////// ______ //////
	
	gameState = 0; // Determines which 'room' the game is in 
}

function draw() {
	
	background(255);
	
	// TODO: Display background elements 
	
	if (gameState == 0) { // Start Screen 
		
		// TODO: Display Logo
		// TODO: Display 'press start / etc' button or keyboard key 
		// TODO: catch button press to change game state 
		
	} else if (gameState == 1) { // Ready / Gameplay
	
		// TODO: Characters enter scene?
		// TODO: Timed events
			// Display 'ready?'
			// Wait a random period of time
			// FIRE!! (listen for gunshot from serial)
		// TODO: Who shot first? resolution
		// TODO: play again?
		
	}
	
	// TODO: Display foreground elements (e.g. tumbleweed)
	
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