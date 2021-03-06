angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider,$locationProvider) {

	 	$routeProvider.when('/',{
	 		templateUrl: 'app/views/pages/home.html'
	 	})
	 	.when('/login',{
	 		templateUrl: 'app/views/pages/user/login.html'
	 	})
	 	.when('/register',{
	 		templateUrl  : 'app/views/pages/user/register.html',
	 		controller   : 'regCtrl',
	 		controllerAs : 'register'
	 			
	 	})
	 	.when('/question',{
	 		templateUrl: 'app/views/pages/question.html',
	 		controller   : 'qsnCtrl',
	 		controllerAs : 'question'
	 			})
	 	.when('/logout',{
	 		templateUrl: 'app/views/pages/user/logout.html'
	 	})
	 	.when('/profile',{
	 		templateUrl: 'app/views/pages/user/profile.html'
	 	})
	 	.when('/facebook/:token',{
	 		templateUrl: 'app/views/pages/user/social/social.html',
	 		controller : 'facebookCtrl',
	 		controllerAs: 'facebook'
	 	})
	 	.when('/facebookerror',{
	 		templateUrl: 'app/views/pages/user/login.html',
	 		controller : 'facebookCtrl',
	 		controllerAs: 'facebook'
	 	})
	 	.otherwise({redirectTo:'/'});

	 	$locationProvider.html5Mode(true);
	
});