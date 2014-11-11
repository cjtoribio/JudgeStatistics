function create(server){
	var User = require(server.serverPath + './schemas/user.js')
		.create(mongoose, bcrypt);
	var Show = require(server.serverPath + './schemas/show.js')
		.create(mongoose, bcrypt);
	mongoose.connect('localhost');
	server.schemas = {
		User : User,
		Show : Show
	}
}
module.exports.create = create;

