'use strict';

var express = require('express'); // do not change this line

var server = express();

server.get('/', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});

	res.send('you have accessed the root');
});

server.get('/test/:param', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});

	res.send('you have accessed "' + req.params.param + '" within test');
});

server.get('/attributes', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/html'
	});

	res.write('<!DOCTYPE html>');
	res.write('<html>');
	res.write('<body>');
	res.write('<table border="1">');
	var keys = Object.keys(req.query);
	// for (var strKey in req.query) -- is better to do.
	for(var i = 0; i < keys.length; i += 1) {
		res.write('<tr>');
		res.write('<td>');
		res.write(keys[i]);
		res.write('</td>');
		res.write('<td>');
		res.write(req.query[keys[i]]);
		res.write('</td>');
		res.write('</tr>');
	}
	res.write('</table>');
	res.write('</body>');
	res.write('</html>');
	res.send();
});

server.get('*', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/html'
	});

	res.send('');
});

server.listen(process.env.PORT || 8080);

// http://localhost:8080/ should return 'you have accessed the root' in plain text

// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text

// http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>hello</td><td>world</td></tr>
//         <tr><td>lorem</td><td>ipsum</td></tr>
//       </table>
//     </body>
//   </html>

// http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>first</td><td>1</td></tr>
//         <tr><td>second</td><td>2</td></tr>
//         <tr><td>third</td><td>3</td></tr>
//       </table>
//     </body>
//   </html>
