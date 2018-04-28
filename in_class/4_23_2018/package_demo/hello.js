var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	res.write('hello\nworld\n');

	res.end();
});

server.listen(8080);
