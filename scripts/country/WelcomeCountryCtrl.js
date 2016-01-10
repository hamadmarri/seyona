angular.module('phonertcdemo')

  .controller('WelcomeCountryCtrl', function ($scope, $state, $http, $ionicPopup, signaling, 
      CountryService, ContactsServiceForCountry, ENV) {
 

    $scope.myCountry = CountryService.getMyCountry();
    $scope.welcomeMsg = CountryService.getMyCountry().welcome;
    $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);


    $scope.login = function () {
      signaling.emit('login', { name: $scope.loginName, otherCountry: $scope.myCountry } );
    };


    signaling.on('login_error', function (message) {

      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: message
      });
    });


    signaling.on('login_successful', function (users) {
      ContactsServiceForCountry.setOnlineUsers(users, $scope.loginName, $scope.myCountry);

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

              signaling.disconnect();

              var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: response.status + " " + response.data
              });
           });
    }


  });