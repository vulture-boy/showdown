/*
  xBee Listener

  Sends serial read or digital output from xBee to serial
*/

#include <ArduinoJson.h> // (avoid beta version!)

int pinA = 4; // xBee A
int pinB = 5; // xBee B
unsigned long lastSend;
int sendRate = 50;
int delayVal = 50; // Delay per read / write

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  // Serial1.begin(9600); // Can only communicate with one xBee, for troubleshooting purposes

  pinMode(pinA,INPUT); // xBee A
  pinMode(pinB,INPUT); // xBee B

  randomSeed(analogRead(0)); // for fairness :)
}

// the loop routine runs over and over again forever:
void loop() {

  /*
  // Serial Test
  // see if there's incoming serial data:
  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
    Serial.println(incomingByte);
  }
  */

  // use a timer to stablize the data send
  if (millis() - lastSend >= sendRate) {
      //send the values to P5 over serial
      DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
      JsonObject& p5Send = messageBuffer.createObject();      //create a JsonObject variable in that buffer       

      //assigns variable values to json object keys
      p5Send["s1"]=digitalRead(pinA); 
      p5Send["s2"]=digitalRead(pinB);
      p5Send.printTo(Serial);    //print JSON object as a string
      Serial.println();          //print a \n character to the serial port to distinguish between objects
    
      lastSend = millis(); // Refresh
  }  
}
