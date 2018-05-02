// preface: use the body-parser middleware that helps you retrieve and parse the post data from the form

// http://localhost:8080/form should return the form as shown below
//   res.status(200);
//   
//   res.set({
//   	'Content-Type': 'text/html'
//   });
//   
//   res.write('<!DOCTYPE html>');
//   res.write('<html>');
//   	res.write('<body>');
//   		res.write('<form action="/new" method="post">');
//   			res.write('<input type="text" name="name">');
//   			res.write('<input type="text" name="message">');
//   			res.write('<input type="submit" value="submit">');
//   		res.write('</form>');
//   	res.write('</body>');
//   res.write('</html>');
//   
//   res.end();

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text

// http://localhost:8080/form should return the form as shown aboe

// http://localhost:8080/new should retrieve the post data using the body parser, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text

'use strict';

var express = require('express'); // do not change this line
var parser = require('body-parser'); // do not change this line

var server = express();

var messages = [];

server.use(parser.urlencoded({
	'extended': false,
	'limit': 1024
}));

server.get('/form', function(req, res) {
	 res.status(200);
	 res.set({
	  'Content-Type': 'text/html'
	 });
	 
	 res.write('<!DOCTYPE html>');
	 res.write('<html>');
	  res.write('<body>');
		  res.write('<form action="/new" method="post">');
			  res.write('<input type="text" name="name">');
			  res.write('<input type="text" name="message">');
			  res.write('<input type="submit" value="submit">');
		  res.write('</form>');
	  res.write('</body>');
	 res.write('</html>');
	 
	 res.end();
});

server.post('/new', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});

	messages.push(req.body['name'] + ': ' + req.body['message']);
	res.send('thank you for your message');
});

server.get('/list', function(req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});

	for(var i = 0; i < messages.length; i += 1) {
		res.write(messages[i]);
		if(i != messages.length - 1)
			res.write('\n');
	}

	res.end();
});

server.listen(process.env.PORT || 8080);

