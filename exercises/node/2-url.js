'use strict';

var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line

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

var server = http.createServer(function(req, res) {
	if(req.url === '/') {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		res.write('you have accessed the root');
	} else if(req.url.indexOf('/test/') === 0) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		var toWrite = req.url.substring(6, req.url.length);
		res.write('you have accessed "' + toWrite + '" within test');

	} else if(req.url.indexOf('/attributes') == 0) {
		var query = querystring.parse(url.parse(req.url).query);
		var keys = Object.keys(query);

		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		res.write('<!DOCTYPE html>');
		res.write('<html>');
		res.write('<body>');
		res.write('<table border="1">');

		for(var i = 0; i < keys.length; i += 1) {
			res.write('<tr><td>' + keys[i] + '</td><td>' + query[keys[i]] + '</td></tr>');
		}

		res.write('</table>');
		res.write('</body>');
		res.write('</html>');
	}

	res.end();
});

server.listen(process.env.PORT || 8080);
