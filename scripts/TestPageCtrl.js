angular.module('phonertcdemo')

  .controller('TestPageCtrl', function ($scope, $interval) {

  	// $scope.width = screen.width; //window.innerWidth;
  	// $scope.height = screen.height; //window.innerHeight;

    var timeRemaining = 360; // 6 min

  	var footer = document.getElementById("foot");
  	var width = min(window.innerWidth, window.innerHeight) - footer.offsetHeight;

    $scope.style = "width:" + width + "px;height:" + width +"px;background-color: red;" +
        "margin-top:" + marginTop() + "px; margin-right: auto;margin-left: auto;z-index: -999 !important;";


    function min(a, b) {
    	
    	if (a < b) {
    		return a;
    	} else {
    		return b;
    	}
    }

    function marginTop() {
    	// alert((window.innerHeight - footer.offsetHeight - width) / 2);
    	return (window.innerHeight - footer.offsetHeight - width) / 2;
    }



    $scope.callTime = function() {
      return new Date(1970, 0, 1).setSeconds(timeRemaining);
    };
    
    $interval(function() {
      timeRemaining--;
    }, 1000);

  });