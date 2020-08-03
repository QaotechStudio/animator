// variables
let frames = [];
let numberOfFrames;
let activeFrame;
let mode;
let sliderSpeed;
let addNewFrameButton;
let buttonColor = '#ebff37'
var visible = true;
var gui;

// background color
var backgroundColor = '#ffffff';

// stroke color
var strokeColor = '#00ddff';

// stroke weight
var strokeSize = 1;
var strokeSizeMin = 0.5;
var strokeSizeMax = 20;
var strokeSizeStep = 0.5;


function setup() {
	let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	frameRate(60);

	playButton = createButton("Play");
	playButton.position(width/2 - 50, 20);
	playButton.style('background-color',buttonColor );
	playButton.mousePressed(play);
	
	addNewFrameButton = createButton("Add New Frame");
	addNewFrameButton.position(width/2 + 50, 20);
	addNewFrameButton.style('background-color',buttonColor );
	addNewFrameButton.mousePressed(addNewFrame);
	
	label = createDiv("Speed");
	label.position(width - 100, 20);
	sliderSpeed = createSlider(1, 15, 15, 1);
	sliderSpeed.position(0, 20);
	sliderSpeed.style('width', '80px');
	sliderSpeed.parent(label);

	setAttributes('perPixelLighting', false);

	gui = createGui("Settings");
	gui.addGlobals('backgroundColor', 'strokeColor', 'strokeSize');
	init();
}

function init() {
	mode = 0;
	numberOfFrames = 12;
	activeFrame = 0;

	for(let i=0; i<numberOfFrames; i++) {
		let newFrame = new Frame();
		frames.push(newFrame);
	}
}

function draw() {
	background(backgroundColor);
	translate(-width/2, - height/2)

	// render active frame
	if(mode == 0) {

		// current layer
		image(frames[activeFrame].frame, 0, 0);
		// onion layer
		tint(255, 90);
		let previousFrame = abs((activeFrame-1));
		image(frames[previousFrame].frame, 0, 0);

	} else if(mode == 1){
		if(frameCount % (60 / sliderSpeed.value()) == 0) {
			incrementFrame();
		}
		image(frames[activeFrame].frame, 0, 0);
	}
}

function addNewFrame(){
	activeFrame += 1;
	activeFrame = activeFrame % numberOfFrames;
}


function mouseDragged() {
	if(mode == 0) {
		frames[activeFrame].frame.stroke(strokeColor);
		frames[activeFrame].frame.strokeWeight(strokeSize);
		frames[activeFrame].frame.line(mouseX, mouseY, pmouseX, pmouseY);
	}
}

function keyPressed() {
	if(key == 'a') {
		console.log("[SPACE]")
		activeFrame += 1;
		activeFrame = activeFrame % numberOfFrames;
	} else if(key == 's') {
		play();
	} else if(key == 'd') {
		mode = 0;
	}

}

function play() {
	if(mode == 0) {
		activeFrame = 0;
		mode = 1;
		playButton.html('Stop');
	} else{ 
		mode = 0;
		playButton.html('Play');
	}
}

function incrementFrame() {
	activeFrame += 1;
	activeFrame = activeFrame % numberOfFrames;
}


// dynamically adjust the canvas to the window
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
