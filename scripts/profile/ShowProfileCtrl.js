angular.module('phonertcdemo')

  .controller('ShowProfileCtrl', function ($scope, FileService) {

    $scope.read = "";

    $scope.init = function() {
      FileService.read();

      doReading();
    };


    function doReading() {
      setTimeout(function() { 
        $scope.read = FileService.error + FileService.data;

        if ($scope.read == "") {
          doReading();
        }
        
       }, 300);
    }

  });