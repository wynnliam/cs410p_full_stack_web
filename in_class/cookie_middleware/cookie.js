var express = require('express');
var session = require('express-session');

var server = express();

server.use(session({
	'store': new session.MemoryStore(),
	'secret': 'squanto',
	'resave': false,
	'saveUninitialized': false,
	'cookie': {
		'maxAge': 86500000
	}
}));

server.get('/', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});

	if(req.session.example === undefined) {
		req.session.example = [];
		res.send('you must be new');
	}

	else {
		req.session.example.push(Math.random());
		res.send(req.session.example.join(','));
	}
});

server.listen(8080);
