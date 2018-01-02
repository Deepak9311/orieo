angular.module('mainController', ['authServices'])

.controller('mainCtrl',function(Auth, $timeout,$window,$location, $rootScope){
	
	var app = this;

	app.loadme = false;

	$rootScope.$on('$routeChangeStart', function(){

		if (Auth.isLoggedIn()) {
		//console.log('Success: User is loggedIn.');
		   app.isLoggedIn = true;
			
			Auth.getUser().then(function(data){
			app.username = data.data.username;
			//app.useremail = data.data.email;
			app.loadme = true;
		});
	}else{
		
		app.isLoggedIn = false;
		app.username = '';
		app.loadme = true;
	}

	if($location.hash() == '_=_') $location.hash(null);
	});

	this.facebook = function(){
		//console.log($window.location);
	$window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
	};

	this.login = function(loginData){
		app.loading = true;
		app.errorMsg = false;
	//console.log('form submitted');
	//console.log(this.regData);
	Auth.login(app.loginData).then(function(data){
		//console.log(data.data.success);
		//console.log(data.data.message);
		if (data.data.success) {
			app.loading = false;
			//create a success message
			app.successMsg = data.data.message;
			//redirect to home page
			$timeout(function(){
				$location.path('/home');
				app.loginData = '';
				app.successMsg = false;
						},2000);
			
		}
		else{
			app.loading = false;
			app.errorMsg = data.data.message;
		}
	});
};

this.logout = function(){
	Auth.logout();
	$location.path('/logout');
	$timeout(function(){
		$location.path('/home');
	}, 2000);
};
});