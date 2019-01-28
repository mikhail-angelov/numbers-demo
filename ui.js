//bind
var input = document.querySelector('#text');
var number = document.querySelector('#number');
var drawBtn = document.querySelector('#draw-btn');
var draw = document.querySelector('.draw');
var length = document.querySelector('.length');
var canvas = document.querySelector('#canvas');

drawBtn.addEventListener("click", onDraw);
input.addEventListener("keyup", onChange);
length.addEventListener("change", onChange);


function onChange(){
	var text = input.value;
	console.log('--',process(text, length.value), length.value)
	number.innerHTML = process(text, length.value);
	draw.style.display = "none";
}

function onDraw(){
	// draw.style.display = "block";
	drawSegment(text.value, length.value, renderer)
}

function renderer(rect){
	canvas.context
}