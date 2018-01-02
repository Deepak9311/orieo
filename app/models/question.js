var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
 	question:{type: String},
 	details :{ type: String},
 	tags    :{type: String}
 });

module.exports = mongoose.model('Question',questionSchema);