var fs = require('fs'),
	net = require("net"),
	http = require("http"),
	exec = require('child_process').exec;
	
/**********************************************************************
 *
 * 			Child Process: Capture, Preview
 *
 ***********************************************************************/


/**********************************************************************
 *
 * 				TCP Client
 *
 ***********************************************************************/
var TCPClient = new net.Socket();

function connect(config) {
	TCPClient.connect(config.TCPServerPort, config.TCPServerHost);
}

TCPClient.on('connect', function() {
	console.log("===LOG===: the connect event trigger");
	console.log("===LOG===: connected to TCP Server: " + TCPClient.remoteAddress + ":" + TCPClient.remotePort);
	TCPClient.setEncoding("utf8");
	var message = {
		type: 1000,
		PIInfo: {
			serial: '1111',
			ip: TCPClient.localAddress,
			port: TCPClient.localPort
		}
	};
	TCPClient.write(JSON.stringify(message), function() {
		console.log("===LOG===: " + JSON.stringify(message));
	});
});

TCPClient.on("data", function(buf) {
	try {
		var message = JSON.parse(buf.toString());
		switch(message.type) {
			case 1001:
				console.log("===LOG===: request get the latest capture");
				getLatestCapture();
				break;
			case 1002:
				console.log("===LOG===: request the preview");
				getPreview();
				break;
			default:
				break;
		}
	} catch (e) {
		console.log(e);	
	}
});

TCPClient.on("error", function(e) {
	console.log("===LOG===: there is a problem connect to TCP Server");
});

TCPClient.on("close", function(e) {
	console.log("===LOG===: the socket is fully closed.");
	setTimeout(function() {
		console.log('===LOG===: retrying connect to TCP Server again......');
		connect(appConfig);
	}, 3000);
});


/**
 * @method getLatestCapture
 * Get the latest capture.
 */
function getLatestCapture() {
	fs.readFile('./out.jpg', {
		encoding: 'base64',
		flag: 'r'
	}, function(err, data) {
		if(err) {
			console.log(err);
			return;
		}
		var ret = {
			base64: data
		};
		
		var retString = JSON.stringify(ret);
	
		var options = {
			host: appConfig.TCPServerHost,
			port: 80,
			path: '/latestCapture',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': retString.length
			}
		};
		
		var req = http.request(options, function(res) {
			res.setEncoding('utf-8');
			
			var responseString = '';
			
			res.on('data', function(data) {
				responseString += data;
			});
			
			res.on('end', function() {
				var resultObject = JSON.parse(responseString);
				console.log(resultObject);
			});
		});
		
		req.on('error', function(e) {
			// TODO: handle error.
		});
		
		console.log("===LOG===: return latest capture base64 data");
		req.write(retString);
		req.end();
		
	});
}

/**
 * @method getPreview
 * Get the latest capture.
 */
function getPreview(){
	var counter = 1;
	setInterval(function() {
		
		fs.readFile('./out.jpg', {
			encoding: 'base64',
			flag: 'r'
		}, function(err, data) {
			if(err) {
				console.log(err);
				return;
			}
			var ret = {
				base64: data
			};
			
			var retString = JSON.stringify(ret);
			
			var options = {
				host: appConfig.TCPServerHost,
				port: 80,
				path: '/preview',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': retString.length
				}
			};
			
			var req = http.request(options, function(res) {
				res.setEncoding('utf-8');
				
				var responseString = '';
				
				res.on('data', function(data) {
					responseString += data;
				});
				
				res.on('end', function() {
					var resultObject = JSON.parse(responseString);
					console.log(resultObject);
				});
			});
			
			req.on('error', function(e) {
				// TODO: handle error.
			});
			
			console.log("===LOG===: return preview base64 data");
			req.write(retString);
			req.end();
			
			
			
			
		});
		
		counter++;
		
	}, 1000);

}


var appConfig = {
	TCPServerPort: 8124,
	TCPServerHost: '192.168.199.101'
}

connect(appConfig);








