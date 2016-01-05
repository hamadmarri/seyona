angular.module('phonertcdemo')

  .controller('TestPageCtrl', function ($scope) {

  	$scope.width = screen.width; //window.innerWidth;
  	$scope.height = screen.height; //window.innerHeight;

  });