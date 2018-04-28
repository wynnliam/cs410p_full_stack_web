'use strict';

var http = require('http'); // do not change this line
var querystring = require('querystring'); // do not change this line

// http://localhost:8080/form should return the form as shown below
//   res.writeHead(200, {
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

var messages = [];

var server = http.createServer(function(req, res) {
	if(req.method === 'GET') {
		if(req.url.indexOf('/form') === 0) {
			res.writeHead(200, {
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
		}

		else if(req.url.indexOf('/list') === 0) {
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});

			for(var i = 0; i < messages.length; i += 1) {
				res.write(messages[i])

				if(i < messages.length - 1)
					res.write('\n');
			}

			res.end();
		}
	}

	else if(req.method === 'POST') {
		if(req.url.indexOf('/new') === 0) {
			var strData = '';
			req.on('data', function(data) {
				strData += data;

				var qstring = querystring.parse(strData);

				messages.push(qstring['name'] + ': ' + qstring['message']);
			});

			req.on('end', function() {
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});

				res.write('thank you for your message');
				res.end();
			});
		}
	}
});

server.listen(process.env.PORT || 8080);

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text

// http://localhost:8080/form should return the form as shown above

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text
