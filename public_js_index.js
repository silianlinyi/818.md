define(function(require, exports, module) {
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	
	



	function connect(config) {
		var socket = io.connect("http://" + config.serverIP + ":" + config.serverPort + "/");
		
		socket.on('connect', function() {

			// 连接成功后发送一条注册消息到服务器
			socket.emit('subscribe', {
				subscriber: app.username
			});
			
			socket.emit("ping", {
				username: "kyle"
			});
			
			//socket.emit("capture",{
			
			//});

			
		});
		
		
		
		socket.on("ping", function(data) {
			console.log(data);
		});
		
		
		
	}
	
	
	var app = window.app = {};
	app.username = "kyle";
	app.socketConfig = {
		serverIP: "192.168.1.124",
		serverPort: 80
	};
	
	app.socketConn = connect(app.socketConfig);
	
	

});
