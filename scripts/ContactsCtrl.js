angular.module('phonertcdemo')

.controller('ContactsCtrl', function ($scope, $state, signaling, ContactsService) {
	
	$scope.onlineUsersCounter = function() {
		return ContactsService.onlineUsersCounter;
	};


	$scope.call1 = function() {
		$state.go('app.call', { isCalling: true, contactName: "1" });
	};


	$scope.logout = function() {
		signaling.disconnect();
	};
	
});