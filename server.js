var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');	
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var port = process.env.PORT || 3000;
var con =require ('./db/dbconnection');
var passport = require('passport');
var social = require('./app/passport/passport')(app,passport);

//Middlewears
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


//server configuration
app.listen(port,function(){
console.log('Application running on port ' + port);
});