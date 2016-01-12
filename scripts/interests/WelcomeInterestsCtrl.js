angular.module('phonertcdemo')

  .controller('WelcomeCountryCtrl', function ($scope, $state, $http, $ionicPopup, signaling, 
      CountryService, ContactsServiceForCountry, ENV, $timeout) {
 

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

      signaling.emit('login', countryPerson );
    };


    signaling.on('login_error', function (message) {

      if (message == 'You are already connected.' 
              || message == 'This name already exists.') {

        
        setTimeout(function() { signaling.emit('logout'); }, 1000);
        setTimeout(function() { $scope.login(); }, 3000);
        return;
      }

      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: message
      });
    });


    signaling.on('login_successful', function (users) {
      ContactsServiceForCountry.setOnlineUsers(users, $scope.loginName);

      // sendDataToServer();
      $state.go('app.pickothercountry');
    });





  });