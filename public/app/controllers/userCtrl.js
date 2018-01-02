angular.module('userControllers', ['userServices'])

.controller('regCtrl',function($http, $location, $timeout, User){
	var app = this;

	this.regUser = function(regData){
		app.loading = true;
		app.errorMsg = false;
			//console.log('form submitted');
			//console.log(this.regData);
			
			User.create(app.regData).then(function(data){
		
					if (data.data.success) {
						app.loading = false;
						
						//create a success message
						app.successMsg = data.data.message;
						
						//redirect to home page
							$timeout(function(){
							$location.path('/login');
									},2000);
			
					}
					else{
						app.loading = false;
						app.errorMsg = data.data.message;
					}
			});
	};
})

.controller('facebookCtrl',function($routeParams, Auth, $location, $window){

	var app = this;

	if ($window.location.path == '/facebookerror') {
		app.errorMsg = 'facebook email not found in database';
	}else{
		Auth.facebook($routeParams.token);
	$location.path('/');
	}	
});

