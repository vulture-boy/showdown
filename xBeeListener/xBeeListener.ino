/*
  xBee Listener

  Sends serial read or digital output from xBee to serial
*/

int pinA = 4; // xBee A
int pinB = 5; // xBee B
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
  

  // Digital
  if (random(2)) {
    checkA();
    checkB();
  } else {
    checkB();
    checkA();
  }
  delay(delayVal);

  /*
  // Serial Test
  // see if there's incoming serial data:
  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
    Serial.println(incomingByte);
  }
  */
}

void checkA() {
      if (digitalRead(pinA)) {
        Serial.println("A");
      }
  }

void checkB() {
      if (digitalRead(pinB)) {
        Serial.println("B");
      }
  }
