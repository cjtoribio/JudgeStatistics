function create(server) {
	var showSchema = new server.mongoose.Schema({
		_id : Number,
		name : String,
		airsDayOfWeek : String,
		airsTime : String,
		firstAired : Date,
		genre : [ String ],
		network : String,
		overview : String,
		rating : Number,
		ratingCount : Number,
		status : String,
		poster : String,
		subscribers : [ {
			type : server.mongoose.Schema.Types.ObjectId,
			ref : 'User'
		} ],
		episodes : [ {
			season : Number,
			episodeNumber : Number,
			episodeName : String,
			firstAired : Date,
			overview : String
		} ]
	});
	console.log("Created Show schema...");
	return server.mongoose.model('Show', showSchema);
}
module.exports.create = create;