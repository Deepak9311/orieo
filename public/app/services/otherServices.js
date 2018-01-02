angular.module('otherServices', [])

.factory('Question',function($http){
	questionFactory = {};

	questionFactory.create = function(qsnData){
		return $http.post('/api/send', qsnData);
	}
	return questionFactory;
});