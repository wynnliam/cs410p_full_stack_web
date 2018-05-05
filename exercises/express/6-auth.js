'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line

var Strategy  = require('passport-http').BasicStrategy;

// Handles what we do when a user wants to authenticate
passport.use(new Strategy(
	function(userid, password, done) {
		if(userid === 'test' && password === 'logmein')
			// First param -- error, second is userid/true or false
			return done(null, true);
		else
			return done(null, false);
	}
));

var server = express();

// Initialize middleware.
server.use(passport.initialize());

server.get('/hello', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});

	res.send('accessible to everyone');
});

server.get('/world',
	// Don't use session -- see assignment 4.
	passport.authenticate('basic', { session: false }),
	function(req, res) {
		res.status(200);
		res.set({
			'Content-Type': 'text/plain'
		});

		res.send('only accessible when logged in');
	});

server.get('/test',
	passport.authenticate('basic', { session: false }),
	function(req, res) {
		res.status(200);
		res.set({
			'Content-Type': 'text/plain'
		});

		res.send('only accessible when logged in');
	});

server.listen(process.env.PORT || 8080);

// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password
