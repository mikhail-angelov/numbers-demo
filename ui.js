//bind
var input = document.querySelector('#text');
var number = document.querySelector('#number');
var drawBtn = document.querySelector('#draw-btn');
// var draw = document.querySelector('.draw');
var length = document.querySelector('.length');
var canvas = document.querySelector('#canvas');
var filters = document.querySelectorAll('.filter');
var colors = document.querySelectorAll('.color');
var ctx = canvas.getContext('2d');

var DIM = 18;
var model = {
	filters : [],
	paletteIndex: null,
	palette: {
		'1': ['#840d81','#6c4ba6','#407bc1','#18b5d8','#01e9f5','#840d81','#6c4ba6','#407bc1','#18b5d8','#01e9f5'],
		'2': ['#009C56','#4DA87F','#51BC8C','#0D6B41','#FDB925','#009C56','#4DA87F','#51BC8C','#0D6B41','#FDB925'],
		'3': ['#AF4528','#DD614A','#F48668','#FFA86B','#FFDA78','#AF4528','#DD614A','#F48668','#FFA86B','#FFDA78']
	}
}

drawBtn.addEventListener("click", onDraw);
input.addEventListener("keyup", onChange);
length.addEventListener("change", onChange);

filters.forEach(function(element){
	element.addEventListener("click", onFilter);
});

colors.forEach(function(element){
	element.addEventListener("click", onColors);
});

function onFilter(e){
	var index = +e.target.textContent;
	model.filters[index] = !model.filters[index];
	if(model.filters[index]) {
		e.target.setAttribute('class','filter filter-selected')
	}else{
		e.target.setAttribute('class','filter')
	}
	onDraw();
}
function onColors(e){
	var index = +e.target.textContent;
	if(model.paletteIndex == index) {
		model.paletteIndex = null;
		e.target.setAttribute('class','color')
	}else{
		model.paletteIndex = index
		e.target.setAttribute('class','color color-selected')
	}
	onDraw();
}

function onChange(){
	var text = input.value;
	console.log('--',process(text, length.value), length.value)
	number.innerHTML = process(text, length.value);
	// draw.style.display = "none";
}

function onDraw(){
	var text = number.textContent;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(canvas.width/2, 40*text.length);
	ctx.font = "12px serif";
	drawSegment(text, DIM, renderer);
}

function renderer(rect, text){
	var ALFA = Math.PI/3;
	drawRect(rect,text);
	drawText(text, rect.D.x+DIM/4, rect.D.y);
	ctx.rotate(ALFA);
	drawRect(rect,text);
	drawNumber(rect,text,ALFA, {x:-DIM/2,y:DIM})
	ctx.rotate(ALFA);
	drawRect(rect,text);
	drawNumber(rect,text,2*ALFA, {x:-DIM,y:DIM/4})
	ctx.rotate(ALFA);
	drawRect(rect,text);
	drawNumber(rect,text,3*ALFA, {x:-DIM/2,y:-DIM/2})
	ctx.rotate(ALFA);
	drawRect(rect,text);
	drawNumber(rect,text,4*ALFA, {x:DIM/4,y:-DIM/2})
	ctx.rotate(ALFA);
	drawRect(rect,text);
	drawNumber(rect,text,5*ALFA, {x:DIM*3/4,y:DIM/3})
	ctx.rotate(ALFA);
}

function drawRect(rect,text){
	ctx.beginPath();
	ctx.moveTo(rect.A.x, rect.A.y);
	ctx.lineTo(rect.B.x, rect.B.y);
	ctx.lineTo(rect.C.x, rect.C.y);
	ctx.lineTo(rect.D.x, rect.D.y);
	ctx.closePath();
	if(model.paletteIndex){
		var index = +text
		var color = model.palette[model.paletteIndex][index];
		ctx.fillStyle=color;
		ctx.fill();
		ctx.stroke();
	}else{
		ctx.stroke();
	}
}

function drawNumber(rect,text,angle,fix){
	ctx.save();
	ctx.rotate(-angle);
	ctx.translate(-rect.A.x, -rect.A.y);
	ctx.translate(
		(rect.A.x*Math.cos(angle)-rect.A.y*Math.sin(angle) + fix.x),
	 	(rect.A.x*Math.sin(angle)+rect.A.y*Math.cos(angle) + fix.y)
	);
 	drawText(text, rect.A.x, rect.A.y);
	ctx.restore();
}

function drawText(text, x, y){
	var index = +text;
	if(!model.filters[index]){
		ctx.fillStyle='black';
		ctx.fillText(text, x, y);
	}
}

function printDiagram(){
    var win=window.open();
    win.document.write("<br><img src='"+canvas.toDataURL()+"'/>");
    win.print();
    win.location.reload();
}