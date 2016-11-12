var lib = require('./lib')

function testToNumber(){
	console.log(' a = 1',lib.toNumber('а'), lib.toNumber('а')===1)
	console.log(' я = 6',lib.toNumber('я'), lib.toNumber('я')===6)
	console.log(' ё = 7',lib.toNumber('ё'), lib.toNumber('ё')===7)
	console.log(' к = 3',lib.toNumber('к'), lib.toNumber('к')===3)
}

function testConvert(){
	var test = 'я люблю жизнь'
	var ref = '64524581963'
	var result = lib.convert(test)
	console.log(test + '=' + ref,result, result===ref)
}

function testWrap(){
	var test = '64524581963'
	var ref1 = '1976949169'
	var ref2 = '174644176'
	var ref3 = '82118584'
	var ref4 = '1329443'
	var ref5 = '452487'
	console.log(test + '=' + ref1,lib.wrap(test), lib.wrap(test)===ref1)
	console.log(ref1 + '=' + ref2,lib.wrap(ref1), lib.wrap(ref1)===ref2)
	console.log(ref2 + '=' + ref3,lib.wrap(ref2), lib.wrap(ref2)===ref3)
	console.log(ref3 + '=' + ref4,lib.wrap(ref3), lib.wrap(ref3)===ref4)
	console.log(ref4 + '=' + ref5,lib.wrap(ref4), lib.wrap(ref4)===ref5)
}

function testProcess(){
	var test = 'я люблю жизнь'
	var ref = '452487'
	console.log(test + ' => ' + ref,lib.process(test, 6), lib.process(test, 6)===ref)
}

function testExtend(){
	var test = '452733'
	var ref1 = '4527336'
	var ref2 = '45273369'
	console.log(test + ' => ' + ref1,lib.extend(test), lib.extend(test)===ref1)
	console.log(ref1 + ' => ' + ref2,lib.extend(ref1), lib.extend(ref1)===ref2)
}

testToNumber()
testConvert()
testWrap()
testProcess()
testExtend()