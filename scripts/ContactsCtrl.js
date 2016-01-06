angular.module('phonertcdemo')

.controller('ContactsCtrl', function ($scope, $state, ContactsService) {
	
	$scope.onlineUsersCounter = function() {
		return ContactsService.onlineUsersCounter;
	};


	$scope.call1 = function() {
		$state.go('app.call', { isCalling: true, contactName: "1" });
	};
});