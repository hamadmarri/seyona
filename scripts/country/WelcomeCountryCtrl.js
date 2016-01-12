angular.module('phonertcdemo')

  .controller('WelcomeCountryCtrl', function ($scope, $state, $http, $ionicPopup, signalingCountry, 
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



    function sendDataToServer() {
        var person = {
          webRtcId : $scope.loginName,
          country : $scope.myCountry.code
        };

        var data = JSON.stringify(person);
        var config = {headers: {
         'Content-Type': "application/json;charset=UTF-8"
       }};


       $http.post(ENV.apiEndpoint + '/countrypeople', data, config)
       .then(function(response) { // SUCCESS

            $state.go('app.pickothercountry');

            }, function(response) { // ERROR

              signalingCountry.disconnect();

              var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: response.status + " " + response.data
              });
           });
    };


  });