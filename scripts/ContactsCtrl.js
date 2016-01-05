angular.module('phonertcdemo')

.controller('ContactsCtrl', function ($scope, ContactsService, SchedulingService) {
	$scope.contacts = ContactsService.onlineUsers;
	$scope.currentName = ContactsService.currentName;

	// SchedulingService.updatewebrtcid();


	// $scope.onlineUsersCount = function() {
	// 	return  ContactsService.onlineUsers.length + 1;
	// };

	// $scope.show = function() {
	// 	alert(ContactsService.onlineUsers.length);
	// };

});