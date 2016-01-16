angular.module('phonertcdemo')

  .controller('HomeCtrl', function ($scope, AdService) {

  	$scope.size = function() {
  		// alert(window.innerWidth * 0.21);
  		// return min(window.innerWidth, window.innerHeight) * 0.34; 
      return min(window.innerWidth, window.innerHeight) * 0.21; 
  	};


  	

  	function min(a, b) {
  		if (a < b) {
  			return a;
  		}

  		return b;
  	}



    $scope.init = function() {
      AdService.runAdBanner();
    };

  });