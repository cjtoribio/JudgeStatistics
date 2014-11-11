var serverPath = "/Users/carlosjosetoribio/Documents/workspace/JudgeStatistics/server/";
var _ = require('lodash');
var fs = require('fs');
var async = require('async');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
if(!String.prototype.trim){  
	String.prototype.trim = function(){  
		return this.replace(/^\s+|\s+$/g,'');  
	};
}

var server = {
		async: async,
		request: request,
		_:_,
		mongoose: mongoose
};



function StartDataBase(callback) {
	console.log(' ---- Starting Database ---- ');
	server.schemas = {};
	fs.readdir(serverPath + 'schemas' , function(err, files){
		_.forEach(files , function(file){
			var fullUrl = serverPath + 'schemas/' + file;
//			console.log(fullUrl);
			server.schemas[file.substr(0,file.length-3)] = 
				require(fullUrl).create(server);
		});
	});	
	server.mongoose.connect('localhost');
	if(callback)callback();
}
function StartServices(callback) {
	console.log(' ---- Starting Services ---- ');
	server.services = {};
	fs.readdir(serverPath + 'services' , function(err, files){
		_.forEach(files , function(file) {
			var fullUrl = serverPath + 'services/' + file;
//			console.log(fullUrl);
			if(fs.statSync(fullUrl).isFile()) {
				server.services[file] = require(fullUrl);
				server.services[file].start(server);	
			}
		});
	});
	if(callback)callback();
}
function StartExpress(callback){
	console.log(' ---- Starting Express ---- ');
	var app = express();
	app.set('port', process.env.PORT || 3000);
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(express.static(path.join(__dirname, 'public2')));
	app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
	});
	server.app = app;
	if(callback)callback();
}


async.waterfall([
     StartExpress,
     StartDataBase,
     StartServices
]);



