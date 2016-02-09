angular.module('phonertcdemo')

  .controller('ShowProfileCtrl', function ($scope, ProfileService, FileService, CountryService) {


    $scope.editUsername = false;
    $scope.editAge = false;
    $scope.editGender = false;
    $scope.countries = CountryService.getCountries();
    $scope.countryFlag = undefined;


    $scope.read = "";
    $scope.user = {
      username: "",
      image: "",
      countryCode: "",
      age: "",
      gender: ""
    };

    $scope.init = function() {
      // $scope.read = "";

      if (ProfileService.profile.username == "") {


        FileService.read();
        $scope.doReading();  
      } else {


        $scope.user = ProfileService.profile;

        if ($scope.user.countryCode != undefined) {
          $scope.countryFlag = CountryService.find($scope.user.countryCode).flag;
        }

      }
      
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
        FileService.write(angular.toJson($scope.user));

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
        FileService.write(angular.toJson($scope.user));
      }
    };



    $scope.setCountry = function() {
      // alert($scope.user.countryCode);
      $scope.countryFlag = CountryService.find($scope.user.countryCode).flag;

      FileService.write(angular.toJson($scope.user));
    };


    $scope.startEditAge = function(b) {
      $scope.editAge = b;
      
      if (b == true) {
        setTimeout(function() {
            document.getElementById("ageInput").focus(); 
        }, 500);
      } else {
        FileService.write(angular.toJson($scope.user));
      }
    };


    $scope.startEditGender = function(b) {
      $scope.editGender = b;
      
      if (b == false) {
        FileService.write(angular.toJson($scope.user));
      }

    };

    $scope.doReading = function() {
      setTimeout(function() { 
        $scope.read = FileService.error + FileService.data;


        if ($scope.read == "") {
          $scope.doReading();
        } else {

          $scope.user = angular.fromJson($scope.read);

          var image = $("#myphoto")[0];
          image.src = $scope.user.image;
          
          if ($scope.user.image == "") {
            image.src = "logo.svg";
          }

          // if ($scope.user.countryCode == undefined) {
          //   $scope.user.countryCode = "SA";
          //   $scope.user.countryCode = CountryService.find($scope.user.countryCode).flag;
          // }
          

          // $scope.user.age = "31";
          // $scope.user.gender = "M";

          if ($scope.user.countryCode != undefined) {
            $scope.countryFlag = CountryService.find($scope.user.countryCode).flag;
          }

          $scope.$apply();
        }
        
       }, 500);
    };

  });