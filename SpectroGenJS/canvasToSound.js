
function getAlphaAtPos(x,y,canvasData,canvasWidth){
				let index = (y * canvasWidth + x) * 4;
				// Alpha (red = +0, green = +1, blue = +2, alpha = +3)
				return canvasData.data[index + 3];
}

function soundCanvas(ctx, canvas, duration) {
				// Very costly in ressources, do that just once
				let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

				var wave = new RIFFWAVE();
				var data = [];
				wave.header.sampleRate = 44100;
				let max_frame = wave.header.sampleRate * duration;
				let max_freq = 6000;

				for (var frame = 0; frame < max_frame; frame++) {
								var sumVal = 0;
								var count = 0;
								for (var y = 0; y < canvas.height; y += 1){
												let intensity = getAlphaAtPos(Math.ceil(frame*canvas.width/max_frame), y, canvasData, canvas.width)/255;
												if (intensity <= 0.0001)
																continue;
												// Takes the opposite of the freq you would expect because the image is upside down
												let freq = max_freq - y*max_freq/canvas.height;

												sumVal += 128 + 127 * intensity * Math.cos(2 * frame * Math.PI * freq / wave.header.sampleRate);
												count += 1;
								}
								if (count == 0){
												count = 1;
								}
								data[frame] = Math.round(sumVal/count);
				}

				wave.Make(data);
				return wave;
}
function playSound() {
				let canvas = document.getElementById('sketchpad');
				let ctx = canvas.getContext("2d");
				let duration = 5;
				var wave = soundCanvas(ctx, canvas, duration);
				var audio = new Audio();
				audio.src = wave.dataURI;
				audio.play();
}

function saveSound(filename) {
				let canvas = document.getElementById('sketchpad');
				let ctx = canvas.getContext("2d");
				let duration = 5;
				let uri = soundCanvas(ctx, canvas, duration).dataURI;
				// Construct the <a> element
				var link = document.createElement("a");
				link.download = filename;
				// Construct the uri
				link.href = uri;
				document.body.appendChild(link);
				link.click();
				// Cleanup the DOM
				document.body.removeChild(link);
}
