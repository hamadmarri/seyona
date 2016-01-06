angular.module('phonertcdemo')

.controller('ContactsCtrl', function ($scope, ContactsService) {
	
	$scope.onlineUsersCounter = function() {
		return ContactsService.onlineUsersCounter;
	};

});