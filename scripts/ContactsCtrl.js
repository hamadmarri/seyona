angular.module('phonertcdemo')

.controller('ContactsCtrl', function ($scope, $state, signaling, ContactsService) {
	

	// var session = new cordova.plugins.phonertc.Session(config);


	$scope.onlineUsersCounter = function() {
		return ContactsService.onlineUsersCounter;
	};


	$scope.call1 = function() {
		$state.go('app.call', { isCalling: true, contactName: "1" });
	};


	$scope.logout = function() {
		signaling.disconnect();
	};
	

	signaling.on('disconnect', function () {
	  // alert("disconnect");
	});

});