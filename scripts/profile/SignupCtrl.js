angular.module('phonertcdemo')

  .controller('SignupCtrl', function ($scope, $state, $ionicPopup, ENV, FileService) {
    

    $scope.status = 0;
    // $scope.show = true;

    $scope.user = {
      username: "",
      image:""
    };


     $scope.getPhoto = function() {

      // $scope.status = 1;

      navigator.camera.getPicture(onSuccess, onFail, 
      {
        destinationType: Camera.DestinationType.DATA_URL,
        quality: 55,
        saveToPhotoAlbum: false,

        targetWidth:320,
        // targetWidth:200,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG,

        cameraDirection: 1,

        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM // Camera.PictureSourceType.PHOTOLIBRARY
      });


      function onSuccess(imageData) {
        var image = $("#photo")[0];
        image.src = "data:image/jpeg;base64," + imageData;

        $scope.user.image = image.src;

        // alert($scope.user.image.length);

        $scope.status = 1;
        $scope.$apply();
      }

      function onFail(message) {

      }

    };



    $scope.signup = function() {
      // alert($scope.user.username);

      $scope.user.username = $scope.user.username.trim();

      FileService.write(angular.toJson($scope.user));

      $state.go("app.showprofile");
    };


  });