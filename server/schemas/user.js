function create(server) {
	var userSchema = new server.mongoose.Schema({
		spoj : {
			handle : String,
			submissions : [{
 				id: Number,
 				date: Date,
 				prob: String,
 				veredict: String, 
 				time: Number,
 				memory: Number,
 				lang: String
			}]
		},
		codeforces : {
			handle : String
		}
	});
	console.log("Created User schema...");
	return server.mongoose.model('User', userSchema);
}
module.exports.create = create;
