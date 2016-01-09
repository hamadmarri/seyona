angular.module('phonertcdemo')

  .controller('PickMyCountryCtrl', function ($scope, $state, $http, 
    signaling, CountryService, ContactsServiceForCountry, ENV) {
 
    $scope.countries = CountryService.getCountries();
    $scope.limit = 21;

    $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);

    $scope.myCountry = CountryService.getMyCountry();



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
      // ContactsServiceForCountry.setOnlineUsers(users, $scope.loginName, $scope.myCountry);

      sendDataToServer();
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
             alert("ERROR: " + response.status + " " + response.data);
           });
    }


    $scope.loadMore = function() {

      $scope.limit += 21;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };


    $scope.pickCountry = function(c) {
      CountryService.setMyCountry(c);
      $scope.myCountry = CountryService.getMyCountry();
      $scope.login();
    };



  });