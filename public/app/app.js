angular.module('userApp', ['appRoutes','userControllers','qsnControllers','userServices','mainController','authServices','otherServices'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});
