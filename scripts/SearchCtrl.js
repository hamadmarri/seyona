angular.module('phonertcdemo')

.controller('SearchCtrl', function ($scope, $stateParams, ContactsService, SchedulingService) {
	$scope.contacts = ContactsService.onlineUsers;
	$scope.currentName = ContactsService.currentName;
	$scope.negative = $stateParams.negative === 'true';

	$scope.onlineUsersCount = function() {
		return  ContactsService.onlineUsers.length + 1;
	};

	$scope.show = function() {
		alert(ContactsService.onlineUsers.length);
		alert($scope.negative);
	};


	// SchedulingService.updatewebrtcid();
});