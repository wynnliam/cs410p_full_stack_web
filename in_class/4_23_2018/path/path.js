var http = require('http');

var server = http.createServer(function(req, res) {
	if(req.url === '/') {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		res.end('root');
	} else if(req.url.indexOf('/test/') === 0) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		res.end('test: ' + decodeURIComponent(req.url.substr(6)));
	} else {
		res.end();
	}
});

server.listen(8080);
