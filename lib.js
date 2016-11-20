function process(str, limit){
	var numbers = convert(str);
	if(!numbers || numbers.length < 2){
		return ''
	}
	while(numbers.length > limit){
		numbers = wrap(numbers)
	}
	while(numbers.length < limit){
		numbers = extend(numbers)
	}
	return numbers;
}

function calculateMatrix(numbers){
	var numbers = numbers.split('');
	var len = numbers.length * 2;
	var column = 0;
	var result = [];
	for(var i =0;i<numbers.length;i++){
		result[i] = [];
		result[len - i - 1] = [];
		result[i][0] = +numbers[i];
		result[len - i - 1][0] = +numbers[i];
	}
	for(var i = 1;i<len;i++){
		result[0][i] = result[i][0]
		for(var j = 1; j<len - column; j++){
			result[j][i] = summ(result[j][i-1], result[j-1][i]);
		}
		column++;
	}
	return result;
}

function convert(str){
	var letters = str.split(' ').join('').split('');
	return letters.map(letter=>toNumber(letter)).join('');
}

function toNumber(c){
	var a = 1072;
	var e = 1077;
	var yo = 1105;
	var code = c.toLowerCase().charCodeAt(0) - a;
	if(code <= (e-a)){
		return code+1;
	}else if(code == yo-a){
		return 7;
	}else{
		return (code+1)%9 + 1;
	}
}

function summ(a,b){
	if((+a) >= 0 && (+b) >=0){
		var sum = (+a) + (+b);
		if(sum>9){
			return summ(sum%10, Math.floor(sum/10))
		}else{
			return ''+sum
		}
	}else{
		return '0';
	}
}

function wrap(src){
	var numbers = src.split('');
	var result = [];
	for(var i =0;i<numbers.length - 1;i++){
		result[i] = summ(numbers[i], numbers[i+1])
	}
	return result.join('');
}

function extend(src){
	var numbers = src.split('');
	var add = summ(numbers[numbers.length-1], numbers[numbers.length-2])
	numbers.push(add);
	return numbers.join('');
}

var SQRT2D2 = Math.sqrt(2)/2+0.15; //this is hack to make it even
function rectPosition(dim, i, j){
	var x = dim * SQRT2D2 * i;
	var y = dim * (j + i/2);
	return {
		A:{x:x,y:y},
		B:{x:(x+dim*SQRT2D2),y:y+dim/2},
		C:{x:(x+dim*SQRT2D2),y:y+dim*3/2},
		D:{x:x,y:y+dim}
	}
}

function drawSegment(numbers, dim, renderer){
	var size = (numbers.length)*2 - 1;
	var collumns = 0;
	var rect;
	var matrix = calculateMatrix(numbers);

	for(var i=size; i>=0; i--){
		for(var j=collumns; j>=0; j--){
			rect = rectPosition(dim, i, j);
			renderer(rect,matrix[i][j]);
		}
		collumns++;
	}
}



if(typeof module !== 'undefined'){
	module.exports = {
		process,
		convert,
		toNumber,
		wrap,
		extend,
		rectPosition,
		drawSegment,
		calculateMatrix
	}
}
