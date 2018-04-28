'use strict';

var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line

// http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text (address might be different, there could even be multiple addresses)

// http://localhost:8080/sniklaus.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text (addresses / order might be different)

// http://localhost:8080/error should return 'error' in plain text

var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	dns.resolve(req.url.slice(1), function(err, records) {
		if(err === null) {
			for(var i = 0; i < records.length; i += 1) {
				res.write(records[i]);

				if(i < records.length - 1)
					res.write('\n');
			}
		}

		else {
			res.write('error');
		}

		res.end();
	});

});

server.listen(process.env.PORT || 8080);
