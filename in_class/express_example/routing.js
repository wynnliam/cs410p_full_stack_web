var express = require('express');

var server = express();

server.get('/', function(req, res) {
	res.status(200);

	res.set({
		'Content-Type': 'text/plain'
	});

	//res.send('root');
	// res.write allows for multiple parts of the body.
	// res.send is like res.write + res.end
	res.write('root');
	res.end();
});

server.listen(8080);
