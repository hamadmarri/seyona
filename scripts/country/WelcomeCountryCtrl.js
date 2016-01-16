angular.module('phonertcdemo')

  .controller('WelcomeCountryCtrl', function ($scope, $state, $http, $ionicPopup, signalingCountry, 
      CountryService, ContactsServiceForCountry, $timeout) {
 

    $scope.myCountry = CountryService.getMyCountry();
    $scope.welcomeMsg = CountryService.getMyCountry().welcome;
    $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);


    $scope.login = function () {
      var countryPerson = {
        name: $scope.loginName,
        countryCode: $scope.myCountry.code,
        status: 1, // busy
        callsCount: 0
      };

      signalingCountry.emit('login', countryPerson );
    };


    signalingCountry.on('login_error', function (message) {

      if (message == 'You are already connected.' 
              || message == 'This name already exists.') {

        
        setTimeout(function() { signalingCountry.emit('logout'); }, 1000);
        setTimeout(function() { $scope.login(); }, 3000);
        return;
      }

      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: message
      });
    });


    signalingCountry.on('login_successful', function (users) {
      ContactsServiceForCountry.setOnlineUsers(users, $scope.loginName);

      // sendDataToServer();
      $state.go('app.pickothercountry');
    });




    $scope.init = function() {
      signalingCountry.emit('logout');
    };


    $scope.goBack = function() {
      $state.go('app.pickmycountry');
    };

  });