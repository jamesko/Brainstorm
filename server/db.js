var mongoose = require('mongoose');
var db = {};

//mongoose.connect('mongodb://localhost/brainstormer');
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
mongoose.connect(connectionString);

var userModel = require('./users/user.server.model.js');
var commentModel = require('./comments/comment.server.model.js');
var ideaModel = require('./ideas/idea.server.model.js');
var roomModel = require('./rooms/room.server.model.js');
var interestModel = require('./interests/interest.server.model.js');
db.User = mongoose.model('User');
db.Comment = mongoose.model('Comment');
db.Idea = mongoose.model('Idea');
db.Room = mongoose.model('Room');
db.Interest = mongoose.model('Interest');

module.exports = db;

mongodb://MongoLab-i:8Lu9GZSXvdiVCqOTDGRZL7CHOS4XN.FzDpCqHCeTKhc-@ds052827.mongolab.com:52827/MongoLab-i