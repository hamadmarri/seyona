angular.module('phonertcdemo')

  .controller('TestPageCtrl', function ($scope) {

  	// $scope.width = screen.width; //window.innerWidth;
  	// $scope.height = screen.height; //window.innerHeight;

  	var footer = document.getElementById("foot");
  	var width = min(window.innerWidth, window.innerHeight) - footer.offsetHeight;

    $scope.style = "width:" + width + "px;height:" + width +"px;background-color: #000;" +
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


  });