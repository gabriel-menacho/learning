var start = Date.now();
setTimeout(function () {
	console.log(Date.now() - start);
},  500);
while (Date.now() - start < 1000);