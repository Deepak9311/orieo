var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var mongoose     = require('mongoose'); 
mongoose.Promise = global.Promise;

var mongoDB = 'mongodb://127.0.0.1/RulePega';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

