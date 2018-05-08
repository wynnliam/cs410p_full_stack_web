'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

// Note: these variables for everyone
var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line
var clients = [];

io.on('connection', function(objectSocket) {
	// send everyone the 'clients' event, contianing an array with the ids of the connected clients - example: { 'strClients':['GxwYr9Uz...','9T1P4pUQ...'] }
	// send everyone the 'message' event, containing a message that a new client connected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... connected' }

	// Note: These variables for the current client.
	var client = objectSocket.id;
	clients.push(client);

	io.emit('clients', { 'strClients': clients });
	io.emit('message', { 'strFrom': 'server', 'strTo': 'everyone', 'strMessage': client + ' connected'});
	
	objectSocket.on('message', function(objectData) {
		// if the message should be recevied by everyone, broadcast it accordingly
		// if the message has a single target, send it to this target as well as to the origin

		if(objectData.strTo === 'everyone') {
			io.emit('message', {
				'strFrom': client,
				'strTo': objectData.strTo,
				'strMessage': objectData.strMessage
			});
		}

		else {
			console.log('to: ' + objectData.strTo + ' from: ' + client);
			var message = {
				'strFrom': client,
				'strTo': objectData.strTo,
				'strMessage': objectData.strMessage
			};

			io.to(objectData.strTo).emit('message', message);
			io.to(client).emit('message', message);
		}
	});

	objectSocket.on('disconnect', function() {
		// send everyone the 'clients' event, contianing an array of the connected clients - example: { 'strClients':['GxwYr9Uz...'] }
		// Remove the client
		var index = clients.indexOf(client);
		if(index !== -1)
			clients.splice(index, 1);
		io.emit('clients', { 'strClients': clients });
		// send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... disconnected' }
		io.emit('message', {
			'strFrom': 'server',
			'strTo': 'everyone',
			'strMessage': client + ' disconnected'
		});
	});
});

console.log('go ahead and open "http://localhost:8080/3-chat.html" in your browser');
