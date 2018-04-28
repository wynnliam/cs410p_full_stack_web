'use strict';

var http = require('http'); // do not change this line

var parseCookies = function(strCookie) {
	var result = {};

	if(strCookie === undefined)
		return {};

	var cookies = strCookie.split('; ');

	for(var i = 0; i < cookies.length; i += 1) {
		var c = cookies[i].split('=');
		result[c[0]] = c[1];
	}

	return result;
}

var server = http.createServer(function(req, res) {
	console.log(req.headers.cookie);
	var cookies = parseCookies(req.headers.cookie);
	var header = { 'Content-Type': 'text/plain' };
	var toWrite = "";

	if(!cookies.hasOwnProperty('ident')) {
		toWrite = "you must be new";
		header['Set-Cookie'] = ['ident=1234;', 'page=' + req.url + ';'];
		console.log(header['Set-Cookie']);
	}

	else {
		toWrite = 'last time you visited "' + cookies['page'] + '"';
		header['Set-Cookie'] = ['ident=1234;', 'page=' + req.url + ';'];
	}

	res.writeHead(200, header);
	res.write(toWrite);
	res.end();
});

server.listen(process.env.PORT || 8080);
// http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/test should return 'last time you visited "/hello"' in plain text

// http://localhost:8080/world should return 'last time you visited "/test"' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/moshimoshi should return 'last time you visited "/lorem"' in plain text

// http://localhost:8080/ipsum should return 'last time you visited "/moshimoshi"' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'last time you visited "/world"' in plain text
// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie
