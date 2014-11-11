function start(server){
	server.app.get('/api/codeforces/submissions/:handle', function(req, res, next) {
		var userHandle = req.params.handle;
		server.request.get({
				headers: {'req-date' : new Date()},
				url:'http://codeforces.com/api/user.status?handle=' + userHandle , json: true
			},function(error, response, body) {
				if(error) next(error);
				res.send(body.result);
		});
	});

	server.app.get('/api/spoj/submissions/:handle', function(req, res, next) {
		var userHandle = req.params.handle;
		function RequestFromWebSite(callback){
 	    	server.request.get('http://www.spoj.com/status/' + userHandle + '/signedlist/',function (error, response, body) {
 	    		if(error) next(error);
	 	    	var lines = body.split('\n');
	 	    	var subs = new Array();
	 	    	server._.each(lines, function(line){
	 	    		if(line.match(/^\| *\d+ */)){
	 	    			var params = line.split('|');
	 	    			params = params.filter(function(elem){
	 	    				return elem != '';
	 	    			});
	 	    			subs.push({
	 	    				id: parseInt(params[0].trim()),
	 	    				date: new Date(params[1].trim()),
	 	    				prob: params[2].trim(),
	 	    				ver: params[3].trim(),
	 	    				time: Math.max(parseFloat(params[4].trim()), 0),
	 	    				memory: parseInt(params[5].trim()),
	 	    				lang: params[6].trim()
	 	    			});	
	 	    		}
	 	    	});
	     		callback(null, subs, handle);
 	    	});
		};
 	    function SaveOnDB(subs, handle, callback){
 	    	server.schemas.user
 	    		.findOne({})
 	    		.where('spoj.handle').equals(handle)
 	    		.exec(function(err,user){
 	    			user.spoj.submissions = subs;
 	    			user.save(function(err, real){
 	    	 	    	callback(real);
 	    			});
 	    		});
 	    };
 	    function GetFromDB(handle, callback){
 	    	server.schemas.user
 	    		.findOne({})
 	    		.where('spoj.handle').equals(handle)
 	    		.exec(function(err,user){
 	    			if(callback)callback(user);
 	    			callback = null;
 	    		});
 	    };
 	    function ExistOnDB(){
 	    	server.schemas.user.count({}, function( err, count){
 	    	    if(count == 0){
 	    	    	server.async.waterfall([
 	    	    	    RequestFromWebSite,
 	    	    	    SaveOnDB,
 	    	    	    function(user){
 	    	   	     		res.send(user);
 	    	    	    }
 	    	    	]);
 	    	    }else{
 	    	    	server.async.waterfall([
 	    	    	    GetFromDB,
 	    	    	    function(user){
 	    	   	     		res.send(user);
 	    	    	    }
 	    	    	]);
 	    	    }
 	    	    
 	    	})
 	    }
 	    ExistOnDB();
 	    
		
	});
	console.log("Created spojApi service...");
}

module.exports.start = start;
