angular.module('phonertcdemo')

  .controller('SignupCtrl', function ($scope, $state, $ionicPopup, ENV, FileService, 
    ProfileService, CountryService, $rootScope, $ionicLoading, AdService) {
    

    $scope.countries = CountryService.getCountries();
    $scope.countryFlag = undefined;
    $scope.photoPicked = false;
    $scope.usernameError = false;


    $scope.user = {
      username: "",
      image: "",
      countryCode: "",
      age: "",
      gender: ""
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
        var image = $("#myphoto")[0];
        image.src = "data:image/jpeg;base64," + imageData;

        $scope.user.image = image.src;

        ProfileService.profile.image = $scope.user.image;

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



      // FileService.write(angular.toJson($scope.user));

      $ionicLoading.show();

      ProfileService.profile.username = $scope.user.username;
      ProfileService.profile.countryCode = $scope.user.countryCode;

      ProfileService.save();

      setTimeout(function() {
        $ionicLoading.hide();
        $state.go("app.showprofile");
      }, 3000);
      
    };



    $rootScope.$viewHistory.backView = null;


    $scope.init = function() {
      AdService.removeBanner();
    };

    
  });