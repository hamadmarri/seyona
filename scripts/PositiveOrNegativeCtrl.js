angular.module('phonertcdemo')

.controller('PositiveOrNegativeCtrl', function($scope, $state, MatchService) {


	$scope.positive = function() {
		MatchService.setNegative(false);
		$state.go('app.search');
	};


	$scope.negative = function() {
		MatchService.setNegative(true);
		$state.go('app.search');
	};


	$scope.goBack = function() {
	  $state.go('app.takepicture');
	};


});

