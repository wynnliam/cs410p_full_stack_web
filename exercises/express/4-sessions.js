'use strict';

var express = require('express'); // do not change this line
var session = require('express-session'); // do not change this line

var server = express();

server.use(session({
	'store': new session.MemoryStore(),
	'secret': 'squanto',
	'resave': false,
	'saveUninitialized': false,
	'cookie': {
		'maxAge': 86400000
	}
}));

server.get('/:param', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});

	if(req.session.hist === undefined) {
		req.session.hist = [req.params.param];
		res.send('you must be new');
	}

	else {
		res.write('your history:\n');
		for(var i = 0; i < req.session.hist.length; i += 1) {
			res.write('  /' + req.session.hist[i]);
			if(i != req.session.hist.length - 1)
				res.write('\n');
		}
		req.session.hist.push(req.params.param);

		console.log(req.session.hist);
		res.end();
	}
});

server.listen(process.env.PORT || 8080);

// preface: use the express-session middleware with the memory storage which should make this task rather easy

// http://localhost:8080/hello should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/test should return 'your history:\n  /hello' in plain text

// http://localhost:8080/world should return 'your history:\n  /hello\n  /test' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/moshimoshi should return 'your history:\n  /lorem' in plain text

// http://localhost:8080/ipsum should return 'your history:\n  /lorem\n  /moshimoshi' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'your history:\n  /hello\n  /test\n /world' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware
