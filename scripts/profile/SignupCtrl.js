angular.module('phonertcdemo')

  .controller('SignupCtrl', function ($scope, $state, $ionicPopup, ENV, FileService, 
    ProfileService, CountryService) {
    

    $scope.countries = CountryService.getCountries();
    $scope.countryFlag = undefined;
    $scope.photoPicked = false;
    $scope.usernameError = false;

    $scope.user = {
      username: "",
      image:"",
      countryCode: ""
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
        $scope.photoPicked = true;

        $scope.$apply();
      }

      function onFail(message) {

      }

    };



    $scope.setCountry = function() {
      $scope.countryFlag = CountryService.find($scope.user.countryCode).flag;
    };


    $scope.signup = function() {
      // alert($scope.user.username);
      $scope.usernameError = false;

      $scope.user.username = $scope.user.username.trim();

      if ($scope.user.username.length < 2 || $scope.user.username.length > 25) {
        $scope.usernameError = true;
        return;
      }

      var matches = $scope.user.username.match(/^[a-zA-Z]+$/);
      if (matches == null) {
          $scope.usernameError = true;
          return;
      }

      alert($scope.user.username);
      alert($scope.user.countryCode);
      alert($scope.user.image);


      FileService.write(angular.toJson($scope.user));

      setTimeout(function() {
        ProfileService.load();
        $state.go("app.showprofile");
      }, 1000);
      
    };


  });