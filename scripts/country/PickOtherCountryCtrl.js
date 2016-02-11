angular.module('phonertcdemo')

  .controller('PickOtherCountryCtrl', function ($scope, $state, $interval,
     $timeout, signalingCountry, CountryService, ContactsServiceForCountry) {
 
    $scope.countries = CountryService.getCountries();
    $scope.limit = 21;
    $scope.myCountry = CountryService.getMyCountry();
    $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);



    $scope.loadMore = function() {
      $scope.limit += 21;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };


    $scope.login = function () {
      var countryPerson = {
        name: $scope.loginName,
        countryCode: $scope.myCountry.code,
        status: 1, // busy
        callsCount: 0
      };

      signalingCountry.emit('login', countryPerson );
    };


    signalingCountry.on('login_successful', function (users) {
      signalingCountry.emit('busy');
      ContactsServiceForCountry.setOnlineUsers(users, $scope.loginName);
    });


    // for logout
    $scope.logout = function() {

      var countryPerson = {
        name: ContactsServiceForCountry.currentName,
        countryCode: $scope.myCountry.code
      };
      
      signalingCountry.emit('logout', countryPerson);

      $state.go('app.pickmycountry');
    };


    $scope.pickCountry = function(c) {
      CountryService.setCallingCountryCode(c.code);
      
      $state.go('app.searchingcountry');
    };



    $scope.init = function() {
      $scope.login();
    };


    $scope.goBack = function() {
      signalingCountry.emit('logout');
      $state.go('app.home');
    };

  });