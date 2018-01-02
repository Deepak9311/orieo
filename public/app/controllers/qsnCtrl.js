angular.module('qsnControllers', ['otherServices'])

.controller('qsnCtrl',function($http, $location,$timeout, Question){
	var app = this;

	this.quesn = function(qsnData){
		
			
           //console.log(this.qsnData);
			Question.create(app.qsnData).then(function(data){
		
				if (data.data) {
						
						//create a success message
						app.myData = data.data;
						//redirect to home page
							$timeout(function(){
							$location.path('/home');
									},2000);
						
					}
					else{
						console.log("error");
					}
					
			});
	};
});
