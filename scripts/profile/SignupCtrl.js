angular.module('phonertcdemo')

  .controller('SignupCtrl', function ($scope, $state, $ionicPopup, ENV, FileService) {
    

    $scope.user = {
      username: ""
    };


     $scope.getPhoto = function() {

      // $scope.status = 1;

      navigator.camera.getPicture(onSuccess, onFail, 
      {
        destinationType: Camera.DestinationType.DATA_URL,
        // encodingType: Camera.EncodingType.PNG,
        // destinationType: destinationType.FILE_URI,
        quality: 70,
        // targetWidth: 320,
        // targetHeight: 320,
        // targetWidth: 720,
        // targetHeight: 720,
        // popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,

        targetWidth:320,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG,

        cameraDirection: 1,

        sourceType: Camera.PictureSourceType.PHOTOLIBRARY // Camera.PictureSourceType.SAVEDPHOTOALBUM
      });


      function onSuccess(imageData) {
        var image = $("#photo")[0];
        image.src = "data:image/jpeg;base64," + imageData;

        $scope.status = 1;
        $scope.$apply();
      }

      function onFail(message) {

      }

    };



    $scope.signup = function() {
      // alert($scope.user.username);
      FileService.write($scope.user.username);
    };


  });