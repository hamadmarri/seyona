angular.module('phonertcdemo')

  .controller('ShowProfileCtrl', function ($scope, $state, ProfileService, CountryService,
   $ionicLoading, $ionicPopup) {


    $scope.editUsername = false;
    $scope.editAge = false;
    $scope.editGender = false;
    $scope.countries = CountryService.getCountries();
    $scope.countryFlag = undefined;
    $scope.welcomeMsg = "";


    $scope.oldUsername = "";

    $scope.user = {
      username: "",
      image: "",
      countryCode: "",
      age: "",
      gender: ""
    };

    $scope.init = function() {


      $ionicLoading.show();

      $scope.user = ProfileService.profile;

      $scope.oldUsername = ProfileService.profile.username;

      setTimeout(function() {
          var image = $("#myphoto")[0];
          image.src = ProfileService.profile.image;
          
          
          if ($scope.user.image == "") {
            image.src = "logo.svg";
          }


          $scope.countryFlag = CountryService.getMyCountry().flag;
          $scope.welcomeMsg = CountryService.getMyCountry().welcome;

          $scope.$apply();

          $ionicLoading.hide();

        }, 3000);
      
    };



     $scope.getPhoto = function() {

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
        
        // FileService.write(angular.toJson($scope.user));
        ProfileService.profile = $scope.user;
        ProfileService.save();

        $scope.$apply();
      }

      function onFail(message) {
      }

    };

    $scope.startEditUsername = function(b) {
      $scope.editUsername = b;
      
      if (b == true) {
        setTimeout(function() {
            document.getElementById("usernameInput").focus(); 
        }, 500);
      } else {

        $scope.user.username = $scope.user.username.trim();

        if ($scope.user.username.length < 2 || $scope.user.username.length > 25) {

          $scope.editUsername = true;
          $scope.user.username = $scope.oldUsername;

          $scope.showUsernameError();

          return;
        }

        var matches = $scope.user.username.match(/^[a-zA-Z]+$/);
        if (matches == null) {

          $scope.editUsername = true;
          $scope.user.username = $scope.oldUsername;

          $scope.showUsernameError();
          return;
        }


        // ProfileService.profile = $scope.user;
        ProfileService.save();
      }
    };


    $scope.showUsernameError = function() {
      var alertPopup = $ionicPopup.alert({
           title: 'Usernmae Error',
           template: 'username must be alphabet only, min is 2 max is 25 characters'
         });

         alertPopup.then(function(res) {
         });
    };


    $scope.setCountry = function() {
      // alert($scope.user.countryCode);

      CountryService.setMyCountry(CountryService.find(ProfileService.profile.countryCode));
      $scope.countryFlag = CountryService.getMyCountry().flag;
      $scope.welcomeMsg = CountryService.getMyCountry().welcome;

      // FileService.write(angular.toJson($scope.user));
      // ProfileService.profile = $scope.user;
      ProfileService.save();
    };


    $scope.startEditAge = function(b) {
      $scope.editAge = b;
      
      if (b == true) {
        setTimeout(function() {
            document.getElementById("ageInput").focus(); 
        }, 500);
      } else {
        // FileService.write(angular.toJson($scope.user));
        // ProfileService.profile = $scope.user;
        ProfileService.save();
      }
    };


    $scope.startEditGender = function(b) {
      $scope.editGender = b;
      
      if (b == false) {
        // FileService.write(angular.toJson($scope.user));
        // ProfileService.profile = $scope.user;
        ProfileService.save();
      }

    };



    $scope.goBack = function() {
      $state.go('app.home');
    };



  });