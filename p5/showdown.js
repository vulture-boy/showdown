/*
Showdown
January 2019

by Tyson Moll and Frank Ferrao

operates in conjunction with xbee input and game environment
*/

// Serial Communication
var serialPortName = "COM8"; // Change this as needed

function preload() {
	//img = loadImage('assets/thisImage.png');
}

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
		shifterDist = JSON.parse(rawData).s1;       //the parameter value .s1 must match the parameter name created within the arduino file
		orientX = JSON.parse(rawData).s2; 
		orientY = JSON.parse(rawData).s3; 
		orientZ = JSON.parse(rawData).s4;
		
		// STUB: Array support for JSON properties?
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