var User      = require('../models/user');
var Question  = require('../models/question');
var jwt       = require('jsonwebtoken');
var secret    = 'deepak';

module.exports = function(router) {
	//3000/api/users
	//User Registration Route
router.post('/users',function(req,res){

		 var user = new User();
		 //console.log(req.body);
		 user.username 	= req.body.username;
		 user.email 	= req.body.email;
		 user.password  = req.body.password;
		 //console.log(req.body);
		 if (req.body.username == null || req.body.username == '' || req.body.email == null || 
		 	req.body.email == '' || req.body.password == null || req.body.password == '') 
		 {
		 	
		 	res.json({ success: false, message:'Ensure username,email and password are provided'});

		 }
		 else{
		 	user.save(function(err){
		 		

		 		if (err) {
		 			//console.log(req.body);
		 			res.json({success: false ,message:'Username or Email already exists'});
		 			}
		 		else{
			 		//console.log(user);
			 		//res.json(user);
			 		res.json({success: true, message:'user created'});
		 			}
		 });
		 	
		} 
		});

//3000/api/authenticate
//User Login Route
//User.findOne({ username: req.body.username}) for find by username
router.post('/authenticate',function(req,res){
	User.findOne({ email: req.body.email}).select('email username password').exec(function(err,user){
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message:'Could not authenticate user'});
		}
		else{
			if (user) {
				if (req.body.password) {
					var validPassword = user.comparePassword(req.body.password);
				}else
				{
					res.json({ success: false, message:'No password provided'});
				}
				
				if (!validPassword) {

					res.json({ success: false, message: 'Could not authenticate password'});
				}
				else{
					var token = jwt.sign({ username:user.username, email: user.email}, secret, {expiresIn: '24h'});
					res.json({ success: true, message: 'User authenticated', token: token});
				}
			}
		}
	});

});

router.use(function(req,res,next){
	var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if (token) {
		//verify token
		jwt.verify(token, secret,function(err, decoded){
			if(err){
				 res.json({ success: false, message: 'Token invalid'});
			}else{
				req.decoded = decoded;
				next();
			}

		});
	}else{
		res.json({ success: false, message: 'No token provide'});
	}

});

router.post('/current', function(req,res){
	res.send(req.decoded );

});	

//For Insert Question Details
router.post('/send', function(req,res){
    
        var newQuestion = Question();
        	newQuestion.question = req.body.question;
			newQuestion.details  = req.body.details;
			newQuestion.tags     = req.body.tags;
        		console.log(newQuestion);
				// save the user
				newQuestion.save(function(err) {
				  if (err) throw err;

				  
				});
				console.log('Data Insert!');
			});

return router;
}
