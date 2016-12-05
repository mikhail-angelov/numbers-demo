function process(str, limit) {
	var numbers = convert(str);
	if (!numbers || numbers.length < 2) {
		return ''
	}
	while (numbers.length > limit) {
		numbers = wrap(numbers)
	}
	while (numbers.length < limit) {
		numbers = extend(numbers)
	}
	return numbers;
}

function calculateMatrix(numbers) {
	var numbers = numbers.split('');
	var len = numbers.length;
	var column = 0;
	var result = [];
	for (var i = 0; i < len; i++) {
		result[i] = [];
		result[len * 2 - i - 1] = [];
		cell(result, i, 0, numbers[i], len);
	}
	//outer triangle
	var i;
	for (i = 1; i < len; i++) {
		cell(result, 0, i, result[i][0], len);
		for (var j = 1; j < len -column; j++) {
			cell(result, j, i, summ(result[j][i - 1], result[j - 1][i]), len);
		}
		column++;
	}
	//inner triangle
	column = 0;

	for (var n = 0; n < len - 5; n++) {
		var i = len - 2 - n;
		var j = 3 + n;
		var data = summ(result[i][j - 1], result[i - 1][j]);
		result[i][j] = data;
		result[len -2][i] = data;
		result[j][len-2] = data;
	}

	if(len >6){
		for (var n = 0; n < len - 7; n++) {
			var i = len - 3 - n;
			var j = 5 + n;
			var data = summ(result[i][j - 1], result[i - 1][j]);
			result[i][j] = data;
			result[len -3][i] = data;
			result[j][len-3] = data;
		}
	}

	if(len >8){
		for (var n = 0; n < len - 9; n++) {
			var i = len - 4 - n;
			var j = 7 + n;
			var data = summ(result[i][j - 1], result[i - 1][j]);
			result[i][j] = data;
			result[len -4][i] = data;
			result[j][len-4] = data;
		}
	}

	return result;
}

function cell(result, i, j, data, len) {
	result[i][j] = data;
	result[2 * len - i - j - 1][j] = data;
	result[j][2 * len - i - j - 1] = data;
}

function convert(str) {
	var letters = str.split(' ').join('').split('');
	return letters.map(letter => toNumber(letter)).join('');
}

function toNumber(c) {
	var a = 1072;
	var e = 1077;
	var yo = 1105;
	var code = c.toLowerCase().charCodeAt(0) - a;
	if (code <= (e - a)) {
		return code + 1;
	} else if (code == yo - a) {
		return 7;
	} else {
		return (code + 1) % 9 + 1;
	}
}

function summ(a, b) {
	if ((+a) >= 0 && (+b) >= 0) {
		var sum = (+a) + (+b);
		if (sum > 9) {
			return summ(sum % 10, Math.floor(sum / 10))
		} else {
			return '' + sum
		}
	} else {
		return '0';
	}
}

function wrap(src) {
	var numbers = src.split('');
	var result = [];
	for (var i = 0; i < numbers.length - 1; i++) {
		result[i] = summ(numbers[i], numbers[i + 1])
	}
	return result.join('');
}

function extend(src) {
	var numbers = src.split('');
	var add = summ(numbers[numbers.length - 1], numbers[numbers.length - 2])
	numbers.push(add);
	return numbers.join('');
}

var SQRT2D2 = Math.sqrt(2) / 2 + 0.158; //this is hack to make it even
function rectPosition(dim, i, j) {
	var x = dim * SQRT2D2 * i;
	var y = dim * (j + i / 2);
	return {
		A: { x: x, y: y },
		B: { x: (x + dim * SQRT2D2), y: y + dim / 2 },
		C: { x: (x + dim * SQRT2D2), y: y + dim * 3 / 2 },
		D: { x: x, y: y + dim }
	}
}

function drawSegment(numbers, dim, renderer) {
	var size = (numbers.length) * 2 - 1;
	var collumns = 0;
	var rect;
	var matrix = calculateMatrix(numbers);

	for (var i = size; i >= 0; i--) {
		for (var j = collumns; j >= 0; j--) {
			rect = rectPosition(dim, i, j);
			renderer(rect, matrix[i][j]);
		}
		collumns++;
	}
}



if (typeof module !== 'undefined') {
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
