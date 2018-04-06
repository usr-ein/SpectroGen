var context;
var bufferLoader;

let twelfthSqrt2 = 1.05946; // To compute freqs

var noteFreq = {
	ut : 261.6, // = Do
	re : 293.7,	
	mi : 329.6,	
	fa : 349.2,	
	sol : 392,	
	la : 440,	
	si : 493.9 
}

var noteColour = {
	ut : hexToRgb("#00FF00"), // = Do
	re : hexToRgb("#FFFF00"),	
	mi : hexToRgb("#FF1500"),	
	fa : hexToRgb("#FF0000"),	
	sol : hexToRgb("#FFC0CB"),	
	la : hexToRgb("#800080"),	
	si : hexToRgb("#0000FF") 
}

// keyNumber: from 1 to 88
function getFreq(keyNumber){
	return Math.pow(twelfthSqrt2, keyNumber-49) * 440;
}

function freqFromColour(r, g, b){
	var distances = [];
	for (var note in noteColour){
		colour = noteColour[note];
		dist = Math.sqrt(Math.pow(colour.r - r, 2) + Math.pow(colour.g - g, 2) + Math.pow(colour.b - b, 2));
		distances[note] = dist;
	}
	var closestNote;
	var closestDist = 1500; // Large distance
	for (var note in distances){
		if (distances[note] < closestDist){
			closestDist = distances[note];
			closestNote = note;
		}
	}
	return noteFreq[closestNote];
}

function playSoundBuffer(buffer, time) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start(time);
}

function playSoundOscillator(freq, time) {
	var osc = context.createOscillator();
	osc.frequency.value = freq;
	osc.type = "triangle";
	osc.start(time);
	osc.stop(time + 0.30);
	
	var gainNode = context.createGain();
	gainNode.gain.setValueAtTime(1.0, time);
	gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.30);

	osc.connect(gainNode);
	gainNode.connect(context.destination);
}

function playCanvas(bufferList){
	// canvasPointList is declared in sketchpad.js in global scope
	// it contains a list of each notes position with their colour
	var do_piano = bufferList[0];

	var startTime = context.currentTime + 0.100;

	var tempo = 120; // BPM
	var quarterNoteTime = 60/tempo;

	for (var i = 0; i < canvasPointList.length; i++){
		var dot = canvasPointList[i];
		let noteTime = startTime + dot.x/300 * quarterNoteTime;
		//playSoundBuffer(do_piano, noteTime);

		//playSoundOscillator(noteFreq.la, noteTime);
		//playSoundOscillator((1-dot.y/canvas.height)*2000, noteTime);
		//playSoundOscillator(freqFromColour(dot.r, dot.g, dot.b), noteTime);
		//var freq = freqFromColour(dot.r, dot.g, dot.b);
		//var octave = Math.ceil((canvas.height-dot.y)/(canvas.height/5));
		//playSoundOscillator(freq*octave, noteTime);
		playSoundOscillator(getFreq(Math.round((1-dot.y/canvas.height)*88)), noteTime);
	}
}

function play() {
	let duration = document.getElementById('soundDuration').value;
	playCanvas(bufferLoader.bufferList);
}

function save(filename) {
	let canvas = document.getElementById('sketchpad');
	let duration = document.getElementById('soundDuration').value;
}

function initSound(){
	try {
		context = new AudioContext();
	}
	catch(e) {
		alert("Web Audio API is not supported in this browser");
	}

	// Start loading the piano sound.
	bufferLoader = new BufferLoader(
			context,
			[
			"sound/do_piano.wav"
			],
			bufferLoadCompleted  
			);

	bufferLoader.load();
}

function bufferLoadCompleted() {		
}
