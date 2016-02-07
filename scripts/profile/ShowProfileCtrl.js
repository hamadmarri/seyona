angular.module('phonertcdemo')

  .controller('ShowProfileCtrl', function ($scope, FileService) {

    $scope.read = "";
    $scope.user;

    $scope.init = function() {
      // $scope.read = "";

      FileService.read();

      $scope.doReading();
    };


    $scope.doReading = function() {
      setTimeout(function() { 
        $scope.read = FileService.error + FileService.data;


        if ($scope.read == "") {
          $scope.doReading();
        } else {

          $scope.user = angular.fromJson($scope.read);

          var image = $("#photo")[0];
          image.src = $scope.user.image;

          $scope.$apply();
        }
        
       }, 500);
    };

  });