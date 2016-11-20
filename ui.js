//bind
var input = document.querySelector('#text');
var number = document.querySelector('#number');
var drawBtn = document.querySelector('#draw-btn');
// var draw = document.querySelector('.draw');
var length = document.querySelector('.length');
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var DIM = 18;

drawBtn.addEventListener("click", onDraw);
input.addEventListener("keyup", onChange);
length.addEventListener("change", onChange);


function onChange(){
	var text = input.value;
	console.log('--',process(text, length.value), length.value)
	number.innerHTML = process(text, length.value);
	// draw.style.display = "none";
}

function onDraw(){
	// draw.style.display = "block";
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.font = "12px serif";
	drawSegment(number.textContent, DIM, renderer);
}

function renderer(rect, text){
	var ALFA = Math.PI/3;
	drawRect(rect);
	ctx.fillText(text, rect.D.x, rect.D.y);
	ctx.rotate(ALFA);
	drawRect(rect);
	drawText(rect,text,ALFA, {x:-DIM*3/4,y:DIM})
	ctx.rotate(ALFA);
	drawRect(rect);
	drawText(rect,text,2*ALFA, {x:-DIM,y:DIM/4})
	ctx.rotate(ALFA);
	drawRect(rect);
	drawText(rect,text,3*ALFA, {x:-DIM/2,y:-DIM/2})
	ctx.rotate(ALFA);
	drawRect(rect);
	drawText(rect,text,4*ALFA, {x:DIM/4,y:-DIM/3})
	ctx.rotate(ALFA);
	drawRect(rect);
	drawText(rect,text,5*ALFA, {x:DIM/2,y:DIM/3})
	ctx.rotate(ALFA);
}

function drawRect(rect){
	ctx.beginPath();
	ctx.moveTo(rect.A.x, rect.A.y);
	ctx.lineTo(rect.B.x, rect.B.y);
	ctx.lineTo(rect.C.x, rect.C.y);
	ctx.lineTo(rect.D.x, rect.D.y);
	ctx.closePath();
	ctx.stroke();
}

function drawText(rect,text,angle,fix){
	ctx.save();
	ctx.rotate(-angle);
	ctx.translate(-rect.A.x, -rect.A.y);
	ctx.translate(
		(rect.A.x*Math.cos(angle)-rect.A.y*Math.sin(angle) + fix.x),
	 	(rect.A.x*Math.sin(angle)+rect.A.y*Math.cos(angle) + fix.y)
	);
 	ctx.fillText(text, rect.A.x, rect.A.y);
	ctx.restore();
}

function printDiagram(){
    var win=window.open();
    win.document.write("<br><img src='"+canvas.toDataURL()+"'/>");
    win.print();
    win.location.reload();
}